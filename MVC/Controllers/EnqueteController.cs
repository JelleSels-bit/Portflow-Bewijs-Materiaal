using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Restaurant.Controllers
{
    public class EnqueteController : Controller
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;

        public EnqueteController(IUnitOfWork context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Index(int reservatieId)
        {
            var reservatie = await _context.ReservatieRepository.GetByIdAsync(reservatieId);
            if (reservatie == null) return NotFound();

            var para = await _context.ParameterRepository.GetByIdAsync(15);
            int.TryParse(para.Waarde, out var days);

            var validUntil = reservatie.Datum.Value.AddDays(days);

            if (DateTime.Now > validUntil)
            {
                TempData["Error"] = "De link voor de enquête is verlopen.";
                return View("EnqueteVerlopen");
            }

            var vm = new EnqueteViewModel
            {
                Id = reservatieId
            };

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Enquete(EnqueteViewModel model)
        {
            if (!ModelState.IsValid)
                return View("Index");

            var reservatie = await _context.ReservatieRepository.GetByIdAsync(model.Id);
            if (reservatie == null) return NotFound();

            reservatie.EvaluatieAantalSterren = model.Sterren;
            reservatie.EvaluatieOpmerkingen = model.Opmerkingen;

            await _context.SaveChangesAsync();

            return View("Index");
        }
    }
}
