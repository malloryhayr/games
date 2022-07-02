import { SteamAchievement } from 'lib/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAchievements } from './[app]/achievements';

export async function fetchLibrary() {
	let library = await fetch(
		`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_TOKEN}&steamid=76561198271705100&include_played_free_games=true&format=json`
	).then(res => res.json());

	library.response.games = await Promise.all(
		library.response.games.map(async (game: any) => {
			const achievements = (await fetchAchievements(game.appid)).playerstats
				.achievements as SteamAchievement[];

			return {
				...game,
				achievements: achievements != undefined ? achievements : [],
			};
		})
	);

	return library;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return res.json(await fetchLibrary());
}
