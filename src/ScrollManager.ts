import EmitterManager from "./EmitterManager";
import VirtualScroll from "virtual-scroll";
const virtualScroll = new VirtualScroll();

class ScrollManager {
  targetY: number;
  constructor() {
    this.targetY = 0;

    this.scroll = this.scroll.bind(this);
  }

  on() {
    virtualScroll.on(this.scroll);
  }

  off() {
    virtualScroll.off();
  }

  destroy() {
    alert("destroy Vs");
    virtualScroll.destroy();
  }

  scroll(e: any) {
    EmitterManager.emit("scroll", e);
  }
}

export default new ScrollManager();
