IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'Wedstrijden')
BEGIN
CREATE DATABASE [Wedstrijden]
END

GO
USE [Wedstrijden]
GO

SET NOCOUNT ON;
GO

drop table if exists SpelerPloeg;
drop table if exists Wedstrijd;
drop table if exists Categorie;
drop table if exists Club;
drop table if exists Sport;
drop table if exists Speler;
drop table if exists TrainerPloeg;
drop table if exists Ploeg;
drop table if exists Trainer;


GO



create table Speler (
	id INT IDENTITY(1,1) PRIMARY KEY,
	voornaam VARCHAR(50),
	naam VARCHAR(50),
	straat VARCHAR(50),
	huisnummer VARCHAR(50),
	gemeente VARCHAR(50),
	postcode VARCHAR(50),
	land VARCHAR(50),
	geboortedatum DATE,
	geslacht VARCHAR(50)
);

SET IDENTITY_INSERT Speler ON;
GO

insert into Speler (id, voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht) values
(1, 'Erik', 'Maes', 'Kerkstraat', '1', 'Antwerpen', '2000', 'België', '1990-05-15', 'Man'),
(2, 'Sophie', 'De Smet', 'Dorpsweg', '2', 'Antwerpen', '2000', 'België', '1985-08-21', 'Vrouw'),
(3, 'Jan', 'Peeters', 'Stationsstraat', '3', 'Brussel', '1000', 'België', '1978-03-10', 'Andere'),
(4, 'Annelies', 'Claes', 'Schoolstraat', '4', 'Brussel', '1000', 'België', '1995-11-28', 'Vrouw'),
(5, 'Luc', 'Vermeulen', 'Parklaan', '5', 'Gent', '9000', 'België', '1982-07-04', 'Man'),
(6, 'Karen', 'Willems', 'Bosstraat', '6', 'Gent', '9000', 'België', '1993-02-18', 'Vrouw'),
(7, 'Tom', 'Jacobs', 'Kerkplein', '7', 'Leuven', '3000', 'België', '1976-09-30', 'Man'),
(8, 'Inge', 'Martens', 'Marktstraat', '8', 'Leuven', '3000', 'België', '1988-12-25', 'Vrouw'),
(9, 'Jeroen', 'Verbeke', 'Grote Steenweg', '9', 'Mechelen', '2800', 'België', '1980-04-14', 'Man'),
(10, 'Sofie', 'Vandenberghe', 'Kanaalstraat', '10', 'Mechelen', '2800', 'België', '1991-08-08', 'Vrouw'),
(11, 'Kurt', 'Desmet', 'Havenlaan', '11', 'Brugge', '8000', 'België', '1983-06-02', 'Man'),
(12, 'Liesbeth', 'Dirkx', 'Kasteelstraat', '12', 'Brugge', '8000', 'België', '1997-01-20', 'Vrouw'),
(13, 'Kris', 'Van Dyck', 'Zuidstraat', '13', 'Aalst', '9300', 'België', '1979-10-11', 'Man'),
(14, 'Nathalie', 'Lambrechts', 'Steenweg', '14', 'Aalst', '9300', 'België', '1994-09-05', 'Vrouw'),
(15, 'Bart', 'Vanderheyden', 'Ooststraat', '15', 'Hasselt', '3500', 'België', '1986-07-17', 'Man'),
(16, 'Ellen', 'Cools', 'Noordlaan', '16', 'Hasselt', '3500', 'België', '1981-04-30', 'Andere'),
(17, 'Peter', 'Wouters', 'Weststraat', '17', 'Kortrijk', '8500', 'België', '1990-02-14', 'Man'),
(18, 'Mieke', 'Verschueren', 'Oostendestraat', '18', 'Kortrijk', '8500', 'België', '1977-11-08', 'Vrouw'),
(19, 'Wim', 'Verheyen', 'Zuidlaan', '19', 'Genk', '3600', 'België', '1992-08-23', 'Man'),
(20, 'Caroline', 'Devos', 'Noordstraat', '20', 'Genk', '3600', 'België', '1984-05-27', 'Vrouw'),
(21, 'Stijn', 'Janssens', 'Zuidlaan', '21', 'Sint-Niklaas', '9100', 'België', '1996-03-13', 'Man'),
(22, 'An', 'De Cock', 'Dorpsstraat', '22', 'Sint-Niklaas', '9100', 'België', '1978-09-02', 'Vrouw'),
(23, 'Bart', 'Van Hoof', 'Kerkweg', '23', 'Oostende', '8400', 'België', '1993-12-18', 'Man'),
(24, 'Ingrid', 'Vandenbossche', 'Noordlaan', '24', 'Oostende', '8400', 'België', '1980-07-24', 'Vrouw'),
(25, 'Wouter', 'Maertens', 'Kerkstraat', '25', 'Genk', '3600', 'België', '1989-11-05', 'Man'),
(26, 'Elke', 'De Bruyne', 'Stationsplein', '26', 'Genk', '3600', 'België', '1982-10-17', 'Vrouw'),
(27, 'Koen', 'Vermeersch', 'Dorpsstraat', '27', 'Roeselare', '8800', 'België', '1995-06-20', 'Man'),
(28, 'Nele', 'Verstraeten', 'Marktplein', '28', 'Roeselare', '8800', 'België', '1976-03-30', 'Vrouw'),
(29, 'Bart', 'Vanhove', 'Kerkplein', '29', 'Mechelen', '2800', 'België', '1991-01-08', 'Man'),
(30, 'Lies', 'Janssen', 'Stationsstraat', '30', 'Mechelen', '2800', 'België', '1984-07-15', 'Vrouw'),
(31, 'Pieter', 'Dewitte', 'Marktstraat', '31', 'Brugge', '8000', 'België', '1997-04-11', 'Andere'),
(32, 'Sara', 'Van Nieuwenhove', 'Dorpsplein', '32', 'Brugge', '8000', 'België', '1979-03-22', 'Vrouw'),
(33, 'Mohamed', 'Abdullahi', 'Rue de la Gare', '33', 'Brussel', '1000', 'België', '1992-09-09', 'Man'),
(34, 'Anne', 'Dupont', 'Avenue des Roses', '34', 'Brussel', '1000', 'België', '1987-12-12', 'Vrouw'),
(35, 'Jean-Pierre', 'Leclercq', 'Rue de la Paix', '35', 'Luik', '4000', 'België', '1980-04-25', 'Man'),
(36, 'Marie', 'Lambert', 'Avenue Louise', '36', 'Luik', '4000', 'België', '1995-03-17', 'Vrouw'),
(37, 'Ahmed', 'El Mansour', 'Rue de la Liberté', '37', 'Charleroi', '6000', 'België', '1983-10-08', 'Man'),
(38, 'Agnieszka', 'Nowak', 'Rue du Commerce', '38', 'Charleroi', '6000', 'België', '1989-06-30', 'Vrouw'),
(39, 'Jens', 'Andereen', 'Rue Royale', '39', 'Namen', '5000', 'België', '1976-01-21', 'Man'),
(40, 'Sofia', 'Gonzalez', 'Calle de la Playa', '40', 'Namen', '5000', 'België', '1990-08-14', 'Vrouw'),
(50, 'Emma', 'Janssens', 'Kerkstraat', '1', 'Antwerpen', '2000', 'België', '2007-03-15', 'Vrouw'),
(51, 'Lucas', 'Maes', 'Dorpstraat', '2', 'Brugge', '8000', 'België', '2006-05-22', 'Man'),
(52, 'Lotte', 'Jacobs', 'Stationsstraat', '3', 'Gent', '9000', 'België', '2008-09-10', 'Vrouw'),
(53, 'Seppe', 'De Smet', 'Kerkplein', '4', 'Brussel', '1000', 'België', '2005-11-03', 'Man'),
(54, 'Fien', 'Claes', 'Steenweg', '5', 'Leuven', '3000', 'België', '2007-07-18', 'Vrouw'),
(55, 'Matteo', 'Van Damme', 'Bosstraat', '6', 'Mechelen', '2800', 'België', '2006-02-28', 'Man'),
(56, 'Charlotte', 'Willems', 'Kerkweg', '7', 'Kortrijk', '8500', 'België', '2005-12-09', 'Vrouw'),
(57, 'Jules', 'Lambert', 'Schoolstraat', '8', 'Genk', '3600', 'België', '2008-04-27', 'Man'),
(58, 'Eline', 'Martens', 'Havenlaan', '9', 'Oostende', '8400', 'België', '2007-01-14', 'Vrouw'),
(59, 'Thijs', 'Hendrickx', 'Dijkstraat', '10', 'Hasselt', '3500', 'België', '2006-08-30', 'Man'),
(60, 'Eva', 'Wouters', 'Kanaalstraat', '11', 'Sint-Niklaas', '9100', 'België', '2005-10-07', 'Vrouw'),
(61, 'Tibo', 'Verstraeten', 'Lindenlaan', '12', 'Brugge', '8000', 'België', '2008-06-19', 'Man'),
(62, 'Amber', 'De Vos', 'Marktplein', '13', 'Aalst', '9300', 'België', '2007-09-25', 'Vrouw'),
(63, 'Brent', 'Vandenberghe', 'Kerkplein', '14', 'Gent', '9000', 'België', '2006-03-11', 'Man'),
(64, 'Nina', 'Cools', 'Stationsplein', '15', 'Brussel', '1000', 'België', '2005-05-28', 'Vrouw'),
(65, 'Robbe', 'Lauwers', 'Steenweg', '16', 'Leuven', '3000', 'België', '2008-12-04', 'Man'),
(66, 'Eline', 'Vandamme', 'Bosstraat', '17', 'Mechelen', '2800', 'België', '2007-02-21', 'Vrouw'),
(67, 'Maxime', 'Dewitte', 'Kerkweg', '18', 'Kortrijk', '8500', 'België', '2006-11-17', 'Man'),
(68, 'Lisa', 'Lemmens', 'Schoolstraat', '19', 'Genk', '3600', 'België', '2005-07-23', 'Vrouw'),
(69, 'Noah', 'Vermeulen', 'Havenlaan', '20', 'Oostende', '8400', 'België', '2008-10-10', 'Man'),
(70, 'Laura', 'Hermans', 'Dijkstraat', '21', 'Hasselt', '3500', 'België', '2007-04-16', 'Vrouw'),
(71, 'Victor', 'De Pauw', 'Kanaalstraat', '22', 'Sint-Niklaas', '9100', 'België', '2006-01-03', 'Man'),
(72, 'Anouk', 'Willems', 'Lindenlaan', '23', 'Brugge', '8000', 'België', '2005-08-29', 'Vrouw'),
(73, 'Tomas', 'Martens', 'Marktplein', '24', 'Aalst', '9300', 'België', '2008-11-14', 'Man'),
(74, 'Emma', 'Vandeweghe', 'Kerkplein', '25', 'Gent', '9000', 'België', '2007-06-12', 'Vrouw'),
(75, 'Simon', 'Vandecasteele', 'Stationsplein', '26', 'Brussel', '1000', 'België', '2006-09-20', 'Man'),
(76, 'Eva', 'Vermeersch', 'Steenweg', '27', 'Leuven', '3000', 'België', '2005-02-06', 'Vrouw'),
(77, 'Kobe', 'Claes', 'Bosstraat', '28', 'Mechelen', '2800', 'België', '2008-07-01', 'Man'),
(78, 'Julie', 'Peeters', 'Kerkweg', '29', 'Kortrijk', '8500', 'België', '2007-10-26', 'Vrouw'),
(79, 'Matthias', 'De Cock', 'Schoolstraat', '30', 'Genk', '3600', 'België', '2006-12-22', 'Man'),
(80, 'Femke', 'Jacobs', 'Havenlaan', '31', 'Oostende', '8400', 'België', '2005-04-09', 'Vrouw'),
(81, 'Bram', 'Hendrickx', 'Dijkstraat', '32', 'Hasselt', '3500', 'België', '2008-09-04', 'Man'),
(82, 'Lise', 'Wouters', 'Kanaalstraat', '33', 'Sint-Niklaas', '9100', 'België', '2007-07-31', 'Vrouw'),
(83, 'Arne', 'Verheyen', 'Lindenlaan', '34', 'Brugge', '8000', 'België', '2006-02-16', 'Man'),
(84, 'Luna', 'Hermans', 'Marktplein', '35', 'Aalst', '9300', 'België', '2005-12-13', 'Vrouw'),
(85, 'Seppe', 'Martens', 'Kerkplein', '36', 'Gent', '9000', 'België', '2008-05-01', 'Man'),
(86, 'Lotte', 'Van de Velde', 'Stationsplein', '37', 'Brussel', '1000', 'België', '2007-08-26', 'Vrouw'),
(87, 'Maarten', 'Lauwers', 'Steenweg', '38', 'Leuven', '3000', 'België', '2006-11-21', 'Man'),
(88, 'Emma', 'Vandenberghe', 'Bosstraat', '39', 'Mechelen', '2800', 'België', '2005-05-17', 'Vrouw'),
(89, 'Wout', 'Dewitte', 'Kerkweg', '40', 'Kortrijk', '8500', 'België', '2008-02-12', 'Man'),
(90, 'Lara', 'Lemmens', 'Schoolstraat', '41', 'Genk', '3600', 'België', '2007-10-09', 'Vrouw'),
(91, 'Lars', 'Vermeulen', 'Havenlaan', '42', 'Oostende', '8400', 'België', '2006-03-06', 'Man'),
(92, 'Amelie', 'Hermans', 'Dijkstraat', '43', 'Hasselt', '3500', 'België', '2005-01-29', 'Vrouw'),
(93, 'Milan', 'De Pauw', 'Kanaalstraat', '44', 'Sint-Niklaas', '9100', 'België', '2008-06-24', 'Man'),
(94, 'Jana', 'Willems', 'Lindenlaan', '45', 'Brugge', '8000', 'België', '2007-09-20', 'Vrouw'),
(95, 'Ruben', 'Martens', 'Marktplein', '46', 'Aalst', '9300', 'België', '2006-12-17', 'Man'),
(96, 'Floor', 'Vandeweghe', 'Kerkplein', '47', 'Gent', '9000', 'België', '2005-08-14', 'Vrouw'),
(97, 'Jens', 'Vandecasteele', 'Stationsplein', '48', 'Brussel', '1000', 'België', '2008-11-09', 'Man'),
(98, 'Lotte', 'Vermeersch', 'Steenweg', '49', 'Leuven', '3000', 'België', '2007-04-04', 'Vrouw'),
(99, 'Tuur', 'Claes', 'Bosstraat', '50', 'Mechelen', '2800', 'België', '2006-01-27', 'Man'),
(100, 'Lisa', 'Peeters', 'Kerkweg', '51', 'Kortrijk', '8500', 'België', '2005-10-22', 'Vrouw'),
(101, 'Liam', 'Johnson', 'Hoofdstraat', '123', 'Brussel', '1000', 'België', '2008-02-15', 'Man'),
(102, 'Emma', 'Williams', 'Eikenlaan', '456', 'Antwerpen', '2000', 'België', '2008-04-23', 'Vrouw'),
(103, 'Noah', 'Brown', 'Elmweg', '1', 'Gent', '9000', 'België', '2008-06-11', 'Man'),
(104, 'Olivia', 'Jones', 'Cederlaan', '45', 'Brugge', '8000', 'België', '2008-08-07', 'Vrouw'),
(105, 'William', 'Davis', 'Dennenstraat', '20', 'Leuven', '3000', 'België', '2008-10-30', 'Man'),
(106, 'Ava', 'Garcia', 'Esdoornweg', '17', 'Mechelen', '2800', 'België', '2009-01-02', 'Vrouw'),
(107, 'James', 'Rodriguez', 'Platanendreef', '19', 'Luik', '4000', 'België', '2009-03-18', 'Man'),
(108, 'Lotte', 'Vermeulen', 'Eikenlaan', '123', 'Gent', '9000', 'België', '2008-07-14', 'Vrouw'),
(109, 'Senne', 'Peeters', 'Acacialaan', '125', 'Antwerpen', '2000', 'België', '2008-09-30', 'Man'),
(110, 'Eline', 'Janssens', 'Berkendreef', '127', 'Leuven', '3000', 'België', '2008-12-15', 'Vrouw'),
(111, 'Seppe', 'Van Damme', 'Lindeweg', '129', 'Mechelen', '2800', 'België', '2009-02-28', 'Man'),
(112, 'Jolien', 'Maes', 'Kastanjelaan', '131', 'Brugge', '8000', 'België', '2009-05-10', 'Vrouw'),
(113, 'Robbe', 'Jacobs', 'Beukenstraat', '133', 'Kortrijk', '8500', 'België', '2009-08-23', 'Man'),
(114, 'Fien', 'Willems', 'Dennenweg', '135', 'Oostende', '8400', 'België', '2009-11-15', 'Vrouw'),
(115, 'Simon', 'Claes', 'Esdoornlaan', '137', 'Genk', '3600', 'België', '2010-03-01', 'Man'),
(116, 'Amber', 'Wouters', 'Vlierweg', '139', 'Hasselt', '3500', 'België', '2010-06-14', 'Vrouw'),
(117, 'Jens', 'Goossens', 'Wilgenlaan', '141', 'Turnhout', '2300', 'België', '2010-09-27', 'Man'),
(118, 'Laura', 'Martens', 'Dennenlaan', '143', 'Lokeren', '9160', 'België', '2010-12-10', 'Vrouw'),
(119, 'Arne', 'Hendrickx', 'Bosstraat', '145', 'Dendermonde', '9200', 'België', '2011-02-23', 'Man'),
(120, 'Anouk', 'Verhaeghe', 'Beekstraat', '147', 'Sint-Niklaas', '9100', 'België', '2011-06-08', 'Vrouw'),
(121, 'Tibo', 'Verhoeven', 'Kastanjelaan', '149', 'Deinze', '9800', 'België', '2011-09-21', 'Man'),
(122, 'Femke', 'Declercq', 'Populierenweg', '151', 'Geraardsbergen', '9500', 'België', '2011-12-04', 'Vrouw'),
(123, 'Matthias', 'Lemmens', 'Lindenstraat', '153', 'Ronse', '9600', 'België', '2012-03-18', 'Man'),
(124, 'Noor', 'Cools', 'Esdoornweg', '155', 'Aalst', '9300', 'België', '2012-06-01', 'Vrouw'),
(125, 'Brent', 'Desmet', 'Berkendreef', '157', 'Zottegem', '9620', 'België', '2012-09-14', 'Man'),
(126, 'Lara', 'Smet', 'Kastanjelaan', '159', 'Oudenaarde', '9700', 'België', '2012-12-27', 'Vrouw'),
(127, 'Ruben', 'Vandamme', 'Beukenweg', '161', 'Ninove', '9400', 'België', '2013-04-11', 'Man'),
(128, 'Silke', 'De Smedt', 'Dennenlaan', '163', 'Gent', '9000', 'België', '2013-07-25', 'Vrouw'),
(129, 'Thomas', 'Vermeersch', 'Eikenstraat', '165', 'De Pinte', '9840', 'België', '2013-11-07', 'Man'),
(130, 'Emma', 'Maertens', 'Acacialaan', '167', 'Merelbeke', '9820', 'België', '2014-02-20', 'Vrouw'),
(131, 'Kobe', 'Verschueren', 'Beeklaan', '169', 'Zwijnaarde', '9052', 'België', '2010-06-05', 'Man'),
(132, 'Luna', 'Vandenberghe', 'Wilgenweg', '171', 'Evergem', '9940', 'België', '2010-09-18', 'Vrouw'),
(133, 'Mathis', 'Maes', 'Lindenlaan', '173', 'Destelbergen', '9070', 'België', '2010-12-31', 'Man'),
(134, 'Marie', 'Coppens', 'Populierenlaan', '175', 'Wachtebeke', '9185', 'België', '2010-04-15', 'Vrouw'),
(135, 'Michiel', 'Willems', 'Esdoornlaan', '177', 'Lochristi', '9080', 'België', '2010-07-29', 'Man'),
(136, 'Lisa', 'Vermeiren', 'Eikenweg', '179', 'Zelzate', '9060', 'België', '2010-11-11', 'Vrouw'),
(137, 'Wout', 'Van Dyck', 'Acaciaweg', '181', 'Assenede', '9960', 'België', '2010-02-24', 'Man'),
(138, 'Flore', 'Bogaert', 'Beukenlaan', '183', 'Kaprijke', '9970', 'België', '2010-06-08', 'Vrouw'),
(139, 'Daan', 'Vandenberghe', 'Dennenweg', '185', 'Maldegem', '9990', 'België', '2010-09-21', 'Man'),
(140, 'Eva', 'Vandamme', 'Kastanjeweg', '187', 'Eeklo', '9900', 'België', '2010-12-04', 'Vrouw'),
(141, 'Bram', 'Van de Velde', 'Beukweg', '189', 'Aalter', '9880', 'België', '2010-03-19', 'Man'),
(142, 'Lore', 'Jacobs', 'Wilgenstraat', '191', 'Nevele', '9850', 'België', '2010-06-01', 'Vrouw'),
(143, 'Ruben', 'De Meyer', 'Lindenweg', '193', 'Deinze', '9800', 'België', '2010-09-14', 'Man'),
(144, 'Nina', 'Martens', 'Populierenstraat', '195', 'Nazareth', '9810', 'België', '2010-12-27', 'Vrouw'),
(145, 'Thibault', 'Goossens', 'Esdoornstraat', '197', 'Zulte', '9870', 'België', '2010-04-11', 'Man'),
(146, 'Emma', 'Vandenberghe', 'Eikenlaan', '199', 'Waregem', '8790', 'België', '2010-07-25', 'Vrouw'),
(147, 'Finn', 'Coppens', 'Acacialaan', '201', 'Wielsbeke', '8710', 'België', '2010-11-07', 'Man'),
(148, 'Luna', 'Vermeulen', 'Beukenweg', '203', 'Oostrozebeke', '8780', 'België', '2010-02-20', 'Vrouw'),
(149, 'Milan', 'Willems', 'Dennenlaan', '205', 'Ingelmunster', '8770', 'België', '2010-06-05', 'Man'),
(150, 'Louise', 'Jacobs', 'Kastanjelaan', '207', 'Lendelede', '8860', 'België', '2010-09-18', 'Vrouw'),
(151, 'Noah', 'Desmet', 'Wilgenweg', '209', 'Kuurne', '8520', 'België', '2010-12-31', 'Man'),
(152, 'Emma', 'Maes', 'Esdoornstraat', '211', 'Harelbeke', '8530', 'België', '2010-04-15', 'Vrouw'),
(153, 'Lars', 'Cools', 'Beukenlaan', '213', 'Anzegem', '8570', 'België', '2010-07-29', 'Man'),
(154, 'Amelie', 'Martens', 'Lindenlaan', '215', 'Zwevegem', '8550', 'België', '2010-11-11', 'Vrouw'),
(155, 'Wout', 'Vermeersch', 'Populierenweg', '217', 'Spiere-Helkijn', '8587', 'België', '2010-02-24', 'Man'),
(156, 'Lotte', 'Wouters', 'Eikenweg', '219', 'Kortrijk', '8500', 'België', '2010-06-08', 'Vrouw'),
(157, 'Sem', 'Verhaeghe', 'Acaciaweg', '221', 'Menen', '8930', 'België', '2010-09-21', 'Man'),
(158, 'Elise', 'Verschueren', 'Beeklaan', '223', 'Wevelgem', '8560', 'België', '2010-12-04', 'Vrouw'),
(159, 'Siebe', 'Vandamme', 'Wilgenweg', '225', 'Wervik', '8940', 'België', '2010-03-19', 'Man'),
(160, 'Louise', 'Maes', 'Dennenlaan', '227', 'Ieper', '8900', 'België', '2010-07-04', 'Vrouw'),
(161, 'Ferre', 'Declercq', 'Kastanjelaan', '229', 'Poperinge', '8970', '2010', '2010-10-17', 'Man'),
(162, 'Lotte', 'Lemmens', 'Esdoornweg', '231', 'Veurne', '8630', 'België', '2010-01-30', 'Vrouw'),
(163, 'Jasper', 'Van Dyck', 'Beuklaan', '233', 'Diksmuide', '8600', 'België', '2010-05-16', 'Man'),
(164, 'Amelie', 'Bogaert', 'Lindenstraat', '235', 'Nieuwpoort', '8620', 'België', '2010-08-29', 'Vrouw'),
(165, 'Stijn', 'Vermeiren', 'Populierenlaan', '237', 'Oudenburg', '8460', 'België', '2010-12-12', 'Man'),
(166, 'Fien', 'Van de Velde', 'Esdoornstraat', '239', 'Gistel', '8470', 'België', '2010-03-26', 'Vrouw'),
(167, 'Tibo', 'Jacobs', 'Eikenlaan', '241', 'Jabbeke', '8490', 'België', '2010-07-08', 'Man'),
(168, 'Emma', 'De Meyer', 'Acacialaan', '243', 'Zedelgem', '8210', 'België', '2010-10-21', 'Vrouw'),
(169, 'Lars', 'Vandenberghe', 'Beukenweg', '245', 'Torhout', '8820', 'België', '2010-02-03', 'Man'),
(170, 'Lotte', 'Vermeulen', 'Dennenlaan', '247', 'Hooglede', '8830', 'België', '2010-05-18', 'Vrouw'),
(171, 'Jules', 'Willems', 'Kastanjelaan', '249', 'Izegem', '8870', 'België', '2010-08-31', 'Man'),
(172, 'Fien', 'Vermeulen', 'Eikenlaan', '123', 'Gent', '9000', 'België', '2008-07-14', 'Vrouw'),
(173, 'Robbe', 'Peeters', 'Acacialaan', '125', 'Antwerpen', '2000', 'België', '2008-09-30', 'Man'),
(174, 'Lotte', 'Janssens', 'Berkendreef', '127', 'Leuven', '3000', 'België', '2008-12-15', 'Vrouw'),
(175, 'Senne', 'Van Damme', 'Lindeweg', '129', 'Mechelen', '2800', 'België', '2009-02-28', 'Man'),
(176, 'Eline', 'Maes', 'Kastanjelaan', '131', 'Brugge', '8000', 'België', '2009-05-10', 'Vrouw'),
(177, 'Seppe', 'Jacobs', 'Beukenstraat', '133', 'Kortrijk', '8500', 'België', '2009-08-23', 'Man'),
(178, 'Jolien', 'Willems', 'Dennenweg', '135', 'Oostende', '8400', 'België', '2009-11-05', 'Vrouw'),
(179, 'Milan', 'Declercq', 'Hazelaarlaan', '137', 'Genk', '3600', 'België', '2010-02-18', 'Man'),
(180, 'Amber', 'Vandenberghe', 'Populierenstraat', '139', 'Sint-Niklaas', '9100', 'België', '2010-05-03', 'Vrouw'),
(181, 'Mathis', 'Lauwers', 'Lijsterweg', '141', 'Hasselt', '3500', 'België', '2010-08-16', 'Man'),
(182, 'Emma', 'Goossens', 'Sparrenlaan', '143', 'Turnhout', '2300', 'België', '2010-11-29', 'Vrouw'),
(183, 'Tibo', 'Dumont', 'Kastanjeweg', '145', 'Dendermonde', '9200', 'België', '2011-03-14', 'Man'),
(184, 'Noor', 'Claes', 'Berkenlaan', '147', 'Geel', '2440', 'België', '2011-06-27', 'Vrouw'),
(185, 'Vince', 'Verstraeten', 'Lindestraat', '149', 'Waregem', '8790', 'België', '2011-10-10', 'Man'),
(186, 'Laura', 'Wouters', 'Kerselaarweg', '151', 'Mol', '2400', 'België', '2012-01-23', 'Vrouw'),
(187, 'Xander', 'Dierckx', 'Esdoornlaan', '153', 'Roeselare', '8800', 'België', '2012-05-07', 'Man'),
(188, 'Louise', 'Desmet', 'Eikenweg', '155', 'Lokeren', '9160', 'België', '2012-08-20', 'Vrouw'),
(189, 'Lucas', 'Verhaegen', 'Bosstraat', '157', 'Deinze', '9800', 'België', '2012-12-02', 'Man'),
(190, 'Amélie', 'Coppens', 'Populierendreef', '159', 'Ieper', '8900', 'België', '2013-03-17', 'Vrouw'),
(191, 'Maxim', 'Van den Bossche', 'Kastanjeweg', '161', 'Aalst', '9300', 'België', '2013-06-30', 'Man'),
(192, 'Eva', 'Hermans', 'Berkenstraat', '163', 'Tienen', '3300', 'België', '2013-10-13', 'Vrouw'),
(193, 'Jasper', 'Vanderheyden', 'Lijsterlaan', '165', 'Herentals', '2200', 'België', '2014-01-26', 'Man'),
(194, 'Lore', 'Segers', 'Sparrendreef', '167', 'Peer', '3990', 'België', '2014-05-11', 'Vrouw'),
(195, 'Thomas', 'Vandevenne', 'Hazelarenweg', '169', 'Grimbergen', '1850', 'België', '2014-08-24', 'Man'),
(196, 'Fleur', 'Bogaerts', 'Populierendreef', '171', 'Boom', '2850', 'België', '2014-12-07', 'Vrouw'),
(197, 'Wout', 'Vandewalle', 'Kastanjelaan', '173', 'Lommel', '3920', 'België', '2015-03-22', 'Man'),
(198, 'Lotte', 'Hendrickx', 'Berkenweg', '175', 'Overijse', '3090', 'België', '2015-07-04', 'Vrouw'),
(199, 'Kobe', 'Verschueren', 'Lindenlaan', '177', 'Hoogstraten', '2320', 'België', '2015-10-17', 'Man'),
(200, 'Luna', 'Willems', 'Esdoornlaan', '179', 'Eeklo', '9900', 'België', '2010-02-01', 'Vrouw');

