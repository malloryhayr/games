import { NextApiRequest, NextApiResponse } from 'next';

export async function fetchLibrary() {
	return await fetch(
		`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_TOKEN}&steamid=76561198271705100&include_played_free_games=true&format=json`
	).then(res => res.json());
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return res.json(await fetchLibrary());
}
