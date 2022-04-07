import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import theme from '../theme'
import axios from 'axios'

function MyApp({ Component, pageProps }: AppProps) {
	axios.defaults.baseURL = 
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8080/'
			: 'https://workbox-utilities-inkathon.herokuapp.com/'

	return (
		<ChakraProvider resetCSS theme={theme}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
