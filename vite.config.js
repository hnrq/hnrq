import { defineConfig } from 'vite';
import gltf from 'vite-plugin-gltf';
import tsconfigPaths from 'vite-tsconfig-paths';

import { dedup, prune } from '@gltf-transform/functions';

export default defineConfig({
  plugins: [gltf({ transforms: [prune(), dedup()] }), tsconfigPaths()],
  assetsInclude: ['**/*.gltf'],
  build: {
    target: 'esnext',
  },
});
