import { Typography } from '@components';
import { FunctionalComponent, h } from 'preact';
import styles from './AppBar.scss';

const AppBar: FunctionalComponent = () => {
	return (
		<nav class={styles.container}>
			<Typography variant={'logotype'}>Palette Picker</Typography>
		</nav>
	);
};

export { AppBar };
