import type { NextPage } from 'next';
import Image from 'next/image';

import { useGames } from 'lib/hooks';

const Home: NextPage = () => {
	const { data: games } = useGames();

	if (games) {
		return (
			<>
				{games.notStarted.map((game, i) => {
					return (
						<div key={`notStarted${i}`}>
							<strong>{game.title}</strong>
							<div
								style={{
									width: '300px',
									height: '450px',
									backgroundImage: `url(${game.cover})`,
									backgroundSize: 'cover',
								}}
							></div>
						</div>
					);
				})}
				{games.playing.map((game, i) => {
					return (
						<div key={`playing${i}`}>
							<strong>{game.title}</strong>
							<div
								style={{
									width: '300px',
									height: '450px',
									backgroundImage: `url(${game.cover})`,
									backgroundSize: 'cover',
								}}
							></div>
						</div>
					);
				})}
				{games.completedNotFully.map((game, i) => {
					return (
						<div key={`completedNotFully${i}`}>
							<strong>{game.title}</strong>
							<div
								style={{
									width: '300px',
									height: '450px',
									backgroundImage: `url(${game.cover})`,
									backgroundSize: 'cover',
								}}
							></div>
						</div>
					);
				})}
				{games.completedFully.map((game, i) => {
					return (
						<div key={`completedFully${i}`}>
							<strong>{game.title}</strong>
							<div
								style={{
									width: '300px',
									height: '450px',
									backgroundImage: `url(${game.cover})`,
									backgroundSize: 'cover',
								}}
							></div>
						</div>
					);
				})}
				{games.notForCompletion.map((game, i) => {
					return (
						<div key={`notForCompletion${i}`}>
							<strong>{game.title}</strong>
							<div
								style={{
									width: '300px',
									height: '450px',
									backgroundImage: `url(${game.cover})`,
									backgroundSize: 'cover',
								}}
							></div>
						</div>
					);
				})}
				{games.willNotComplete.map((game, i) => {
					return (
						<div key={`willNotComplete${i}`}>
							<strong>{game.title}</strong>
							<div
								style={{
									width: '300px',
									height: '450px',
									backgroundImage: `url(${game.cover})`,
									backgroundSize: 'cover',
								}}
							></div>
						</div>
					);
				})}
			</>
		);
	} else {
		return <></>;
	}
};

export default Home;
