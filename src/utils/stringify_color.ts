import { HSLColor, RGBColor } from './color';

export const stringify_hsl = ({ h, s, l }: HSLColor): string =>
	`hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

export const stringify_rgb = ({ r, g, b }: RGBColor): string => `rgb(${r}, ${g}, ${b})`;

const stringify_hex_component = (component: number): string => Math.round(component).toString(16).padStart(2, '0');

export const rgb_to_hex = ({ r, g, b }: RGBColor): string =>
	'#' + stringify_hex_component(r) + stringify_hex_component(g) + stringify_hex_component(b);
