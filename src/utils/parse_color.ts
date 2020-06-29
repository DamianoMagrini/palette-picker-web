import { HSLColor, MultiformatColor, RGBColor } from './color';
import { rgb_to_hex } from './stringify_color';

const rgb_to_hsl = ({ r, g, b }: RGBColor): HSLColor => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const luminance = (max + min) / 2;

	let hue, saturation;

	if (max === min) {
		hue = saturation = 0;
	} else {
		const d = max - min;
		saturation = luminance > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				hue = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				hue = (b - r) / d + 2;
				break;
			case b:
				hue = (r - g) / d + 4;
				break;
		}

		hue /= 6;
		hue *= 360;
	}

	return { h: hue, s: saturation, l: luminance };
};

const hue_to_rgb_component = (p: number, q: number, t: number): number => {
	let component: number;
	if (t < 0) t += 1;
	if (t > 1) t -= 1;

	if (t < 1 / 6) component = p + (q - p) * 6 * t;
	else if (t < 1 / 2) component = q;
	else if (t < 2 / 3) component = p + (q - p) * (2 / 3 - t) * 6;
	else component = p;

	return Math.round(component * 255);
};

const hsl_to_rgb = ({ h, s, l }: HSLColor): RGBColor => {
	h /= 360;
	let r: number, g: number, b: number;

	if (s === 0) {
		r = g = b = l * 255;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue_to_rgb_component(p, q, h + 1 / 3);
		g = hue_to_rgb_component(p, q, h);
		b = hue_to_rgb_component(p, q, h - 1 / 3);
	}

	return { r, g, b };
};

/**
 * Computes the perceived brightness of a given color.
 *
 * @param color The color, in RGB format, to compute the brightness of.
 */
const compute_brigthness = ({ r, g, b }: RGBColor): number =>
	Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2) / 255;

/**
 * Parses a hexadecimal color string into a multiformat color.
 *
 * @param hex_color The hexadecimal color string (prefixed with "#"; alpha, if present, ignored).
 */
export const parse_color = (hex_color: string): MultiformatColor => {
	const rgb_color: RGBColor = {
		r: parseInt(hex_color.slice(1, 3), 16),
		g: parseInt(hex_color.slice(3, 5), 16),
		b: parseInt(hex_color.slice(5, 7), 16),
	};

	return {
		brightness: compute_brigthness(rgb_color),
		hex: hex_color,
		rgb: rgb_color,
		hsl: rgb_to_hsl(rgb_color),
	};
};

/**
 * Converts an HSL color into a multiformat color.
 *
 * @param hsl_color The color in HSL format to convert.
 */
export const hsl_to_multiformat = (hsl_color: HSLColor): MultiformatColor => {
	const rgb_color = hsl_to_rgb(hsl_color);

	return {
		brightness: compute_brigthness(rgb_color),
		hex: rgb_to_hex(rgb_color),
		rgb: rgb_color,
		hsl: hsl_color,
	};
};
