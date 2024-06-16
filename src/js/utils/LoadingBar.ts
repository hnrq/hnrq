import * as THREE from 'three';

const createLoadingElement = (): HTMLDivElement => {
  const loadingEl = document.createElement('div');
  loadingEl.id = 'loading';
  loadingEl.appendChild(document.createTextNode('0%'));

  document.body.appendChild(loadingEl);

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
