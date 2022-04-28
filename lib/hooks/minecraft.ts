import { useLanyard } from 'use-lanyard';

export function useMinecraftPlaytime() {
	const { data } = useLanyard('182292736790102017');

	return +`${data?.kv.polymc_playtime}`;
}
