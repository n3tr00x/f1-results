import {
	setCircuits,
	setQualifyingResults,
	setRaceDetails,
	setRaceResults,
} from '../state/state';

const API_URL = 'http://ergast.com/api/f1';
const COUNTRIES_URL = 'https://restcountries.com/v3.1';

const handleExceptionsCountryNames = country => {
	switch (country) {
		case 'UK':
			country = 'GB';
			return country;
		case 'China':
			country = 'CN';
			return country;
		default:
			return country;
	}
};

const fetchCountryNationFlag = async countryName => {
	try {
		const country = handleExceptionsCountryNames(countryName);

		const response = await fetch(
			`${COUNTRIES_URL}/name/${country}?fields=flags`
		);

		if (!response.ok)
			throw new Error(
				'Wystąpił nieoczekiwany błąd przy pobieraniu danych!'
			);

		const data = await response.json();

		return data[0].flags.png;
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

export const fetchAllCircuits = async season => {
	try {
		const response = await fetch(`${API_URL}/${season}.json`);
		const rawData = await response.json();
		const circuitsData = rawData.MRData.RaceTable.Races;

		if (circuitsData?.length === 0)
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

		setCircuits(data);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

export const fetchRaceResult = async (season, round) => {
	try {
		const response = await fetch(
			`${API_URL}/${season}/${round}/results.json`
		);
		const rawData = await response.json();
		const raceInformationData = rawData.MRData.RaceTable.Races;

		if (raceInformationData?.length === 0)
			throw new Error('Brak danych o Grand Prix z tego sezonu!');

		const raceResult = raceInformationData[0].Results;
		const data = raceResult.map(driver => ({
			position: driver.position,
			number: driver.number,
			name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
			code:
				driver.Driver.code ||
				driver.Driver.familyName.slice(0, 3).toUpperCase(),
			team: driver.Constructor.name,
			laps: driver.laps,
			time: driver?.Time?.time || driver.status,
			points: driver.points,
		}));

		setRaceResults(data);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

export const fetchQualifyingResult = async (season, round) => {
	try {
		const response = await fetch(
			`${API_URL}/${season}/${round}/qualifying.json`
		);
		const rawData = await response.json();
		const raceInformationData = rawData.MRData.RaceTable.Races;

		if (raceInformationData?.length === 0)
			throw new Error(
				'Brak danych o kwalifikacjach do Grand Prix z tego sezonu!'
			);

		const qualifyingResult = raceInformationData[0].QualifyingResults;
		const data = qualifyingResult.map(driver => ({
			position: driver.position,
			number: driver.number,
			name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
			code:
				driver.Driver.code ||
				driver.Driver.familyName.slice(0, 3).toUpperCase(),
			team: driver.Constructor.name,
			q1: driver?.Q1 || null,
			q2: driver?.Q2 || null,
			q3: driver?.Q3 || null,
		}));

		setQualifyingResults(data);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

export const fetchRaceDetails = async (season, round) => {
	try {
		const response = await fetch(`${API_URL}/${season}/${round}.json`);
		const rawData = await response.json();
		const raceInformationData = rawData.MRData.RaceTable.Races[0];

		if (raceInformationData?.length === 0)
			throw new Error('Brak danych o Grand Prix z tego sezonu!');

		const details = {
			date: raceInformationData.date,
			raceName: raceInformationData.raceName,
			country: raceInformationData.Circuit.Location.country,
			locality: raceInformationData.Circuit.Location.locality,
			season: raceInformationData.season,
			round: raceInformationData.round,
		};

		const flag = await fetchCountryNationFlag(details.country);

		const data = {
			...details,
			flag,
		};

		setRaceDetails(data);

		return data;
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};
