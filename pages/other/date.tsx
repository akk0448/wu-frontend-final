import { Grid } from '@chakra-ui/react'
import React from 'react'
import PageLayout from '../../components/PageLayout'
import UtilityBox, { UtilityBoxProps } from '../../components/UtilityBox'

const dateProps: UtilityBoxProps = {
	heading: 'Date Utilities',
	utilities: [
		{ name: 'Day Finder', linkTo: '/other/date/dayFinder' },
		{ name: 'Date Conversions', linkTo: '/other/date/dateConvertor' },
	],
}

const Date = () => {
	return (
		<PageLayout title={'Workbox Utilities - Date'} desc={'Utility for Date'}>
			<Grid
				w="full"
				templateColumns={'repeat(1,1fr)'}
				rowGap={[50, 50, 10, 20]}
				columnGap={[0, 100, 10]}
			>
				<UtilityBox {...dateProps} />
			</Grid>
		</PageLayout>
	)
}

export default Date
