import { Tooltip } from '@components';
import { copy } from '@utils/clipboard';
import { MultiformatColor } from '@utils/color';
import { stringify_hsl, stringify_rgb } from '@utils/stringify_color';
import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './ColorTile.scss';

export interface ColorTileProps {
	color: MultiformatColor;
}

const ColorTile: FunctionalComponent<ColorTileProps> = ({ color: { rgb, hsl } }) => {
	const [copied, set_copied] = useState(false);

	return (
		<Tooltip
			content={copied ? 'Copied!' : 'Click to copy'}
			inline
			on_visibility_change={(visibility) => {
				if (visibility === true) set_copied(false);
			}}>
			<div
				style={{ backgroundColor: stringify_rgb(rgb) }}
				class={styles.container}
				onClick={() => {
					copy(stringify_hsl(hsl));
					set_copied(true);
				}}
			/>
		</Tooltip>
	);
};

export { ColorTile };