SET IDENTITY_INSERT Speler OFF
GO

create table Club (
	id INT IDENTITY(1,1) PRIMARY KEY,
	naam VARCHAR(50),
);

SET IDENTITY_INSERT Club ON;
GO

insert into Club (id, naam) values
(1, 'Club Brugge KV'),
(2, 'RSC Anderlecht'),
(3, 'Standard Luik'),
(4, 'KRC Genk'),
(5, 'Antwerp FC'),
(6, 'Royal Antwerp FC'),
(7, 'Brussels Kangaroos'),
(8, 'Royal Racing Club de Bruxelles'),
(9, 'Royal Leopold Club'),
(10, 'Royal Léopold Uccle FC'),
(11, 'KAA Gent'),
(12, 'Royal Excel Mouscron'),
(13, 'KV Oostende'),
(14, 'KV Mechelen'),
(15, 'Cercle Brugge KSV'),
(16, 'Sporting Charleroi'),
(17, 'KV Kortrijk'),
(18, 'Waasland-Beveren'),
(19, 'Union Saint-Gilloise'),
(20, 'KVC Westerlo'),
(21, 'KFCO Beerschot Wilrijk'),
(22, 'KSV Roeselare'),
(23, 'RFC Seraing'),
(24, 'OH Leuven'),
(25, 'Lommel SK'),
(26, 'KSK Beveren'),
(27, 'KVRS Waasland - SK Beveren'),
(28, 'Patro Eisden Maasmechelen'),
(29, 'KVK Tienen'),
(30, 'ROC de Charleroi-Marchienne');

