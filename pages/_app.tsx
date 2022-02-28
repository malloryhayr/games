import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import styled from 'styled-components';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>William Hayr</title>
			</Head>
			<PageContainer>
				<PageContent>
					<Component {...pageProps} />
				</PageContent>
			</PageContainer>
		</>
	);
}

const PageContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media only screen and (max-width: 930px) {
		width: 75%;
		margin-left: 12.5%;
	}
`;

const PageContent = styled.div`
	width: 96rem;
	height: auto;

	margin-top: 10rem;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;

	@media only screen and (max-width: 930px) {
		width: 100%;
	}
	@media only screen and (max-width: 670px) {
		margin-top: 4rem;
	}
`;
