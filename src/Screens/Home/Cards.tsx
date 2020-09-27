import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Animated } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Extrapolate } from 'react-native-reanimated'
import { Box, Text } from '../../components'
import { Theme } from '../../components/theme'
import { Stats } from '../../generated/graphql'

interface Props {
    handlePress: (i:number) => void;
    y:Animated.Value;
    stats: Stats | undefined;
    loading: boolean
}
export const CARDS_HEIGHT = 300
const Cards = ({ y, handlePress, stats, loading }: Props) => {

  const opacity1 = y.interpolate({

        inputRange:[0,CARDS_HEIGHT],
        outputRange: [1,0],
        extrapolate: Extrapolate.CLAMP

  })

    const theme = useTheme<Theme>()
    return (
        <Animated.View style={{ opacity: opacity1 }}>
            <Text paddingHorizontal="l" paddingTop="l" variant="header" color="primaryText" >Workfly</Text>
         <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: theme.spacing.l, maxHeight: 220, height: 220 }}
          snapToInterval={150}
        >
          <TouchableWithoutFeedback onPress={() => handlePress(0)}>
            <Box
              flexDirection="column"
              marginLeft="l"
              marginRight="s"
              backgroundColor="cardPrimaryBackground"
              justifyContent="space-between"
              padding="l"
              height={200}
              minWidth={150}
              borderRadius={theme.spacing.m}
            >
              <Text variant="header" color="whiteText">
                Open
              </Text>
              <Text variant="hero" color="whiteText">
                { stats ? stats.open: 0}
              </Text>
            </Box>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handlePress(1)}>
            <Box
              flexDirection="column"
              marginHorizontal="s"
              backgroundColor="greyCard"
              justifyContent="space-between"
              padding="l"
              height={200}
              borderRadius={theme.spacing.m}
            >
              <Text variant="header" color="secondaryText">
                Working
              </Text>
              <Text variant="hero" color="secondaryText">
                { stats ? stats.working : 0}
              </Text>
            </Box>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handlePress(2)}>
            <Box
              flexDirection="column"
              marginHorizontal="s"
              backgroundColor="greyCard"
              justifyContent="space-between"
              padding="l"
              height={200}
              borderRadius={theme.spacing.m}
            >
              <Text variant="header" color="secondaryText">
                Completed
              </Text>
              <Text variant="hero" color="secondaryText">
                { stats ? stats.completed : 0}
              </Text>
            </Box>
          </TouchableWithoutFeedback>
        </ScrollView>
        </Animated.View>
    )
}

export default Cards