SET IDENTITY_INSERT Club OFF;
GO

create table Sport (
	id INT IDENTITY(1,1) PRIMARY KEY,
	naam VARCHAR(50),
);

SET IDENTITY_INSERT Sport ON;
GO

insert into Sport (id, naam) values
(1, 'Voetbal'),
(2, 'Basketbal'),
(3, 'Tennis'),
(4, 'Golf'),
(5, 'Rugby'),
(6, 'Hockey'),
(7, 'Badminton'),
(8, 'Atletiek'),
(9, 'Zwemmen'),
(10, 'Wielrennen'),
(11, 'Volleybal'),
(12, 'Handbal'),
(13, 'Judo'),
(14, 'Karate'),
(15, 'Boksen'),
(16, 'Schaatsen'),
(17, 'Turnen'),
(18, 'Worstelen'),
(19, 'Surfen'),
(20, 'Zeilen'),
(21, 'Klimmen'),
(22, 'Gewichtheffen'),
(23, 'Boogschieten'),
(24, 'Squash'),
(25, 'Skateboarden'),
(26, 'Taekwondo'),
(27, 'Bergbeklimmen'),
(28, 'Honkbal'),
(29, 'Softbal'),
(30, 'Gymnastiek'),
(31, 'Padel'),
(32, 'Skiën'),
(33, 'Snowboarden'),
(34, 'Biatlon'),
(35, 'Triatlon'),
(36, 'Duiken'),
(37, 'Kanoën'),
(38, 'Surfing'),
(39, 'Roeien'),
(40, 'Handboogschieten');


