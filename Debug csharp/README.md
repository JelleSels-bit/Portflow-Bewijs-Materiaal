[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/U9V-2Fyt)
# itc1-csharp-bugfixing
Deze applicatie bevat de startcode voor een opdracht onder het OPO IT Challenges 1.

## Studenten
- Zendé thys (r1036079)
- Jelle Sels (r0900822)

## Opgeloste fouten
Maak hier een lijst van de fouten die je opgelost hebt. Noteer bij elke fout het bestand en de regelnummer (ongeveer is goed) waar je een aanpassing hebt gedaan. 
Bijvoorbeeld `Program.cs:20` (Het woord opgove aangepast naar opgave)

 Dotnet van 6.0 -> 8.0 verandert in csproj
0. Program.cs:20 - Het woord opgove aangepast naar opgave
1. Program.cs:1 - Methode ToonTitle verandert naar ToonTitel.
2. Program.cs:127 - FileOperations.FilterProcessoren() -> FileOperations.FilterMoederborden();
3. Toetsenbord.cs:27 - heeftRgbverlichting & prijs omgewisseld.
4. Software.cs:29 - naam = Naam -> Naam = naam;
5. program.cs:4 Aankoop aankoop = null -> Aankoop aankoop = new Aankoop();
6. Onderdeel.cs:15 - Prijs -> _prijs;
7. Processor.cs:53-59 - Alle '_' aangepast naar de properties (_merk = merk -> Merk = merk).
8. FileOperations.cs:154 string WatdoetDitHier verwijderd.
9. FileOperations.cs:138 Verwijderdt zorgt voor null reference.
10. Muis.cs:27 - In de Base (model, merk,... -> merk, model,...).
11. GrafischeKaart.cs:23 - _werkgeheugen & value omgewisseld (value = _werkgehugen -> _werkgeheugen = value;).
12. Geheugen.cs:23 - Value ipv ModuleGrootte (_moduleGrootte = ModuleGrootte; -> _moduleGrootte = Value;).
13. program.cs:39 PR4 principe toegepast in de while lust
14. program.cs:241 while lus aangepast zodat deze de juiste waardes valideerdt & herhaald als foutief is.
15. Accessoire.cs:40 - Bij de if-statment '>' aangepast naar '<'.
16. Aankoop.cs: 36 Nieuw constructor onderdeel aangemaakt. Zodat de lijst van software altijd geinitialiseerd is. ook al word er niets aan toegevoegd.
17. Program.cs: 81 Console.ReadLine() toegevoegd.
18. Program.cs : 227 {softwareLijst[i + 1]} -> {softwareLijst[i]}
19. program.cs: 128 Methode ToonKeuzeTitel("processor) -> ToonKeuzeTitel("moederbord: )
20. Aankoop.cs: 59 & 60  de totaleprijs = statement de = vervangen naar += zodat dit de totaleprijs niet overschrijft.
## Screenshots
Het overzicht van de **moederborden** moet er als volgt uit zien:
```
Kies een moederbord:

1. Moederbord: Socket AM4 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR4
2. Moederbord: Socket AM7 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR4
3. Moederbord: Socket AM9 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR5
4. Moederbord: Socket AM3 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR5
```

Het overzicht van de **Processoren** moet er als volgt uit zien:
```
Kies een processor:

1. Processor: Merk AMD - Socket AM4 - 8 cores  - 12 threads - 34 MHz
2. Processor: Merk AMD - Socket AM5 - 8 cores  - 12 threads - 34 MHz
3. Processor: Merk AMD - Socket AM5 - 8 cores  - 12 threads - 38 MHz
4. Processor: Merk AMD - Socket AM5 - 0 cores  - 16 threads - 50 MHz
5. Processor: Merk AMD - Socket AM5 - 8 cores  - 12 threads - 34 MHz
6. Processor: Merk AMD - Socket AM7 - 8 cores  - 12 threads - 34 MHz
7. Processor: Merk AMD - Socket AM7 - 4 cores  - 12 threads - 40 MHz
8. Processor: Merk AMD - Socket AM7 - 8 cores  - 8 threads - 38 MHz
```

Het overzicht van de **geheugens** moet er als volgt uit zien:
```
Kies een geheugen:

1. Geheugen: DDR4 - 16GB
2. Geheugen: DDR4 - 8GB
3. Geheugen: DDR5 - 16GB
```

