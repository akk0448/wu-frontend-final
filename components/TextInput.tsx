import {
	Button,
	ButtonGroup,
	IconButton,
	StackProps,
	Textarea,
	VStack,
	Heading,
} from '@chakra-ui/react'
import React from 'react'
import { MdRefresh, MdUpload } from 'react-icons/md'
import { formatterMap } from '../utils/formatter.util'

export interface TextInputProps {
	inputType: 'xml' | 'json'
	setInputFn: React.Dispatch<React.SetStateAction<string>>
	input: string
	conversionHandlerFn: () => void
	fileUploadHandlerFn: (e: any) => void
	refreshHandlerFn: () => void
	stackProps?: StackProps
}

const TextInput: React.FC<TextInputProps> = ({
	inputType,
	input,
	setInputFn,
	conversionHandlerFn,
	fileUploadHandlerFn,
	refreshHandlerFn,
	stackProps,
}) => {
	const prettifyInput = () => {
		const formattedInput = formatterMap[inputType](input)
		setInputFn(formattedInput)
	}

	return (
		<VStack {...stackProps} spacing={4}>
			<Heading color={'brand.secondary.500'}>Input</Heading>
			<Textarea
				flex={1}
				bg={'blackAlpha.800'}
				color={'whiteAlpha.800'}
				placeholder={`Enter ${inputType.toUpperCase()}`}
				value={input}
				onChange={(e) => setInputFn(e.target.value)}
			/>
			<ButtonGroup>
				<Button onClick={conversionHandlerFn} disabled={input.trim() === ''}>
					Convert
				</Button>
				<Button onClick={prettifyInput} disabled={input === ''}>
					Prettify
				</Button>
				<IconButton
					onClick={refreshHandlerFn}
					icon={<MdRefresh />}
					aria-label={'Refresh'}
				/>
				<IconButton
					as={'label'}
					htmlFor={'file-upload'}
					icon={<MdUpload />}
					aria-label={'Upload file'}
				/>
				<input
					id="file-upload"
					name="file-upload"
					type="file"
					style={{ display: 'none' }}
					accept={`.${inputType.toLowerCase()}`}
					onInput={fileUploadHandlerFn}
				/>
			</ButtonGroup>
		</VStack>
	)
}

export default TextInput
