//dit helemaal hertypen
AFRAME.registerComponent("toggle-menu", {
  dependencies: ["raycaster"],

  schema: {
    type: "selector",
  },

  // menu.object3D.visible doesn't show correct value when init() is used, possibly due to load order. Use play() instead.
  play: function () {
    var button = this.el;
    var scene = this.el.sceneEl;
    var cursor = scene.querySelector("[raycaster]");
    var menu = this.data;
    var menus = scene.querySelectorAll(".menu");
    var menuItems = menu.querySelectorAll(".clickable");

    // Replace .clickable with .clickable-disabled for our menu if it's hidden and refresh raycaster.
    if (!menu.object3D.visible) {
      for (var i = 0; i < menuItems.length; i++) {
        // classList.replace() is not currently supported in Microsoft Edge and Samsung Internet
        // menuItems[i].classList.replace('clickable', 'clickable-disabled');

        // Workaround
        menuItems[i].classList.remove("clickable");
        menuItems[i].classList.add("clickable-disabled");
      }

      // Refresh raycaster.
      cursor.components.raycaster.refreshObjects();
    }

    // Define handler function for event listener.
    function clickHandler(e) {
      // If our menu is already visible, return and exit function.
      if (!!menu.object3D.visible) return;

      // Hide all menus.
      for (var i = 0; i < menus.length; i++) {
        // If menu is our menu, skip to next menu in the loop.
        if (menus[i] === menu) continue;

        // Get each menu's items.
        var items = menus[i].querySelectorAll(".clickable");

        // Hide each menu.
        menus[i].object3D.visible = false;

        // Disable each menu's items by temporarily removing class.
        for (var j = 0; j < items.length; j++) {
          // Replace class.

          // classList.replace() is not currently supported in Microsoft Edge and Samsung Internet.
          // items[j].classList.replace('clickable', 'clickable-disabled');

          // Workaround
          items[j].classList.remove("clickable");
          items[j].classList.add("clickable-disabled");
        }
      }

      // Only show our menu.
      menu.object3D.visible = true;

      // Make our menu's items clickable.
      for (var i = 0; i < menuItems.length; i++) {
        // classList.replace() is not currently supported in Microsoft Edge and Samsung Internet.
        // menuItems[i].classList.replace('clickable-disabled', 'clickable');

        // Workaround
        menuItems[i].classList.remove("clickable-disabled");
        menuItems[i].classList.add("clickable");
      }

      // refreshen van raycaster componenten
      cursor.components.raycaster.refreshObjects();
    }

    // Add event listener to the button.
    button.addEventListener("click", clickHandler);
  },
});

AFRAME.registerComponent("app", {
  init: function () {
    const light = document.getElementById("js--light");

    function turnOffLight() {
      light.setAttribute("light", "type: ambient; color: #BBB");
    }

    const camera = document.getElementById("camera-cirkel");
    const objectPlaatsen = document.getElementsByClassName("neerleggen");
    let scene = document.getElementById("js-scene");
    let oppakbaar = document.getElementsByClassName("oppakken");
    let vasthouden = null;
    let planeCounter = 0;

    let CPU = document.getElementById("CPU");
    let CpuPlaats = document.getElementById("CPUplaats");
    let ramGeheugen = document.getElementById("RAM");
    let ramPlaats = document.getElementById("RAMplaats");

    let foto = document.getElementsByClassName("Foto1");

    function addListeners() {
      oppakbaar = document.getElementsByClassName("oppakken");
      foto = document.getElementsByClassName("Foto1");
      for (let i = 0; i < oppakbaar.length; i++) {
        oppakbaar[i].addEventListener("click", function (evt) {
          console.log("aanroep");
          // de
          if (vasthouden == null) {
            console.log("zit erin");

            const newPlane = document.createElement("a-plane");
            const planeId = "plane" + planeCounter++;
            if (this.getAttribute("id") == "CPU") {
              console.log("hallo 1234");
              newPlane.setAttribute("src", "images/CPU.jpg");
              newPlane.setAttribute("width", 2);
              newPlane.setAttribute("height", 2);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen Foto1"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "SSD") {
              newPlane.setAttribute("src", "images/SSD.jpg");
              newPlane.setAttribute("width", 2);
              newPlane.setAttribute("height", 2);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen Foto1"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "RAM") {
              newPlane.setAttribute("src", "images/RAM.jpg");
              newPlane.setAttribute("width", 3);
              newPlane.setAttribute("height", 1);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen Foto1"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            }

            camera.appendChild(newPlane);
            vasthouden = "plane";

            console.log("plane id:", planeId);
            console.log("er wordt een plane vastgehouden");

            if (this === CPU) {
              console.log("geklikt op de CPU");
            } else if (this === CpuPlaats) {
              console.log("geklikt op CPUplaats");
            } else if (this === ramGeheugen) {
              console.log("geklikt op RAM");
            } else if (this === ramPlaats) {
              console.log("clicked op ramplaats");
            }

            this.parentNode.removeChild(this);
            addListeners();
          }
        });
      }
    }

    addListeners();

    for (let i = 0; i < objectPlaatsen.length; i++) {
      objectPlaatsen[i].addEventListener("click", function (evt) {
        console.log("neerleg plek is geklikt", i);
        //hierergens een if statement?? als ik een plane oppak en wil plaatsen moet het kloppen
        //hetgeen wat je vast hebt moet hier naar null gezet worden en - vasthouden
        if (vasthouden == "plane") {
          console.log("er is een plane geplaatst");

          if (this.getAttribute("plane") != "neerleggen") {
            light.setAttribute("light", "type:ambient; color: #008000");
            setInterval(turnOffLight, 3000);
            const plane = document.createElement("a-plane");
            console.log("ik zit er net buiten");

            console.log("Clicked element ID:", this.getAttribute("id"));
            if (this.getAttribute("id") == "CPUplaats") {
              console.log("hallo123");
              plane.setAttribute("class", "oppakken");
              plane.setAttribute("src", "images/CPU.jpg");
              plane.setAttribute("width", 2);
              plane.setAttribute("height", 2);
              plane.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "0.7",
                z: this.getAttribute("position").z,
              });
            } else if (this.getAttribute("id") == "RAMplaats") {
              plane.setAttribute("class", "oppakken");
              plane.setAttribute("src", "images/RAM.jpg");
              plane.setAttribute("width", 3);
              plane.setAttribute("height", 1);
              plane.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "0.7",
                z: this.getAttribute("position").z,
              });
            }
            scene.appendChild(plane);

            let klikbaarElement =
              document.getElementsByClassName("plekPlaatsen");
            while (klikbaarElement.length > 0) {
              klikbaarElement[0].parentNode.removeChild(klikbaarElement[0]);
            }
          }
          addListeners();

          vasthouden = null;
        }
      });
    }
  },
});

AFRAME.registerComponent("cursor-listener", {
  init: function () {
    var el = this.el;
    el.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  },
});

AFRAME.registerComponent("cursor-listener1", {
  init: function () {
    var el = this.el;
    el.addEventListener("click", function () {
      window.location.href = "frontpage.html";
    });
  },
});
AFRAME.registerComponent("playGeluid", {
  init: function () {
    var el = this.el;
    var afspeelGeluid = document.getElementById("afspeelGeluid");

    el.addEventListener("click", function () {
      afspeelGeluid.components.sound.play();
    });
  },
});
