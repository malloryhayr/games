import { NextApiRequest, NextApiResponse } from 'next';

import { GamesRawResponse, GamesResponse } from 'lib/types';
import { parseGameData } from 'lib/games';
import { fetchColumn as fetchColumnRoute } from './github/[owner]/[repo]/[project]/column';

export async function fetchGames() {
	const fetchColumn = async (column: string) =>
		await fetchColumnRoute('iGalaxyYT', 'games', '2', column);

	const notStarted = await fetchColumn('Not Started');
	const playing = await fetchColumn('Playing');
	const completedNotFully = await fetchColumn('Completed (< 100%)');
	const completedFully = await fetchColumn('Completed (100%)');
	const notForCompletion = await fetchColumn('Not For Completion');
	const willNotComplete = await fetchColumn('Will Not Complete');

	const raw: GamesRawResponse = {
		notStarted,
		playing,
		completedNotFully,
		completedFully,
		notForCompletion,
		willNotComplete,
	};

	const processed: GamesResponse = {
		notStarted: [],
		playing: [],
		completedNotFully: [],
		completedFully: [],
		notForCompletion: [],
		willNotComplete: [],
	};

	Object.keys(raw).forEach(key => {
		raw[key as keyof GamesRawResponse].forEach(card => {
			const { note } = card;

			processed[key as keyof GamesRawResponse].push(parseGameData(note));
		});
	});

	return processed;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return res.json(await fetchGames());
}
