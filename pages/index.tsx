import { GetStaticPropsContext } from 'next';

import { useGames, useSteamLibrary } from 'lib/hooks';
import { GamesResponse, SteamLibraryResponse } from 'lib/types';
import GameCard from 'components/game';
import { fetchGames } from './api/games';
import { fetchLibrary } from './api/steam/library';
import { useLanyard } from 'use-lanyard';

interface Props {
	games: GamesResponse;
	library: SteamLibraryResponse;
}

export default function Home(props: Props) {
	const { data: games = props.games } = useGames();
	const { data: library = props.library } = useSteamLibrary();
	const { data: lanyard } = useLanyard('182292736790102017');

	if (games) {
		return (
			<>
				{games.notStarted.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="NOT_STARTED"
						library={library}
						lanyard={lanyard}
					/>
				))}
				{games.playing.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="PLAYING"
						library={library}
						lanyard={lanyard}
					/>
				))}
				{games.completedNotFully.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="COMPLETED_NOT_FULLY"
						library={library}
						lanyard={lanyard}
					/>
				))}
				{games.completedFully.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="COMPLETED_FULLY"
						library={library}
						lanyard={lanyard}
					/>
				))}
				{games.notForCompletion.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="NOT_FOR_COMPLETION"
						library={library}
						lanyard={lanyard}
					/>
				))}
				{games.willNotComplete.map(game => (
					<GameCard
						game={game}
						key={game.title}
						status="WILL_NOT_COMPLETE"
						library={library}
						lanyard={lanyard}
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
		revalidate: 86400,
	};
}
