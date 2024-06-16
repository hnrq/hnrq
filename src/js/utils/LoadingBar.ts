import * as THREE from 'three';

const createLoadingElement = (): HTMLDivElement => {
  const loadingEl = document.createElement('div');
  loadingEl.appendChild(document.createTextNode('0%'));

  loadingEl.style.width = '100vw';
  loadingEl.style.height = '100vh';
  loadingEl.style.position = 'absolute';
  loadingEl.style.top = '0';
  loadingEl.style.left = '0';
  loadingEl.style.display = 'flex';
  loadingEl.style.justifyContent = 'center';
  loadingEl.style.alignItems = 'center';
  loadingEl.style.backgroundColor = '#000';
  loadingEl.style.color = '#fff';
  loadingEl.style.transition = 'opacity 1s';

  return loadingEl;
};

const LoadingBar = () => {
  const loadingEl = createLoadingElement();

  loadingEl.addEventListener('transitionend', () => {
    loadingEl.remove();
  });

  const loadingManager = new THREE.LoadingManager(
    () => {
      loadingEl.style.opacity = '0';
    },
    (_, itemsLoaded, itemsTotal) => {
      loadingEl.textContent = `${Math.round((itemsLoaded / itemsTotal) * 100)}%`;
    },
  );

  return { loadingEl, loadingManager };
};

export default LoadingBar;
