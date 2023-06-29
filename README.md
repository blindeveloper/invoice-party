- This app is generating new invoice every page reload.
- On each page reload amount of units||hours are changed randomly from number 1 to 10 to recalculate new values.
- All values are calculating on the fly.
- All functions are covered with jsdoc. To generate doc run `npm run jsdoc`.
- Formula for calculating of discount is equally spread around all cost items of phase, to generate most fare discount calculation.
- Graphql queries located in queries folder.
- Because of time constrains, test are covering only most essential functions, which are about discount recalculation.
- Because of time constrains, visual representation is super simple.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
