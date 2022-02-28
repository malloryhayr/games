import { NextApiRequest, NextApiResponse } from 'next';

import { GamesRawResponse, GamesResponse } from 'lib/types';
import { parseGameData } from 'lib/games';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const fetchColumn = async (column: string) =>
		await fetch(
			`http://${req.headers.host}/api/github/iGalaxyYT/games/2/column?column=${column}`
		).then(res => res.json());

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

	return res.json(processed);
}
