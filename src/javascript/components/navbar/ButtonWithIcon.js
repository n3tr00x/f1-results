import createHTMLElement from '../../utils/createHTMLElement';

const ButtonWithIcon = (text, image, buttonName) => {
	const icon = createHTMLElement('img', null, {
		classList: 'icon',
		attrs: { src: image, alt: '' },
	});
	const desc = createHTMLElement('span', text);
	const button = createHTMLElement('button', null, {
		className: buttonName,
		children: [icon, desc],
	});

	return button;
};

export default ButtonWithIcon;
