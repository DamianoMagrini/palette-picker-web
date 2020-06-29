import { ColorPicker, ColorTile, Graph, Slider, Typography } from '@components';
import { generate_palette } from '@utils/palette';
import { parse_color } from '@utils/parse_color';
import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Palette.scss';

const initial_color = parse_color('#4071bf');

const PalettePage: FunctionalComponent = () => {
	const [color, set_color] = useState(initial_color);

	const [hue_step, set_hue_step] = useState(2);
	const [saturation_multiplier, set_saturation_multiplier] = useState(1);
	const [luminance_multiplier, set_luminance_multiplier] = useState(1);

	const palette = generate_palette(color, hue_step, saturation_multiplier, luminance_multiplier);

	palette.forEach(({ rgb: { r, g, b } }, index) => {
		document.documentElement.style.setProperty(`--color-${index}`, `${r},${g},${b}`);
	});

	return (
		<div class={styles.wrapper}>
			<section class={styles.input}>
				<section>
					<Typography variant={'heading'}>Base color</Typography>

					<ColorPicker value={color} on_input={set_color} />
				</section>

				<section>
					<Typography variant={'heading'}>Options</Typography>

					<Slider label={'Hue step'} min={-5} max={5} value={hue_step} on_input={set_hue_step} />
					<Slider
						label={'Saturation step multiplier'}
						min={0}
						max={2}
						value={saturation_multiplier}
						on_input={set_saturation_multiplier}
					/>
					<Slider
						label={'Luminance step multiplier'}
						min={0}
						max={2}
						value={luminance_multiplier}
						on_input={set_luminance_multiplier}
					/>
				</section>
			</section>

			<section class={styles.output}>
				<Typography variant={'heading'}>Palette</Typography>

				<Graph palette={palette} width={'80%'} />

				<section>
					<Typography variant={'subheading'}>Colors</Typography>
					{palette.map((color) => (
						<ColorTile color={color} />
					))}
				</section>
			</section>
		</div>
	);
};

export { PalettePage };
