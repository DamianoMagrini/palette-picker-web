export type HexColor = string;

export interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export interface HSLColor {
	h: number;
	s: number;
	l: number;
}

export interface MultiformatColor {
	brightness: number;
	hex: HexColor;
	rgb: RGBColor;
	hsl: HSLColor;
}

export type Palette = [
	MultiformatColor,
	MultiformatColor,
	MultiformatColor,
	MultiformatColor,
	MultiformatColor,
	MultiformatColor,
	MultiformatColor,
];
