export { default as Home } from './Home'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import MyTabbar from '../components/MyTabbar'
const BottomTabbar = createBottomTabNavigator()

const HomeTabbar = () => {
    return (
      <BottomTabbar.Navigator tabBar={props => <MyTabbar {...props} />}>
          <BottomTabbar.Screen component={Home} name="Home" />
          <BottomTabbar.Screen component={Home} name="User" />
          <BottomTabbar.Screen component={Home} name="Add" options={{ tabBarLabel: 'plus'}} />
          <BottomTabbar.Screen component={Home} name="Notification" options={{ tabBarLabel: 'bell'}} />
          <BottomTabbar.Screen component={Home} name="Settings" />
      </BottomTabbar.Navigator>
    )
}

export default HomeTabbar