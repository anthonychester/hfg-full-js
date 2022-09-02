import { Application } from "pixi.js";
import { Loading } from "./pages/Loading";
import * as PIXI from "pixi.js";

/**
 * x: number
 * y: number
 */
class xypair {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 *xm: number;
 *ym: number;
 *data: dataT;
 *curent: object;
 *Loading Screen
 *loading: Loading;
 *secne: sences;
 *mods: any;
 *inputHandler: any;
 *loader: any;
 *updatesize: CustomEvent;
 *isloaded: boolean;
 *gameData: gameData;
 */
export class applt extends Application {
  constructor(outputWidth, outputHeight, options) {
    super(outputWidth, outputHeight, options);
    //@ts-ignore
    this.loader = PIXI.Loader.shared;
    this.mods = {};
    //@ts-ignore
    this.stage.sortableChildren = true;

    this.xm = this.view.width / 500;
    this.ym = this.view.height / 200;

    this.updatesize = new CustomEvent("updatesize", {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false
    });

    this.loading = new Loading(this);
    this.resize = () => {
      const inputImageAspectRatio = window.innerWidth / window.innerHeight;

      const outputImageAspectRatio = 16 / 9;

      let outputWidth = window.innerWidth;
      let outputHeight = window.innerHeight;

      if (inputImageAspectRatio > outputImageAspectRatio) {
        outputWidth = window.innerHeight * outputImageAspectRatio;
      } else if (inputImageAspectRatio < outputImageAspectRatio) {
        outputHeight = window.innerWidth / outputImageAspectRatio;
      }

      this.renderer.resize(outputWidth, outputHeight);

      this.xm = this.view.width / 500;
      this.ym = this.view.height / 250;

      window.dispatchEvent(this.updatesize);
    };
  }

  toPos(obj) {
    //convert app xy to real xy
    //@ts-ignore
    return { x: obj.x * this.xm, y: obj.y * this.ym };
  }

  fromPos(obj) {
    //convert real xy to app xy
    //@ts-ignore
    return { x: obj.x / this.xm, y: obj.y / this.ym };
  }

  toList(inarr) {
    let out = [];

    for (let i = 0; i < inarr.length; i++) {
      out.push(this.toPos({ x: inarr[i].x, y: inarr[i].y }));
    }

    return out;
  }

  onLoad() {}

  setOnLoad(fn) {
    this.onLoad = fn;
  }
  /**
   * Recalculate the x and y mutiplayer and emits and update via window event
   */

  devlog(...args) {
    if (this.data.isDev) {
      console.log(...args);
    }
  }
}
