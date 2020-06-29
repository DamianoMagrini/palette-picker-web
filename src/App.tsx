import { Wrapper } from '@components';
import { Fragment, FunctionalComponent, h } from 'preact';
import { PalettePage } from './pages';
import { AppBar } from './parts';

const App: FunctionalComponent = () => {
	// TODO add a *very* simple app bar and/or a footer with credits (and, in the future, a link to the Play Store)
	return (
		<Fragment>
			<AppBar />
			<Wrapper>
				<PalettePage />
			</Wrapper>
		</Fragment>
	);
};

export { App };
