import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Heading, HStack, VStack } from '@chakra-ui/layout'
import React, { useRef } from 'react'
import PageLayout from '../../../components/PageLayout'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { useFormik } from 'formik'
import axios from 'axios'

const DayFinder = () => {
    const outputDay = useRef<HTMLInputElement>(null)
    
    const fetchRes = async (reqBody : any) => {
        const res = await axios.post(
            '/other-utilities/date/dayFinder',
            reqBody
        )
        return res.data
    }

    const formik = useFormik({
        initialValues: {
            inputDate: ''
        },
        onSubmit: (values: any) => {
            const reqBody = {
                date: values.inputDate,
                format: ''
            }
            console.log(reqBody)
            fetchRes(reqBody).then((out) => {
                console.log(out)
                if (outputDay.current) {
                    outputDay.current.value = out
                }
            })
        },
    })

	return (
		<PageLayout title={'Workbox Utilities - Date'} desc={'Utility for Day Finder'}>
            <Box w={'full'} d={'flex'} justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <VStack w={'600px'} spacing={6}>
                        <Heading color={'brand.secondary.500'} my={8}>
							Day Finder
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
									id={'inputDate'}
                                />
						    </FormControl>
                            <FormControl flex={1}>
                                <FormLabel>Day</FormLabel>
                                <Input 
                                    isDisabled={true} 
                                    flex={1}
                                    _disabled={{
                                        border: '1px solid #7C7D7E',
                                    }}
                                    ref={outputDay} 
                                    placeholder='' />
                            </FormControl>
                        </HStack>
                        <HStack w={'full'}>
						    <Button type={'submit'} flex={1} onClick={formik.submitForm}>
							    Find
						    </Button>
					    </HStack>
                    </VStack>
                </form>
            </Box>
		</PageLayout>
	)
}

export default DayFinder
