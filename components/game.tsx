import React, { useState } from 'react';

import { Game } from 'lib/types';
import Image from 'next/image';

import {
	SiSteam,
	SiEpicgames,
	SiOrigin,
	SiOculus,
	SiNintendoswitch,
	SiNintendo3Ds,
	SiWii,
	SiWiiu,
	SiXbox,
	SiPlaystation5,
	SiGooglecardboard,
} from 'react-icons/si';
import { FiCalendar, FiMonitor, FiRefreshCw, FiStar } from 'react-icons/fi';
import { HiOutlineUserGroup } from 'react-icons/hi';
// @ts-ignore
import Hover from 'react-3d-hover';

import styled from 'styled-components';

export default function GameCard({ game }: { game: Game }) {
	const icons = {
		STEAM: SiSteam,
		EPIC: SiEpicgames,
		ORIGIN: SiOrigin,
		PC: FiMonitor,
		OCULUS_PC: SiOculus,
		OCULUS_QUEST: SiOculus,
		NSW: SiNintendoswitch,
		'3DS': SiNintendo3Ds,
		WII: SiWii,
		WIIU: SiWiiu,
		XBONE: SiXbox,
		XBSX: SiXbox,
		PS5: SiPlaystation5,
	};

	const tags = {
		EARLY_ACCESS: FiCalendar,
		FAVORITE: FiStar,
		PARTY: HiOutlineUserGroup,
		REPLAYABLE: FiRefreshCw,
		VR: SiGooglecardboard,
	};

	const [isHovered, setIsHovered] = useState(false);

	let style: any = {};

	if (game.tags?.includes('FAVORITE')) {
		style.backgroundColor = '#765C1E';
		style.border = '1px solid rgb(235, 180, 52)';
	}

	return (
		<Hover
			max={30}
			speed={400}
			scale={1.25}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<GameContainer style={style}>
				<a
					href={
						game.steamid
							? `https://store.steampowered.com/app/${game.steamid}`
							: undefined
					}
					target="_blank"
					rel="noreferrer"
				>
					<div>
						<p
							style={{
								marginBottom: '9px',
								fontWeight: '700',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							{game.title}
							{game.platform.map(platform => {
								const Icon = icons[platform];
								return (
									<Icon
										color={'white'}
										key={`${game.title}${platform}`}
										style={{ marginLeft: '9px' }}
									/>
								);
							})}
						</p>
						<p
							style={{
								marginBottom: '12px',
								color: 'rgba(255, 255, 255, 0.5)',
								fontVariant: 'small-caps',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							tags
							{game.tags ? (
								game.tags.map(tag => {
									const Icon = tags[tag];
									return (
										<Icon
											key={`${game.title}${tag}`}
											style={{ marginLeft: '9px' }}
										/>
									);
								})
							) : (
								<></>
							)}
						</p>
						<div style={{ borderRadius: '4px', overflow: 'hidden' }}>
							<Image
								src={game.cover}
								alt={game.title}
								width={300}
								height={game.platform.includes('3DS') ? 300 : 450}
							/>
						</div>
					</div>
				</a>
			</GameContainer>
		</Hover>
	);
}

const GameContainer = styled.div`
	background-color: #0d1015;
	border: 1px solid rgb(39, 41, 46);

	transition: filter 0.1s;

	border-radius: 4px;
	padding: 18px;
	margin: 18px;
`;
