import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry.js';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js';
import { Mesh } from 'three/src/objects/Mesh.js';

const mesh = new Mesh(
  new PlaneGeometry(100, 100),
  new MeshBasicMaterial({ transparent: true, opacity: 0 }),
);

mesh.rotateX(-Math.PI / 2);

const Floor = () => ({ mesh });

export default Floor;
