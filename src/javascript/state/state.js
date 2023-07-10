//STATE
let state = {
	circuits: [],
	details: {},
	results: {
		race: [],
		qualifying: [],
	},
	season: 'current',
	round: '',
};

//GETTERS
export const getSeason = () => state.season;
export const getCircuits = () => state.circuits;
export const getQualifyingResult = () => state.results.qualifying;
export const getRaceResult = () => state.results.race;
export const getRaceDetails = () => state.details;
export const getRound = () => state.round;

//SETTERS
const setState = newStateCallback => {
	const previousState = { ...state };
	const newState = newStateCallback(previousState);

	state = { ...previousState, ...newState };
};

export const setSeason = season => {
	setState(prevState => ({
		...prevState,
		season,
	}));
};

export const setRound = round => {
	setState(prevState => ({
		...prevState,
		round,
	}));
};

export const setCircuits = circuits => {
	setState(prevState => ({
		...prevState,
		circuits,
	}));
};

export const setRaceDetails = details => {
	setState(prevState => ({
		...prevState,
		details,
	}));
};

export const setRaceResults = raceResults => {
	setState(prevState => ({
		...prevState,
		results: {
			...prevState.results,
			race: raceResults,
		},
	}));
};

export const setQualifyingResults = qualifyingResults => {
	setState(prevState => ({
		...prevState,
		results: {
			...prevState.results,
			qualifying: qualifyingResults,
		},
	}));
};
