import { Button, type ButtonProps } from '@chakra-ui/react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const MotionButton = motion<ButtonProps>(Button)

export interface IUtility {
	name: string
	linkTo: string
}

interface UtilityButtonProps extends ButtonProps {
	utility: IUtility
}

const UtilityButton: React.FC<UtilityButtonProps> = ({ utility }) => {
	const variants: Variants = {
		hover: {
			scale: 1.05,
			transition: { ease: 'easeOut', duration: 0.1 },
		},
	}

	return (
		<Link href={utility.linkTo} passHref>
			<MotionButton
				whileHover="hover"
				variants={variants}
				mb={[4, null, null, null, null]}
				fontSize={[null, null, 'sm', 'md']}
				bg={'brand.tertiary.100'}
			>
				{utility.name}
			</MotionButton>
		</Link>
	)
}

export default UtilityButton
