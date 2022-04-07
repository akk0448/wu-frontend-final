import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Select, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import useSWR from 'swr'
import PageLayout from '../../../components/PageLayout'

const formatFetcher = async () => {
	let formats: string[] = []
	const res = await axios.get<string[]>(
		'/other-utilities/date/available-conversions'
	)
	if (res !== null)
		Object.entries(res.data).map((entry) => {
			formats.push(entry[1])
		})
	return formats
}

interface FormatProps {
	formats: []
}

const DateConvertor: React.FC<FormatProps> = () => {
	const outputDate = useRef<HTMLInputElement>(null)
	const { data, error } = useSWR('formats', formatFetcher)
    
    const fetchRes = async (reqBody : any) => {
        const res = await axios.post(
            '/other-utilities/date/convert',
            reqBody
        )
        return res.data
    }

    const formik = useFormik({
        initialValues: {
            inputDate: '',
			inputFormat: ''
        },
        onSubmit: (values: any) => {
            const reqBody = {
                date: values.inputDate,
                format: values.inputFormat
            }
            console.log(reqBody)
            fetchRes(reqBody).then((out) => {
                console.log(out)
                if (outputDate.current) {
                    outputDate.current.value = out
                }
            })
        },
    })
	
	
	return (
		<PageLayout title={'Workbox Utilities - Date'} desc={'Utility for Date Format Convertor'}>
			<Box w={'full'} d={'flex'} justifyContent={'center'}>
				<form onSubmit={formik.handleSubmit}>
				{!error && !data ? (
						<h1>Loading...</h1>
					) : (
						<VStack w={'600px'} spacing={6}>
							<Heading color={'brand.secondary.500'} my={8}>
								Date Formatter
							</Heading>
							<HStack w={'full'}>
								<FormControl flex={1} isRequired>
									<FormLabel>Enter date</FormLabel>
									<Input
										name={'inputDate'}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										placeholder='DD-MM-YYYY'
										value={formik.values.inputDate}
										id={'inputDate'} />
								</FormControl>
								<FormControl flex={1}>
									<FormLabel>Formatted Date</FormLabel>
									<Input
										isDisabled={true}
										flex={1}
										_disabled={{
											border: '1px solid #7C7D7E',
										}}
										ref={outputDate}
										placeholder='' />
								</FormControl>
							</HStack>
							<HStack w={'full'}>
								<FormControl flex={1} isRequired>
									<FormLabel>Date Format</FormLabel>
									<Select
										name={'inputFormat'}
										placeholder="None"
										flex={1}
										value={formik.values.inputFormat}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									>
										{data?.map((entry,i) => {
											return (
												<option value={entry} key={i}>
													{entry}
												</option>
											)
										})}
									</Select>
								</FormControl>
							</HStack>
							<HStack w={'full'}>
								<Button type={'submit'} flex={1} onClick={formik.submitForm}>
									Find
								</Button>
							</HStack>
						</VStack>
					)}
				</form>
			</Box>
		</PageLayout>
	)
}

export default DateConvertor
