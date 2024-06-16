import GUI from 'lil-gui';
import Humanoid from './subjects/Humanoid';
import LoadingBar from './utils/LoadingBar';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const canvas = document.getElementById('webgl') as HTMLCanvasElement;
const gui = new GUI();

const { loadingManager } = LoadingBar();
const gltfLoader = new GLTFLoader(loadingManager);

const humanoid = Humanoid({ gltfLoader, gui, debug: false });
