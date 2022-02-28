import { NextApiRequest, NextApiResponse } from 'next';

import {
	GitHubProject,
	GitHubProjectColumn,
	GitHubProjectColumnCard,
} from 'lib/types';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { owner, repo, project, column } = req.query;

	const projectsResponse = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/projects`,
		{ headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
	).then(res => res.json());

	const columnsResponse = await fetch(
		projectsResponse.find((x: GitHubProject) => x.number === +project)
			.columns_url,
		{ headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
	).then(res => res.json());

	const cards: GitHubProjectColumnCard[] = [];

	async function fetchCards(page: number) {
		const newCards = await fetch(
			columnsResponse.find((x: GitHubProjectColumn) => x.name === column)
				.cards_url + `?per_page=100&page=${page}`,
			{
				headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
			}
		).then(res => res.json());

		cards.push(...newCards);

		if (newCards.length === 100) await fetchCards(page + 1);
	}

	await fetchCards(1);

	return res.json(cards);
}
