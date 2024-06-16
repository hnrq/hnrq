import { Object3D } from 'three';

export type Subject = {
  mesh: Object3D;
  update?: (elapsedTime: number, deltaTime: number) => void;
};
