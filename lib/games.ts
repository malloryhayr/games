import { Game, GamePlatform, GameTag } from 'lib/types';

export function parseGameData(note: string): Game {
	const PARSERS = {
		title: (title: string) => title,
		release: (release: string) => release,
		platform: (platform: string) => platform.split(', ') as GamePlatform[],
		steamid: (steamid: string) => steamid,
		cover: (cover: string) => cover,
		tags: (tags: string) => tags.split(', ') as GameTag[],
	};

	let game: any = {};

	const lines = note.split('\r\n');
	lines.forEach(line => {
		const key = line.match('(.*?):')![0].replace(':', '');
		const value = line.replace(`${key}: `, '');

		game[`${key}`] =
			PARSERS[
				`${key}` as
					| 'title'
					| 'release'
					| 'platform'
					| 'steamid'
					| 'cover'
					| 'tags'
			](value);
	});

	return game as Game;
}
