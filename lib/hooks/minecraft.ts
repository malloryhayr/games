import { useLanyard } from 'use-lanyard';

export function useMinecraftPlaytime() {
	const { data } = useLanyard('182292736790102017');

	return (
		Number(data?.kv.polymc_playtime) +
		Number(data?.kv.polymc_playtime_macbook) +
		Number(data?.kv.polymc_playtime_steamdeck)
	);
}
