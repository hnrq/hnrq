import { createCanvas } from 'canvas';

export const generateAbstractImage = () => {
	const width = 300;
	const height = 300;
	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext('2d');

	// Fill background with a dark color
	ctx.fillStyle = '#1a1a1a';
	ctx.fillRect(0, 0, width, height);

	// Draw random colorful circles
	const numberOfCircles = 100;
	for (let i = 0; i < numberOfCircles; i++) {
		const x = Math.random() * width;
		const y = Math.random() * height;
		const radius = Math.random() * 30 + 5; // Radius between 5 and 35

		// Generate random RGB colors with some transparency (alpha)
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);
		const a = Math.random() * 0.6 + 0.3; // Alpha between 0.3 and 0.9

		ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2); // Full circle
		ctx.fill();
	}

	// Export the image as PNG
	return canvas.toDataURL('image/png');
};
