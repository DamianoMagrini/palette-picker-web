import { compute_closest_value_index } from './array';
import { HSLColor, MultiformatColor, Palette } from './color';
import {
	DARK_HUES,
	HUE_ROTATION_TARGET,
	LIGHT_HUES,
	PALETTE_LUMINANCES,
	PALETTE_LUMINANCE_STEP,
	PALETTE_SATURATION_STEPS_BW,
	PALETTE_SATURATION_STEPS_FW,
} from './color_constants';
import { hsl_to_multiformat } from './parse_color';

/**
 * Returns the index that a given color should take in a palette.
 */
const compute_color_step_index = ({ l }: HSLColor): number => compute_closest_value_index(PALETTE_LUMINANCES, l);

/**
 * Rotates a hue to make the color appear lighter or darker.
 *
 * @param hue The base hue.
 * @param target The objective of the rotation: making the color lighter or darker.
 * @param step How much to rotate by.
 */
const rotate_hue = (hue: number, target: HUE_ROTATION_TARGET, step: number): number => {
	// Find the closest light (yellow, aqua, magenta) and dark (red, green, blue) hues to the provided color.
	const closest_light_hue = LIGHT_HUES[compute_closest_value_index(LIGHT_HUES, hue)];
	const closest_dark_hue = DARK_HUES[compute_closest_value_index(DARK_HUES, hue)];

	// Check which hue is closest *and* more than a step away (both false if the hue is less than a step away from the
	// closest).
	const light_hue_is_closest = Math.abs(hue - closest_light_hue) + step < Math.abs(hue - closest_dark_hue);
	const dark_hue_is_closest = Math.abs(hue - closest_dark_hue) + step < Math.abs(hue - closest_light_hue);

	// I don't remember how this works.
	// But, hey, it works.
	if (target === HUE_ROTATION_TARGET.LIGHT) {
		if (light_hue_is_closest) return hue + step * Math.sign(closest_light_hue - hue);
		if (dark_hue_is_closest) return hue + step * Math.sign(closest_dark_hue - hue);
	} else {
		if (light_hue_is_closest) return hue - step * Math.sign(closest_light_hue - hue);
		if (dark_hue_is_closest) return hue - step * Math.sign(closest_dark_hue - hue);
	}

	// If the target hue is closer than a step, return it.
	return target === HUE_ROTATION_TARGET.LIGHT ? closest_light_hue : closest_dark_hue;
};

/**
 * Ensure that a number fits within two bounds.
 *
 * @param value The value to normalize.
 * @param min The minimum value.
 * @param max The maximum value.
 */
const normalize_value = (value: number, min: number = 0, max: number = 1): number =>
	Math.max(Math.min(value, max), min);

/**
 * Generates a 7-color palette based on a starting color (including the given color).
 *
 * @param base_color The color to base the palette on.
 * @param h_step The hue increase/decrease between shades.
 * @param s_multiplier The multiplier for the saturation step between shades.
 * @param l_multiplier The multiplier for the luminance step between shades.
 */
export const generate_palette = (
	base_color: MultiformatColor,
	h_step: number,
	s_multiplier: number,
	l_multiplier: number,
): Palette => {
	const base_color_index = compute_color_step_index(base_color.hsl);
	const palette = new Array<MultiformatColor>(7) as Palette;

	palette[base_color_index] = base_color;

	for (let color_index = base_color_index + 1; color_index < 7; color_index++) {
		const { h, s, l } = palette[color_index - 1].hsl;

		palette[color_index] = hsl_to_multiformat({
			h: rotate_hue(h, HUE_ROTATION_TARGET.LIGHT, h_step),
			s: normalize_value(s + PALETTE_SATURATION_STEPS_FW[color_index] * s_multiplier),
			l: normalize_value(l + PALETTE_LUMINANCE_STEP * l_multiplier),
		});
	}

	for (let color_index = base_color_index - 1; color_index >= 0; color_index--) {
		const { h, s, l } = palette[color_index + 1].hsl;
		palette[color_index] = hsl_to_multiformat({
			h: rotate_hue(h, HUE_ROTATION_TARGET.DARK, h_step),
			s: normalize_value(s + PALETTE_SATURATION_STEPS_BW[color_index] * s_multiplier),
			l: normalize_value(l - PALETTE_LUMINANCE_STEP * l_multiplier),
		});
	}

	return palette;
};

/*

Reference lum-sat graph:

RGB							L				S				Perceived brightness		Rounded		Difference
5, 15, 18				0.05		0.50		0.052097268032105806		0.05			-
30, 44, 56			0.20		0.30		0.16466087153412948			0.15			0.10
62, 78, 92			0.35		0.20		0.2956966763656417			0.30			0.15
98, 115, 133		0.50		0.15		0.44108874073260645			0.45			0.15
137, 155, 170		0.65		0.20		0.5948543416773385			0.60			0.15
178, 196, 211		0.80		0.30		0.7553383205357843			0.75			0.15
231, 240, 246		0.95		0.50		0.9335060229102373			0.95			0.20

Hue is constant around 138.

*/
