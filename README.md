# Formula 1 Results

This is an application for browsing Formula 1 results. It operates on a [Ergast F1 API](http://ergast.com/mrd/) containing information about races, drivers, teams, and their achievements in individual Formula 1 seasons.

## Description

I wanted to create a JavaScript project based on a tree structure reminiscent of that known from React. I created a custom function that dynamically generates HTML elements. Below you have all the code for this function:

```javascript
const createHTMLElement = (name, text = '', attributes) => {
	const element = document.createElement(name);
	element.innerText = text;

	if (!attributes) return element;

	const { className, attrs, children } = attributes;

	if (className) {
		Array.isArray(className)
			? element.classList.add(...className)
			: element.classList.add(className);
	}

	if (attrs) {
		for (const attribute in attrs) {
			element.setAttribute(attribute, attrs[attribute]);
		}
	}

	if (children) {
		for (const child of children) {
			element.appendChild(child);
		}
	}

	return element;
};
```

### Live Preview

Live Site URL: ([Netlify]())

### Screenshots

![App Screenshot](./desktop-preview.png?text=Desktop+Preview+Here)

![App Screenshot](./mobile-preview.png?text=Mobile+Preview+Here)

### Features

-   Displaying a list of Formula 1 seasons.
-   Displaying a list of races in a given season.
-   Displaying results of individual races and qualifying.
-   Displaying standings of individual seasons (SOON!)

## Technologies

The application is using the following technologies:

-   Build tool: Vite.js
-   Frontend: HTML, Vanilla JavaScript (ES Modules), SCSS.

## Installation locally

1. Clone the repository: `git clone https://github.com/your_repository.git`
2. Navigate to the project directory: `cd formula1-results-viewer`
3. Install dependencies: `npm install`
4. Run the application: `npm start`

## Author

Hubert Warchoł - Project Creator