SET IDENTITY_INSERT Sport OFF;
GO

create table Categorie (
	id INT IDENTITY(1,1) PRIMARY KEY,
	naam VARCHAR(50),
	minleeftijd INT,
	maxleeftijd INT,
	categorietype VARCHAR(50),
);

SET IDENTITY_INSERT Categorie ON;
GO

insert into Categorie (id, naam, minleeftijd, maxleeftijd, categorietype) values
(1, 'Jeugdvoetbal U6', 4, 5, 'Gemengd'),
(2, 'Jeugdvoetbal U8', 6, 7, 'Gemengd'),
(3, 'Jeugdvoetbal U10', 8, 9, 'Gemengd'),
(4, 'Jeugdvoetbal U12', 10, 11, 'Gemengd'),
(5, 'Jeugdvoetbal U14', 12, 13, 'Gemengd'),
(6, 'Jeugdvoetbal U16', 14, 15, 'Gemengd'),
(7, 'Jeugdvoetbal U18', 16, 17, 'Gemengd'),
(8, 'Jeugdvoetbal U21', 18, 20, 'Gemengd'),
(9, 'Damesvoetbal U15', 13, 14, 'Vrouw'),
(10, 'Damesvoetbal U18', 15, 17, 'Vrouw'),
(11, 'Damesvoetbal', 18, 35, 'Vrouw'),
(12, 'Herenvoetbal U21', 18, 20, 'Man'),
(13, 'Herenvoetbal', 18, 40, 'Man'),
(14, 'Minibasketbal U8', 6, 7, 'Gemengd'),
(15, 'Minibasketbal U10', 8, 9, 'Gemengd'),
(16, 'Minibasketbal U12', 10, 11, 'Gemengd'),
(17, 'Jeugdbasketbal U14', 12, 13, 'Gemengd'),
(18, 'Jeugdbasketbal U16', 14, 15, 'Gemengd'),
(19, 'Jeugdbasketbal U18', 16, 17, 'Gemengd'),
(20, 'Volwassenenbasketbal', 18, 40, 'Gemengd'),
(21, 'Jeugdtennis U8', 6, 7, 'Gemengd'),
(22, 'Jeugdtennis U10', 8, 9, 'Gemengd'),
(23, 'Jeugdtennis U12', 10, 11, 'Gemengd'),
(24, 'Jeugdtennis U14', 12, 13, 'Gemengd'),
(25, 'Jeugdtennis U16', 14, 15, 'Gemengd'),
(26, 'Jeugdtennis U18', 16, 17, 'Gemengd'),
(27, 'Jeugdtennis U21', 18, 20, 'Gemengd'),
(28, 'Damestennis U16', 14, 15, 'Vrouw'),
(29, 'Damestennis U18', 16, 17, 'Vrouw'),
(30, 'Damestennis', 18, 35, 'Vrouw'),
(31, 'Herentennis U21', 18, 20, 'Man'),
(32, 'Herentennis', 18, 40, 'Man'),
(33, 'Jeugdhockey U8', 6, 7, 'Gemengd'),
(34, 'Jeugdhockey U10', 8, 9, 'Gemengd'),
(35, 'Jeugdhockey U12', 10, 11, 'Gemengd'),
(36, 'Jeugdhockey U14', 12, 13, 'Gemengd'),
(37, 'Jeugdhockey U16', 14, 15, 'Gemengd'),
(38, 'Jeugdhockey U18', 16, 17, 'Gemengd'),
(39, 'Dameshockey U16', 14, 15, 'Vrouw'),
(40, 'Dameshockey U18', 16, 17, 'Vrouw'),
(41, 'Dameshockey', 18, 35, 'Vrouw'),
(42, 'Herenhockey U21', 18, 20, 'Man'),
(43, 'Herenhockey', 18, 40, 'Man'),
(44, 'Jeugdvolleybal U12', 10, 11, 'Gemengd'),
(45, 'Jeugdvolleybal U14', 12, 13, 'Gemengd'),
(46, 'Jeugdvolleybal U16', 14, 15, 'Gemengd'),
(47, 'Jeugdvolleybal U18', 16, 17, 'Gemengd'),
(48, 'Damesvolleybal U18', 16, 17, 'Vrouw'),
(49, 'Damesvolleybal', 18, 35, 'Vrouw'),
(50, 'Herenvolleybal U21', 18, 20, 'Man'),
(51, 'Herenvolleybal', 18, 40, 'Man');


