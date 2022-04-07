import { Grid, GridItem } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import PageLayout from '../../components/PageLayout'
import TextInput, { TextInputProps } from '../../components/TextInput'
import { jsonFormatter } from '../../utils/formatter.util'



const Json2Pojo = () => {
	const [input, setInput] = useState('')

	const fetchRes = async (inp: string): Promise<string> => {
		const res = await axios.post('/conversions/json2pojo', inp, {
			headers: {
				'Content-Type': 'application/json',
				Acccept: '*/*',
			},
		})
		alert(res.data)
		return res.data
	}

	const refreshHandler = () => {
		setInput('')
	}

	const conversionHandler = () => {
		fetchRes(input)
	}

	const fileUploadHandler = (e: any) => {
		const file: File = e.target.files[0]
		file.text().then((fileInputStr) => {
			setInput(jsonFormatter(fileInputStr))
		})
		e.target.value = null
		console.log(e.target.files)
	}

	const textInputProps: TextInputProps = {
		input,
		inputType: 'json',
		setInputFn: setInput,
		conversionHandlerFn: conversionHandler,
		fileUploadHandlerFn: fileUploadHandler,
		refreshHandlerFn: refreshHandler,
		stackProps: {
			w: '90%',
			h: '100%',
		},
	}

	return (
		<PageLayout
			title={'Workbox Utilities - JSON to POJO'}
			desc={'Utility to convert JSON to POJO'}
		>
			<Grid
				minH={['800px', null, '400px', '500px']}
				templateColumns={'repeat(1,1fr)'}
				rowGap={8}
			>
				<GridItem
					d={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<TextInput {...textInputProps} />
				</GridItem>
			</Grid>
		</PageLayout>
	)
}

export default Json2Pojo
