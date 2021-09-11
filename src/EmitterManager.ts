import Emitter from "component-emitter";

class EmitterManager {
  emit: any;
  constructor() {
    Emitter(this);
  }
}

export default new EmitterManager();
