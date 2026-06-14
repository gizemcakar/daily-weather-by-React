# Daily Weather (React)

A small React app that shows current weather and a 5-day forecast for Turkish cities. It uses React Context for city selection and fetching weather data from the OpenWeatherMap API.

**Features**
- Select a Turkish city from a searchable dropdown (`src/context/CityContext.js`).
- Shows current weather and a 5-day summarized forecast (`src/context/WeatherContext.js` + `src/components/WeatherDisplay.js`).
- Simple, responsive UI with separate components for dropdown and display.

**Prerequisites**
- Node.js (recommended 14+)
- npm (or use `pnpm` / `yarn` if preferred)

## Quick Start
1. Install dependencies:

	`npm install`

2. Start the development server:

	`npm start`

	The app will open at http://localhost:3000 by default.

3. Build for production:

	`npm run build`

4. Run tests:

	`npm test`

## OpenWeatherMap API Key
This project fetches weather data from OpenWeatherMap. Add your API key to .env file before running the app:

## Using environment variables (`.env`)

This project reads the OpenWeatherMap key from `REACT_APP_OPENWEATHER_API_KEY` at build/runtime. Follow these steps to configure it locally:

1. Copy the example file to create a local `.env` file (this file is ignored by git):

	`cp .env.example .env`

2. Open `.env` and replace the placeholder value with your key:

	`REACT_APP_OPENWEATHER_API_KEY=your_actual_key_here`

3. Restart the development server if it's running so Create React App picks up the new variable:

	`npm start`

Notes:
- `.env` is listed in `.gitignore` to avoid committing secrets.
- Environment variables in Create React App must be prefixed with `REACT_APP_` to be available in the browser code.
- For production deployments, set the environment variable in your hosting platform (Netlify, Vercel, etc.) instead of committing it to the repo.

## Project Structure (key files)
- [src/App.js](src/App.js#L1-L24) — app root wiring providers and components
- [src/context/CityContext.js](src/context/CityContext.js#L1-L44) — city list + selection
- [src/context/WeatherContext.js](src/context/WeatherContext.js#L1-L109) — fetch/format weather data
- [src/components/CityDropdown.js](src/components/CityDropdown.js#L1-L32) — city selector UI
- [src/components/WeatherDisplay.js](src/components/WeatherDisplay.js#L1-L120) — current + forecast UI

## Notes & Next Steps
- The app currently assumes Turkish cities and passes `,TR` to the OpenWeatherMap query. Remove or change the country code if you want global support.
- Consider moving the API key to environment variables for security.
- If you want help switching to `REACT_APP_OPENWEATHER_API_KEY` or adding a `.env` setup, I can make that change.

## License
This repository contains no explicit license. Add a `LICENSE` file if you plan to publish.

---
Generated README: concise overview, run instructions, and file references.
