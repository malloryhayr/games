import useSWR from 'swr';

import { GamesResponse } from 'lib/types';

export function useGames() {
	return useSWR<GamesResponse, Error>(`/api/games`, url =>
		fetch(url).then(res => res.json())
	);
}
