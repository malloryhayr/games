export interface GitHubUser {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: string | null;
	hireable: boolean;
	bio: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

export interface GitHubProject {
	owner_url: string;
	url: string;
	html_url: string;
	columns_url: string;
	id: number;
	node_id: string;
	name: string;
	body: string;
	number: number;
	state: string;
	creator: GitHubUser;
	created_at: string;
	updated_at: string;
}

export interface GitHubProjectColumn {
	url: string;
	project_url: string;
	cards_url: string;
	id: number;
	node_id: string;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface GitHubProjectColumnCard {
	url: string;
	project_url: string;
	id: number;
	node_id: string;
	note: string;
	archived: false;
	creator: GitHubUser;
	created_at: string;
	updated_at: string;
	column_url: string;
}
