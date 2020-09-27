import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { TabNavigationState, NavigationHelpers, Route } from '@react-navigation/native';
import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Feather from 'react-native-vector-icons/Feather'
import { Box, Theme } from './theme';
import { useTheme } from '@shopify/restyle';
import { useLogoutMutation } from '../generated/graphql'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
interface Props {
    state:TabNavigationState;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<any,BottomTabNavigationEventMap>;
}

const MyTabbar = ({ state, descriptors, navigation }: Props) => {
   const focusedOptions = descriptors[state.routes[state.index].key].options;
   const theme  = useTheme<Theme>();

   const [logoutUser ] = useLogoutMutation()
   const dispatch = useDispatch()

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.colors.mainBackground, height: 60 }}>
      {state.routes.map((route: Route<string>, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          
          if ((!isFocused || route.name === "Add") && !event.defaultPrevented ) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconColor = theme.colors.secondaryText

        if(isFocused) {
            iconColor = theme.colors.primaryText
        }
        if(label === "plus") {
            iconColor = theme.colors.whiteText
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={route.name}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Box  paddingVertical="m" justifyContent='center' alignItems="center" >
                <Box borderRadius={25}   backgroundColor={label =="plus" ? "primaryText": "mainBackground"}>
                    
                    <Feather style={{ padding: theme.spacing.s}} name={label.toString().toLowerCase()} size={24} color={ iconColor } />
                </Box>
            </Box>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
            accessibilityRole="button"
            style={{ flex: 1 }}
            onPress={() => {
              logoutUser().then(({data, errors }) => {
                if( !errors && data && data.logout)
                  dispatch(logout())
              })
            }}
          >
            <Box  paddingVertical="l" justifyContent='center' alignItems="center" >
                <Box borderRadius={25}   backgroundColor="mainBackground">
                    
                    <Feather style={{ padding: theme.spacing.s}} name="log-out" size={24} color={theme.colors.danger} />
                </Box>
            </Box>
          </TouchableOpacity>
    </View>
  );
}

export default MyTabbar
