import { defineConfig } from 'vite';
import gltf from 'vite-plugin-gltf';
import tsconfigPaths from 'vite-tsconfig-paths';

import { dedup, draco, prune } from '@gltf-transform/functions';

export default defineConfig({
  plugins: [gltf({ transforms: [prune(), dedup(), draco()] }), tsconfigPaths()],
  assetsInclude: ['**/*.gltf'],
  build: {
    target: 'esnext',
  },
});
