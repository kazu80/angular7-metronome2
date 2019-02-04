declare var PIXI: any;

export class PixiSound {
  private _sounds: Array<{ [key: string]: object }> | {};
  private _onload: object;

  constructor() {
    this._sounds = {};
  }

  get onload(): object {
    return this._onload;
  }

  set onload(value: object) {
    this._onload = value;
  }

  resource(resouces: Array<{ [key: string]: string }>) {
    return new Promise((resolve) => {
      resouces.forEach((val: object, index: number) => {
        PIXI.sound.Sound.from({
          url    : val['path'],
          preload: true,
          loaded : (err, sound) => {
            this._sounds[val['name']] = sound;
            if (Object.keys(this._sounds).length === resouces.length) {
              return resolve();
            }
          }
        });
      });
    });
  }

  play(name: string): void {
    this._sounds[name].play();
  }
}
