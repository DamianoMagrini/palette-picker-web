/// <reference path="index.d.ts" />

import { h, render } from 'preact';
import { App } from './App';
import './index.scss';

if (__DEBUG__) require('preact/debug');

render(<App />, document.getElementById('root'));
