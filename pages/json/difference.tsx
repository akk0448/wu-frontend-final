import {
	Heading,
	VStack,
	Textarea,
	Button,
	Grid,
	GridItem,
	ButtonGroup,
	IconButton,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { MdClose, MdEdit, MdRefresh } from 'react-icons/md'

import PageLayout from '../../components/PageLayout'
import { formatterMap } from '../../utils/formatter.util'

const Difference: React.FC = () => {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')
	const [readonly, setReadonly] = useState(true)

	const fetchRes = async (inp: string): Promise<string> => {
		const res = await axios.post('/json/difference', inp, {
			headers: {
				'Content-Type': 'application/json',
				Acccept: '*/*',
			},
		})

		return res.data
	}

	const differenceHandler = () => {
		fetchRes(input).then((op: string) => {
			const res = op.split('|')
			let out = ''
			for (let s of res) {
				out += `${s.trim()}\n`
			}
			setOutput(out)
		})
	}

	const refreshHandler = () => {
		setInput('')
		setOutput('')
	}

	const prettifyInput = () => {
		const formattedInput = formatterMap['json'](input)
		setInput(formattedInput)
	}

	return (
		<PageLayout
			title={'Workbox Utilities - Json Difference'}
			desc={'Utility for finding difference between JSONs'}
		>
			<Grid
				m={[0, 1]}
				minH={['800px', null, '400px', '500px']}
				templateColumns={['repeat(1,1fr)', null, 'repeat(2,1fr)']}
				rowGap={8}
			>
				<GridItem
					id="textinput"
					d={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<VStack w={'90%'} h={'100%'} spacing={4}>
						<Heading color={'brand.secondary.500'}>JSON Input</Heading>
						<Textarea
							flex={1}
							bg={'blackAlpha.800'}
							color={'whiteAlpha.800'}
							placeholder={`Enter JSON `}
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<ButtonGroup>
							<Button onClick={differenceHandler}>Find the difference</Button>
							<IconButton
								onClick={refreshHandler}
								icon={<MdRefresh />}
								aria-label={'Refresh'}
							/>
							<Button onClick={prettifyInput} disabled={input === ''}>
								Prettify
							</Button>
						</ButtonGroup>
					</VStack>
				</GridItem>
				<GridItem
					id="textOutput"
					d={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<VStack w={'90%'} h={'100%'} spacing={4}>
						<Heading color={'brand.secondary.500'}>Output</Heading>
						<Textarea
							flex={1}
							bg={'blackAlpha.800'}
							color={'whiteAlpha.800'}
							placeholder={`Difference displayed here`}
							value={output}
							readOnly={readonly}
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
						</ButtonGroup>
					</VStack>
				</GridItem>
			</Grid>
		</PageLayout>
	)
}

export default Difference
