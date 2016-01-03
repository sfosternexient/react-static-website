# react-static-website
A boilerplate for a static website built with React.

This template is intended to be very basic, making it easy to understand for beginners.

## Development
### Setup
1. Install node.js.
2. Install an editor that accepts eslint (e. g. [Atom](https://atom.io/) with the plugin [linter-eslint](https://atom.io/packages/linter-eslint)), so you get warnings about syntax or code style errors.
3. Install dependencies with `npm install`.

### Run
1. Start the development server with `npm run dev`.
2. Check the console to see the URL the server runs on.

## Use in production
### Setup
1. Install node.js ([Ubuntu](https://github.com/nodesource/distributions#deb))

### Build
1. Build the app with `npm run build`.
2. Find the built files in the folder `dist`. Upload them to the root folder of a web server that can serve static files.

You can test the built files by navigating to `dist` and run `python -m SimpleHTTPServer`. Then open the shown URL in the browser.

Every route (e.g. `/about`) contains all the prerendered HTML code and loads the rest of web site with the JavaScript code. Therefore subsequent route changes will load instantly without communication with the server.
