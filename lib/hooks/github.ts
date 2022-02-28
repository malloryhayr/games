import useSWR from 'swr';

import { GitHubProjectColumnCard } from 'lib/types';

export function useGitHubProjectColumn(
	owner: string,
	repo: string,
	project: number,
	column: string
) {
	return useSWR<GitHubProjectColumnCard[], Error>(
		`/api/github/${owner}/${repo}/${project}/column?column=${column}`,
		url => fetch(url).then(res => res.json())
	);
}
