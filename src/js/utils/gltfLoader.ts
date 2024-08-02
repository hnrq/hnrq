import LoadingBar from '../utils/LoadingBar';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const { loadingManager } = LoadingBar();
const gltfLoader = new GLTFLoader(loadingManager);

export default gltfLoader;
