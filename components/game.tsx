import React, { useState } from 'react';
import Image from 'next/image';

import { Game, GameStatus, SteamLibraryResponse } from 'lib/types';
import { useMinecraftPlaytime } from 'lib/hooks';

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
import {
	FiCalendar,
	FiMonitor,
	FiRefreshCw,
	FiStar,
	FiClock,
} from 'react-icons/fi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { GiTrophy } from 'react-icons/gi';
// @ts-ignore
import Hover from 'react-3d-hover';

import styled from 'styled-components';

export default function GameCard({
	game,
	status,
	library,
}: {
	game: Game;
	status: GameStatus;
	library: SteamLibraryResponse;
}) {
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

	let steam: any = undefined;
	if (game.steamid && library)
		steam = library.response.games.find(x => x.appid === +game.steamid!);

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
							? `https://steamcommunity.com/id/iGalaxyOfficial/stats/${game.steamid}`
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
						<div
							style={{
								marginBottom: '12px',
								color: 'rgba(255, 255, 255, 0.5)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<p
								style={{
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
								{status === 'COMPLETED_FULLY' ? (
									<GiTrophy
										style={{ marginLeft: '9px' }}
										color={'rgb(235, 180, 52)'}
									/>
								) : status === 'COMPLETED_NOT_FULLY' ? (
									<GiTrophy style={{ marginLeft: '9px' }} />
								) : (
									<></>
								)}
							</p>
							<p>
								{steam &&
									(steam.playtime_forever < 60 ? (
										<span
											style={{
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<FiClock style={{ marginRight: '4px' }} />
											{steam.playtime_forever}m
										</span>
									) : (
										<span
											style={{
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<FiClock style={{ marginRight: '4px' }} />
											{Math.floor(steam.playtime_forever / 60)}h{' '}
											{steam.playtime_forever % 60}m
										</span>
									))}
								{game.title === 'Minecraft: Java Edition' && (
									<MinecraftPlaytime />
								)}
							</p>
						</div>
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

function MinecraftPlaytime() {
	const playtime = useMinecraftPlaytime();

	if (playtime) {
		return playtime < 60 ? (
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<FiClock style={{ marginRight: '4px' }} />
				{Math.round(playtime / 100)}m
			</span>
		) : (
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<FiClock style={{ marginRight: '4px' }} />
				{Math.floor(Math.round(playtime / 10) / 60)}h{' '}
				{Math.round(playtime / 10) % 60}m
			</span>
		);
	} else return <></>;
}

const GameContainer = styled.div`
	background-color: #0d1015;
	border: 1px solid rgb(39, 41, 46);

	transition: filter 0.1s;

	border-radius: 4px;
	padding: 18px;
	margin: 18px;
`;
