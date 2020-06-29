/**
 * Copies some text to the clipboard.
 *
 * @param text The text to copy.
 */
export const copy = (text: string): void => {
	const textarea = document.createElement('textarea');
	textarea.value = text;

	textarea.setAttribute('readonly', '');
	textarea.style.position = 'absolute';
	textarea.style.left = '-9999px';
	document.body.appendChild(textarea);

	textarea.select();
	document.execCommand('copy');

	document.body.removeChild(textarea);
};
