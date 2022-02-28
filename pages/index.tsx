import { GetStaticPropsContext } from 'next';

import { useGames } from 'lib/hooks';
import { GamesResponse } from 'lib/types';
import GameCard from 'components/game';

interface Props {
	games: GamesResponse;
}

export default function Home(props: Props) {
	const { data: games = props.games } = useGames();

	if (games) {
		return (
			<>
				{games.notStarted.map(game => (
					<GameCard game={game} key={game.title} status="NOT_STARTED" />
				))}
				{games.playing.map(game => (
					<GameCard game={game} key={game.title} status="PLAYING" />
				))}
				{games.completedNotFully.map(game => (
					<GameCard game={game} key={game.title} status="COMPLETED_NOT_FULLY" />
				))}
				{games.completedFully.map(game => (
					<GameCard game={game} key={game.title} status="COMPLETED_FULLY" />
				))}
				{games.notForCompletion.map(game => (
					<GameCard game={game} key={game.title} status="NOT_FOR_COMPLETION" />
				))}
				{games.willNotComplete.map(game => (
					<GameCard game={game} key={game.title} status="WILL_NOT_COMPLETE" />
				))}
			</>
		);
	} else {
		return <></>;
	}
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const games = await fetch(
		`${
			process.env.VERCEL_ENV === 'development'
				? 'http://localhost:3000'
				: 'https://games.igalaxy.dev'
		}/api/games`
	).then(res => res.json());

	return {
		props: {
			games,
		},
	};
}
