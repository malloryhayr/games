import { GitHubProjectColumnCard } from './github';

export type GamePlatform =
	| 'STEAM'
	| 'EPIC'
	| 'ORIGIN'
	| 'PC'
	| 'OCULUS_PC'
	| 'OCULUS_QUEST'
	| 'NSW'
	| '3DS'
	| 'WII'
	| 'WIIU'
	| 'XBONE'
	| 'XBSX'
	| 'PS5';

export type GameTag =
	| 'EARLY_ACCESS'
	| 'FAVORITE'
	| 'PARTY'
	| 'REPLAYABLE'
	| 'VR';

export interface Game {
	title: string;
	release: string;
	platform: GamePlatform[];
	steamid?: string;
	cover: string;
	tags?: GameTag[];
}

export interface GamesRawResponse {
	notStarted: GitHubProjectColumnCard[];
	playing: GitHubProjectColumnCard[];
	completedNotFully: GitHubProjectColumnCard[];
	completedFully: GitHubProjectColumnCard[];
	notForCompletion: GitHubProjectColumnCard[];
	willNotComplete: GitHubProjectColumnCard[];
}

export interface GamesResponse {
	notStarted: Game[];
	playing: Game[];
	completedNotFully: Game[];
	completedFully: Game[];
	notForCompletion: Game[];
	willNotComplete: Game[];
}
