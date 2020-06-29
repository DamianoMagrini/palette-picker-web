import { HSLColor, Palette } from '@utils/color';
import { stringify_rgb } from '@utils/stringify_color';
import { FunctionalComponent, h } from 'preact';
import styles from './Graph.scss';

interface GraphProps {
	palette: Palette;
	width?: number | string;
	height?: number | string;
}

const compute_color_coordinates = (hsl_color: HSLColor): [number, number] => [
	hsl_color.l * 100,
	100 - hsl_color.s * 100,
];

const Graph: FunctionalComponent<GraphProps> = ({ palette, width, height }) => {
	const color_coordinates = palette
		.map(({ hsl }) => hsl)
		.map(compute_color_coordinates)
		.flat()
		.join(' ');

	// Used for polyline and shadows.
	const color_2_rgb = palette[2].rgb;

	return (
		<svg
			xmlns={'http://www.w3.org/2000/svg'}
			class={styles.graph}
			width={width}
			height={height}
			viewBox={'-10 -10 120 120'} //! NOTE! Not x0 y0 x1 y1, but rather x0 y0 w h.
		>
			<defs>
				<filter id={'shadow'} x={'-50%'} y={'-50%'} height={'200%'} width={'200%'}>
					{/* @ts-expect-error | Advanced SVG elements are not supported. */}
					<feDropShadow
						dx={0}
						dy={0.4}
						stdDeviation={0.8}
						flood-color={stringify_rgb(color_2_rgb)}
						flood-opacity={0.1}
					/>
				</filter>
			</defs>

			{/* Vertical grid lines */}
			{/* <line class={styles.grid_line} x1={0} y1={0} x2={0} y2={100} /> */}
			<line class={styles.grid_line} x1={10} y1={0} x2={10} y2={100} />
			<line class={styles.grid_line} x1={20} y1={0} x2={20} y2={100} />
			<line class={styles.grid_line} x1={30} y1={0} x2={30} y2={100} />
			<line class={styles.grid_line} x1={40} y1={0} x2={40} y2={100} />
			<line class={styles.grid_line} x1={50} y1={0} x2={50} y2={100} />
			<line class={styles.grid_line} x1={60} y1={0} x2={60} y2={100} />
			<line class={styles.grid_line} x1={70} y1={0} x2={70} y2={100} />
			<line class={styles.grid_line} x1={80} y1={0} x2={80} y2={100} />
			<line class={styles.grid_line} x1={90} y1={0} x2={90} y2={100} />
			{/* <line class={styles.grid_line} x1={100} y1={0} x2={100} y2={100} /> */}

			{/* Horizontal grid lines */}
			{/* <line class={styles.grid_line} x1={0} y1={0} x2={100} y2={0} /> */}
			<line class={styles.grid_line} x1={0} y1={10} x2={100} y2={10} />
			<line class={styles.grid_line} x1={0} y1={20} x2={100} y2={20} />
			<line class={styles.grid_line} x1={0} y1={30} x2={100} y2={30} />
			<line class={styles.grid_line} x1={0} y1={40} x2={100} y2={40} />
			<line class={styles.grid_line} x1={0} y1={50} x2={100} y2={50} />
			<line class={styles.grid_line} x1={0} y1={60} x2={100} y2={60} />
			<line class={styles.grid_line} x1={0} y1={70} x2={100} y2={70} />
			<line class={styles.grid_line} x1={0} y1={80} x2={100} y2={80} />
			<line class={styles.grid_line} x1={0} y1={90} x2={100} y2={90} />
			{/* <line class={styles.grid_line} x1={0} y1={100} x2={100} y2={100} /> */}

			<polyline class={styles.graph_line} style={{ stroke: stringify_rgb(color_2_rgb) }} points={color_coordinates} />

			{palette.map((multiformat_color, index) => {
				const { hsl, rgb } = multiformat_color;
				const [x, y] = compute_color_coordinates(hsl);
				return (
					<circle
						key={`graph-color-${index}`}
						class={styles.color_point}
						cx={x}
						cy={y}
						fill={stringify_rgb(rgb)}
						r={5}
					/>
				);
			})}
		</svg>
	);
};

export { Graph, GraphProps };
