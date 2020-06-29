export const enum HUE_ROTATION_TARGET {
	LIGHT,
	DARK,
}

/** The ideal luminace stops in a palette. */
export const PALETTE_LUMINANCES = [0.05, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95];

export const PALETTE_LUMINANCE_STEP = 0.15;
export const PALETTE_SATURATION_STEPS_FW = [0, -0.2, -0.1, -0.05, 0.05, 0.1, 0.2];
export const PALETTE_SATURATION_STEPS_BW = [0.2, 0.1, 0.05, -0.05, -0.1, -0.2, 0];

export const LIGHT_HUES = [60, 180, 300];
export const DARK_HUES = [0, 120, 240];
