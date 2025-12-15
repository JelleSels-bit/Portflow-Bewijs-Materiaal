using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Restaurant.Data;
using Restaurant.Models;
using Restaurant.Services;
using Restaurant.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;

using Sprache;

[Authorize]
[Route("Reservatie")]
public class ReservatieController : Controller
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IMailSender _mailSender;

    public ReservatieController(IUnitOfWork unitOfWork, IMapper mapper, IMailSender mailSender)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _mailSender = mailSender;
    }

    //=======================
    //   RESERVEREN
    //=======================
    [Authorize(Roles = "Eigenaar,Klant")]
    [HttpGet("Reserveren")]
    public IActionResult Reserveren() => View(new ReservatieViewModel());

    [Authorize(Roles = "Eigenaar,Klant")]
    [HttpGet("GetBeschikbareData")]
    public async Task<JsonResult> GetBeschikbareData(int aantalPersonen)
    {
        var datums = await _unitOfWork.TafelRepository.GetBeschikbareData(aantalPersonen);
        return Json(datums.Select(d => d.ToString("yyyy-MM-dd")).ToList());
    }

    [Authorize(Roles = "Eigenaar,Klant")]
    [HttpGet("GetTijdsloten")]
    public async Task<JsonResult> GetTijdsloten(DateTime datum, int aantalPersonen)
    {
        var tijdsloten = await _unitOfWork.TijdslotRepository.GetActieveTijdsloten();
        var resultaat = new List<TijdslotBeschikbaarheidHelperViewModel>();

        int totalePlaatsen = (await _unitOfWork.TafelRepository.GetAllAsync())
                             .Where(t => t.Actief)
                             .Sum(t => t.AantalPersonen) - 10;

        foreach (var ts in tijdsloten)
        {
            var reserved = await _unitOfWork.ReservatieRepository
                .GetAantalPersonenGereserveerd(datum, ts.Id);

            resultaat.Add(new TijdslotBeschikbaarheidHelperViewModel
            {
                TijdslotId = ts.Id,
                Naam = ts.Naam!,
                BeschikbarePlaatsen = totalePlaatsen - reserved,
                IsBeschikbaar = (totalePlaatsen - reserved) >= aantalPersonen
            });
        }

        return Json(resultaat);
    }

    [Authorize(Roles = "Eigenaar,Klant")]
    [HttpPost("Bevestigen")]
    public async Task<IActionResult> Bevestigen(ReservatieViewModel model)
    {
        if (!ModelState.IsValid || !model.GekozenDatum.HasValue || !model.GekozenTijdslotId.HasValue)
        {
            ModelState.AddModelError("", "Selecteer eerst een datum en tijdslot.");
            model.BeschikbareDatums = await _unitOfWork.TafelRepository.GetBeschikbareData(model.AantalPersonen);
            return View("Reserveren", model);
        }

        int totalePlaatsen = (await _unitOfWork.TafelRepository.GetAllAsync())
                             .Where(t => t.Actief)
                             .Sum(t => t.AantalPersonen) - 10;

        int reserved = await _unitOfWork.ReservatieRepository
            .GetAantalPersonenGereserveerd(model.GekozenDatum.Value, model.GekozenTijdslotId.Value);

        int vrij = totalePlaatsen - reserved;

        if (model.AantalPersonen > vrij)
        {
            model.Foutmelding = "Niet genoeg capaciteit.";
            model.BeschikbareDatums = await _unitOfWork.TafelRepository.GetBeschikbareData(model.AantalPersonen);
            return View("Reserveren", model);
        }

        var reservatie = _mapper.Map<Reservatie>(model);

        reservatie.KlantId = GetUserId();
        reservatie.Betaald = false;
        reservatie.Tafellijsten = new List<TafelLijst>();

        await _unitOfWork.ReservatieRepository.AddAsync(reservatie);
        await _unitOfWork.SaveChangesAsync();

        model.ReserveringVoltooid = true;
        model.BeschikbareDatums = await _unitOfWork.TafelRepository.GetBeschikbareData(model.AantalPersonen);


        //Bevestigings mail
        await _mailSender.SendMail(2, reservatie);

        //Welkoms mail
        var parameter = await _unitOfWork.ParameterRepository.GetByIdAsync(14);
        int parameterValue = int.Parse(parameter.Waarde);

        //Deze tussenstap moest gebeuren omdat reservatie.Datum nullable is en dit anders niet aanzien wordt als een Timespan in var verschil hieronder. -_-
        DateTime reservationDate = reservatie.Datum.Value;

        var verschil = reservationDate - DateTime.Now;

        if (verschil.TotalDays > parameterValue)
        {
            var timeUntilMail = verschil - TimeSpan.FromDays(parameterValue);
            BackgroundJob.Schedule(() => _mailSender.SendWelcomeMail(2, reservatie.Id), timeUntilMail);
        }
        else
        {
            BackgroundJob.Schedule(() => _mailSender.SendWelcomeMail(2, reservatie.Id), TimeSpan.FromSeconds(10));
        }

        return View("Reserveren", model);

    }

    //=======================
    //   BEHEER
    //=======================
    [Authorize(Roles = "Eigenaar")]
    [HttpGet("ReservatieBeheer")]
    public async Task<IActionResult> ReservatieBeheer()
    {
        var reservaties = await _unitOfWork.ReservatieRepository.GetAllWithUserAndTijdslotAsync();

        reservaties = reservaties
            .OrderBy(r => r.Datum)
            .ThenByDescending(r => r.IsAanwezig)
            .ToList();

        var model = _mapper.Map<List<ReservatieBeheerViewModel>>(reservaties);
        return View(model);
    }

    [Authorize(Roles = "Eigenaar")]
    [HttpPost("Verwijder")]
    public async Task<IActionResult> Verwijder(int id)
    {
        var reservatie = await _unitOfWork.ReservatieRepository.GetByIdAsync(id);
        if (reservatie == null)
            return NotFound();

        _unitOfWork.ReservatieRepository.Delete(reservatie);
        await _unitOfWork.SaveChangesAsync();

        await _mailSender.SendMail(3, reservatie);
        return RedirectToAction("ReservatieBeheer");
    }

    [Authorize(Roles = "Eigenaar")]
    [HttpPost("Update")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Update(ReservatieBeheerViewModel model)
    {
        if (!ModelState.IsValid)
        {
            TempData["BeheerError"] = "Ongeldige gegevens.";
            return RedirectToAction("ReservatieBeheer");
        }

        var reservatie = await _unitOfWork.ReservatieRepository.GetByIdAsync(model.Id);
        if (reservatie == null)
        {
            TempData["BeheerError"] = "Reservatie niet gevonden.";
            return RedirectToAction("ReservatieBeheer");
        }

        // Alleen admin-aanpasbare velden
        reservatie.AantalPersonen = model.AantalPersonen;
        reservatie.Datum = model.Datum;
        reservatie.TijdSlotId = model.TijdslotId;

        await _unitOfWork.SaveChangesAsync();

        return RedirectToAction("ReservatieBeheer");
    }

    //=======================
    //  Kiezen van reservatie
    //=======================

    // Stap 1: klant kiest reservatie
    [HttpGet("Kies")]
    public async Task<IActionResult> Kies()
    {
        var userId = GetUserId();

        var reservaties = await _unitOfWork.ReservatieRepository
            .Find(r => r.KlantId == userId && r.Datum >= DateTime.Today) ?? new List<Reservatie>();

        // Map naar ViewModel met AutoMapper
        var model = _mapper.Map<List<ReservatieKiesViewModel>>(reservaties);

        return View(model); // return altijd een waarde
    }

    //[Authorize(Roles = "Klant")]
    //[HttpGet("MijnReservaties")]
    //public async Task<IActionResult> MijnReservaties()
    //{
    //    var userId = GetUserId();
    //}

    [Authorize(Roles = "Klant")]
    [HttpGet("MijnReservaties")]
    public async Task<IActionResult> MijnReservaties()
    {
        var userId = GetUserId();

        var reservaties = await _unitOfWork.ReservatieRepository
            .Find(r => r.KlantId == userId && r.Datum >= DateTime.Today) ?? new List<Reservatie>();

        // Map naar viewmodel
        var model = _mapper.Map<List<ReservatieDashboardViewModel>>(reservaties);

        // Tafelnummers vullen en MagBestellen instellen
        foreach (var r in model)
        {
            var reservatieEntity = reservaties.First(x => x.Id == r.ReservatieId);

            r.TafelNummers = reservatieEntity.Tafellijsten?
                .Select(tl => tl.Tafel?.TafelNummer ?? "-")
                .ToList() ?? new List<string> { "-" };

            r.MagBestellen = reservatieEntity.Datum?.Date == DateTime.Today;
        }

        // Sorteer op datum en tijdslot
        model = model
            .OrderBy(r => r.Datum ?? DateTime.MaxValue)
            .ThenBy(r => r.TijdslotNaam)
            .ToList();

        var dashboardModel = new AccountDashboardViewModel
        {
            Reservaties = model
        };

        return View(dashboardModel);
    }





    //////////////////////////////////////////////////////////
    // Aanpassen route van kiesReservatie => Menu
    // met het reservatieId
    //////////////////////////////////////////////////////////

    //=======================
    //  HULP
    //=======================
    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier);
}
