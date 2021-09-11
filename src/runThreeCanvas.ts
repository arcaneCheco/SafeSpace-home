import * as THREE from "three";
import Visuals from "./Visuals";
import gsap from "gsap";

const runThreeCanvas = (): void => {
  // initalViewSet doesn't belong inside hashchangehandler, TO:DO
  let canvas: HTMLCanvasElement | null;
  canvas = document.querySelector("#canvas");
  if (canvas) {
    const visuals = new Visuals(canvas);

    // home screen
    const homeBGcolor = new THREE.Color("#86c166");
    const homeText = new THREE.Group();
    homeText.name = "home";
    visuals.createText(homeText, "Welcome to SafeSpace");

    // mission screen
    const missionBGcolor = new THREE.Color("#66BAB7");
    const missionText = new THREE.Group();
    missionText.name = "mission";
    visuals.createText(missionText, "Mission");

    // team screen
    const teamBGcolor = new THREE.Color("#0089A7");
    const teamText = new THREE.Group();
    teamText.name = "team";
    visuals.createText(teamText, "Team");

    // gate screen
    const gateBGcolor = new THREE.Color("#986DB2");
    const gateText = new THREE.Group();
    gateText.name = "gate";
    visuals.createText(gateText, "Comng soon :-)");

    // set inital view
    let initialViewSet: boolean = false;
    if (window.location.hash === "#home") {
      visuals.scene.background = homeBGcolor;
      visuals.scene.add(homeText);
      initialViewSet = true;
    } else {
      window.location.assign(`http://localhost:3000/#home`);
    }
    let currentView: string;

    const hashChangeHandler = (e: any) => {
      if (!initialViewSet) {
        visuals.scene.background = homeBGcolor;
        visuals.scene.add(homeText);
        currentView = "home";
        initialViewSet = true;
        // transitioning = false;
      } else {
        const newView = e.newURL.split("#")[1];
        if (
          (newView !== "home" &&
            newView !== "mission" &&
            newView !== "team" &&
            newView !== "gate") ||
          newView === currentView
        ) {
          console.log("invalid path or already on set path");
          return;
        } else {
          leaveView(currentView);
          enterView(newView);
        }
      }
    };
    window.addEventListener("hashchange", hashChangeHandler);

    const transitionHandler = (e: WheelEvent): void => {
      if (!transitioning) {
        if (e.deltaY > 100) {
          doTransition("up");
        } else if (e.deltaY < -100) {
          doTransition("down");
        }
      }
    };
    window.addEventListener("wheel", transitionHandler);

    let transitioning: boolean = false;
    const leaveView = (leaveView: string): void => {
      const objectToRemove = visuals.scene.getObjectByName(leaveView);
      gsap.to(overlayMaterial.uniforms.uAlpha, {
        duration: 2,
        value: 1,
        onComplete: () => {
          objectToRemove && visuals.scene.remove(objectToRemove);
        },
      });
    };
    const enterView = (newView: string): void => {
      gsap.to(overlayMaterial.uniforms.uAlpha, {
        delay: 2,
        duration: 2,
        value: 0,
        onStart: () => {
          switch (newView) {
            case "home":
              visuals.scene.background = homeBGcolor;
              visuals.scene.add(homeText);
              currentView = "home";
              break;
            case "mission":
              visuals.scene.background = missionBGcolor;
              visuals.scene.add(missionText);
              currentView = "mission";
              break;
            case "team":
              visuals.scene.background = teamBGcolor;
              visuals.scene.add(teamText);
              currentView = "team";
              break;
            case "gate":
              visuals.scene.background = gateBGcolor;
              visuals.scene.add(gateText);
              currentView = "gate";
              break;
            default:
              visuals.scene.background = homeBGcolor;
              visuals.scene.add(homeText);
              currentView = "home";
              break;
          }
          transitioning = false;
        },
      });
    };
    const setGoToPage = (direction: string, currentView: string): string => {
      let goToPage = "";
      switch (currentView) {
        case "home":
          direction === "up" ? (goToPage = "mission") : (goToPage = "home");
          break;
        case "mission":
          direction === "up" ? (goToPage = "team") : (goToPage = "home");
          break;
        case "team":
          direction === "up" ? (goToPage = "gate") : (goToPage = "mission");
          break;
        case "gate":
          direction === "up" ? (goToPage = "gate") : (goToPage = "team");
          break;
        default:
          goToPage = "home";
      }
      return goToPage;
    };
    const doTransition = (direction: string): void => {
      transitioning = true;
      let goToPage: string;
      goToPage = setGoToPage(direction, currentView);
      if (goToPage === currentView) {
        transitioning = false;
        return;
      }
      console.log(goToPage);
      const url = `http://localhost:3000/#${goToPage}`;
      window.location.assign(url);
    };

    // transition screen
    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const overlayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 0 },
      },
      vertexShader: `
    void main ()
    {
      gl_Position = vec4(position, 1.);
    }
  `,
      fragmentShader: `
    uniform float uAlpha;
    void main ()
    {
      gl_FragColor = vec4(0.,0.,0.,uAlpha);
    }
  `,
      transparent: true,
    });
    const overlayScreen = new THREE.Mesh(overlayGeometry, overlayMaterial);
    visuals.scene.add(overlayScreen);

    const tick = (): void => {
      visuals.renderer.render(visuals.scene, visuals.camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }
};
export default runThreeCanvas;
