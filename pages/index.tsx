import { GetStaticPropsContext } from 'next';

import { useGames, useSteamLibrary } from 'lib/hooks';
import { GamesResponse, SteamLibraryResponse } from 'lib/types';
import GameCard from 'components/game';
import { fetchGames } from './api/games';
import { fetchLibrary } from './api/steam/library';

interface Props {
	games: GamesResponse;
	library: SteamLibraryResponse;
}

export default function Home(props: Props) {
	const { data: games = props.games } = useGames();
	const { data: library = props.library } = useSteamLibrary();

	if (games) {
		return (
			<>
				{games.notStarted.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="NOT_STARTED"
						library={library}
					/>
				))}
				{games.playing.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="PLAYING"
						library={library}
					/>
				))}
				{games.completedNotFully.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="COMPLETED_NOT_FULLY"
						library={library}
					/>
				))}
				{games.completedFully.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="COMPLETED_FULLY"
						library={library}
					/>
				))}
				{games.notForCompletion.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="NOT_FOR_COMPLETION"
						library={library}
					/>
				))}
				{games.willNotComplete.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="WILL_NOT_COMPLETE"
						library={library}
					/>
				))}
			</>
		);
	} else {
		return <></>;
	}
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const games = await fetchGames();

	const library = await fetchLibrary();

	return {
		props: {
			games,
			library,
		},
	};
}
