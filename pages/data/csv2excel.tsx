import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import PageLayout from '../../components/PageLayout'

const Csv2Excel = () => {
	return (
		<PageLayout
			title="Workbox Utilities - CSV to EXCEL"
			desc="Utility to convert CSV to EXCEL"
		>
			<Box>
				<Button as={'label'} htmlFor={'csv-upload'}>
					Upload Csv File
				</Button>
				<input
					type="file"
					name="csv-upload"
					id="csv-upload"
					style={{ display: 'none' }}
					onInput={() => {}}
				/>
			</Box>
		</PageLayout>
	)
}

export default Csv2Excel
