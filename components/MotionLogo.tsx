import { motion, Variants } from 'framer-motion'
import { Image, type ImageProps } from '@chakra-ui/react'
import React from 'react'

const MotionImage = motion<ImageProps>(Image)

export interface MotionLogoProps extends ImageProps {}

const MotionLogo: React.FC<MotionLogoProps> = () => {
	const variants: Variants = {
		initial: {
			rotate: 360,
			transition: {
				duration: 1,
				ease: 'easeInOut',
				repeat: Infinity,
				repeatDelay: 20,
			},
		},
	}

	return (
		<MotionImage
			w={[12, 10, null, 12, 14]}
			whileInView="initial"
			variants={variants}
			alt="logo"
			src="/logo/open-box-128.png"
		/>
	)
}

export default MotionLogo
