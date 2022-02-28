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
					<GameCard game={game} key={game.title} />
				))}
				{games.playing.map(game => (
					<GameCard game={game} key={game.title} />
				))}
				{games.completedNotFully.map(game => (
					<GameCard game={game} key={game.title} />
				))}
				{games.completedFully.map(game => (
					<GameCard game={game} key={game.title} />
				))}
				{games.notForCompletion.map(game => (
					<GameCard game={game} key={game.title} />
				))}
				{games.willNotComplete.map(game => (
					<GameCard game={game} key={game.title} />
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
