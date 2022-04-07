import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import Header from './Header'

export interface PageLayoutProps {
	title: string
	desc: string
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, desc }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={desc} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Container
				p={'0'}
				minW="100vw"
				minH="100vh"
				bgColor={'gray.50'}
				d={'flex'}
				alignItems={'center'}
				flexDirection={'column'}
			>
				<Header />
				<Box w={'90%'} my={'6'}>
					{children}
				</Box>
			</Container>
		</>
	)
}

export default PageLayout
