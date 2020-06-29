import { clsx } from '@utils/clsx';
import { FunctionalComponent, h } from 'preact';
import styles from './Typography.scss';

type TypographyVariant = 'title' | 'heading' | 'subheading' | 'body' | 'code' | 'button' | 'label' | 'logotype';
type Background = 'light' | 'dark';

export interface TypographyProps {
	variant?: TypographyVariant;
	on?: Background;
	html_for?: string;
}

const VARIANTS_TO_ELEMENTS: { [key in TypographyVariant]: keyof h.JSX.IntrinsicElements } = {
	title: 'h1',
	heading: 'h2',
	subheading: 'h3',
	body: 'p',
	code: 'code',
	button: 'span',
	label: 'label',
	logotype: 'span',
};

const Typography: FunctionalComponent<TypographyProps> = ({ children, variant = 'body', on = 'light', html_for }) => {
	const Element = VARIANTS_TO_ELEMENTS[variant];
	return (
		<Element
			htmlFor={html_for}
			class={clsx(styles[variant], {
				[styles.on_light]: on === 'light',
				[styles.on_dark]: on === 'dark',
			})}>
			{children}
		</Element>
	);
};

export { Typography };
