import React from 'react'
import { TouchableWithoutFeedback, View, Dimensions, ActivityIndicator } from 'react-native'
import { useTheme } from '@shopify/restyle'
import { Theme } from './theme'
import { Text } from './index'
import Feather from 'react-native-vector-icons/Feather'

interface Props {
    isLoading: boolean,
    variant:string,
    onPress:() => void
}

const { width } = Dimensions.get('window')
const Button = ({ variant = "default", onPress, isLoading}: Props) => {
    const theme = useTheme<Theme>()
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                backgroundColor: theme.colors.cardPrimaryBackground,
                height: 50,
                flexDirection:'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: theme.spacing.m,
                paddingHorizontal: theme.spacing.l,
                borderRadius: 25
            }}>
                <Text></Text>
                <Text variant="subheader" color="mainBackground" >SIGN IN</Text>
                {isLoading ? (
        <ActivityIndicator color='white' />
      ) :  <Feather name={variant === "login" ? "log-in":"lock"} size={16} color='white' />}
               
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Button
