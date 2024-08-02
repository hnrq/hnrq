import * as THREE from 'three';
import { assign, fromPromise, setup } from 'xstate';
import CrossfadeMixer from '@js/utils/CrossfadeMixer';

export type HumanoidActions =
  | 'None'
  | 'Dancing'
  | 'Idle'
  | 'Idle to Push-up'
  | 'Open Door'
  | 'Pushing-up'
  | 'Push-up to Idle'
  | 'Running'
  | 'Sit to Stand'
  | 'Sitting'
  | 'Stand to Sit'
  | 'Typing'
  | 'Walking';

export interface Context {
  currentAction: HumanoidActions;
}

export type Events =
  | { type: 'run' }
  | { type: 'sit' }
  | { type: 'stop' }
  | { type: 'walk' }
  | { type: 'do push-ups' };

const setupHumanoidMachine = ({
  mixer,
  actions,
  playActionNoFade,
}: CrossfadeMixer<HumanoidActions>) => {
  (
    [
      'Idle to Push-up',
      'Push-up to idle',
      'Sit to Stand',
      'Stand to Sit',
      'Open Door',
    ] as HumanoidActions[]
  ).forEach((actionName) => {
    actions[actionName].loop = THREE.LoopOnce;
    actions[actionName].clampWhenFinished = true;
  });

  return setup({
    types: {
      context: {} as Context,
      events: {} as Events,
    },
    actors: {
      playUninterruptableAction: fromPromise(
        async ({ input }: { input: { action: HumanoidActions } }) =>
          new Promise((resolve) => {
            playActionNoFade(input?.action);
            const callback = () => {
              mixer.removeEventListener('finished', callback);
              resolve(undefined);
            };
            mixer.addEventListener('finished', callback);
          }),
      ),
    },
  }).createMachine({
    id: 'humanoid-actions',
    initial: 'Idle',
    context: { currentAction: 'Idle' },
    states: {
      Idle: {
        entry: assign({ currentAction: 'Idle' }),
        on: {
          walk: { target: 'Walking' },
          run: { target: 'Running' },
          sit: { target: 'Sitting' },
          'do push-ups': { target: 'Pushing-up' },
        },
      },
      Walking: {
        entry: assign({ currentAction: 'Walking' }),
        on: {
          run: { target: 'Running' },
          stop: { target: 'Idle' },
          sit: { target: 'Sitting' },
        },
      },
      Running: {
        entry: assign({ currentAction: 'Running' }),
        on: {
          walk: { target: 'Walking' },
          stop: { target: 'Idle' },
          sit: { target: 'Sitting' },
        },
      },
      Sitting: {
        initial: 'Stand to Sit',
        states: {
          'Stand to Sit': {
            entry: assign({ currentAction: 'Stand to Sit' }),
            invoke: {
              id: 'sitDown',
              src: 'playUninterruptableAction',
              input: { action: 'Stand to Sit' },
              onDone: { target: 'Sitting' },
            },
          },
          Sitting: {
            entry: assign({ currentAction: 'Sitting' }),
            on: {
              walk: { target: 'Sit to Stand' },
              stop: { target: 'Sit to Stand' },
              run: { target: 'Sit to Stand' },
            },
          },
          'Sit to Stand': {
            entry: assign({ currentAction: 'Sit to Stand' }),
            invoke: {
              id: 'standUp',
              src: 'playUninterruptableAction',
              input: { action: 'Sit to Stand' },
              onDone: {
                target: '#humanoid-actions.Idle',
              },
            },
          },
        },
      },
      'Pushing-up': {
        initial: 'Idle to Push-up',
        always: { target: 'Idle' },
        states: {
          'Idle to Push-up': {
            entry: assign({ currentAction: 'Idle to Push-up' }),
            always: { target: 'Pushing-up' },
            invoke: {
              id: 'startPushUp',
              src: 'playUninterruptableAction',
              input: { action: 'Idle to Push-up' },
            },
          },
          'Pushing-up': {
            entry: assign({ currentAction: 'Pushing-up' }),
            on: {
              walk: { target: 'Push-up to Idle' },
              stop: { target: 'Push-up to Idle' },
              run: { target: 'Push-up to Idle' },
            },
          },
          'Push-up to Idle': {
            entry: assign({ currentAction: 'Push-up to Idle' }),
            invoke: {
              id: 'stopPushUp',
              src: 'playUninterruptableAction',
              input: { action: 'Push-up to Idle' },
              onDone: {
                target: '#humanoid-actions.Idle',
              },
            },
          },
        },
      },
    },
  });
};

export default setupHumanoidMachine;
