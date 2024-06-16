import type { Controller, GUI } from 'lil-gui';
import * as THREE from 'three';

export type ActionsByName = Record<string, { weight: number; action: THREE.AnimationAction }>;

const setWeight = (action: THREE.AnimationAction, weight: number) => {
  action.enabled = true;
  action.setEffectiveTimeScale(1);
  action.setEffectiveWeight(weight);
};

const CrossfadeMixer = (model: THREE.Group, animations: THREE.AnimationClip[]) => {
  const mixer = new THREE.AnimationMixer(model);
  const actions: ActionsByName = {};
  const animationControllers: Controller[] = [];
  let currentActionName = animations[0].name;

  const activateAction = (action: THREE.AnimationAction) => {
    const clip = action.getClip();
    setWeight(action, actions[clip.name].weight);
    action.play();
  };

  const executeCrossFade = (
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

  const toggleButtonStyling = () => {
    animationControllers.forEach((control) => {
      const name = control.property;
      if (name === currentActionName) control.domElement.classList.add('controller--active');
      else control.domElement.classList.remove('controller--active');
    });
  };

  const createPanel = (gui: GUI) => {
    const panel = gui.addFolder(`${model.name} Animations`);
    const panelSettings: Record<string, () => void> = {};

    ['None', ...Object.keys(actions)].forEach((actionName) => {
      panelSettings[actionName] = () => {
        const currentAction = actions[currentActionName]?.action ?? null;
        const action = actions[actionName]?.action ?? null;

        if (currentAction !== action) prepareCrossFade(currentAction, action, 0.35);
      };

      animationControllers.push(panel.add(panelSettings, actionName));
    });

    toggleButtonStyling();
  };

  const synchronizeCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number,
  ) => {
    const onLoopFinished = (event: THREE.AnimationMixerEventMap['loop']) => {
      if (event.action === startAction) {
        mixer.removeEventListener('loop', onLoopFinished);
        executeCrossFade(startAction, endAction, duration);
      }
    };

    mixer.addEventListener('loop', onLoopFinished);
  };

  const prepareCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number,
  ) => {
    if (currentActionName === 'Survey' || !startAction || !endAction) {
      executeCrossFade(startAction, endAction, duration);
    } else synchronizeCrossFade(startAction, endAction, duration);

    currentActionName = endAction?.getClip().name ?? 'None';
  };

  animations.forEach((animation, index) => {
    const action = mixer.clipAction(animation);
    actions[animation.name] = { weight: index === 0 ? 1 : 0, action };
    activateAction(action);
  });

  return { actions, mixer, prepareCrossFade, createPanel };
};

export default CrossfadeMixer;
