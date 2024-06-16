import { Object3D } from 'three';

export interface Subject {
  mesh: Object3D;
  update?: (deltaTime: number) => void;
}
