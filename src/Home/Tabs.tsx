import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Box } from '../components'

interface Props {
    active: number;
    onPress: (i:number) => void
}

const Tabs = ({ active, onPress }: Props) => {
    const values = ['Active', 'Important', 'Completed']
    return (
        <View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {values.map((v, i) => (
                    <Box width={100}>
                        <Text variant="header1" onPress={() => onPress(i)} key={i} color={ active === i ? 'primaryText': 'secondaryText'}>{v}</Text>
                    </Box>
                ))}
            </ScrollView>
        </View>
    )
}

export default Tabs
