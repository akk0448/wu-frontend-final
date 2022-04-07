import { Button, Center } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import PageLayout from '../../components/PageLayout'
import { saveFile } from '../../utils/save.util'

const Excel2csv = () => {
	const uploadExcelHandler = async (e: any) => {
		const file: File = e.target.files[0]
		const formData = new FormData()
		formData.append('excel', file)
		const resData: string = await fetchRes(formData)
		saveFile(resData, 'output', 'csv')
		e.target.value = null
	}

	const fetchRes = async (formData: FormData) => {
		const res = await axios.post('/data/excel2csv', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		console.log(res.data)
		return res.data
	}

	return (
		<PageLayout
			title="Workbox Utilities - EXCEL to CSV"
			desc="Utility to convert EXCEL to CSV"
		>
			<Center>
				<Button as={'label'} htmlFor={'excel-upload'}>
					Upload Excel File
				</Button>
				<input
					type="file"
					name="excel-upload"
					id="excel-upload"
					style={{ display: 'none' }}
					onInput={(e) => uploadExcelHandler(e)}
				/>
			</Center>
		</PageLayout>
	)
}

export default Excel2csv
