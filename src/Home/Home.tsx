import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, ScrollView, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Routes, State, AuthType } from 'types'
import { RouteProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Box, Text } from '../components'
import { useTheme } from '@shopify/restyle'
import { Theme } from 'src/components/theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Tabs from './Tabs'

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">,
  route: RouteProp<Routes, "Login">
}

const Home = ({ navigation }: Prop) => {


  const { name } = useSelector<State, AuthType>((state) => ({ ...state.authReducer }))
  const theme = useTheme<Theme>();
  const [active,setActive] = useState<number>(0)

  const handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [])


  const Line = () => {
    return (
      <View style={{ height: 4, width: 50,borderRadius: 4, backgroundColor: theme.colors.cardPrimaryBackground }} />
    )
  }
  return (
    <Box flex={1} padding="l" marginTop="l" backgroundColor="mainBackground" >
      <Text variant="header">{name}</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: theme.spacing.l, maxHeight: 220 }}
      >
        <TouchableWithoutFeedback>
          <Box flexDirection="column" marginRight="s" backgroundColor="cardPrimaryBackground" justifyContent="space-between" padding="l" height={200} minWidth={150} borderRadius={theme.spacing.m}>
            <Text variant="header" color="whiteText">Active</Text>
            <Text variant="hero" color="whiteText">24</Text>
          </Box>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Box flexDirection="column" marginHorizontal="s" backgroundColor="greyCard" justifyContent="space-between" padding="l" height={200} borderRadius={theme.spacing.m}>
            <Text variant="header" color="secondaryText">Important</Text>
            <Text variant="hero" color="secondaryText">14</Text>
          </Box>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Box flexDirection="column" marginHorizontal="s" backgroundColor="greyCard" justifyContent="space-between" padding="l" height={200} borderRadius={theme.spacing.m}>
            <Text variant="header" color="secondaryText">Completed</Text>
            <Text variant="hero" color="secondaryText">16</Text>
          </Box>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Tabs active={active} onPress={setActive} />
      <Line  />
    </Box>
  )
}

export default Home
