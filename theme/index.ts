import {
	extendTheme,
	type ThemeConfig,
	theme as baseTheme,
} from '@chakra-ui/react'
import breakPoints from './breakpoints'
import brandColors from './colors'
import global from './globals'

const config: ThemeConfig = {}

const theme = extendTheme({
	styles: {
		global,
	},
	breakPoints,
	colors: {
		brand: brandColors,
	},
	config,
	baseTheme,
})

export default theme
/**
 * 574AE2
 * 00ABE7
 * 2DC7FF
 * 080708
 * 28262C
 */
