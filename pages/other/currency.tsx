import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	NumberInput,
	NumberInputField,
	Select,
	VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import useSWR from 'swr'
import PageLayout from '../../components/PageLayout'

const curFetcher = async () => {
	let currencies: [string, string][] = []
	const res = await axios.get<{ [key: string]: string }>(
		'/other-utilities/available-conversion'
	)
	console.log(res)
	if (res !== null)
		Object.entries(res.data).map((entry) => {
			currencies.push(entry)
		})
	return currencies
}

interface CurrencyProps {
	currencies: []
}

const Currency: React.FC<CurrencyProps> = () => {
	const outputAmountRef = useRef<HTMLInputElement>(null)
	const { data, error } = useSWR('currencies', curFetcher)

	const formats = [
		{ name: 'Indian', value: 'in' },
		{ name: 'International', value: 'intl' },
		{ name: 'None', value: 'none' },
	]

	const fetchRes = async (reqBody: any) => {
		const res = await axios.post(
			'/other-utilities/currency-conversion',
			reqBody
		)
		return res.data
	}

	const formik = useFormik({
		initialValues: {
			inputAmount: 0,
			inputCurrency: '',
			outputCurrency: '',
			formatType: 'none',
			precision: 2,
		},
		onSubmit: (values: any) => {
			const reqBody = {
				from: values.inputCurrency,
				to: values.outputCurrency,
				amount: Number(values.inputAmount),
				format: values.formatType,
			}
			console.log(reqBody)
			fetchRes(reqBody).then((out) => {
				console.log(out)
				if (outputAmountRef.current) {
					outputAmountRef.current.value = out
				}
			})
		},
	})

	const formatOptions = formats.map((entry, i) => {
		return (
			<option value={entry.value} key={i}>
				{entry.name}
			</option>
		)
	})

	return (
		<PageLayout
			title={'Workbox Utilities - Currency'}
			desc={'Utility for Currency'}
		>
			<Box w={'full'} d={'flex'} justifyContent={'center'}>
				<form onSubmit={formik.handleSubmit}>
					{!error && !data ? (
						<h1>Loading...</h1>
					) : (
						<VStack w={'600px'} spacing={6}>
							<Heading color={'brand.secondary.500'} my={8}>
								Currency Converter
							</Heading>
							<HStack w={'full'}>
								<FormControl flex={1} isRequired>
									<FormLabel>Input Amount</FormLabel>
									<NumberInput defaultValue={formik.values.inputAmount}>
										<NumberInputField
											name={'inputAmount'}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder={'Enter Amount'}
											value={formik.values.inputAmount}
											id={'inputAmount'}
										/>
									</NumberInput>
								</FormControl>

								<FormControl flex={1} isRequired>
									<FormLabel>Input Currency</FormLabel>
									<Select
										name={'inputCurrency'}
										placeholder="None"
										flex={1}
										value={formik.values.inputCurrency}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{data?.map((entry, i) => {
											return (
												<option value={entry[0]} key={i}>
													{entry[1]}
												</option>
											)
										})}
									</Select>
								</FormControl>
							</HStack>

							<HStack w={'full'}>
								<FormControl flex={1}>
									<FormLabel>Format Type</FormLabel>
									<Select
										id={'formatType'}
										name={'formatType'}
										flex={1}
										value={formik.values.formatType}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{formatOptions}
									</Select>
								</FormControl>
								<FormControl flex={1}>
									<FormLabel>Precision</FormLabel>
									<NumberInput defaultValue={formik.values.precision} flex={1}>
										<NumberInputField
											name={'precision'}
											value={formik.values.precision}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder={'Precision'}
										/>
									</NumberInput>
								</FormControl>
							</HStack>

							<HStack w={'full'}>
								<FormControl flex={1} isRequired>
									<FormLabel>Output Currency</FormLabel>
									<Select
										name={'outputCurrency'}
										placeholder="None"
										flex={1}
										value={formik.values.outputCurrency}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{data?.map((entry, i) => {
											return (
												<option value={entry[0]} key={i}>
													{entry[1]}
												</option>
											)
										})}
									</Select>
								</FormControl>
								<FormControl flex={1}>
									<FormLabel>Output Amount</FormLabel>
									<NumberInput isDisabled={true} flex={1}>
										<NumberInputField
											_disabled={{
												border: '1px solid #7C7D7E',
											}}
											ref={outputAmountRef}
											placeholder={'Converted Amount'}
										/>
									</NumberInput>
								</FormControl>
							</HStack>
							<HStack w={'full'}>
								<Button type={'submit'} flex={1} onClick={formik.submitForm}>
									Convert
								</Button>
							</HStack>
						</VStack>
					)}
				</form>
			</Box>
		</PageLayout>
	)
}

export default Currency
