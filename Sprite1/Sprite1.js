/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.png", { x: 5, y: 5 })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.id = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      this.createClone();
      this.goto(this.random(-250, 250), -200);
      yield;
    }
  }

  *startAsClone() {
    this.vars.id = this.random(1, 5);
    this.visible = true;
    this.effects.brightness = this.random(1, 10);
    for (let i = 0; i < 30; i++) {
      this.y += 2 + this.toNumber(this.vars.id);
      yield;
    }
    while (!this.touching("edge")) {
      this.y += 1 + this.toNumber(this.vars.id);
      yield;
    }
    this.deleteThisClone();
  }
}
