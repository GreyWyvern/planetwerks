/* ********************************************************************
* PlanetWerks - A Widget-sized tour through the Solar System
*  Copyright (c) 2010 - Brian Huisman AKA GreyWyvern/Orca
*  Released under the BSD licence: http://www.greywyvern.com/code/bsd
*   or see "licence.txt" included in this package
*
***********************************************************************
* Version history
*
* v2.6 - May 26, 2010
*    - Fixes for updated Opera widget security specifications
*    - New icons
*
* v2.5 - September 17, 2009
*    - Updated config.xml for Opera 10 compatibility
*
* v2.4  - January 4, 2009
*   - Numerous code tweaks
*   - Orbital path trails are cleared after each toggle
*   - Clicking the Linear Distance checkbox while orbit motion is
*       stopped actually moves planetoids to the correct distances
*
* v2.3  - September 23, 2008
*   - Added dwarf planets Haumea and Makemake
*
* v2.2  - May 29, 2008
*   - Added orbital path trails; toggle with [T]
*   - Corrected an orientation calculation error
*   - Fixed a bug affecting retrograde orbits under linear speed
*   - Many performance and memory tweaks
*   - Added [Backspace] to mimic [Del] for Macbook keyboards
*   - Added [Shift]+[Del] to mimic [Ins] for Mac keyboards
*   - Transparency fixes for *NIX desktops
*
* v2.1  - December 27, 2007
*   - Changed the way object primaries are specified in data.js to make
*       adding new objects easier
*   - Added version info and copyright date to Welcome panel
*   - Fixed a factbox typo
*
* v2.0  - November 17, 2007
*   - New Features:
*     - Dwarf planet Eris
*     - Trans-neptunian objects Orcus, Ixion, Varuna, Quaoar and Sedna
*     - Natural satellites Ganymede, Titan, Callisto, Luna, Io, Europa,
*         Triton, Rhea, Titania, Oberon, Iapetus, Dione, Tethys,
*         Umbriel, Ariel and Charon
*     - Orbits accurately reflect eccentricity, incline, orientation
*         and Keplerian motion
*     - Option to use a linear scale for planetoid sizes, distances and
*         orbit speeds
*     - Selectively display planets, dwarf planets, TNOs and satellites
*     - Planetoid finder [F]
*     - Snap camera angle to above [PgUp] or edge-on [PgDn] ecliptic
*     - Greatly improved rotation algorithm
*     - Starfield background moves with system Pitch/Yaw rotation
*     - Four levels of precision angle and distance adjustment
*     - Sol becomes a distant star on zoom out
*     - Increased zoom-out range (0.1AU -> 10,000 AU)
*     - Increased speed range (1s = 1h -> 1s = 1,000y)
*     - [B] now cycles between: starfield, plain black and transparent
*     - Viewport size choices automatically include the screen maximum
*     - Current planetoid distance from Sol displays on infoboxes
*     - Current camera distance from Sol displayed in upper left box
*         with linear scale distance
*     - Time scale shown in upper left box with linear scale orbit speed
*     - Initial quick-facts infobox on each system object
*     - Added simple controls for the Wiimote
*
*   - Changes
*     - Changed Pitch and Yaw controls to Arrow-key layout
*     - Changed Roll controls to [1] and [2]
*     - Zoom in and out now uses [Home] and [End]
*     - Orbit speed control now uses [Insert] and [Delete]
*     - Solar orbit motion now toggled by [Space]
*       - Satellite orbit motion toggled by [Shift]+[Space]
*
* v1.1b - November 17, 2006
*   - Added dwarf planet Ceres
*   - Updated some links in other listed facts
*
* v1.1a - October 2, 2006
*   - Added close button to comply with Style Guide
*
* v1.1  - August 24, 2006
*   - Updated factboxes for new IAU ruling on dwarf planet Pluto
*   - Added window self-resize to Options menu
*     - Two versions no longer required
*
* v1.0a - June 12, 2006
*   - Changed zoom keys to J and K for Norwegian keyboards
*
* v1.0  - June 08, 2006
*
***********************************************************************
* Planetoid images from the NASA JPL archives
* Planetoid data and facts from Wikipedia.org and ssd.jpl.nasa.gov
*
* Thanks to shoust, Phil, TarquinWJ, WildEnte, moose, Remco, Ramunas
* and the rest of the gang for your testing and feedback.
*
* "I am getting closer
*  To a higher ground
*  My destination
*  Lies beyond the sun
*
*  Not afraid of failure
*  To crash and burn
*  If you're not living
*  You will never learn
*
*  Constellations far
*  Revealing my destiny
*  Astronomy!
*  There among the stars..."
*
*    - Dragonland - Astronomy
*
******************************************************************** */


var planetWerks = 0, fade = [];

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,"");
};

Math.PI2 = Math.PI * 2;
Math.AUinEarthDiameters = 11727.65757;
Math.matrixProduct = function(m1, m2) {
  for (var x = 0, m3 = []; x < m1.length; x++) {
    m3[x] = [];
    for (var y = 0; y < m2[0].length; y++) {
      m3[x][y] = 0;
      for (var z = 0; z < m1[0].length; z++)
        m3[x][y] += m1[x][z] * m2[z][y];
    }
  } return m3;
};
Math.unitQuaternionProduct = function(q1, q2) {
  return [
    q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2] - q1[3] * q2[3],
    q1[0] * q2[1] + q1[1] * q2[0] + q1[2] * q2[3] - q1[3] * q2[2],
    q1[0] * q2[2] - q1[1] * q2[3] + q1[2] * q2[0] + q1[3] * q2[1],
    q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1] + q1[3] * q2[0]
  ];
};
Math.matrixVectorProduct = function(m, v) {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]
  ];
};