SET IDENTITY_INSERT Categorie OFF
GO

create table Ploeg (
	id INT IDENTITY(1,1) PRIMARY KEY,
	naam VARCHAR(50),
	categorieid INT,
	clubid INT,
	sportid INT,
	CONSTRAINT FK_PloegCategorie FOREIGN KEY (categorieid) REFERENCES Categorie(id),
	CONSTRAINT FK_PloegClub FOREIGN KEY (clubid) REFERENCES Club(id),
	CONSTRAINT FK_PloegSport FOREIGN KEY (sportid) REFERENCES Sport(id)
);

SET IDENTITY_INSERT Ploeg ON;
GO

insert into Ploeg (id, naam, categorieid, clubid, sportid) values
(1, 'Club Brugge U16 A', 6, 1, 1),
(2, 'Club Brugge U16 B', 6, 1, 1),
(3, 'RSC Anderlecht U16 A', 6, 2, 1),
(4, 'RSC Anderlecht U16 B', 6, 2, 1),
(5, 'Standard Luik U16 A', 6, 3, 1),
(6, 'Standard Luik U16 B', 6, 3, 1),
(7, 'KRC Genk U16 A', 6, 4, 1),
(8, 'KRC Genk U16 B', 6, 4, 1),
(9, 'Antwerp FC U8 A', 2, 5, 1),
(10, 'Antwerp FC U8 B', 2, 5, 1),
(11, 'Royal Antwerp FC U18 A', 7, 6, 1),
(12, 'Royal Antwerp FC U18 B', 7, 6, 1),
(13, 'Brussels Kangaroos U14 A', 5, 7, 28),
(14, 'Royal Racing Club de Bruxelles U16 A', 6, 8, 28),
(15, 'Royal Leopold Club U12 A', 4, 9, 26),
(16, 'Royal Léopold Uccle FC U10 A', 3, 10, 1),
(17, 'KAA Gent U12 A', 4, 11, 1),
(18, 'KAA Gent U12 B', 4, 11, 1),
(19, 'Royal Excel Mouscron U14 A', 5, 12, 1),
(20, 'Royal Excel Mouscron U14 B', 5, 12, 1),
(21, 'KV Oostende U16 A', 6, 13, 1),
(22, 'KV Oostende U16 B', 6, 13, 1),
(23, 'KV Mechelen U8 A', 2, 14, 1),
(24, 'KV Mechelen U8 B', 2, 14, 1),
(25, 'Cercle Brugge KSV U18 A', 7, 15, 1),
(26, 'Cercle Brugge KSV U18 B', 7, 15, 1),
(27, 'Sporting Charleroi U14 A', 5, 16, 1),
(28, 'Sporting Charleroi U14 B', 5, 16, 1),
(29, 'KV Kortrijk U16 A', 6, 17, 1),
(30, 'KV Kortrijk U16 B', 6, 17, 1),
(31, 'Waasland-Beveren U10 A', 3, 18, 1),
(32, 'Waasland-Beveren U10 B', 3, 18, 1),
(33, 'Union Saint-Gilloise U12 A', 4, 19, 1),
(34, 'Union Saint-Gilloise U12 B', 4, 19, 1),
(35, 'KVC Westerlo U14 A', 5, 20, 1),
(36, 'KVC Westerlo U14 B', 5, 20, 1),
(37, 'KFCO Beerschot Wilrijk U16 A', 6, 21, 1),
(38, 'KFCO Beerschot Wilrijk U16 B', 6, 21, 1),
(39, 'KSV Roeselare U8 A', 2, 22, 1),
(40, 'KSV Roeselare U8 B', 2, 22, 1),
(41, 'RFC Seraing U18 A', 7, 23, 1),
(42, 'RFC Seraing U18 B', 7, 23, 1),
(43, 'OH Leuven U12 A', 4, 24, 1),
(44, 'OH Leuven U12 B', 4, 24, 1),
(45, 'Lommel SK U10 A', 3, 25, 1),
(46, 'Lommel SK U10 B', 3, 25, 1),
(47, 'KSK Beveren U14 A', 5, 26, 1),
(48, 'KSK Beveren U14 B', 5, 26, 1),
(49, 'KVRS Waasland - SK Beveren U16 A', 6, 27, 1),
(50, 'KVRS Waasland - SK Beveren U16 B', 6, 27, 1);

