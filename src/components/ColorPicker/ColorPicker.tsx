import { Typography } from '@components';
import { MultiformatColor } from '@utils/color';
import { debounce } from '@utils/debounce';
import { parse_color } from '@utils/parse_color';
import { stringify_hsl, stringify_rgb } from '@utils/stringify_color';
import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import styles from './ColorPicker.scss';

export interface ColorPickerProps {
	value?: MultiformatColor;
	on_input?: (color: MultiformatColor) => void;
}

const ColorPicker: FunctionalComponent<ColorPickerProps> = ({ value, on_input }) => {
	const { brightness, hex, rgb, hsl } = value;

	const input_handler = useMemo(() => debounce(on_input, 33.3333333, true), [on_input]);

	return (
		<div>
			<div class={styles.picker_container}>
				<input
					class={styles.input}
					type={'color'}
					value={hex}
					onInput={(event) => input_handler(parse_color((event.target as HTMLInputElement).value))}
				/>

				<div>
					<Typography variant={'code'}>{stringify_rgb(rgb)}</Typography>
					<Typography variant={'code'}>{stringify_hsl(hsl)}</Typography>
				</div>
			</div>

			<Typography variant={'body'}>Perceived brightness: {Math.round(brightness * 100)}%</Typography>
		</div>
	);
};

export { ColorPicker };
