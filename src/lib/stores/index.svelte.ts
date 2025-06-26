import { Spring } from 'svelte/motion';
import type { Vector2Tuple } from 'three';

export const rackRotation = new Spring(0);
export const cursorPosition = new Spring<Vector2Tuple>([0, 0]);