SET IDENTITY_INSERT Ploeg OFF;
GO

create table SpelerPloeg (
	id INT IDENTITY(1,1) PRIMARY KEY,
	spelerid INT,
	ploegid INT,
	CONSTRAINT FK_SpelerPloegPloeg FOREIGN KEY (ploegid) REFERENCES Ploeg(id),
	CONSTRAINT FK_SpelerPloegSpeler FOREIGN KEY (spelerid) REFERENCES Speler(id)
);

SET IDENTITY_INSERT SpelerPloeg ON;
GO

insert into SpelerPloeg (id, spelerid, ploegid) values
(1,115,1),
(2,116,1),
(3,117,1),
(4,118,1),
(5,131,1),
(6,132,1),
(7,133,1),
(8,134,1),
(9,135,1),
(10,136,1),
(11,137,1),
(12,138,2),
(13,139,2),
(14,140,2),
(15,141,2),
(16,142,2),
(17,143,2),
(18,144,2),
(19,145,2),
(20,146,2),
(21,147,2),
(22,148,2),
(23,149,3),
(24,150,3),
(25,151,3),
(26,152,3),
(27,153,3),
(28,154,3),
(29,155,3),
(30,156,3),
(31,157,3),
(32,158,3),
(33,159,3),
(34,160,4),
(35,161,4),
(36,162,4),
(37,163,4),
(38,164,4),
(39,165,4),
(40,166,4),
(41,167,4),
(42,168,4),
(43,169,4),
(44,170,4),
(45,171,5),
(46,179,5),
(47,180,5),
(48,181,5),
(49,182,5);