/* ********************************************************************
 * Create a solar system
 *
 */
function SolarSystem(width, height) {
  var self         = this;

  this.math        = Math;
  this.version     = 2.6;

  this.width       = [width];
  this.height      = [height];
  this.factor      = this.math.AUinEarthDiameters / 2;
  this.distance    = 9;
  this.limit       = [10000, this.math.sqrt(10000)];

  this.motion      = 3;
  this.rate        = 1000 / 40; // -> 40 fps
  this.interval    = 0;
  this.reset       = 50000;
  this.repeat      = 0;
  this.moved       = 0; // 1 = Planetoids, 2 = Distant star, 4 = Trails
  this.quat        = [0, 1, 0, 0];
  this.rota        = [];
  this.delta       = 10;
  this.speed       = 1 / 360;

  this.system      = document.getElementById('system');
  this.canvas      = this.system.getElementsByTagName('canvas')[0];
  this.canvas2D    = this.canvas.getContext('2d');
  this.distant     = [];
  this.bodies      = [];
  this.bodID       = {};
  this.bods        = 0;
  this.legend      = document.getElementById('legend').getElementsByTagName('li');
  this.highlight   = false;

  this.trails      = {
    planet: "#eeee00",
    dwarf:  "#00dddd",
    tno:    "#6666ee",
    moon:   "#ee0000",
    egg:    "#00bb00",
    star:   "#000000",
    other:  "#ffffff"
  };
  this.trailsOn    = false;
  this.trailsDots  = 0.174533;

  this.bkgOn       = 1;
  this.bkgPos      = [0, 0];
  this.bkgSize     = [1024, 768];

  this.scale       = {
    speed: document.getElementById('realSpeed'),
    distance: document.getElementById('realDistance'),
    size: document.getElementById('realSize')
  };
  this.show        = {
    star: { checked: true },
    planet: document.getElementById('showPlanet'),
    dwarf: document.getElementById('showDwarf'),
    tno: document.getElementById('showTNO'),
    moon: document.getElementById('showMoon'),
    egg: { checked: true }
  };

  this.factOn      = 0;
  this.factBox     = document.getElementById('fact');
  this.factAllow   = document.getElementById('allowFacts');
  this.factSymbol  = this.factBox.getElementsByTagName('img')[0];

  this.menu        = [];
  this.menuOn      = true;
  this.menuCur     = 0;
  this.menuSteps   = [0, 1, 3, 9, 27, 81, 243, 729, 2187];
  this.menuMoving  = false;

  this.appDistance = 0;
  this.appCoords   = [[0, 0], [0, 0]];
  this.appSize     = [[0, 0], [0, 0]];
  this.appPos      = [0, 0];


  /* *****
   * Change viewport size
   *  - size ~ Option value of viewport size select element
   *
   */
  this.resize = function(size) {
    size = size.split('x'); size[0] = Number(size[0]); size[1] = Number(size[1]);
    if (typeof window.screenX == "number") {
      var newX = this.math.max(0, window.screenX + this.width[1] - size[0] / 2);
      var newY = this.math.max(0, window.screenY + this.height[1] - size[1] / 2);
      if (newX + size[0] > screen.width) newX = 0;
      if (newY + size[1] > screen.height) newY = 0;
      document.body.className = (size[0] == screen.width && size[1] == screen.height) ? "nodragon" : "";
      window.moveTo(newX, newY);
    } window.resizeTo(size[0], size[1]);
    this.width = [size[0], size[0] / 2, size[0] - 76, (size[0] - this.width[0]) / 2];
    this.height = [size[1], size[1] / 2, size[1] - 76, (size[1] - this.height[0]) / 2];
    this.system.style.width = document.body.style.width = (this.canvas.width = this.width[0]) + "px";
    this.system.style.height = document.body.style.height = (this.canvas.height = this.height[0]) + "px";
    for (var tdis, x = 2; tdis = this.distant[x--];) {
      tdis.left = (this.width[1] - 50) + "px";
      tdis.top = (this.height[1] - 50) + "px";
    } this.moved |= 1;
  };


  /* *****
   * Open, close and switch between menu panels
   *  - page ~ Page # to open/switch to, or if 0 then close all
   *
   */
  this.menuPage = function(page) {
    if (this.menuMoving || !this.menuOn) return false;

    if (page == this.menuCur) page = 0;
    if (this.menuCur) {
      this.menuMoving = true;
      this.menuAnimate(this.menuCur, false, 1);
    }
    if (page) {
      this.menuMoving = true;
      setTimeout(function() {
        self.menuAnimate(page, true, self.menuSteps.length - 1);
      }, (this.menuCur) ? 300 : 5);
    } this.menuCur = page;
  };


  /* *****
   * Exponential CSS height change animation for menus
   *  - page      ~ Menu page to open or close
   *  - direction ~ Is it expanding or collapsing
   *  - step      ~ The step we are on in this animation
   *
   */
  this.menuAnimate = function(page, direction, step) {
    var h = 0, tmp = this.menu[page];
    if (direction) {
      do { h = tmp.maxHeight - this.menuSteps[step--]; } while (h < 0);
    } else h = tmp.maxHeight - this.menuSteps[step++];
    tmp.style.height = (h = this.math.max(0, this.math.min(tmp.maxHeight, h))) + "px";
    tmp.style.display = (!h) ? "none" : "block";
    if (h % tmp.maxHeight) {
      setTimeout(function() { self.menuAnimate(page, direction, step); }, 20);
    } else if (direction || !this.menuCur) {
      this.menuMoving = false;
      document.createElement('input').focus();
    }
  };


  /* *****
   * Examine all the "Show" options checkboxes and assign values
   *
   */
  this.setAllowed = function() {
    for (var tbod, x = 0; tbod = this.bodies[x++];)
      tbod.allowed = (tbod.primary.allowed) ? this.show[tbod.type].checked : false;
    this.moved |= 5;
  };


  /* *****
   * Rotate the viewing angle using quaternion black magic
   * Special thanks to:
   *   - http://www.gamedev.net/reference/articles/article1095.asp
   *   - http://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation
   *   - http://en.wikipedia.org/wiki/Rotation_matrix#Axis_and_angle
   *
   */
  this.rotate = function(axis, angle) {
    switch (axis) {
      case "x":
        this.quat = this.math.unitQuaternionProduct([this.math.cos(angle / 2), this.math.sin(angle / 2), 0, 0], this.quat);
        this.bkgPos[1] = (this.bkgPos[1] + angle * 620) % this.bkgSize[1];
        break;
      case "y":
        this.quat = this.math.unitQuaternionProduct([this.math.cos(angle / 2), 0, this.math.sin(angle / 2), 0], this.quat);
        this.bkgPos[0] = (this.bkgPos[0] - angle * 620) % this.bkgSize[0];
        break;
      case "z":
        this.quat = this.math.unitQuaternionProduct([this.math.cos(angle / 2), 0, 0, this.math.sin(angle / 2)], this.quat);
    } this.system.style.backgroundPosition = this.bkgPos.join("px ") + "px";

    var angle = 2 * this.math.acos(this.quat[0]), c = this.math.cos(angle), s = this.math.sin(angle), C = 1 - c;
    var scale = this.math.sqrt(this.quat[1] * this.quat[1] + this.quat[2] * this.quat[2] + this.quat[3] * this.quat[3]);
    var x = this.quat[1] / scale, y = this.quat[2] / scale, z = this.quat[3] / scale;
    this.rota = [
      [x * x * C + c, x * y * C - z * s, z * x * C + y * s],
      [x * y * C + z * s, y * y * C + c, y * z * C - x * s],
      [z * x * C - y * s, y * z * C + x * s, z * z * C + c]
    ];

    this.moved |= 5;
  };


  /* *****
   * Adjust the time speed of the simulation
   *
   */
  this.accelerate = function(multiple) {
    this.speed = this.math.max(1 / 350646, this.math.min(25, this.speed * multiple));
    var rate = this.speed / this.rate * 1000, unit = "y";
    switch (true) {
      case (rate < 0.003): unit = "h"; rate *= 8766.152713224; break;
      case (rate < 0.250): unit = "d"; rate *= 365.256363051; break;
      case (rate < 0.800): unit = "m"; rate *= 12; break;
    } this.legend[2].firstChild.nodeValue = "1s = " + rate.toFixed(1) + unit;
  };


  /* *****
   * Set the adjustment precision of the simulation
   *
   */
  this.setPrecision = function() {
    switch (this.delta *= 100) {
      case 1000000000: this.delta = 10;
      case 10: var x = "Coarse"; break;
      case 1000: var x = "Medium"; break;
      case 100000: var x = "Fine"; break;
      case 10000000: var x = "Ultra";
    } this.legend[0].firstChild.nodeValue = "\u0394: " + x;
  };


  /* *****
   * Move and draw solar system contents
   *  - Each call to this function is one frame of animation
   *
   */
  this.move = function() {

    // ***** Every 50000 frames clear and reset the setInterval
    // This seems to prevent a bug in Opera which crashes not only the browser,
    // but the OS itself, if the simulation is left on for several hours!
    if (this.reset++ >= 50000) {
      this.reset = 0;
      clearInterval(this.interval);
      this.interval = setInterval(function() { self.move(); }, this.rate);
    }

    if (!this.factOn && (this.motion || this.moved)) {
      if (this.moved & 7) {
        if (this.scale.distance.checked) {
          this.distance = this.math.max(0.1, this.math.min(this.limit[0], this.distance));
          this.legend[1].firstChild.nodeValue = "AU: " + this.distance.toFixed(2);
        } else this.distance = this.math.max(3, this.math.min(this.limit[1], this.distance));
      }
      if (this.moved & 4)
        this.canvas2D.clearRect(0, 0, this.width[0], this.height[0]);

      for (var tbx, tbxp, tbxe, tbxl, tbxes, tbxls, tdtbxz, spx, x = 0; tbx = this.bodies[x++];) {
        tbx.updateCoordinates();
        tbxes = (tbxe = tbx.element).style;
        tbxls = (tbxl = tbx.locator).style;
        tbxp = tbx.primary;

        // ***** If we are allowed to draw this object...
        if (tbx.draw && tbx.allowed) {
          tdtbxz = this.distance - tbx.xyz[1][2];
          this.appDistance = this.math.sqrt(tbx.xyz[1][0] * tbx.xyz[1][0] + tbx.xyz[1][1] * tbx.xyz[1][1] + tdtbxz * tdtbxz);
          this.appSize[0][0] = this.math.atan2((this.scale.size.checked) ? tbx.size[0] : tbx.size[1], this.appDistance) * this.factor / tbx.fudge;

          // ***** If this is Sol, control "distant star" visibility
          if (this.moved & 2 && tbx.id == "sol") {
            if (this.appSize[0][0] >= 5) { // ***** Fade out Sol image
              tbxes.opacity = this.math.min(1, (this.appSize[0][0] - 5) / 5);
              this.distant[0].opacity = this.distant[1].opacity = this.distant[2].opacity = 1 - tbxes.opacity;

            } else if (this.appSize[0][0] >= 1) { // ***** Fade out first distant star layer
              tbxes.opacity = 0;
              this.distant[0].opacity = (this.appSize[0][0] - 1) / 4;
              this.distant[1].opacity = this.distant[2].opacity = 1;

            } else { // ***** Fade out second distant star layer
              tbxes.opacity = this.distant[0].opacity = 0;
              this.distant[1].opacity = this.appSize[0][0];
              this.distant[2].opacity = 1;
            }
          }

          if (!tbx.ratio || isNaN(tbx.ratio)) tbx.ratio = tbxe.height / tbxe.width;
          this.appSize[0][0] = this.math.max(1, this.appSize[0][0]);
          this.appSize[0] = [
            this.math.round(this.appSize[0][0]),
            this.math.round(tbx.ratio * this.appSize[0][0])
          ];
          this.appSize[1] = [
            this.appSize[0][0] / 2 + 10,
            this.appSize[0][1] / 2 + 10
          ];
          this.appCoords[0] = [
            this.math.atan2(tbx.xyz[1][0] / 2, tdtbxz) * this.factor,
            this.math.atan2(tbx.xyz[1][1] / 2, tdtbxz) * this.factor
          ];
          this.appCoords[1] = [
            this.math.abs(this.appCoords[0][0]),
            this.math.abs(this.appCoords[0][1])
          ];
          this.appPos = [
            this.math.round(this.appCoords[0][0] + this.width[1]),
            this.math.round(this.appCoords[0][1] + this.height[1])
          ];

          // ***** If the object is outside the field of view in any way...
          if (tdtbxz < 0 || this.appDistance < tbx.size[0] || this.appCoords[1][0] - this.appSize[1][0] > this.width[1] || this.appCoords[1][1] - this.appSize[1][1] > this.height[1]) {
            tbxes.display = "none";

            // ***** If the planetoid finder is on, draw a pointer
            if (this.highlight && tbx.level == 1) {
              if (tdtbxz < 0) {
                this.appCoords[0][0] = -this.appCoords[0][0];
                this.appCoords[0][1] = -this.appCoords[0][1];
              }
              if (this.appCoords[1][0] - this.width[1] < this.appCoords[1][1] - this.height[1]) {
                tbxl.newdir =  (this.appCoords[0][1] > 0) ? "down" : "up";
              } else tbxl.newdir = (this.appCoords[0][0] > 0) ? "right" : "left";

              switch (tbxl.newdir) {
                case "up": case "down":
                  tbxls.top = ((tbxl.newdir == "up") ? 10 : this.height[2]) + "px";
                  tbxls.left = (spx = this.math.max(10, this.math.min(this.width[2], this.appPos[0] - 43))) + "px";
                  if (spx == 10) { tbxl.newdir += "left"; } else if (spx == this.width[2]) tbxl.newdir += "right";
                  break;

                case "right": case "left":
                  tbxls.left = ((tbxl.newdir == "right") ? this.width[2] : 10) + "px";
                  tbxls.top = (spx = this.math.max(10, this.math.min(this.height[2], this.appPos[1] - 43))) + "px";
                  if (spx == 10) { tbxl.newdir = "up" + tbxl.newdir; } else if (spx == this.height[2]) tbxl.newdir = "down" + tbxl.newdir;
              } tbxls.display = "block";
              if (tbxl.direction != tbxl.newdir) tbxls.backgroundImage = "url(ui/locator." + (tbxl.direction = tbxl.newdir) + ".png)";
            } else tbxls.display = "none";

          // ***** Otherwise draw the object
          } else {
            tbxls.display = "none";

            if (tbxe.newsrc != tbxe.src) tbxe.src = tbxe.newsrc;
            tbxes.width = this.appSize[0][0] + "px";
            tbxes.left = this.math.round(this.appPos[0] - this.appSize[1][0]) + "px";
            tbxes.top = this.math.round(this.appPos[1] - this.appSize[1][1]) + "px";
            tbxes.zIndex = this.math.round(tbx.xyz[1][2] * this.limit[0]) + 10000000;
            tbxes.display = "block";

            // ***** Draw orbit trails
            if (this.trailsOn && !(this.moved & 4)) {
              if (tbx.sweep[1] > this.trailsDots) {
                this.canvas2D.fillStyle = tbx.trails;
                this.canvas2D.fillRect(this.appPos[0], this.appPos[1], 1, 1);
              } else if (tbx.prevPos[0] || tbx.prevPos[1]) {
                this.canvas2D.beginPath();
                this.canvas2D.lineWidth = 1;
                this.canvas2D.strokeStyle = tbx.trails;
                this.canvas2D.moveTo(tbx.prevPos[0] + this.width[3], tbx.prevPos[1] + this.height[3]);
                this.canvas2D.lineTo(this.appPos[0], this.appPos[1]);
                this.canvas2D.stroke();
              }
            }
          } tbx.prevPos = [this.appPos[0], this.appPos[1]];
        } else tbxes.display = tbxls.display = "none";
      } this.moved = this.width[3] = this.height[3] = 0;
    }
  };


  // ***** Initialization
  document.documentElement.unselectable = "on";
  document.documentElement.addEventListener('mousedown', function() { return false; }, false);

  this.system.style.width = this.width[0] + "px";
  this.system.style.height = this.height[0] + "px";
  for (var x = 0; x < 3; x++) {
    this.distant[x] = document.createElement('img');
    this.distant[x].src = "object/sol.distant" + (x + 1) + ".png";
    this.distant[x].className = "distant";
    this.distant[x].alt = "Distant Sol " + (x + 1);
    this.system.appendChild(this.distant[x]);
    this.distant[x] = this.distant[x].style;
  }
  for (var x = 4, bar = document.getElementById('bar').getElementsByTagName('li'); x > 0; x--) {
    bar[x - 1].addEventListener('click', (function(x) { return function() { self.menuPage(x); }})(x), false);
    this.menu[x] = document.getElementById('page' + x);
    this.menu[x].maxHeight = this.menu[x].offsetHeight - 35;
    this.menu[x].style.display = "none";
    this.menu[x].style.visibility = "visible";
    this.menu[x].style.height = "0px";
  }
  this.legend[0].addEventListener('click', function() { self.setPrecision(); }, false);
  this.legend[1].style.display = this.legend[2].style.display = "none";
  this.scale.distance.addEventListener('click', function() {
    self.legend[1].style.display = (this.checked) ? "block" : "none";
    self.moved |= 7;
  }, false);
  this.scale.speed.addEventListener('click', function() { self.legend[2].style.display = (this.checked) ? "block" : "none"; }, false);
  this.scale.size.addEventListener('click', function() { self.moved |= 2; }, false);
  this.factAllow.addEventListener('click', function() {
    self.system.className = (this.checked) ? self.system.className.replace(/nofact/, "").trim() : self.system.className + " nofact";
  }, false);
  for (objtype in this.show)
    if (this.show[objtype].nodeName)
      this.show[objtype].addEventListener('click', function() { self.setAllowed(); }, false);

  // Adjust the available viewport size selector options
  var sele = document.getElementById('systemSize');
      sele.addEventListener('click', function(e) { e.stopPropagation(); }, false);
      sele.addEventListener('change', function() { self.resize(this.value); }, false);
  for (var res = true, fsc = true, sel, svs, x = sele.options.length - 1; x > -1 && (sel = sele.options[x--]);) {
    svs = sel.value.split('x'); svs[0] = Number(svs[0]); svs[1] = Number(svs[1]);
    if (svs[0] <= screen.width && svs[1] <= screen.height) {
      if (svs[0] == screen.width && svs[1] == screen.height) {
        sel.firstChild.nodeValue = "Fullscreen";
        fsc = false;
      }
      if (svs[0] == this.width[0] && svs[1] == this.height[0]) {
        sel.selected = "selected";
        res = false;
      }
    } else sele.removeChild(sel);
  }
  if (fsc) {
    var option = document.createElement('option');
        option.value = screen.width + "x" + screen.height;
        option.appendChild(document.createTextNode("Fullscreen"));
    sele.appendChild(option);
  }
  if (res) {
    var option = document.createElement('option');
        option.value = this.width[0] + "x" + this.height[0];
        option.appendChild(document.createTextNode(option.value.replace(/x/, " x ")));
        option.selected = "selected";
    sele.appendChild(option);
  }

  // Update version and copyright date
  document.getElementById('footer_version').firstChild.nodeValue = this.version;
  document.getElementById('footer_date').firstChild.nodeValue = (new Date()).getFullYear();

  // Cancel event bubbling from all control panel checkboxen
  for (var inp, inputs = document.getElementsByTagName('input'), x = 0; inp = inputs[x++];)
    if (inp.type == "checkbox") inp.parentNode.addEventListener("click", function(e) { e.stopPropagation(); return true; }, false);

  // Cancel event bubbling from all control panel links
  for (var link, links = document.getElementById('pages').getElementsByTagName('a'), x = 0; link = links[x++];)
    link.addEventListener("click", function(e) { e.stopPropagation(); return true; }, false);

  // Listen for keyboard input
  document.documentElement.addEventListener("keydown", function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    clearTimeout(self.repeat);
    clearInterval(self.repeat);
    self.menuPage(0);
    if (self.factOn == 2) {
      self.factOn = -1;
      fade[0] = new FadeAction('fact', false, function() { self.factOn = 0; fade[0] = null; });
    }

    switch (ev.keyCode) {
      case 38: case 175: // Up Arrow ~ Increase Pitch
        self.rotate("x", 1 / self.delta);
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() { self.rotate("x", 1 / self.delta); }, 30);
        }, 200);
        break;
      case 39: case 177: // Right Arrow ~ Increase Yaw
        self.rotate("y", 1 / self.delta);
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() { self.rotate("y", 1 / self.delta); }, 30);
        }, 200);
        break;
      case 49: // 1 ~ Increase Roll
        self.rotate("z", 1 / self.delta);
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() { self.rotate("z", 1 / self.delta); }, 30);
        }, 200);
        break;
      case 40: case 176: // Down Arrow ~ Decrease Pitch
        self.rotate("x", -1 / self.delta);
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() { self.rotate("x", -1 / self.delta); }, 30);
        }, 200);
        break;
      case 37: case 178: // Left Arrow ~ Decrease Yaw
        self.rotate("y", -1 / self.delta);
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() { self.rotate("y", -1 / self.delta); }, 30);
        }, 200);
        break;
      case 50: // 2 ~ Decrease Roll
        self.rotate("z", -1 / self.delta);
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() { self.rotate("z", -1 / self.delta); }, 30);
        }, 200);
        break;
      case 36: case 174: // Home ~ Move Toward the Origin
        self.distance -= self.distance / self.delta;
        self.moved |= 6;
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() {
            self.distance -= self.distance / self.delta;
            self.moved |= 6;
          }, 30);
        }, 200);
        break;
      case 35: case 170: // End ~ Move Away From the Origin
        self.distance += self.distance / self.delta;
        self.moved |= 6;
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() {
            self.distance += self.distance / self.delta;
            self.moved |= 6;
          }, 30);
        }, 200);
        break;
      case 8: case 46: case 173: // Delete ~ Decrease Orbit Speed
        if (ev.shiftKey) {
          self.accelerate(1.1);
          self.repeat = setTimeout(function() {
            self.repeat = setInterval(function() { self.accelerate(1.1); }, 30);
          }, 200);
        } else {
          self.accelerate(0.9);
          self.repeat = setTimeout(function() {
            self.repeat = setInterval(function() { self.accelerate(0.9); }, 30);
          }, 200);
        }
        break;
      case 45: case 172: // Insert ~ Increase Orbit Speed
        self.accelerate(1.1);
        self.repeat = setTimeout(function() {
          self.repeat = setInterval(function() { self.accelerate(1.1); }, 30);
        }, 200);
        break;
      case 33: // Page Up ~ View From Above Ecliptic
      case 34: // Page Down ~ View From Ecliptic
        self.quat = [1, 0, 0, 0];
        self.bkgPos = [0, 0];
        self.rotate("x", self.math.PI * ((ev.keyCode == 34) ? 1.5 : 1));
        break;
      case 32: // Space ~ Toggle Orbit Motion
        self.motion ^= ((ev.shiftKey) ? 2 : 1);
        self.moved |= 4;
        break;
      case 66: // B ~ Step Through Backgrounds
        switch (++self.bkgOn) {
          case 1:
            self.system.style.backgroundColor = "#000000";
            self.system.style.backgroundImage = "url(ui/starfield.png)";
            self.legend[0].parentNode.className = "";
            break;
          case 2:
            self.system.style.backgroundImage = "none";
            break;
          case 3:
            self.system.style.backgroundColor = "transparent";
            self.legend[0].parentNode.className = "ontrans";
            self.bkgOn = 0;
        } break;
      case 70: // F ~ Find Planetoids
        self.system.className = (self.highlight ^= 1) ? self.system.className + " highlight" : self.system.className.replace(/highlight/, "").trim();
        break;
      case 77: // M ~ Toggle Menu
        if (!fade[3]) fade[3] = new FadeAction('menu', !self.menuOn, (function(v) { return function() { self.menuOn = v; fade[3] = null; }})(!self.menuOn));
        break;
      case 80: // P ~ Change Adjustment Precision
        self.setPrecision();
        break;
      case 84: // T ~ Toggle Planetoid Trails
        if (!(self.trailsOn ^= 1)) self.moved |= 4;
        break;

      case 71: // G ~ Red Giant
        var sbsol = self.bodies[self.bodID.sol], size = 1;
        if (sbsol.element.newsrc != "object/sol.png") {
          size = 109 / self.math.AUinEarthDiameters / 2;
          sbsol.element.newsrc = "object/sol.png";
        } else sbsol.element.newsrc = "object/sol_giant.png";
        sbsol.size = [size, self.math.pow(size, 1 / 3) / 1.5];
        self.moved |= 2;
        break;
      case 65: // A ~ Show Astronaut
        if (self.bodies[self.bodID.astronaut].draw ^= 1)
          self.bodies[self.bodID.astronaut].time = self.bodies[self.bodID.mars].time - 0.1;
        self.moved |= 1;
        break;
      case 73: // I ~ Show International Space Station
        self.bodies[self.bodID.iss].draw ^= 1;
        self.moved |= 1;
        break;
      case 79: // O ~ Show Opera
        self.bodies[self.bodID.opera].draw ^= 1;
        self.moved |= 1;
        break;
      case 82: // R ~ Show Reptilon
        if (self.bodies[self.bodID.reptilon].draw ^= 1)
          self.bodies[self.bodID.reptilon].time = self.bodies[self.bodID.earth].time + 0.5;
        self.moved |= 1;
    } return false;
  }, false);
  document.documentElement.addEventListener("keyup", function(ev) {
    clearTimeout(self.repeat);
    clearInterval(self.repeat);
  }, false);

  // Close any open items on document click
  document.documentElement.addEventListener("click", function(ev) {
    if (self.factOn == 2) {
      self.factOn = -1;
      fade[1] = new FadeAction('fact', false, function() { self.factOn = 0; fade[1] = null; });
    } self.menuPage(0);
  }, false);

  // Close button
  document.getElementById('close').addEventListener("click", function() { window.close(); }, false);


  // Initialise the system
  this.resize(sele.value);
  this.rotate("x", 1.475);
  this.accelerate(1);
}



