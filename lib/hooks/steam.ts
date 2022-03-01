import useSWR from 'swr';

export function useSteamLibrary() {
	return useSWR<any, Error>(`/api/steam/library`, url =>
		fetch(url).then(res => res.json())
	);
}