SET IDENTITY_INSERT SpelerPloeg OFF;
GO

create table Wedstrijd (
	id INT IDENTITY(1,1) PRIMARY KEY,
	datum DATE,
	ploeg1id INT,
	ploeg2id INT,
	uitslagploeg1 INT,
	uitslagploeg2 INT
	CONSTRAINT FK_WedstrijdPloeg1 FOREIGN KEY (ploeg1id) REFERENCES Ploeg(id),
	CONSTRAINT FK_WedstrijdPloeg2 FOREIGN KEY (ploeg2id) REFERENCES Ploeg(id)
);

SET IDENTITY_INSERT Wedstrijd ON;
GO

insert into Wedstrijd (id, datum, ploeg1id, ploeg2id, uitslagploeg1, uitslagploeg2) values
(1,'2024-01-10',1,3,0,2),
(2,'2024-01-10',2,4,1,2),
(3,'2024-01-17',1,4,2,2),
(4,'2024-01-17',2,3,4,2),
(5,'2023-01-09',1,3,0,2),
(6,'2023-01-09',2,4,1,2),
(7,'2023-01-16',1,4,2,2),
(8,'2023-01-16',2,3,4,2)

SET IDENTITY_INSERT Wedstrijd OFF;
GO

create table Trainer (
                         id INT IDENTITY(1,1) PRIMARY KEY,
                         voornaam VARCHAR(50),
                         naam VARCHAR(50),
                         straat VARCHAR(50),
                         huisnummer VARCHAR(50),
                         gemeente VARCHAR(50),
                         postcode VARCHAR(50),
                         land VARCHAR(50),
                         geboortedatum DATE,
                         geslacht VARCHAR(50)

)

