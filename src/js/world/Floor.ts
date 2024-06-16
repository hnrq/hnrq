import { DEBUG } from '@js/debug';
import * as THREE from 'three';

const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: DEBUG }),
);

mesh.rotateX(-Math.PI / 2);

const Floor = () => ({ mesh });

export default Floor;
