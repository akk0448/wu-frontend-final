import { Grid, GridItem } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import PageLayout from '../../components/PageLayout'
import TextInput, { TextInputProps } from '../../components/TextInput'
import TextPreview, { TextPreviewProps } from '../../components/TextPreview'
import { xmlFormatter } from '../../utils/formatter.util'

const Xml2Json: React.FC = () => {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')

	const fetchRes = async (inp: string): Promise<string> => {
		const res = await axios.post('/conversions/xml2json', inp, {
			headers: {
				'Content-Type': 'application/xml',
			},
		})
		return res.data
	}

	const conversionHandler = () => {
		fetchRes(input).then((out) => {
			setOutput(JSON.stringify(out, null, 4))
		})
	}

	const fileUploadHandler = (e: any) => {
		const file: File = e.target.files[0]
		file.text().then((fileInputStr) => {
			setInput(xmlFormatter(fileInputStr))
		})
		e.target.value = null
	}

	const refreshHandler = () => {
		setInput('')
		setOutput('')
	}

	const textPreviewProps: TextPreviewProps = {
		output: output,
		outputType: 'json',
		placeholder: 'JSON output',
		setOutputFn: setOutput,
		stackProps: {
			w: '90%',
			h: '100%',
		},
	}
	const textInputProps: TextInputProps = {
		input: input,
		inputType: 'xml',
		conversionHandlerFn: conversionHandler,
		fileUploadHandlerFn: fileUploadHandler,
		refreshHandlerFn: refreshHandler,
		setInputFn: setInput,
		stackProps: {
			w: '90%',
			h: '100%',
		},
	}

	return (
		<PageLayout
			title="Workbox Utilities - XML to JSON"
			desc="Utility to convert XML to JSON"
		>
			<Grid
				minH={['800px', null, '400px', '500px']}
				templateColumns={['repeat(1,1fr)', null, 'repeat(2,1fr)']}
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
				<GridItem d={'flex'} alignItems={'center'} justifyContent={'center'}>
					<TextPreview {...textPreviewProps} />
				</GridItem>
			</Grid>
		</PageLayout>
	)
}

export default Xml2Json
