import {
	Textarea,
	IconButton,
	VStack,
	StackProps,
	ButtonGroup,
	Button,
	Heading,
} from '@chakra-ui/react'
import { useState } from 'react'
import { saveFile } from '../utils/save.util'

import { MdClose, MdDownload, MdEdit } from 'react-icons/md'
import { formatterMap } from '../utils/formatter.util'

export interface TextPreviewProps {
	output: string
	outputType: 'xml' | 'json'
	placeholder: string
	setOutputFn: React.Dispatch<React.SetStateAction<string>>
	stackProps?: StackProps
}

const TextPreview: React.FC<TextPreviewProps> = ({
	output,
	outputType,
	placeholder,
	setOutputFn,
	stackProps,
}) => {
	const [readonly, setReadonly] = useState(true)

	const prettifyOutput = () => {
		const formattedOutput = formatterMap[outputType](output)
		setOutputFn(formattedOutput)
	}

	const downloadOutputFile = () => {
		saveFile(output, 'output', outputType)
	}

	return (
		<VStack {...stackProps} spacing={4}>
			<Heading color={'brand.secondary.500'}>Output</Heading>
			<Textarea
				flex={1}
				bg={'blackAlpha.800'}
				color={'whiteAlpha.800'}
				onChange={(e) => setOutputFn(e.target.value)}
				readOnly={readonly}
				value={output}
				placeholder={placeholder}
			/>
			<ButtonGroup>
				{readonly === true ? (
					<IconButton
						icon={<MdEdit />}
						aria-label={'Edit'}
						onClick={() => {
							setReadonly(false)
						}}
					/>
				) : (
					<IconButton
						icon={<MdClose />}
						aria-label={'Edit'}
						onClick={() => {
							setReadonly(true)
						}}
					/>
				)}
				<Button onClick={prettifyOutput} disabled={output === ''}>
					Prettify
				</Button>
				<IconButton
					icon={<MdDownload />}
					aria-label={'Downlod Button'}
					onClick={downloadOutputFile}
				></IconButton>
			</ButtonGroup>
		</VStack>
	)
}

export default TextPreview
