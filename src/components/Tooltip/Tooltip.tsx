import { Typography } from '@components';
import { clsx } from '@utils/clsx';
import { ComponentChildren, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Tooltip.scss';

type TooltipPlacement = 'top' | 'bottom';

export interface TooltipProps {
	content: ComponentChildren;
	inline?: boolean;
	placement?: TooltipPlacement;
	on_visibility_change?: (visible: boolean) => void;
}

const Tooltip: FunctionalComponent<TooltipProps> = ({
	children,
	content,
	inline = false,
	placement = 'top',
	on_visibility_change,
}) => {
	const [visible, set_visible] = useState(false);

	// The tooltip will start arbitrarily hidden, until the animation has finished.
	const [disabled, set_disabled] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			set_disabled(false); // Enable the tooltip once the initial animation has ended.
		}, 100);
	}, []);

	return (
		<div
			style={{ display: inline ? 'inline-block' : 'block' }}
			class={styles.container}
			onMouseEnter={() => {
				set_visible(true);
				on_visibility_change(true);
			}}
			onMouseLeave={() => {
				set_visible(false);
				on_visibility_change(false);
			}}>
			{children}
			<div
				class={clsx(styles.tooltip, styles[placement], {
					[styles.visible]: visible,
				})}
				style={disabled ? { position: 'fixed', left: -9999, top: -9999 } : {}}>
				{typeof content === 'string' ? (
					<Typography variant={'label'} on={'dark'}>
						{content}
					</Typography>
				) : (
					content
				)}
			</div>
		</div>
	);
};

export { Tooltip };
