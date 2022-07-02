import { NextApiRequest, NextApiResponse } from 'next';

export async function fetchAchievements(app: string) {
	return await fetch(
		`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${app}&key=${process.env.STEAM_TOKEN}&steamid=76561198271705100&format=json`
	).then(res => res.json());
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { app } = req.query;

	return res.json(await fetchAchievements(app as string));
}
