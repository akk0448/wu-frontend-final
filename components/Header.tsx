import { Center, Heading, LinkBox, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import MotionLogo from './MotionLogo'

const Header = () => {
	return (
		<Center>
			<Link href={'/'} passHref>
				<LinkBox as={'div'} py={10} cursor="pointer">
					<Stack direction={['column', 'row']} spacing={4}>
						<Center>
							<MotionLogo
								src="/logo/open-box-128.png"
								alt="logo"
								mr={{ xs: 6, '2xl': 20 }}
								width={16}
							/>
						</Center>
						<Center>
							<Heading
								color={'brand.secondary.700'}
								fontSize={['2xl', null, '3xl', '4xl']}
							>
								Workbox Utilities
							</Heading>
						</Center>
					</Stack>
				</LinkBox>
			</Link>
		</Center>
	)
}

export default Header
