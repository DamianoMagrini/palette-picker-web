import { FunctionalComponent, h } from 'preact';
import styles from './Wrapper.scss';

const Wrapper: FunctionalComponent = ({ children }) => <main class={styles.container}>{children}</main>;

export { Wrapper };
