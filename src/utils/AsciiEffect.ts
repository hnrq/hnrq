/**
 * Ascii generation is based on https://github.com/hassadee/jsascii/blob/master/jsascii.js
 *
 * 16 April 2012 - @blurspline
 */

import type { Camera, Renderer, Scene } from 'three';

interface Options {
	resolution: number;
	scale: number;
	color: boolean;
	alpha: boolean;
	block: boolean;
	invert: boolean;
	strResolution: 'low' | 'medium' | 'high';
}

const defaultOptions: Options = {
	resolution: 0.15, // Higher for more details
	scale: 1,
	color: false, // nice but slows down rendering
	alpha: false, // Transparency
	block: false, // blocked characters. like good O dos
	invert: false, // black is white, white is black
	strResolution: 'low'
};

class AsciiEffect {
	private strFont = 'courier new, monospace';
	private charList: string[];
	private width = 0;
	private height = 0;
	private iWidth = 0;
	private iHeight = 0;
	private renderer: Renderer;
	private options: Options;
	private imgElement?: HTMLElement = undefined;
	private canvasElement: HTMLCanvasElement;
	private canvasContext: CanvasRenderingContext2D | null;
	private domElement: HTMLDivElement;
	private asciiElement: HTMLTableElement;

	constructor(renderer: Renderer, charset = ' .:-=+*#%@', options: Partial<Options> = {}) {
		// ' .,:;=|iI+hHOE#`$';
		// darker bolder character set from https://github.com/saw/Canvas-ASCII-Art/
		// ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'.split('');

		// Some ASCII settings
		this.renderer = renderer;
		this.options = { ...defaultOptions, ...options };
		this.domElement = document.createElement('div');
		this.domElement.style.cursor = 'default';
		this.asciiElement = document.createElement('table');
		this.domElement.appendChild(this.asciiElement);

		if (charset) this.charList = charset.split('');
		else this.charList = this.options.color ? ' CGO08@'.split('') : ' .,:;i1tfLCG08@'.split('');

		this.canvasElement = document.createElement('canvas');
		if (!this.canvasElement.getContext) return;

		this.canvasContext = this.canvasElement.getContext('2d', { willReadFrequently: true });
		if (!this.canvasContext?.getImageData) return;
	}

	private getLetterSpacing = () => {
		if (this.options.strResolution == 'low') {
			switch (this.options.scale) {
				case 1:
					return -1;
				case 2:
				case 3:
					return -2.1;
				case 4:
					return -3.1;
				case 5:
					return -4.15;
			}
		}

		if (this.options.strResolution == 'medium') {
			switch (this.options.scale) {
				case 1:
					return 0;
				case 2:
					return -1;
				case 3:
					return -1.04;
				case 4:
				case 5:
					return -2.1;
			}
		}

		if (this.options.strResolution == 'high') {
			switch (this.options.scale) {
				case 1:
				case 2:
					return 0;
				case 3:
				case 4:
				case 5:
					return -1;
			}
		}
	};

	initAsciiSize = () => {
		this.iWidth = Math.round(this.width * this.options.resolution);
		this.iHeight = Math.round(this.height * this.options.resolution);

		this.canvasElement.width = this.iWidth;
		this.canvasElement.height = this.iHeight;

		this.imgElement = this.renderer.domElement;

		if (this.imgElement.style.backgroundColor) {
			this.asciiElement.rows[0].cells[0].style.backgroundColor =
				this.imgElement.style.backgroundColor;
			this.asciiElement.rows[0].cells[0].style.color = this.imgElement.style.color;
		}

		this.asciiElement.style.display = 'inline';
		this.asciiElement.style.width = `${Math.round(
			(this.iWidth / this.options.resolution) * this.options.scale
		)}px`;
		this.asciiElement.style.height = `${Math.round(
			(this.iHeight / this.options.resolution) * this.options.scale
		)}px`;
		this.asciiElement.style.whiteSpace = 'pre';
		this.asciiElement.style.margin = '0px';
		this.asciiElement.style.padding = '0px';
		this.asciiElement.style.letterSpacing = `${this.getLetterSpacing()}px`;
		this.asciiElement.style.fontFamily = this.strFont;
		this.asciiElement.style.fontSize = `${(2 / this.options.resolution) * this.options.scale}px`;
		this.asciiElement.style.lineHeight = `${(2 / this.options.resolution) * this.options.scale}px`;
		this.asciiElement.style.textAlign = 'left';
		this.asciiElement.style.textDecoration = 'none';
	};

	asciifyImage = (asciiElement: HTMLTableElement) => {
		this.canvasContext?.clearRect(0, 0, this.iWidth, this.iHeight);
		this.canvasContext?.drawImage(this.renderer.domElement, 0, 0, this.iWidth, this.iHeight);
		const oImgData = this.canvasContext?.getImageData(0, 0, this.iWidth, this.iHeight).data;

		// Coloring loop starts now
		let strChars = '';

		// console.time('rendering');

		for (let y = 0; y < this.iHeight; y += 2) {
			for (let x = 0; x < this.iWidth; x++) {
				const iOffset = (y * this.iWidth + x) * 4;

				const iRed = oImgData?.[iOffset] ?? 0;
				const iGreen = oImgData?.[iOffset + 1] ?? 0;
				const iBlue = oImgData?.[iOffset + 2] ?? 0;
				const iAlpha = oImgData?.[iOffset + 3] ?? 0;
				const fBrightness = iAlpha === 0 ? 1 : (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;
				const charIndex = this.options.invert
					? this.charList.length - Math.floor((1 - fBrightness) * (this.charList.length - 1)) - 1
					: Math.floor((1 - fBrightness) * (this.charList.length - 1));

				let strThisChar = this.charList[charIndex];

				if (strThisChar === undefined || strThisChar == ' ') strThisChar = '&nbsp;';

				if (this.options.color) {
					strChars += `<span style='
              color:rgb(${iRed}, ${iGreen}, ${iBlue})' 
              ${this.options.block ? `background-color:rgb(${iRed}, ${iGreen}, ${iBlue});` : ''}
              ${this.options.alpha ? `opacity:${iAlpha / 255};` : ''}
            '>${strThisChar}</span>`;
				} else strChars += strThisChar;
			}

			strChars += '<br/>';
		}

		asciiElement.innerHTML = `<tr><td>${strChars}</td></tr>`;
	};

	render = (scene: Scene, camera: Camera) => {
		this.renderer.render(scene, camera);
		this.asciifyImage(this.asciiElement);
	};

	setSize = (width: number, height: number) => {
		this.width = width;
		this.height = height;

		this.renderer.setSize(width, height);

		this.initAsciiSize();
	};
}

export { AsciiEffect };
