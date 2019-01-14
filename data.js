/* ********************************************************************
* Solar system data file for PlanetWerks
*
* *********************************************************************
* Adding your own objects
*
* PlanetWerks can help you plot orbits for small solar system bodies
* other than those included in the default widget.  Just add objects
* to the pWerks.bodies array containing all the necessary orbit
* information.  For most well-studied objects, you can find this
* information on Wikipedia, but you may have to dig into the pages at
* NASA for more obscure objects.
*
* Each object requires the following data:
*  - Name    ~ The name displayed in the titlebar of fact boxes
*  - ID      ~ A unique name which is also a valid HTML id
*  - Type    ~ What type of object this is
*  - Primary ~ The ID of the object which this object orbits
*  - Size    ~ Object size in Earth diameters
*  - SMA     ~ The semi-major-axis of the orbit
*  - Period  ~ Sidereal orbital period in Earth years
*  - Incline ~ Incline relative to the primary's axial tilt value
*  - Tilt    ~ The object's axial tilt value (see note)
*  - Eccen.  ~ Orbit eccentricity
*  - AoP     ~ Argument of periapsis
*  - LoAN    ~ Longitude of the ascending node
*  - Fudge   ~ The percentage of the object's image width which is
*              actually object.
*
* Once you have added this data, you need to add the object's image to
* the /object directory, and then a 40x48 image to the /symbol
* directory.  Both images will have the same filename as the object's
* ID + .png.  You can make copies of an existing set to make things
* simple.  These images should have 8-bit transparency.
*
* You should also add an extra set of facts for the added object. Note
* that due to positioning order, primaries should always come first
* within the array of objects, followed by their satellites, if any.
*
* *********************************************************************
* A note on the axial tilt values
*
*   Specifying an axial tilt value is usually only important for gas
* giants which have a significant affect on the orbit planes of their
* satellites.  Use a tilt value if the incline values of the object's
* satellites are specified relative to the equatorial or local Laplace
* plane.
*
* For smaller primaries, such as Earth in the Earth-Luna system, the
* orbit inclinations of their satellites are usually given relative to
* the ecliptic plane.  In this case, Luna has been given the incline
* value relative to the ecliptic, and Earth's axial tilt value has been
* set to 0.0
*
* The axial tilt value does not rotate the images of primaries as
* visible in PlanetWerks
*
******************************************************************** */
window.addEventListener("load", function(ev) {
  var pWerks = planetWerks = new SolarSystem(800, 600);

  // ***** Star
  pWerks.bodies = [
    // Object data:  name,        id,          type,     primary,   size,      SMA,     period, incline,   tilt, eccen.,       AoP,      LoAN, fudge
    new SolarObject("Sol",       "sol",       "star",   "none",  109.245,   0.0000,     0.0000,   0.000,  0.000, 0.0000,   0.00000,   0.00000, 0.746),
  ];

  // ***** Primaries
  pWerks.bodies = pWerks.bodies.concat([
    // Object data:  name,        id,          type,     primary,   size,      SMA,     period, incline,   tilt, eccen.,       AoP,      LoAN, fudge
    new SolarObject("Mercury",   "mercury",   "planet", "sol",     0.383,   0.3871,     0.2408,   7.005,  0.000, 0.2056,  29.12428,  48.33054, 0.971),
    new SolarObject("Venus",     "venus",     "planet", "sol",     0.950,   0.7233,     0.6152,   3.395,  0.000, 0.0068,  54.85229,  76.67069, 0.971),
    new SolarObject("Earth",     "earth",     "planet", "sol",     1.000,   1.0000,     1.0000,   0.000,  0.000, 0.0167, 114.20783, 348.73936, 0.971),
    new SolarObject("Mars",      "mars",      "planet", "sol",     0.532,   1.5237,     1.8808,   1.850,  0.000, 0.0934, 286.46230,  49.57854, 0.980),
    new SolarObject("Ceres",     "ceres",     "dwarf",  "sol",     0.074,   2.7660,     4.5990,  10.587,  0.000, 0.0800,  73.15073,  80.40696, 0.914),
    new SolarObject("Jupiter",   "jupiter",   "planet", "sol",    10.863,   5.2043,    11.8626,   1.305,  3.130, 0.0483, 275.06605, 100.49158, 0.962),
    new SolarObject("Saturn",    "saturn",    "planet", "sol",     9.001,   9.5820,    29.6573,   2.485, 26.730, 0.0560, 336.01386, 113.64281, 0.450),
    new SolarObject("Uranus",    "uranus",    "planet", "sol",     3.968,  19.2294,    84.3233,   0.773, 97.770, 0.0461,  96.54132,  73.98982, 0.980),
    new SolarObject("Neptune",   "neptune",   "planet", "sol",     3.856,  30.1037,   165.1680,   1.768, 28.320, 0.0097, 265.64685, 131.79431, 0.962),
    new SolarObject("Orcus",     "orcus",     "tno",    "sol",     0.074,  39.4190,   247.4920,  20.552,  0.000, 0.2255,  73.83250, 268.58600, 0.960), // Artist's impression
    new SolarObject("Pluto",     "pluto",     "dwarf",  "sol",     0.188,  39.4817,   248.0900,  17.142,  0.000, 0.2488, 113.76329, 110.30347, 0.980), // Artist's impression
    new SolarObject("Ixion",     "ixion",     "tno",    "sol",     0.065,  39.6800,   249.9500,  19.584,  0.000, 0.2420, 298.77900,  71.02800, 0.975), // Artist's impression
    new SolarObject("Varuna",    "varuna",    "tno",    "sol",     0.069,  43.1290,   283.2000,  17.200,  0.000, 0.0510, 271.63100,  97.29600, 0.940), // Artist's impression
    new SolarObject("Haumea",    "haumea",    "dwarf",  "sol",     0.181,  43.3350,   285.4000,  28.190,  0.000, 0.1887, 239.51000, 121.90000, 0.747), // Artist's impression
    new SolarObject("Quaoar",    "quaoar",    "tno",    "sol",     0.099,  43.4050,   285.9700,   7.983,  0.000, 0.0340, 154.85000, 188.79100, 0.960), // Artist's impression
    new SolarObject("Makemake",  "makemake",  "dwarf",  "sol",     0.118,  45.7910,   309.8800,  28.960,  0.000, 0.1590, 298.41000,  79.38200, 0.980), // Artist's impression
    new SolarObject("Eris",      "eris",      "dwarf",  "sol",     0.204,  67.6681,   557.0000,  44.187,  0.000, 0.4418, 151.43050,  35.86960, 0.980), // Artist's impression
    new SolarObject("Sedna",     "sedna",     "tno",    "sol",     0.117, 525.8600, 12059.0600,  11.934,  0.000, 0.8550, 311.12300, 144.51400, 0.949), // Artist's impression

    new SolarObject("Reptilon",  "reptilon",  "egg",    "sol",     1.000,   1.0000,     1.0000,   0.000,  0.000, 0.0167, 114.20783, 348.73936, 0.960),
    new SolarObject("Opera",     "opera",     "egg",    "sol",    35.340,  13.7600,     0.8000,  68.770,  0.000, 0.0000,   9.50000, 180.00000, 0.976),
    new SolarObject("Astronaut", "astronaut", "egg",    "sol",     0.750,   1.4000,     1.8800,   1.850,  0.000, 0.0934, 275.00000,  50.00000, 0.976),
  ]);

  // ***** Satellites
  pWerks.bodies = pWerks.bodies.concat([
    // Object data:  name,        id,          type,     primary,   size,      SMA,     period, incline,   tilt, eccen.,       AoP,      LoAN, fudge
    new SolarObject("Luna",      "luna",      "moon",   "earth",   0.273,   0.0024,     0.0748,   5.145,  0.000, 0.0549, 318.15000, 125.08000, 0.960),
    new SolarObject("Ganymede",  "ganymede",  "moon",   "jupiter", 0.413,   0.0072,     0.0196,   0.177,  0.000, 0.0011, 192.41700,  63.55200, 0.975),
    new SolarObject("Callisto",  "callisto",  "moon",   "jupiter", 0.378,   0.0126,     0.0457,   0.192,  0.000, 0.0074,  52.64300, 298.84800, 0.975),
    new SolarObject("Io",        "io",        "moon",   "jupiter", 0.286,   0.0028,     0.0048,   0.036,  0.000, 0.0041,  84.12900,  43.97700, 0.975),
    new SolarObject("Europa",    "europa",    "moon",   "jupiter", 0.245,   0.0045,     0.0097,   0.466,  0.000, 0.0101,  88.97000, 219.10600, 0.975),
    new SolarObject("Titan",     "titan",     "moon",   "saturn",  0.404,   0.0082,     0.0437,   0.280,  0.000, 0.0288, 185.67100,  24.50200, 0.820),
    new SolarObject("Rhea",      "rhea",      "moon",   "saturn",  0.120,   0.0035,     0.0124,   0.331,  0.000, 0.0013, 256.60900, 311.53100, 0.975),
    new SolarObject("Iapetus",   "iapetus",   "moon",   "saturn",  0.115,   0.0238,     0.2172,   7.489,  0.000, 0.0286, 275.92100,  75.83100, 0.975),
    new SolarObject("Dione",     "dione",     "moon",   "saturn",  0.088,   0.0025,     0.0075,   0.028,  0.000, 0.0022, 168.82000, 168.90900, 0.975),
    new SolarObject("Tethys",    "tethys",    "moon",   "saturn",  0.084,   0.0020,     0.0052,   1.091,  0.000, 0.0000, 262.84500, 330.88200, 0.975),
    new SolarObject("Titania",   "titania",   "moon",   "uranus",  0.124,   0.0029,     0.0238,   0.079,  0.000, 0.0011, 284.40000,  99.77100, 0.975),
    new SolarObject("Oberon",    "oberon",    "moon",   "uranus",  0.120,   0.0039,     0.0369,   0.068,  0.000, 0.0014, 104.40000, 279.77100, 0.975),
    new SolarObject("Umbriel",   "umbriel",   "moon",   "uranus",  0.092,   0.0018,     0.0113,   0.128,  0.000, 0.0039,  84.70900,  33.48500, 0.975),
    new SolarObject("Ariel",     "ariel",     "moon",   "uranus",  0.091,   0.0013,     0.0069,   0.041,  0.000, 0.0012, 115.34900,  22.39400, 0.975),
    new SolarObject("Triton",    "triton",    "moon",   "neptune", 0.212,   0.0024,    -0.0161, 156.834,  0.000, 0.0000, 344.04600, 172.43100, 0.975),
    new SolarObject("Charon",    "charon",    "moon",   "pluto",   0.095,   0.0001,     0.0175, 112.783,  0.000, 0.0000,  71.25500,  85.18700, 0.975), // Artist's impression

    new SolarObject("ISS",       "iss",       "egg",    "earth",   0.001,   0.0001,     0.0002,  51.630,  0.000, 0.0100,   0.00000,   0.00000, 0.960)
  ]);
  pWerks.setAllowed();
  pWerks.move();

  // ***** Factbox text strings
  pWerks.bodies[pWerks.bodID.sol].fact = [
    "Earth Diameters: <strong>109.25</strong><br>Surface Temp: <strong>5,778K</strong><br>Earth Masses: <strong>332,946</strong><br>Rotation Period: <strong>25.38d</strong>",
    "A big ball of burning gas?  No way.  Sol does not &quot;burn&quot; in an Earthly sense, since it contains less than 1% oxygen by mass.",
    "At its zenith, Sol pounds the surface of Earth with 1,000 Watts of energy per m<sup>2</sup>; that's a lot of power!",
    "Sol is almost a perfect sphere, so despite being 109 Earth diameters across, its pole-to-pole and equatorial diameters differ by only 10km!",
    "Heat is produced within Sol via fusion only in the deepest 20% of its radius; the remaining 80% is just along for the ride.",
    "Sunscreen anyone?  As Sol converts more hydrogen to helium by nuclear fusion, it will slowly get brighter and brighter; 40% brighter in 3.5 billion years.",
    "Sol is not ordinary!  The vast majority of stars in the <a href='http://en.wikipedia.org/wiki/Milky_Way'>Milky Way galaxy</a> are red dwarfs, but you won't see them with the naked eye at night.",
    "Helium was discovered on Sol (via spectral analysis) 25 years before being isolated on Earth in 1893!",
    "The diameter of Earth's moon is 400 times smaller than Sol, but it is also 400 times closer; making total solar eclipses possible.",
    "Hurry!  We only have 5 billion years left before Sol expands into a massive <a href='http://en.wikipedia.org/wiki/Red_Giant'>Red <strong>G</strong>iant</a>, vapourizing the surface of Earth!",
    "Sol's <a href='http://en.wikipedia.org/wiki/Stellar_classification'>stellar classification</a> is G2V.  G2 means it is hot enough to emit a yellow light, and the V means it is currently calm and stable.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Sun'>Sol</a> at Wikipedia.org."
  ];

  pWerks.bodies[pWerks.bodID.mercury].fact = [
    "Earth Diameters: <strong>0.3825</strong><br>Semi-major Axis: <strong>0.39AU</strong><br>Earth Masses: <strong>0.055</strong><br>Rotation Period: <strong>58.646d</strong><br>Orbital Period: <strong>87.969098d</strong>",
    "The <a href='http://en.wikipedia.org/wiki/Caloris_Basin'>Caloris Basin</a> on Mercury is the result of an impact so powerful the crater's walls are 2km high!",
    "Mercury's axial tilt is the smallest in the solar system at 0.01&deg;.  There are no seasons here!",
    "Temperatures on Mercury range from 80K to 700K!  Temperatures on Earth only range about 150K.",
    "Really?  Oriental cultures refer to Mercury as the <em>Water Star</em>.",
    "Because of Mercury's 7&deg; incline relative to Earth's orbit, it passes between Sol and Earth only once every seven years on average.",
    "Not much is known about Mercury's surface relative to other planets because only one spacecraft has ever visited it: <a href='http://en.wikipedia.org/wiki/Mariner_10'>Mariner 10</a>.",
    "I hope they remembered to pack film!  <a href='http://en.wikipedia.org/wiki/NASA'>NASA</a>'s <a href='http://en.wikipedia.org/wiki/MESSENGER'>MESSENGER</a> mission, launched in 2004, will arrive in stable orbit around Mercury in 2011.",
    "Mercury's rocky mantle is so thin, astronomers theorize that the planet was originally much larger, and experienced some great catastophe.",
    "Because travelling to Mercury means travelling down into Sol's immense gravity well, spacecraft require propulsive energy to <em>slow down</em> rather than speed up!",
    "Mercury's modest magnetic field allows it to retain a trace atmosphere, despite the bombardment of solar wind.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Mercury'>Mercury</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.venus].fact = [
    "Earth Diameters: <strong>0.95</strong><br>Semi-major Axis: <strong>0.72AU</strong><br>Earth Masses: <strong>0.815</strong><br>Rotation Period: <strong>243.0185d</strong><br>Orbital Period: <strong>224.70069d</strong>",
    "Venus' orbit is the closest to circular out of all the planets, with an eccentricity of less than 1%.",
    "Venus has a retrograde rotation, meaning it rotates in the opposite direction as most of the other planets do.",
    "Before <a href='http://en.wikipedia.org/wiki/Pythagoras'>Pythagoras</a>, the ancient Greeks believed the morning and evening appearances of Venus (and also Mercury) were two different objects!",
    "Venus passes closer to the Earth than any other planet, closing to just over 100 times the distance to the moon.",
    "Venus rotates very slowly, once every 116.75 Earth days; there are only 1.92 &quot;Venusian&quot; days in its year!",
    "<a href='http://en.wikipedia.org/wiki/Image:Venus_globe.jpg'><img src='ui/fact.venus.01.png' alt='Naked Venus'></a>Despite its thick clouds, we now have detailed maps of the surface of Venus via the use of radar imaging.",
    "Coincedence?  Venus rotates almost exactly five times (5.001) between each closest approach to Earth.",
    "Venus is consumed in an immense greenhouse effect; most of its atmosphere is dense carbon dioxide (CO<sub>2</sub>) and its surface is hotter than Mercury!",
    "The atmospheric pressure at the surface of Venus is equivalent to being 1km under the oceans of Earth!",
    "When visible, Venus is the third brightest object in the sky after Sol and Earth's moon.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Venus'>Venus</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.earth].fact = [
    "Diameter: <strong>12,756.274km</strong><br>Semi-major Axis: <strong>1.496x10<sup>8</sup>km</strong><br>Mass: <strong>5.9736x10<sup>24</sup>kg</strong><br>Rotation Period: <strong>23h 56m 04s</strong><br>Orbital Period: <strong>365.256366d</strong>",
    "Earth is the densest planet in the solar system; and before you ask, that's density of <strong>matter</strong>!",
    "Feeling crowded?  Don't worry, Earth is the largest of all the terrestrial planets.",
    "With the exception of Pluto's moon, <a href='http://en.wikipedia.org/wiki/Charon_(moon)'>Charon</a>, Earth's moon is the largest in the solar system relative to its planet.",
    "Earth is the only planet in the solar system where water is known to exist simultaneously in all three states.",
    "Earth shares its orbit with a small asteroid named <a href='http://en.wikipedia.org/wiki/3753_Cruithne'>Cruithne</a> (crew-EEN-ya), which has erroniously been referred to as its &quot;second moon&quot;.",
    "The <a href='http://en.wikipedia.org/wiki/Bonneville_Salt_Flats'>Bonneville Salt Flats</a> in the USA is so large and flat, it enables you to <em>see</em> the curvature of Earth!",
    "The difference between Earth's highest point and deepest trench is 19.77km; humans only live within about 5km of that range.",
    "Since Earth is not a sphere, the farthest you can get from the centre of the planet is actually a mountain in South America called <a href='http://en.wikipedia.org/wiki/Mount_Chimborazo'>Chimborazo</a>.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Earth'>Earth</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.mars].fact = [
    "Earth Diameters: <strong>0.533</strong><br>Semi-major Axis: <strong>1.52AU</strong><br>Earth Masses: <strong>0.107</strong><br>Rotation Period: <strong>24.622962h</strong><br>Orbital Period: <strong>686.9600d</strong>",
    "Mars' total surface area is only slightly less than the total land area of Earth's continents.",
    "In the winter months at Mars' poles, as much as 25% of the atmosphere freezes into solid dry ice (CO<sub>2</sub>).",
    "Vacation spot?  Temperatures on Mars can reach a balmy maximum of 20&deg;C.",
    "Mars is the location of both the solar system's highest mountain (<a href='http://en.wikipedia.org/wiki/Olympus_Mons'>Olympus Mons</a> at 26km high) and largest canyon (<a href='http://en.wikipedia.org/wiki/Valles_Marineris'>Valles Marineris</a> at 7km deep).",
    "Even though both of Mars' moons orbit in the same direction, they rise and set from opposite horizons because they orbit at different speeds!",
    "Mars is the solar system's most explored extra-terrestrial planet, playing host to dozens of exploratory missions from many different countries.",
    "A day on Mars is very close in length to a day on Earth, at just over 24h 39m.",
    "Although liquid water once existed there, there is still no conclusive evidence that life ever existed on Mars.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Mars'>Mars</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.ceres].fact = [
    "Earth Diameters: <strong>0.074</strong><br>Semi-major Axis: <strong>2.76AU</strong><br>Earth Masses: <strong>0.000158</strong><br>Rotation Period: <strong>0.3781d</strong><br>Orbital Period: <strong>4.602y</strong>",
    "Ceres is by far the largest object in the <a href='http://en.wikipedia.org/wiki/Asteroid_belt'>asteroid belt</a>, making up about a third of the belt's total mass.",
    "Ceres, at 950km wide, is just barely massive enough to have assumed a spherical shape; a phenomenon known as <a href='http://en.wikipedia.org/wiki/Hydrostatic_equilibrium'>hydrostatic equilibrium</a>.",
    "Ceres was actually a &quot;planet&quot; from 1801 until 1852 when it became a planet/asteroid.  12 years later, it was offically demoted to a mere asteroid.",
    "On August 24, 2006, due to the same vote which saw Pluto stripped of planet status, Ceres was officially <em>promoted</em> to the status of <a href='http://en.wikipedia.org/wiki/Dwarf_planet'>dwarf planet</a>.",
    "Ceres was once thought to be the remains of a planet which &quot;broke apart&quot; to form the asteroid belt; it's now known to be physically unrelated.",
    "<a href='http://en.wikipedia.org/wiki/NASA'>NASA</a>'s <a href='http://en.wikipedia.org/wiki/Dawn_Mission'>Dawn Mission</a>, launched September 27th, 2007, will visit Ceres for observation in 2015",
    "The entire mass of the <a href='http://en.wikipedia.org/wiki/Asteroid_belt'>asteroid belt</a>, including Ceres, is only 4% of the mass of Earth's moon!",
    "Ceres, the first resident of the asteroid belt to be found, was discovered January 1st, 1801 (01/01/01) by Italian astronomer <a href='http://en.wikipedia.org/wiki/Giuseppe_Piazzi'>Giuseppe Piazzi</a>.",
    "Even Pluto's moon, <a href='http://en.wikipedia.org/wiki/Charon_(moon)'>Charon</a>, is larger than Ceres by over 250km in diameter and has 58% more mass!",
    "Read more about <a href='http://en.wikipedia.org/wiki/Ceres_(dwarf_planet)'>Ceres</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.jupiter].fact = [
    "Earth Diameters: <strong>11.209</strong><br>Semi-major Axis: <strong>5.20AU</strong><br>Earth Masses: <strong>317.8</strong><br>Rotation Period: <strong>9.925h</strong><br>Orbital Period: <strong>11.875y</strong>",
    "Jupiter is 2.5 times more massive than all other planets in the solar system combined.",
    "Jupiter rotates on its axis once every 9h 55m, the fastest in the solar system!",
    "Jupiter's powerful magnetic field, if visible from earth, would appear 5x larger than the full moon!",
    "Astronomers have counted 63 moons orbiting Jupiter, and the number continues to rise!",
    "Jupiter's largest moon, <a href='http://en.wikipedia.org/wiki/Ganymede_(moon)'>Ganymede</a>, is also the largest satellite in the solar system, 8% larger in diameter than Mercury!",
    "Recent observations suggest the possibility that Jupiter is forming a second Great Red Spot (<a href='http://en.wikipedia.org/wiki/Oval_BA'>Oval BA</a>).",
    "Jupiter would need to be 13 times as massive in order to trigger nuclear fusion in its core, but 75 times more massive to become a star.",
    "Jupiter's gravity and outward pressure are delicately balanced; adding more mass would make the planet smaller!",
    "Many extra-solar planets found today are termed <a href='http://en.wikipedia.org/wiki/Hot_Jupiters'>Hot Jupiters</a>; these are gas giants circling stars in orbits smaller than Mercury's!",
    "Read more about <a href='http://en.wikipedia.org/wiki/Jupiter'>Jupiter</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.saturn].fact = [
    "Earth Diameters: <strong>9.4492</strong><br>Semi-major Axis: <strong>9.54AU</strong><br>Earth Masses: <strong>95.152</strong><br>Rotation Period: <strong>~10h 39m</strong><br>Orbital Period: <strong>29.677y</strong>",
    "Saturn has a mean density of 0.687 g/cm<sup>3</sup>; so low it would float on water!",
    "Saturn's rings are unstable, and will eventually be swept up.  This suggests they were formed quite recently, in astronomical terms.",
    "Saturn's largest moon, <a href='http://en.wikipedia.org/wiki/Titan_(moon)'>Titan</a>, is the only satellite in the solar system with a dense atmosphere.",
    "Because of Saturn's low density and high rate of rotation, it is 10% wider at the equator than pole-to-pole!",
    "Saturn's rings have their own sparse atmosphere of mainly oxygen, created by UV bombardment of water ice.",
    "Without a high powered telescope, <a href='http://en.wikipedia.org/wiki/Galileo'>Galileo</a> described Saturn as a planet having ears!",
    "Saturn's rings seem to vanish every 15 years as they line up &quot;edge-on&quot; with Earth.",
    "A loop around Saturn's moon <a href='http://en.wikipedia.org/wiki/Titan_(moon)'>Titan</a> caused the space probe <a href='http://en.wikipedia.org/wiki/Voyager_1'>Voyager 1</a> to leave the ecliptic plane of the solar system.",
    "Saturn has a very hot core (up to 12,000 Kelvin) and radiates more energy than it receives from Sol.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Saturn'>Saturn</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.uranus].fact = [
    "Earth Diameters: <strong>4.007</strong><br>Semi-major Axis: <strong>19.19AU</strong><br>Earth Masses: <strong>14.536</strong><br>Rotation Period: <strong>17h 14m 24s</strong><br>Orbital Period: <strong>84.323326y</strong>",
    "Uranus was the first planet to be <em>discovered</em> by modern astromers (in the 1700s), rather than documented by the ancients.",
    "Uranus has the greatest axial tilt of all the planets in the solar system (~98&deg;); at two points in its orbit its poles face Sol directly.",
    "Compared to Uranus, the &quot;inner&quot; planets are our close neighbours; it is <em>more than twice</em> the distance from Sol as Saturn.",
    "The magnetic field of Uranus is oriented almost 60&deg; away from its north-south polar axis.",
    "Uranus orbits Sol every 84 years or so; if you had been born there, you'd be celebrating your first birthday more than a decade into your retirement!",
    "Uranus' dark, thin ring system was accidentally discovered by astronomers studying the light of stars shining through its atmosphere!",
    "No buts about it, Uranus is named after the <a href='http://en.wikipedia.org/wiki/Uranus_(mythology)'>Greek god of the sky</a>.",
    "The moons of Uranus are named after characters from plays by <a href='http://en.wikipedia.org/wiki/William_Shakespeare'>William Shakespeare</a> and <a href='http://en.wikipedia.org/wiki/Alexander_Pope'>Alexander Pope</a>.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Uranus'>Uranus</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.neptune].fact = [
    "Earth Diameters: <strong>3.883</strong><br>Semi-major Axis: <strong>30.06AU</strong><br>Earth Masses: <strong>17.147</strong><br>Rotation Period: <strong>16h 6m 36s</strong><br>Orbital Period: <strong>165.168y</strong>",
    "Because of Pluto's reclassification as a &quot;<a href='http://en.wikipedia.org/wiki/Dwarf_planet'>dwarf planet</a>&quot; by the <a href='http://en.wikipedia.org/wiki/International_Astronomical_Union'>IAU</a>, Neptune is currently the furthest known planet from Sol.",
    "The outermost planet in the solar system may be termed a &quot;gas giant&quot;, but it is only 3.88 times the diameter of Earth.",
    "Think Uranus is pretty far?  The <em>entire solar system</em> from Saturn inward could fit in the space between the orbits of Saturn and Neptune!",
    "Before its discovery, Neptune was <em>calculated</em> to exist within 1&deg; of its actual position in the sky, based upon deviations in the orbit of Uranus.",
    "Next to Jupiter, Neptune has some of the solar system's most complex cloud formations, owing to its extremely high winds - up to 2000km/h!",
    "Like all the gas giants, Neptune too has rings, albeit very thin and faint.",
    "Neptune has 13 known moons, but only one - <a href='http://en.wikipedia.org/wiki/Triton_(moon)'>Triton</a> - is large enough to have compacted into a spheroid.",
    "One of Neptune's moons, <a href='http://en.wikipedia.org/wiki/Neso_(moon)'>Neso</a>, has the largest orbit of any known moon in the solar system, with a period of 25.7 years!",
    "Read more about <a href='http://en.wikipedia.org/wiki/Neptune'>Neptune</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.orcus].fact = [
    "Earth Diameters: <strong>~0.07</strong><br>Semi-major Axis: <strong>39.42AU</strong><br>Earth Masses: <strong>&lt; 0.0002</strong><br>Rotation Period: <strong>?</strong><br>Orbital Period: <strong>247.492y</strong>",
    "Both Orcus and Pluto are grouped into a category of TNOs called <a href='http://en.wikipedia.org/wiki/Plutino'>plutinos</a>; bodies which are in 2:3 <a href='http://en.wikipedia.org/wiki/Orbital_resonance'>orbital resonance</a> with Neptune.",
    "According to <a href='http://en.wikipedia.org/wiki/International_Astronomical_Union'>IAU</a> <a href='http://en.wikipedia.org/wiki/Astronomical_naming_conventions'>naming conventions</a> all bodies similar in size to Orcus and in orbital resonance with Neptune are named after underworld dieties.",
    "In Roman mythology, <a href='http://en.wikipedia.org/wiki/Orcus_(mythology)'>Orcus</a> was a hairy, bearded giant-god of the underworld, and is likely the root of modern words such as <em>Ogre</em> and <em>Orc</em>.",
    "Orcus has a large satellite, estmated to be about 23% of Orcus' diameter; this ratio is slightly smaller than that of the Earth / Moon system (27%).",
    "Read more about <a href='http://en.wikipedia.org/wiki/90482_Orcus'>Orcus</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.pluto].fact = [
    "Earth Diameters: <strong>0.19</strong><br>Semi-major Axis: <strong>39.48AU</strong><br>Earth Masses: <strong>0.0021</strong><br>Rot. Period: <strong>6d 9h 17m 36s</strong><br>Orbital Period: <strong>248.09y</strong>",
    "What luck!  Based on faulty data, <a href='http://en.wikipedia.org/wiki/Percival_Lowell'>Percival Lowell</a> predicted the existence of a large planet just where Pluto happened to be at the time.",
    "On August 24, 2006, the <a href='http://en.wikipedia.org/wiki/International_Astronomical_Union'>International Astronomical Union</a> reclassified Pluto as a &quot;<a href='http://en.wikipedia.org/wiki/Dwarf_planet'>dwarf planet</a>&quot;, leaving only eight official &quot;planets&quot;.",
    "As Pluto's orbit takes it closer to Sol, it &quot;sweats&quot; nitrogen which keeps it slightly colder than originally expected by astronomers.",
    "Despite being even smaller than Mercury, Pluto has managed to snatch up three moons!",
    "<a href='http://en.wikipedia.org/wiki/Voyager_1'>Voyager 1</a> was originally intended to make a flyby of Pluto, but its course was altered in 1980 to visit Saturn's moon <a href='http://en.wikipedia.org/wiki/Titan_(moon)'>Titan</a> instead.",
    "<a href='http://en.wikipedia.org/wiki/New_Horizons'>New Horizons</a>, a craft launched by <a href='http://en.wikipedia.org/wiki/NASA'>NASA</a> in January 2006, will be the first spacecraft from Earth to visit Pluto in 2015.",
    "Seven moons orbiting other planets are larger and more massive than Pluto, including Earth's own moon!",
    "<a href='http://en.wikipedia.org/wiki/Issac_Asimov'>Issac Asimov</a> proposed calling all objects smaller than Mercury, yet larger than <a href='http://en.wikipedia.org/wiki/1_Ceres'>Ceres</a>, <em>mesoplanets</em>.  This would have included Pluto.",
    "You can only see Pluto's moon <a href='http://en.wikipedia.org/wiki/Charon_(moon)'>Charon</a> from one side of its sphere; both bodies are <a href='http://en.wikipedia.org/wiki/Tidal_locking'>tidally locked</a> to each other.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Pluto'>Pluto</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.ixion].fact = [
    "Earth Diameters: <strong>~0.06</strong><br>Semi-major Axis: <strong>39.68AU</strong><br>Earth Masses: <strong>&lt; 0.0001</strong><br>Rotation Period: <strong>?</strong><br>Orbital Period: <strong>249.95y</strong>",
    "Ixion orbits Sol with a very similar incline orientation to that of Pluto, but their <a href='http://en.wikipedia.org/wiki/Perihelion'>perihelions</a> are at opposite ends of their orbits.",
    "Of the known bodies orbiting Sol in a 2:3 orbital resonance with Neptune, the <a href='http://en.wikipedia.org/wiki/Plutino'>plutinos</a>, Ixion is the third largest, after Pluto and Orcus.",
    "Ixion is named after <a href='http://en.wikipedia.org/wiki/Ixion'>Ixion</a>, a cursed ancient king from <a href='http://en.wikipedia.org/wiki/Greek_mythology'>Greek mythology</a> who murdered his own father-in-law.",
    "Like many distant bodies of the solar system, Ixion's surface is covered by <a href='http://en.wikipedia.org/wiki/Tholin'>tholins</a>; simple organic compounds that produce a reddish-brown colour.",
    "Read more about <a href='http://en.wikipedia.org/wiki/28978_Ixion'>Ixion</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.varuna].fact = [
    "Earth Diameters: <strong>~0.07</strong><br>Semi-major Axis: <strong>43.13AU</strong><br>Earth Masses: <strong>&lt; 0.0001</strong><br>Rotation Period: <strong>3.17h</strong><br>Orbital Period: <strong>283.2y</strong>",
    "Although officially discovered in November 2000, Varuna was &quot;<a href='http://en.wikipedia.org/wiki/Precovery'>precovered</a>&quot; in telescope photographs dating back to 1953!",
    "Varuna rotates extemely quickly, every 3.17 hours.  Because of this, it likely has an <a href='http://en.wikipedia.org/wiki/Ellipsoid'>ellipsoid</a> shape.",
    "Varuna's orbit is nearly circular, with a significant inclination of 17.2&deg;, avoiding gravitational influence from Neptune.",
    "Varuna has an extremely dark surface relative to other TNOs, with an <a href='http://en.wikipedia.org/wiki/Albedo'>albedo</a> of only 0.04 (Earth's albedo is over 9x higher).",
    "Read more about <a href='http://en.wikipedia.org/wiki/20000_Varuna'>Varuna</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.haumea].fact = [
    "Earth Diameters: <strong>~0.18 avg.</strong><br>Semi-major Axis: <strong>43.34AU</strong><br>Earth Masses: <strong>~0.0007</strong><br>Rotation Period: <strong>3.9154h</strong><br>Orbital Period: <strong>285.4y</strong>",
    "Because it rotates so quickly (3.9h) for a solid object of its size, Haumea has been stretched into an elipsoid shape; more than twice as long as from pole to pole.",
    "It is believed that Haumea is rotating so quickly due to catastrophic impact long ago, which also created its two satellites: <a href='http://en.wikipedia.org/wiki/Hi'iaka_(moon)'>Hiʻiaka</a> and <a href='http://en.wikipedia.org/wiki/Namaka_(moon)'>Namaka</a>",
    "Haumea is a member of a family of Trans Neptunian Objects called <a href='http://en.wikipedia.org/wiki/Cubewanos'>cubewanos</a>.  These are objects orbitting Sol beyond, and not in orbital resonance with, Neptune.",
    "Haumea has a very high <a href='http://en.wikipedia.org/wiki/Albedo'>albedo</a> (0.7 &plusmn;0.1), approaching that of pure snow!",
    "Haumea is named after the Hawaiian goddess of childbirth and fertility.  The moons Hiʻiaka and Namaka are named after two of <a href='http://en.wikipedia.org/wiki/Haumea_(mythology)'>Haumea</a>'s daughters.",
    "Who discovered Haumea? Caltech's Mike Brown had been tracking Haumea for half a year, but a Spanish team was first to announce its discovery.",
    "The age of Haumea is a mystery.  The orbits of its moons suggest it is very old, but the bright ice on its surface suggests it is very young.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Haumea_(dwarf_planet)'>Haumea</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.quaoar].fact = [
    "Earth Diameters: <strong>~0.10</strong><br>Semi-major Axis: <strong>43.41AU</strong><br>Earth Masses: <strong>&lt; 0.0005</strong><br>Rotation Period: <strong>?</strong><br>Orbital Period: <strong>285.97y</strong>",
    "Most of the <em>large</em> <a href='http://en.wikipedia.org/wiki/Kuiper_Belt_object'>Kuiper Belt objects</a> have highly inclined orbits, however Quaoar's orbit is only modestly inclined at ~8&deg;.",
    "Like Varuna, Quaoar's orbit has a low eccentricity and is almost circular.",
    "At the time of its discovery in June 2002, Quaoar was the largest solar system object to be found since Pluto!",
    "The presence of crystalline ices on Quaoar means its surface has been &gt;55K warmer in the past.  Relatively toasty for such a distant object.",
    "Read more about <a href='http://en.wikipedia.org/wiki/50000_Quaoar'>Quaoar</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.makemake].fact = [
    "Earth Diameters: <strong>~0.12 avg.</strong><br>Semi-major Axis: <strong>45.79AU</strong><br>Earth Masses: <strong>&lt; 0.0007</strong><br>Rotation Period: <strong>?</strong><br>Orbital Period: <strong>309.88y</strong>",
    "Makemake (pronounced MAH-kay-MAH-kay), is named after the creator of humanity in the mythos of the native people of Easter Island.",
    "Being the namesake of an Easter Island deity is a play on its nickname &quot;Easterbunny&quot; since it was discovered soon after the Easter holiday.",
    "Astronomers have so far been unable to determine Makemake's speed of rotation.  This could be because its pole is pointed directly at Earth.",
    "So far, no satellites have been discovered orbitting Makemake, making accurate estimates of its mass very difficult.",
    "Makemake is classified as a classical Kuiper Belt object, which means it orbits far enough from Neptune that its orbit will remain gravitationally stable.",
    "Makemake is the only distant dwarf planet besides Pluto, bright enough that Clyde Tombaugh could have possibly discovered it in the 1930s.",
    "Spectral analysis revealed the presence of both methane and nitrogen on Makemake's surface, meaning it may have a thin atmosphere.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Makemake_(dwarf_planet)'>Makemake</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.eris].fact = [
    "Earth Diameters: <strong>0.19</strong><br>Semi-major Axis: <strong>67.67AU</strong><br>Earth Masses: <strong>0.0028</strong><br>Rotation Period: <strong>&gt; 8h ?</strong><br>Orbital Period: <strong>557y</strong>",
    "Soon after the discovery of Eris on January 5th, 2005, <a href='http://en.wikipedia.org/wiki/NASA'>NASA</a> issued a press release describing it as the <em>tenth planet</em>!",
    "Eris orbits Sol at a 44.187&deg; incline to the ecliptic; an almost perfect diagonal.",
    "The discovery of Eris, calculated to be even larger than Pluto, was the main impetus behind the <a href='http://en.wikipedia.org/wiki/International_Astronomical_Union'>IAU</a> shake-up that kicked Pluto out of the planetary club.",
    "Pluto knows it!  Eris is named after the Greek goddess <a href='http://en.wikipedia.org/wiki/Eris_(mythology)'>Eris</a>, a personification of strife and dischord.",
    "Eris is very bright relative to Pluto, believed to be caused by condensed methane &quot;snow&quot; made possible by its extreme distance from Sol.",
    "Eris has a very small moon named <a href='http://en.wikipedia.org/wiki/Dysnomia_(moon)'>Dysnomia</a> which is estimated to be around 150km wide.",
    "Astronomers predict that there are many large objects similar in orbit to Eris; areas of the sky which have gone largely unobserved until recently.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Eris_(dwarf_planet)'>Eris</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.sedna].fact = [
    "Earth Diameters: <strong>0.14</strong><br>Semi-major Axis: <strong>525.86AU</strong><br>Earth Masses: <strong>&lt; 0.001</strong><br>Rotation Period: <strong>~10h</strong><br>Orbital Period: <strong>12059.06y</strong>",
    "Sedna's orbit carries it further away from Sol than any other known solar system object; over 975 times the distance from Sol to Earth!",
    "Sedna is one of the reddest objects in the solar system, almost as Red as Mars.",
    "When originally discovered, Sedna's apparently 20-50 day rotation time was thought to be due to the presence of a large satellite.",
    "We now know that Sedna rotates approximately every 10h; rather typical for most other Kuiper Belt objects.",
    "Many theories attempt to explain Sedna's highly elliptical orbit, such as the presence of other large and undiscovered bodies at 1000AU or more!",
    "At aphelion, the furthest point from Sol, Sedna is over 0.015LY away.  This means light from Sol takes 5.63 days to reach it!",
    "Sedna is so far away, it hasn't been proven whether or not it's in <a href='http://en.wikipedia.org/wiki/Hydrostatic_equilibrium'>hydrostatic equilibrium</a>; if it is, it qualifies as a <a href='http://en.wikipedia.org/wiki/Dwarf_planet'>dwarf planet</a>.",
    "Read more about <a href='http://en.wikipedia.org/wiki/90377_Sedna'>Sedna</a> at Wikipedia.org."
  ];

  pWerks.bodies[pWerks.bodID.reptilon].fact = [
    "Earth Diameters: <strong>1.00</strong><br>Semi-major Axis: <strong>1.00AU</strong><br>Earth Masses: <strong>1.00</strong><br>Rotation Period: <strong>?</strong><br>Orbital Period: <strong>1y</strong>",
    "Reptilon is a planet shrouded in mystery, orbiting Sol in a <a href='http://en.wikipedia.org/wiki/Counter-Earth'>counter-earth</a> orbit, completely undetected.",
    "Reptilon is much like Earth except warm and tropical, supporting many forms of animal and plant life, especially ferns.",
    "Reptilon is home to two constantly warring factions: the friendly Dinosaucers and the evil Tyrannos.",
    "The Dinosaucers have a secret base on Earth called the Lava Dome.  It lies hidden within a dormant volcano.",
    "On one of Reptilon's greatest holidays, <em>Fern Day</em>, all violence is strictly forbidden, even for the Tyrannos.",
    "<img src='ui/fact.allo.png' alt='Allo'><q>A big ugly monster!</q><br /><q>Oh, don't be silly, Stego.  We're the biggest ugliest monsters on this planet.</q>",
    "<img src='ui/fact.rex.png' alt='Genghis Rex'><q>Reptilon isn't real, you <em>idiot-asaurus</em>!  It's just a cartoon!</q>",
    "<img src='ui/fact.teryxandichy.png' alt='Teryx &hearts; Ichy'>",
    "Read more about <a href='http://en.wikipedia.org/wiki/Dinosaucers'>Reptilon</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.opera].fact = [
    "Opera is the fastest browser in the solar system!  Look at it go!",
    "Read more about <a href='http://www.opera.com'>Opera</a> at Opera.com."
  ];
  pWerks.bodies[pWerks.bodID.astronaut].fact = [
    "Jeepers!  It sure is a long way to Mars!",
    "With current rockets based on chemical propulsion, it would take over six months to get to Mars.",
    "With newer technologies currently being researched, such as nuclear rockets, travel time to Mars could be cut to two weeks!",
    "There are currently no definite plans for a manned Mars mission, but various mission timelines indicate it could happen by 2030.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Exploration_of_Mars'>getting to Mars</a> and <a href='http://en.wikipedia.org/wiki/Colonization_of_Mars'>living on Mars</a> at Wikipedia.org."
  ];

  pWerks.bodies[pWerks.bodID.luna].fact = [
    "Diameter: <strong>3,474.2km</strong><br>Semi-major Axis: <strong>384,399km</strong><br>Mass: <strong>7.3477x10<sup>22</sup>kg</strong><br>Orbital Period: <strong>27.321582d</strong>",
    "Luna's diameter is more than half the diameter of Mars, and more than 70% of the diameter of Mercury!",
    "Luna is thought to have formed due to a catastrophic collision with a Mars-sized object early in Earth's history.",
    "Every year, Luna moves 3.8cm further away from Earth in its orbit.",
    "Luna's axis of rotation is tilted only 1.54&deg; to the ecliptic; there are points at its north pole which are in constant sunlight! ",
    "Oddly, the far side of Luna has barely any of the dark areas - called <em>maria</em> - which cover much of the near side.",
    "Transporting water through space is expensive!  If significant amounts of water aren't found on Luna, it won't be affordable to build there.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Moon'>Luna</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.ganymede].fact = [
    "Lunar Diameters: <strong>1.514</strong><br>Semi-major Axis: <strong>1,070,412km</strong><br>Lunar Masses: <strong>2.017</strong><br>Orbital Period: <strong>7.155d</strong>",
    "Ganymede is the largest natural satellite in the solar system with a diameter larger than that of Mercury!",
    "Despite being larger than Mercury, both Ganymede and Titan are far less dense, so are less than half Mercury's mass.",
    "Ganymede is the only known natural satellite to have its own substantial magnetic field.",
    "Like Europa, Ganymede also possesses grooves and ridges caused by tectonic activity, but are not as readily visible.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Ganymede_(moon)'>Ganymede</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.callisto].fact = [
    "Lunar Diameters: <strong>1.387</strong><br>Semi-major Axis: <strong>1,882,709km</strong><br>Lunar Masses: <strong>1.464</strong><br>Orbital Period: <strong>16.689d</strong>",
    "Callisto orbits furthest away from Jupiter of all the <a href='http://en.wikipedia.org/wiki/Galilean_moon'>Galilean moons</a> and thus is not significantly affected by tidal heating.",
    "Because of its distance from Jupiter, Callisto is thought to be prime real estate for a base from which to explore the Jovian system",
    "Frozen Callisto is almost completely covered in craters due to a lack of any significant tectonic or volcanic activity.",
    "Surface features on Callisto are named after figures and places in <a href='http://en.wikipedia.org/wiki/Norse_mythology'>Norse mythology</a>",
    "Read more about <a href='http://en.wikipedia.org/wiki/Callisto_(moon)'>Callisto</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.io].fact = [
    "Lunar Diameters: <strong>1.048</strong><br>Semi-major Axis: <strong>421,700km</strong><br>Lunar Masses: <strong>1.216</strong><br>Orbital Period: <strong>1.769d</strong>",
    "Io is one of the most geologically active bodies in the solar system, having over 400 active volcanoes!",
    "Io's yellowish colour is due to high concentrations of sulfur and sulfur dioxides in its volcanic plumes and lava flows.",
    "The internal heat which keeps Io's insides molten is sustained by <a href='http://en.wikipedia.org/wiki/Io_(moon)#Tidal_Heating'>tidal heating</a> as it moves closer and farther from Jupiter in its orbit.",
    "Io is in 2:1 <a href='http://en.wikipedia.org/wiki/Orbital_resonance'>orbital resonance</a> with Europa, and 4:1 with Ganymede.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Io_(moon)'>Io</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.europa].fact = [
    "Lunar Diameters: <strong>0.898</strong><br>Semi-major Axis: <strong>671,034km</strong><br>Lunar Masses: <strong>0.653</strong><br>Orbital Period: <strong>3.551d</strong>",
    "Europa has one of the smoothest surfaces in the solar system, likely due to a liquid ocean very close beneath its surface.",
    "Europa's surface is crisscrossed with many dark streaks which seem to indicate tectonic activity in its icy crust.",
    "If Europa's streaks were caused by tidal stresses from Jupiter, their patterns indicate that Europa's core rotates slower than the surface!",
    "Because of the strong evidence of a subsurface liquid water ocean on Europa, it has been speculated that primitive life may be found there.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Europa_(moon)'>Europa</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.titan].fact = [
    "Lunar Diameters: <strong>1.482</strong><br>Semi-major Axis: <strong>1,221,930km</strong><br>Lunar Masses: <strong>1.831</strong><br>Orbital Period: <strong>15.945d</strong>",
    "Like Ganymede, Titan is also a member in good standing of the <em>larger in diameter than Mercury</em> club.",
    "Titan is the only natural satellite which has a dense atmosphere.  It's composed of 98.4% nitrogen.",
    "Titan and Earth are the only two solar system bodies on which stable liquid oceans exist.  Unfortunately, Titan's are made of methane and ethane.",
    "Titan has seasons much like Earth, but they follow the orbit of Saturn and cycle approximately every 30 years.",
    "At Titan's surface, the gravity is low enough (0.14 g), and the air dense enough (1.45 atm), that you could strap wings to your arms and fly!",
    "Read more about <a href='http://en.wikipedia.org/wiki/Titan_(moon)'>Titan</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.rhea].fact = [
    "Lunar Diameters: <strong>0.440</strong><br>Semi-major Axis: <strong>527,108km</strong><br>Lunar Masses: <strong>0.031</strong><br>Orbital Period: <strong>4.518d</strong>",
    "By measuring how Rhea's rotation speed changed depending on its distance from Saturn, it's thought that Rhea has no distinct core.",
    "White &quot;wispy&quot; markings - huge ice cliffs - on Rhea's trailing hemisphere are one of its distinguishing features.",
    "A large portion of Rhea contains no large craters; this is thought to be evidence for a major resurfacing event in its distant past.",
    "Rhea, like many of Saturn's moons, is named after one of the <a href='http://en.wikipedia.org/wiki/Titan_(mythology)'>titans</a> from Greek mythology.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Rhea_(moon)'>Rhea</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.iapetus].fact = [
    "Lunar Diameters: <strong>0.423</strong><br>Semi-major Axis: <strong>3,560,820km</strong><br>Lunar Masses: <strong>0.025</strong><br>Orbital Period: <strong>79.322d</strong>",
    "Iapetus is a very unusual sight; half of its surface is covered by a layer of very dark material while the other half is icy bright.",
    "Circling Iapetus' equator is a prominent ridge which makes the satellite look like a giant walnut!",
    "Because of Iapetus' relatively high inclination (7.5&deg;) it is the only large moon of Saturn from which you can clearly see Saturn's rings.",
    "Geological features on Iapetus are named after characters and places from the French epic poem <a href='http://en.wikipedia.org/wiki/The_Song_of_Roland'>The Song of Roland</a>.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Iapetus_(moon)'>Iapetus</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.dione].fact = [
    "Lunar Diameters: <strong>0.323</strong><br>Semi-major Axis: <strong>377,396km</strong><br>Lunar Masses: <strong>0.015</strong><br>Orbital Period: <strong>2.737d</strong>",
    "Dione is very similar in appearance to Rhea, even down the the white wispy ice cliffs on its trailing hemisphere.",
    "Craters on Dione never get very high, such as those on Luna; this is probably due to Dione's low density composition of ice and rock.",
    "Crater density on Dione seems to indicate that a large impact &quot;spun&quot; the moon halfway around early in its history!",
    "Two of Saturn's moons move within the <em>same orbit</em> as Dione, in Dione's leading and trailing <a href='http://en.wikipedia.org/wiki/Lagrangian_point'>Lagrangian points</a>!",
    "Read more about <a href='http://en.wikipedia.org/wiki/Dione_(moon)'>Dione</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.tethys].fact = [
    "Lunar Diameters: <strong>0.307</strong><br>Semi-major Axis: <strong>294,619km</strong><br>Lunar Masses: <strong>0.008</strong><br>Orbital Period: <strong>1.888d</strong>",
    "Tethys' mean density is just under that of liquid water, indicating that is it composed almost entirely of water ice.",
    "Tethys has a huge crater near its northern pole called <a href='http://en.wikipedia.org/wiki/Odysseus_(crater)'>Odysseus</a> which has a width almost 2/5 Tethys' diameter!",
    "Like Dione, Tethys also has two co-orbiting moons at its leading and trailing <a href='http://en.wikipedia.org/wiki/Lagrangian_point'>Lagrangian points</a>.",
    "Geological features on Tethys are named after characters and places from the epic poems <a href='http://en.wikipedia.org/wiki/The_Iliad'>The Iliad</a> and <a href='http://en.wikipedia.org/wiki/The_Odyssey'>The Odyssey</a>",
    "Read more about <a href='http://en.wikipedia.org/wiki/Tethys_(moon)'>Tethys</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.titania].fact = [
    "Lunar Diameters: <strong>0.454</strong><br>Semi-major Axis: <strong>435,910km</strong><br>Lunar Masses: <strong>0.048</strong><br>Orbital Period: <strong>8.706d</strong>",
    "Not much is known about Titania, Uranus' largest moon.  This is because the only probe to make a flyby was <a href='http://en.wikipedia.org/wiki/Voyager_1'>Voyager 1</a> in 1986.",
    "Titania is named after <a href='http://en.wikipedia.org/wiki/Titania_(Fairy_Queen)'>Titania</a>, the Queen of the Faeries in Shakespeare's play, <a href='http://en.wikipedia.org/wiki/A_Midsummer_Night's_Dream'>A Midsummer Night's Dream</a>.",
    "One of Titania's major surface features is a huge canyon which rivals the 7km deep <a href='http://en.wikipedia.org/wiki/Valles_Marineris'>Valles Marineris</a> on Mars!",
    "When Titania <a href='http://en.wikipedia.org/wiki/Occultation'>occulted</a> a star in 2001, it was revealed that Titania possessed virtually no atmosphere, not even a trace!",
    "Read more about <a href='http://en.wikipedia.org/wiki/Titania_(moon)'>Titania</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.oberon].fact = [
    "Lunar Diameters: <strong>0.438</strong><br>Semi-major Axis: <strong>583,520km</strong><br>Lunar Masses: <strong>0.041</strong><br>Orbital Period: <strong>13.463d</strong>",
    "<a href='http://en.wikipedia.org/wiki/William_Herschel'>William Herschel</a> discovered Oberon in 1787, but no one was able to find it again for almost fifty years!",
    "Oberon is named after <a href='http://en.wikipedia.org/wiki/Oberon_(Fairy_King)'>Oberon</a>, the King of the Faeries in Shakespeare's play, <a href='http://en.wikipedia.org/wiki/A_Midsummer_Night's_Dream'>A Midsummer Night's Dream</a>.",
    "Like most moons of Uranus, only the southern hemisphere of Oberon was imaged by <a href='http://en.wikipedia.org/wiki/Voyager_1'>Voyager 1</a>, since its northern pole was in constant darkness.",
    "One of the mountains of Oberon is over 6 kilometers high!  Pretty impressive for a satellite less than half the diameter of Luna.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Oberon_(moon)'>Oberon</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.umbriel].fact = [
    "Lunar Diameters: <strong>0.336</strong><br>Semi-major Axis: <strong>266,300km</strong><br>Lunar Masses: <strong>0.016</strong><br>Orbital Period: <strong>4.144d</strong>",
    "Umbriel has the darkest surface out of all the Uranian moons with an <a href='http://en.wikipedia.org/wiki/Albedo'>albedo</a> of 0.21.",
    "Umbriel has a strange ring of bright material near its equator.  It is presumably an impact crater, but no other craters like it exist on Umbriel.",
    "Geological features on Umbriel are named after evil spirits taken from various Earth mythologies.",
    "Umbriel is named after a character from <a href='http://en.wikipedia.org/wiki/Alexander_Pope'>Alexander Pope's</a> satirical poem, <a href='http://en.wikipedia.org/wiki/The_Rape_of_the_Lock'>The Rape of the Lock</a>.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Umbriel_(moon)'>Umbriel</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.ariel].fact = [
    "Lunar Diameters: <strong>0.333</strong><br>Semi-major Axis: <strong>191,020km</strong><br>Lunar Masses: <strong>0.018</strong><br>Orbital Period: <strong>2.520d</strong>",
    "Ariel's surface is covered with a system of deep cracks and faults, probably due to tidal heating sometime in its history.",
    "The largest crater observed on Ariel is only 78km across; meaning its surface is younger than most other Uranian moons.",
    "Astronomers believe that Ariel was once locked in a 4:1 <a href='http://en.wikipedia.org/wiki/Orbital_resonance'>orbital resonance</a> with Titania, but eventually escaped!",
    "Ariel is named after a character from <a href='http://en.wikipedia.org/wiki/Alexander_Pope'>Alexander Pope's</a> satirical poem, <a href='http://en.wikipedia.org/wiki/The_Rape_of_the_Lock'>The Rape of the Lock</a>.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Ariel_(moon)'>Ariel</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.triton].fact = [
    "Lunar Diameters: <strong>0.779</strong><br>Semi-major Axis: <strong>354,800km</strong><br>Lunar Masses: <strong>0.292</strong><br>Orbital Period: <strong>-5.877d</strong>",
    "Triton is unusual; it is the only large satellite which has a <a href='http://en.wikipedia.org/wiki/Retrograde_and_direct_motion#Retrograde_orbits'>retrograde orbit</a>.",
    "Because of its unusual orbit, Triton is thought to be a captured <a href='http://en.wikipedia.org/wiki/Kuiper_Belt'>Kuiper Belt</a> object, rather than a moon which formed when Neptune did.",
    "Triton has the coldest known surface in the solar system; just 34.5K above absolute zero!",
    "Triton is intensely geologically active, with many icy volcanoes and geysers which contribute to its relatively young surface.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Triton_(moon)'>Triton</a> at Wikipedia.org."
  ];
  pWerks.bodies[pWerks.bodID.charon].fact = [
    "Lunar Diameters: <strong>0.347</strong><br>Semi-major Axis: <strong>19,571km</strong><br>Lunar Masses: <strong>0.021</strong><br>Orbital Period: <strong>6.387d</strong>",
    "Is it a satellite or part of a binary <a href='http://en.wikipedia.org/wiki/Dwarf_planet'>dwarf planet</a> system?  The <a href='http://en.wikipedia.org/wiki/Center_of_mass#Barycenter_in_astronomy'>barycenter</a> of the Pluto/Charon system is outside both objects!",
    "A little close for comfort!  Charon is almost 20x closer to Pluto than Luna is to Earth.",
    "There are two theories concerning the formation of Charon: a giant impact, similar to Luna, or a smaller impact which resulted in the current orbit.",
    "Because of the orientation of its orbit, Charon and Pluto began eclipsing each other from 1985 to 1990, providing much valuable data for astronomers.",
    "Read more about <a href='http://en.wikipedia.org/wiki/Charon_(moon)'>Charon</a> at Wikipedia.org."
  ];

  pWerks.bodies[pWerks.bodID.iss].fact = [
    "It's fast!  The International Space Station circles Earth every 91.20 minutes!",
    "Read more about the <a href='http://en.wikipedia.org/wiki/International_Space_Station'>International Space Station</a> at Wikipedia.org."
  ];
}, false);