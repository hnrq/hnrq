import type { Controller, GUI } from 'lil-gui';
import * as THREE from 'three';

export type ActionsByName = Record<string, { weight: number; action: THREE.AnimationAction }>;

const FADE_DURATION = 0.35;

const setWeight = (action: THREE.AnimationAction, weight: number) => {
  action.enabled = true;
  action.setEffectiveTimeScale(1);
  action.setEffectiveWeight(weight);
};

interface CrossFadeMixerOpts {
  fadeDuration: number;
}

class CrossfadeMixer {
  private animationControllers: Controller[] = [];
  private actions: ActionsByName = {};
  private currentActionName: string;
  private mixer: THREE.AnimationMixer;

  constructor(
    private model: THREE.Group,
    private animations: THREE.AnimationClip[],
    private opts: CrossFadeMixerOpts = { fadeDuration: FADE_DURATION },
  ) {
    this.mixer = new THREE.AnimationMixer(model);
    this.currentActionName = animations[0].name;
    this.animations.forEach((animation, index) => {
      const action = this.mixer.clipAction(animation);
      this.actions[animation.name] = { weight: index === 0 ? 1 : 0, action };
      this.activateAction(action);
    });
  }

  public playAction = (actionName: string) => {
    this.prepareCrossFade(
      this.actions[this.currentActionName]?.action,
      this.actions[actionName]?.action,
      this.opts.fadeDuration,
    );
  };

  private activateAction = (action: THREE.AnimationAction) => {
    const clip = action.getClip();
    setWeight(action, this.actions[clip.name].weight);
    action.play();
  };

  private executeCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number,
  ) => {
    if (endAction) {
      setWeight(endAction, 1);
      endAction.time = 0;

      if (startAction) startAction.crossFadeTo(endAction, duration, true);
      else endAction.fadeIn(duration);
    } else startAction.fadeOut(duration);
  };

  private toggleButtonStyling = () => {
    this.animationControllers.forEach((control) => {
      const name = control.property;
      if (name === this.currentActionName) control.domElement.classList.add('controller--active');
      else control.domElement.classList.remove('controller--active');
    });
  };

  private prepareCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number,
  ) => {
    this.executeCrossFade(startAction, endAction, duration);
    this.currentActionName = endAction?.getClip().name ?? 'None';
  };

  public createPanel = (gui: GUI) => {
    const panel = gui.addFolder(`${this.model.name} Animations`);
    const panelSettings: Record<string, () => void> = {};

    ['None', ...Object.keys(this.actions)].forEach((actionName) => {
      panelSettings[actionName] = () => {
        const currentAction = this.actions[this.currentActionName]?.action ?? null;
        const action = this.actions[actionName]?.action ?? null;

        if (currentAction !== action) this.playAction(actionName);
      };

      this.animationControllers.push(panel.add(panelSettings, actionName));
    });

    this.toggleButtonStyling();
  };

  public update = (deltaTime: number) => this.mixer.update(deltaTime);
}

export default CrossfadeMixer;