-- INSERTS voor Trainer (Chat gpt inserts...)
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Megan', 'Chang', 'Billysingel', '6', 'Lacuisine', '9593', 'België', '1968-10-27', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Juan', 'Campos', 'Vanessasingel', '924', 'Champlon', '2578', 'België', '1983-06-03', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Ryan', 'Carr', 'Tammyring', '8', 'Houthalen', '7801', 'België', '1959-06-04', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Cheryl', 'Clayton', 'Johnlei', '139', 'Han-sur-Lesse', '2287', 'België', '1964-10-26', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Victoria', 'Golden', 'Danielsingel', '185', 'Sirault', '5989', 'België', '1989-08-17', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Christopher', 'Yates', 'Barbaralaan', '32', 'Balâtre', '3711', 'België', '1969-07-10', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Sandra', 'Kirby', 'Marysingel', '833', 'Velroux', '8947', 'België', '1983-08-31', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Christopher', 'Salazar', 'Brendalei', '30', 'Izegem', '6352', 'België', '1988-05-05', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Lisa', 'Garcia', 'Melissahof', '9', 'Welkenraedt', '2013', 'België', '1985-12-19', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Christopher', 'Bass', 'Benjaminbaan', '21', 'Remicourt', '7008', 'België', '1966-04-02', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Mary', 'Jones', 'Deborahlei', '2', 'Bioul', '7091', 'België', '1972-11-29', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Jorge', 'Strong', 'Marysteeg', '30', 'Everberg', '2584', 'België', '1999-12-16', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Sandra', 'Wade', 'Thomaspad', '84', 'Woesten', '9642', 'België', '1960-03-11', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Stephen', 'Miller', 'Amydreef', '75', 'Volkegem', '3599', 'België', '1980-06-17', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Paul', 'Perry', 'Aaronhof', '523', 'Hanret', '1696', 'België', '1986-09-20', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Monica', 'Bradley', 'Gabrielboulevard', '278', 'Rocourt', '5075', 'België', '1991-02-12', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Brendan', 'Carson', 'Jacobstraat', '2', 'Anvaing', '4650', 'België', '1960-04-26', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Jennifer', 'Smith', 'Jamessteeg', '344', 'Ganshoren', '1761', 'België', '1978-01-15', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Robin', 'Marsh', 'Michelledreef', '851', 'Essene', '4000', 'België', '1977-01-06', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Angela', 'Potts', 'Meghanweg', '77', 'Wezemaal', '4582', 'België', '1984-11-26', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Brenda', 'Smith', 'Josephlei', '159', 'Bassenge', '5422', 'België', '1983-11-27', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Ralph', 'Kelley', 'Dannyweg', '04', 'Froidfontaine', '5465', 'België', '1987-07-26', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Daniel', 'Hoffman', 'Thomaslei', '7', 'Cul-des-Sarts', '6604', 'België', '1969-12-09', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Samantha', 'Sims', 'Lindastraat', '1', 'Brakel', '1306', 'België', '1966-01-07', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Phillip', 'Stone', 'Samanthasteeg', '361', 'Mellier', '7492', 'België', '1972-05-28', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Michael', 'Brown', 'Rebeccaring', '317', 'Munte', '3303', 'België', '1966-06-19', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('James', 'Gray', 'Danielsteeg', '2', 'Tervuren', '6687', 'België', '1993-04-06', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Whitney', 'Reid', 'Amyhof', '5', 'Lennik', '5082', 'België', '1969-12-15', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Megan', 'Aguilar', 'Carlboulevard', '01', 'Haren-Borgloon', '8040', 'België', '1981-11-03', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Michelle', 'Owen', 'Tanyasingel', '8', 'Saint-Ghislain', '2918', 'België', '1988-05-11', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Rebecca', 'Harris', 'Margaretring', '9', 'Vaux-et-Borset', '5002', 'België', '1993-11-02', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Ashley', 'Cook', 'Michellelaan', '6', 'Momalle', '5223', 'België', '1982-01-28', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Brian', 'Johnson', 'Donaldsteeg', '125', 'Niel-bij-Sint-Truiden', '8976', 'België', '1962-07-19', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Craig', 'Osborne', 'Antoniosteeg', '51', 'Spa', '2367', 'België', '1963-06-10', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Chelsea', 'Mcdonald', 'Debrastraat', '942', 'Mont-sur-Marchienne', '1183', 'België', '1986-01-08', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Sean', 'Sherman', 'Michaelstraat', '0', 'Beauraing', '4408', 'België', '1974-12-22', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Clayton', 'Weiss', 'Williamboulevard', '69', 'Oekene', '2161', 'België', '1987-08-06', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Kim', 'Navarro', 'Laceypad', '607', 'Liberchies', '2151', 'België', '1983-10-17', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Heather', 'Reed', 'Alejandrohof', '192', 'Groot-Bijgaarden', '5310', 'België', '1984-06-18', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Hannah', 'Cantu', 'Micheledreef', '1', 'Rebecq-Rognon', '4420', 'België', '1983-12-30', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Matthew', 'Woodward', 'Sharonsingel', '529', 'Bouvignes-sur-Meuse', '3894', 'België', '1984-12-21', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Rachael', 'Bautista', 'Lesliehof', '24', 'Merksem', '1029', 'België', '1986-02-21', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Christian', 'Jones', 'Kevinpad', '296', 'Krombeke', '6137', 'België', '1995-05-11', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Brian', 'Ortiz', 'Suzannelei', '3', 'Merelbeke', '2712', 'België', '1978-03-12', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Daniel', 'Jacobs', 'Lauraring', '2', 'Oedelem', '6237', 'België', '1994-12-16', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Douglas', 'Ford', 'Timothyhof', '079', 'Pollare', '5341', 'België', '1996-06-12', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Chelsea', 'Coleman', 'Christopherring', '86', 'Kachtem', '1140', 'België', '1976-10-21', 'Man');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Raymond', 'Zamora', 'Seanweg', '543', 'Vieux-Genappe', '5014', 'België', '1995-08-29', 'Andere');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Matthew', 'Moreno', 'Pameladreef', '6', 'Kleine-Spouwen', '9829', 'België', '1973-08-27', 'Vrouw');
INSERT INTO Trainer (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
VALUES ('Amanda', 'Jenkins', 'Judithlaan', '759', 'Waterland-Oudeman', '7211', 'België', '1986-08-25', 'Andere');

create table TrainerPloeg (
                              trainerId INT,
                              ploegId INT,
                              CONSTRAINT FK_TrainerPloeg_Trainer FOREIGN KEY (trainerId) REFERENCES Trainer(id),
                              CONSTRAINT FK_TrainerPloeg_Ploeg FOREIGN KEY (ploegId) REFERENCES Ploeg(id)
)

-- Koppelingen van trainers aan ploegen
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (1, 1);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (1, 2);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (2, 3);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (2, 4);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (3, 5);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (3, 6);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (4, 7);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (4, 8);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (5, 9);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (5, 10);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (6, 11);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (6, 12);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (7, 13);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (7, 14);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (8, 15);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (8, 16);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (9, 17);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (9, 18);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (10, 19);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (10, 20);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (11, 21);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (11, 22);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (12, 23);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (12, 24);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (13, 25);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (13, 26);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (14, 27);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (14, 28);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (15, 29);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (15, 30);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (16, 31);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (16, 32);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (17, 33);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (17, 34);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (18, 35);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (18, 36);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (19, 37);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (19, 38);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (20, 39);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (20, 40);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (21, 1);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (21, 2);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (22, 3);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (22, 4);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (23, 5);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (23, 6);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (24, 7);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (24, 8);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (25, 9);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (25, 10);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (26, 11);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (26, 12);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (27, 13);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (27, 14);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (28, 15);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (28, 16);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (29, 17);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (29, 18);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (30, 19);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (30, 20);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (31, 21);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (31, 22);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (32, 23);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (32, 24);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (33, 25);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (33, 26);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (34, 27);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (34, 28);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (35, 29);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (35, 30);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (36, 31);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (36, 32);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (37, 33);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (37, 34);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (38, 35);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (38, 36);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (39, 37);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (39, 38);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (40, 39);
INSERT INTO TrainerPloeg (ploegid, trainerid) VALUES (40, 40);
