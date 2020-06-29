import { Typography } from '@components';
import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import styles from './Slider.scss';

export interface SliderProps {
	label: string;
	min: number;
	max: number;
	step?: number;
	value?: number;
	on_input?: (value: number) => void;
}

const Slider: FunctionalComponent<SliderProps> = ({ label, min, max, step = 0.001, value = min, on_input }) => {
	const [id] = useState(uuidv4());

	return (
		<div class={styles.container}>
			<Typography variant={'label'} html_for={id}>
				{label}
			</Typography>
			<input
				id={id}
				class={styles.slider}
				type={'range'}
				min={min}
				max={max}
				step={step}
				value={value}
				onInput={(event) => on_input(Number((event.target as HTMLInputElement).value))}
			/>
		</div>
	);
};

export { Slider };
