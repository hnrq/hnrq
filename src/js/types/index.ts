import { Mesh } from 'three';

export interface Subject {
  mesh: Mesh;
  update?: (deltaTime: number) => void;
}
