import type { NextPage } from 'next'
import { Grid } from '@chakra-ui/react'
import UtilityBox, { UtilityBoxProps } from '../components/UtilityBox'
import PageLayout from '../components/PageLayout'

const Home: NextPage = () => {
	const conversionProps: UtilityBoxProps = {
		heading: 'Conversions',
		utilities: [
			{ name: 'XML to JSON', linkTo: '/conversions/xml2json' },
			{ name: 'JSON to XML', linkTo: '/conversions/json2xml' },
			{ name: 'JSON to POJO', linkTo: '/conversions/json2pojo' },
			{ name: 'POJO to JSON', linkTo: '/conversions/pojo2json' },
		],
	}

	const jsonProps: UtilityBoxProps = {
		heading: 'Json Utility',
		utilities: [
			{ name: 'Difference b/w JSONs', linkTo: '/json/difference' },
			{ name: 'Add key to JSON', linkTo: '/json/addkey' },
			{ name: 'Remove key from JSON', linkTo: '/json/removekey' },
		],
	}

	const otherProps: UtilityBoxProps = {
		heading: 'Other Utilities',
		utilities: [
			{ name: 'DATE', linkTo: '/other/date' },
			{ name: 'SMS', linkTo: '/other/sms' },
			{ name: 'CURRENCY', linkTo: '/other/currency' },
		],
	}

	const exportImportProps: UtilityBoxProps = {
		heading: 'Export/Import Utility',
		utilities: [
			{ name: 'CSV to PDF', linkTo: '/data/csv2pdf' },
			{ name: 'EXCEL to PDF', linkTo: '/data/excel2pdf' },
			{ name: 'CSV to EXCEL', linkTo: '/data/csv2excel' },
			{ name: 'EXCEL to CSV', linkTo: '/data/excel2csv' },
		],
	}

	return (
		<PageLayout
			title="Workbox Utilities - Technocrats"
			desc="Utility for everyone"
		>
			<Grid
				w="full"
				templateColumns={['repeat(1,1fr)', null, 'repeat(2, 1fr)']}
				rowGap={[50, 50, 10, 20]}
				columnGap={[0, 100, 10]}
			>
				<UtilityBox {...conversionProps} />
				<UtilityBox {...jsonProps} />
				<UtilityBox {...otherProps} />
				<UtilityBox {...exportImportProps} />
			</Grid>
		</PageLayout>
	)
}

export default Home
