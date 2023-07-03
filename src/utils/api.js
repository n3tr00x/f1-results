import { setRaceResults } from '../state/state';

const API_URL = 'http://ergast.com/api/f1';
const COUNTRIES_URL = 'https://restcountries.com/v3.1';

const fetchCountryNationFlag = async countryName => {
	try {
		const response = await fetch(
			`${COUNTRIES_URL}/name/${countryName}?fields=flags`
		);
		const data = await response.json();

		return data[0].flags.png;
	} catch (error) {
		console.error(error);
	}
};

export const getAllCircuits = async season => {
	try {
		const response = await fetch(`${API_URL}/${season}.json`);
		const rawData = await response.json();
		const circuitsData = rawData.MRData.RaceTable.Races;

		if (Array.isArray(circuitsData) && circuitsData.length === 0)
			throw new Error('Brak danych o Grand Prix z tego sezonu!');

		const circuits = circuitsData.map(circuit => ({
			round: circuit.round,
			name: circuit.raceName,
			circuit: circuit.Circuit.circuitName,
			country: circuit.Circuit.Location.country,
			locality: circuit.Circuit.Location.locality,
			date: circuit.date,
		}));

		const data = await Promise.all(
			circuits.map(async circuit => ({
				...circuit,
				flag: await fetchCountryNationFlag(circuit.country),
			}))
		);

		return data;
	} catch (error) {
		console.error(error);
	}
};

export const fetchRaceResult = async (season, round) => {
	try {
		const response = await fetch(
			`${API_URL}/${season}/${round}/results.json`
		);
		const rawData = await response.json();
		const raceInformationData = rawData.MRData.RaceTable.Races;

		if (
			Array.isArray(raceInformationData) &&
			raceInformationData.length === 0
		)
			throw new Error('Brak danych o Grand Prix z tego sezonu!');

		const raceResult = raceInformationData[0].Results;
		const data = raceResult.map(driver => ({
			position: driver.position,
			number: driver.number,
			name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
			team: driver.Constructor.name,
			laps: driver.laps,
			time: driver?.Time?.time || driver.status,
			points: driver.points,
			// nationality: driver.Driver.nationality,
		}));

		setRaceResults(data);
	} catch (error) {
		console.error(error);
	}
};

export const fetchQualifyingResult = async (season, round) => {
	try {
		const response = await fetch(
			`${API_URL}/${season}/${round}/qualifying.json`
		);
		const rawData = await response.json();
		const raceInformationData = rawData.MRData.RaceTable.Races;

		if (
			Array.isArray(raceInformationData) &&
			raceInformationData.length === 0
		)
			throw new Error(
				'Brak danych o kwalifikacjach do Grand Prix z tego sezonu!'
			);

		const qualifyingResult = raceInformationData[0].QualifyingResults;
		const data = qualifyingResult.map(driver => ({
			name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
			nationality: driver.Driver.nationality,
			team: driver.Constructor.name,
			position: driver.position,
			number: driver.number,
			q1: driver?.Q1 || null,
			q2: driver?.Q2 || null,
			q3: driver?.Q3 || null,
		}));

		return data;
	} catch (error) {
		console.error(error);
	}
};
