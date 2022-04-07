import { Center, GridItem, Heading } from '@chakra-ui/react'
import UtilityButton, { IUtility } from './UtilityButton'

export interface UtilityBoxProps {
	heading: string
	utilities: IUtility[]
}

const UtilityBox: React.FC<UtilityBoxProps> = ({ heading, utilities }) => {
	const getAllUtilities = (utilities: IUtility[]) => {
		const utilityComponents = utilities.map((utility, key) => {
			return <UtilityButton utility={utility} key={key} />
		})
		return utilityComponents
	}

	return (
		<Center>
			<GridItem
				w={['90%', '70%', 'full', '80%', '60%']}
				h={'full'}
				d="flex"
				borderRadius={8}
				alignItems="center"
				flexDirection="column"
				bgColor={'brand.secondary.400'}
				p={4}
			>
				<Heading
					fontSize={['2xl', null, '2xl', '2xl', '3xl']}
					mb={[6, null, null, null, null, 10]}
				>
					{heading}
				</Heading>
				{getAllUtilities(utilities)}
			</GridItem>
		</Center>
	)
}

export default UtilityBox
