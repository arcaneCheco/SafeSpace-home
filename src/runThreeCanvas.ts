import * as THREE from "three";
import Visuals from "./Visuals";
import gsap from "gsap";

const runThreeCanvas = (): void => {
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

    let makeTransition: boolean = false;
    const leaveView = (): void => {
      const currentView = window.location.hash.slice(1);
      const objectToRemove = visuals.scene.getObjectByName(currentView);
      gsap.to(overlayMaterial.uniforms.uAlpha, {
        duration: 2,
        value: 1,
        onComplete: () => {
          objectToRemove && visuals.scene.remove(objectToRemove);
        },
      });
    };
    const enterView = (goToPage: string): void => {
      gsap.to(overlayMaterial.uniforms.uAlpha, {
        delay: 2,
        duration: 2,
        value: 0,
        onStart: () => {
          switch (goToPage) {
            case "home":
              visuals.scene.background = homeBGcolor;
              visuals.scene.add(homeText);
              break;
            case "mission":
              visuals.scene.background = missionBGcolor;
              visuals.scene.add(missionText);
              break;
            case "team":
              visuals.scene.background = teamBGcolor;
              visuals.scene.add(teamText);
              break;
            case "gate":
              visuals.scene.background = gateBGcolor;
              visuals.scene.add(gateText);
              break;
            default:
              visuals.scene.background = homeBGcolor;
              visuals.scene.add(homeText);
              break;
          }
          makeTransition = false;
        },
      });
    };
    const setGoToPage = (direction: string): string => {
      const currentView = window.location.hash.slice(1);
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
    const doTransition = (
      direction: string,
      isInitial: boolean = false
    ): void => {
      makeTransition = true;
      let goToPage: string;
      if (isInitial) {
        goToPage = "home";
        window.location.assign(`http://localhost:3000/#home`);
        visuals.scene.background = homeBGcolor;
        visuals.scene.add(homeText);
        makeTransition = false;
        return;
      }
      goToPage = setGoToPage(direction);
      const url = `http://localhost:3000/#${goToPage}`;
      if (url === window.location.href) {
        makeTransition = false;
        return;
      }
      leaveView();
      window.location.assign(url);
      enterView(goToPage);
    };
    const transitionHandler = (e: WheelEvent): void => {
      if (!makeTransition) {
        if (e.deltaY > 100) {
          doTransition("up");
        } else if (e.deltaY < -100) {
          doTransition("down");
        }
      }
    };
    doTransition("up", true);
    // TO-DO: handle transition via hashchange eventlistener to enable menu routng in future
    window.addEventListener("wheel", transitionHandler);

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
      if (makeTransition) {
      }
      visuals.renderer.render(visuals.scene, visuals.camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }
};
export default runThreeCanvas;
