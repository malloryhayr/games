import { NextApiRequest, NextApiResponse } from 'next';

import { GitHubProject, GitHubProjectColumn } from 'lib/types';

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

	return res.json(
		await fetch(
			columnsResponse.find((x: GitHubProjectColumn) => x.name === column)
				.cards_url,
			{
				headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
			}
		).then(res => res.json())
	);
}