Het overzicht van de grafische kaarten moet er als volgt uit zien:
```
Kies een grafische kaart:

1. Chipset: NVIDIA GeForce GTX 1650 - Werkgeheugen 4GB
2. Chipset: Gigabyte GeForce RTX 4080 - Werkgeheugen 16GB
```

Na het kiezen van alle onderdelen (optie 1 bij alles), moet je deze output krijgen:
```
Jouw pc:
Geheugen: Geheugen: DDR4 - 16GB
Moederbord: Moederbord: Socket AM4 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR4
Processor: Processor: Merk AMD - Socket AM4 - 8 cores  - 12 threads - 34 MHz
Grafische kaart: Chipset: NVIDIA GeForce GTX 1650 - Werkgeheugen 4GB
Prijs PC: 18.979,00 euro
```

Het overizicht van de muizen moet er als volgt uit zien:
```
Kies een muis:

1. Muis: Merk Trust - Model Carve - Draadloos Nee - RGB Verlichting Nee - Prijs: 799 euro - Aantal instellingen 1 - Max DPI 1200
2. Muis: Merk Logitech - Model M705 - Draadloos Ja - RGB Verlichting Nee - Prijs: 3499 euro - Aantal instellingen 1 - Max DPI 900
3. Muis: Merk Steelseries - Model Rival 600 - Draadloos Nee - RGB Verlichting Ja - Prijs: 6120 euro - Aantal instellingen 5 - Max DPI 12000
4. Muis: Merk Razer - Model DeathAdder V2 - Draadloos Nee - RGB Verlichting Ja - Prijs: 6299 euro - Aantal instellingen 5 - Max DPI 20000
5. Muis: Merk Corsair - Model Nightsword - Draadloos Nee - RGB Verlichting Ja - Prijs: 8490 euro - Aantal instellingen 5 - Max DPI 18000
```

Het overzicht van de toetsenborden moet er als volgt uit zien:
```
Kies een toetsenbord:

1. Toetsenbord: Merk Steelseries - Model Apex 3 TKL - Draadloos Nee - RGB Verlichting Ja - Prijs: 3999 euro - Layout QWERTY - Mechanisch Nee
2. Toetsenbord: Merk Fuegobird - Model K3 - Draadloos Ja - RGB Verlichting Ja - Prijs: 4050 euro - Layout QWERTY - Mechanisch Ja
3. Toetsenbord: Merk Razer - Model Huntsman mini - Draadloos Nee - RGB Verlichting Ja - Prijs: 11995 euro - Layout QWERTY - Mechanisch Nee
4. Toetsenbord: Merk Corsair - Model K55 RGB Pro - Draadloos Nee - RGB Verlichting Ja - Prijs: 6490 euro - Layout QWERTY - Mechanisch Nee
```

Na het kiezen van een muis en toetsenbord (optie 1 bij elk), moet je deze output krijgen:
```
Jouw accessoires:
Muis: Merk Trust - Model Carve - Draadloos Nee - RGB Verlichting Nee - Prijs: 799 euro - Aantal instellingen 1 - Max DPI 1200
Toetsenbord: Merk Steelseries - Model Apex 3 TKL - Draadloos Nee - RGB Verlichting Ja - Prijs: 3999 euro - Layout QWERTY - Mechanisch Nee
Prijs accesoires: 4.798,00
```

Het overizicht van de software moet er als volgt uit zien:
```
Kies een software:

1. Naam Photoshop elements
2. Naam Microsoft office 2019
3. Naam Norton antivirus 360 Deluxe
4. Naam Baldur's gate 3 - Aantal spelers 1 - Minimaal werkgeheugen 8GB
5. Naam God of war - Aantal spelers 1 - Minimaal werkgeheugen 4GB
6. Naam Age of empires IV - Aantal spelers 4 - Minimaal werkgeheugen 4GB
```

Na het kiezen van software (optie 1 is gekozen), moet je deze output krijgen:
```
Jouw softwarepakket:
Naam Photoshop elements
Prijs software: 9.999,00
```

Op het einde van de applicatie krijg je de totaalprijs te zien:
```
Totale prijs aankoop: 33776
```

**OPGELET**: Indien je verschillen opmerkt met punten en komma's, mag je deze negeren. Bij twijfel vraag je de docent om even mee te kijken.