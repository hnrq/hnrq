import type { Controller, GUI } from 'lil-gui';
import * as THREE from 'three';

export type ActionsByName<K extends string> = Record<K, THREE.AnimationAction>;

const FADE_DURATION = 0.35;

interface CrossFadeMixerOpts {
  fadeDuration: number;
}

class CrossfadeMixer<K extends string> {
  private animationControllers: Controller[] = [];
  private currentActionName: K;
  #mixer: THREE.AnimationMixer;
  #actions: ActionsByName<K> = {} as ActionsByName<K>;

  get actions() {
    return this.#actions;
  }

  get mixer() {
    return this.#mixer;
  }

  constructor(
    private model: THREE.Group,
    private animations: THREE.AnimationClip[],
    startingAction: K = animations[0].name as K,
    private opts: CrossFadeMixerOpts = { fadeDuration: FADE_DURATION },
  ) {
    this.#mixer = new THREE.AnimationMixer(model);
    this.currentActionName = startingAction;
    this.animations.forEach((animation) => {
      const action = this.#mixer.clipAction(animation);
      this.#actions[animation.name as K] = action;
    });

    this.playAction(startingAction);
  }

  public playActionNoFade = (actionName: K) => {
    this.#actions[actionName].reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play();
    this.currentActionName = actionName;
    this.toggleButtonStyling();
  };

  public playAction = (actionName: K, duration = this.opts.fadeDuration) => {
    const previousAction = this.#actions[this.currentActionName];
    const activeAction = this.#actions[actionName];

    if (previousAction !== activeAction) previousAction.fadeOut(duration);

    activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
    this.currentActionName = actionName;
  };

  private toggleButtonStyling = () => {
    this.animationControllers.forEach((control) => {
      const name = control.property;
      if (name === this.currentActionName) control.domElement.classList.add('controller--active');
      else control.domElement.classList.remove('controller--active');
    });
  };

  public createPanel = (gui: GUI) => {
    const panel = gui.addFolder(`${this.model.name} Individual Animations`);
    const panelSettings: Record<string, () => void> = {};

    ['None', ...Object.keys(this.#actions)].forEach((actionName) => {
      panelSettings[actionName] = () => this.playAction(actionName as K);
      this.animationControllers.push(panel.add(panelSettings, actionName));
    });

    this.toggleButtonStyling();
  };

  public update = (deltaTime: number) => this.#mixer.update(deltaTime);
}

export default CrossfadeMixer;