/* ********************************************************************
 * Create an object within the system
 *  - name         ~ Name of the object
 *  - id           ~ Element ID
 *  - type         ~ Planetoid type
 *  - primary      ~ Object which this object orbits
 *  - size         ~ Size of the object, in Earth diameters
 *  - orbit        ~ Mean orbit distance of the object, in AU
 *  - period       ~ Orbit revolution time, in Earth years
 *  - incline      ~ Degrees offset from the ecliptic
 *  - tilt         ~ Degrees of axial tilt *** See note in data.js ***
 *  - eccentricity ~ Degree of deformation in circular orbit
 *  - AoP          ~ Argument of Perihelion in degrees
 *  - LoAN         ~ Longitude of Ascending Node in degrees
 *  - fudge        ~ Percent of image width which is actually object
 *
 */
function SolarObject(name, id, type, primary, size, orbit, period, incline, tilt, eccentricity, AoP, LoAN, fudge) {
  var self = this, parent = planetWerks;

  this.math    = Math;

  this.name    = name;
  this.id      = id;
  this.type    = type;
  if (primary == "none") {
    this.primary = {
      allowed: true,
      xyz: [[0, 0, 0], [0, 0, 0]],
      sweep: [0, 0, 0],
      level: -1
    };
  } else this.primary = parent.bodies[parent.bodID[primary]];
  this.level   = this.primary.level + 1;
  this.motion  = false;
  this.draw    = (type != "egg");
  this.allowed = true;
  this.trails  = parent.trails[type] || parent.trails.other;
  this.prevPos = [0, 0];

  this.element = document.createElement('img');
  this.locator = document.createElement('div');
  this.pscale  = [parent.scale.speed, parent.scale.distance];

  this.size    = [size / this.math.AUinEarthDiameters / 2, this.math.pow(size / this.math.AUinEarthDiameters / 2, 1 / 3) / 1.5];
  this.eccen   = [eccentricity, this.math.sqrt(1 - eccentricity * eccentricity)];
  this.orbit   = [orbit, orbit * this.eccen[1]];
  this.au      = 0;
  this.period  = [
    period,
    this.math.abs(period / 4),
    (period >= 0) ? 1 : -1,
    this.math.sqrt(this.math.abs(period)) * ((period >= 0) ? 1 : -1),
    this.math.PI2 / period
  ];
  this.time    = this.math.random() * period;
  this.sweep   = [0, 0, 0, this.math.PI2 - parent.trailsDots];
  this.ratio   = 0;
  this.fudge   = fudge;

  this.angle   = 0;
  this.matrix  = false;
  this.xyz     = [[0, 0, 0], [0, 0, 0]];
  this.AoP     = this.math.PI * AoP / 180;
  this.LoAN    = this.math.PI * LoAN / 180;
  this.incl    = this.math.PI * (2 - incline / 180);
  this.tilt    = this.math.PI * (2 - tilt / 180);
  this.trig    = [
    this.math.cos(this.AoP),  this.math.sin(this.AoP),
    this.math.cos(this.incl), this.math.sin(this.incl),
    this.math.cos(this.LoAN), this.math.sin(this.LoAN),
    this.math.cos(this.tilt), this.math.sin(this.tilt)
  ];

  this.fact    = [];
  this.factCur = -1;


  /* *****
   * Determine the position of this object in 3D space
   * Special thanks to:
   *   - http://jgiesen.de/kepler/kepler.html
   *
   */
  this.updateCoordinates = function() {
    this.motion = parent.motion & this.level;

    // ***** Update object's co-ordinates if it is in motion
    if ((this.motion || parent.moved) && this.orbit[0]) {

      // ***** Move object in its orbit, if applicable
      if (this.motion) {
        this.time += this.sweep[0] = parent.speed * ((this.pscale[0].checked) ? this.period[2] : this.period[3]);
        this.time %= this.period[0];

        // ***** Kepler's Planetary Motion equations
        var M = this.period[4] * this.time, i = 0;
        var E = (this.eccen[0] < 0.8) ? M : this.math.PI;
        var F = E - this.eccen[0] * this.math.sin(M) - M;
        while (this.math.abs(F) > 0.001 && i++ < 30) {
          E -= F / (1 - this.eccen[0] * this.math.cos(E));
          F = E - this.eccen[0] * this.math.sin(E) - M;
        }
      } else { var E = this.sweep[2]; }

      this.xyz[0] = [this.orbit[0] * (this.math.cos(E) - this.eccen[0]), this.orbit[1] * this.math.sin(E), 0];
      this.au = this.math.sqrt(this.xyz[0][0] * this.xyz[0][0] + this.xyz[0][1] * this.xyz[0][1]);

      // ***** Calculate the sweep angle of one frame
      if (this.math.abs(this.sweep[0]) < this.period[1]) {
        if ((this.sweep[1] = this.math.abs(E - this.sweep[2])) > this.sweep[3])
          this.sweep[1] = this.math.abs(this.sweep[1] - this.math.PI2);
        this.sweep[1] += this.primary.sweep[1];
      } else this.sweep[1] = parent.trailsDots + 1;
      this.sweep[2] = E;

      // ***** Adjustment for power-law distance
      if (!this.pscale[1].checked) {
        var angle = this.math.atan2(this.eccen[1] * this.math.sin(E), this.math.cos(E) - this.eccen[0]);
        if (angle < 0) this.angle += this.math.PI2;
        var ratio = this.math.pow(this.au, 1 / 3) / 2;
        this.xyz[0] = [ratio * this.math.cos(angle), ratio * this.math.sin(angle), 0];
      }

      // ***** Rotate this vector based on the pre-calculated rotation matrix
      this.xyz[0] = this.math.matrixVectorProduct(this.matrix, this.xyz[0]);
    }

    // ***** Translate to the primary's coordinates
    this.xyz[1] = [
      this.xyz[0][0] + this.primary.xyz[0][0],
      this.xyz[0][1] + this.primary.xyz[0][1],
      this.xyz[0][2] + this.primary.xyz[0][2]
    ];

    // ***** Rotate according to the global viewing angle
    this.xyz[1] = this.math.matrixVectorProduct(parent.rota, this.xyz[1]);
  };


  // ***** Initialization
  parent.bodID[this.element.id = this.id] = parent.bods++;

  this.element.src = this.element.newsrc = "object/" + this.id + ".png";
  this.element.alt = this.name;
  this.element.addEventListener("click", function(e) {
    if (parent.factAllow.checked && !parent.factOn) {
      parent.factOn = 1;
      e.stopPropagation();
      parent.menuPage(0);

      parent.factSymbol.src = "symbol/" + self.id + ".png";
      parent.factBox.firstChild.firstChild.nodeValue = parent.factSymbol.alt = self.name;
      parent.factBox.firstChild.nextSibling.firstChild.nodeValue = (self.level == 1) ? "@ " + self.au.toFixed(2) + " AU" : "\xa0";
      parent.factBox.lastChild.innerHTML = self.fact[self.factCur = ++self.factCur % self.fact.length];

      var vert = (self.element.offsetTop + self.element.offsetHeight / 2 >= parent.height[1]) ? "top" : "bottom";
      var horz = (self.element.offsetLeft + self.element.offsetWidth / 2 >= parent.width[1]) ? "left" : "right";

      parent.factBox.className = vert + " " + horz;
      parent.factBox.style.display = "block";
      parent.factBox.style.top = self.math.min(parent.height[0] - parent.factBox.offsetHeight - 10, self.math.max(10, self.element.offsetTop + self.math.round((vert == "top") ? self.element.offsetHeight / 4 - parent.factBox.offsetHeight + 6 : self.element.offsetHeight * 3 / 4 - 6))) + "px";
      parent.factBox.style.left = self.math.min(parent.width[0] - parent.factBox.offsetWidth - 10, self.math.max(10, self.element.offsetLeft + self.math.round((horz == "left") ? self.element.offsetWidth / 4 - parent.factBox.offsetWidth + 6 : self.element.offsetWidth * 3 / 4 - 6))) + "px";

      fade[2] = new FadeAction('fact', true, function() { parent.factOn = 2; fade[2] = null; });
    }
  }, false);
  parent.system.appendChild(this.element);

  this.ratio = this.element.height / this.element.width;
  setTimeout(function() { self.element.style.visibility = "visible"; }, 100);

  this.matrix = this.math.matrixProduct(
    this.math.matrixProduct(
       [[this.trig[4], -this.trig[5], 0], [this.trig[5], this.trig[4], 0], [0, 0, 1]], // Longitude of the Ascending Node
       [[1, 0, 0], [0, this.trig[2], -this.trig[3]], [0, this.trig[3], this.trig[2]]]  // Incline to the ecliptic
    ), [[this.trig[0], -this.trig[1], 0], [this.trig[1], this.trig[0], 0], [0, 0, 1]]  // Argument of Perihelion
  );
  if (this.level > 1) { // Primary's axial tilt rotation matrix if this is a satellite
    this.matrix = this.math.matrixProduct(this.matrix,
      [[1, 0, 0], [0, this.primary.trig[6], -this.primary.trig[7]], [0, this.primary.trig[7], this.primary.trig[6]]]
    );

  } else if (this.level == 1) { // Insert planetoid finder element
    this.locator.direction = this.locator.newdir = "";
    this.locator.className = "locator";
    var img = document.createElement('img');
        img.src = "symbol/" + this.id + ".png";
    this.locator.appendChild(img);
    parent.system.appendChild(this.locator);
  }
}



/* ********************************************************************
 * Linear CSS opacity fade animation; acts on menu and factboxes
 *  - id    ~ Element ID
 *  - inout ~ Fade in or out
 *  - after ~ Javascript function to execute upon completion of the animation
 *
 */
function FadeAction(id, inout, after) {
  var self   = this;

  this.objst = document.getElementById(id).style;
  this.inout = (inout) ? 1 : -1;
  this.after = after;
  this.opcty = (inout) ? 0 : 10;
  this.inter = setInterval(function() { self.animate(); }, 20);

  this.objst.opacity = this.opcty / 10;
  this.objst.display = "block";

  this.animate = function() {
    this.objst.opacity = (this.opcty = Math.max(0, Math.min(10, this.opcty + this.inout))) / 10;
    if (!(this.opcty % 10)) {
      clearInterval(this.inter);
      if (!this.opcty) this.objst.display = "none";
      this.after();
    }
  };
}