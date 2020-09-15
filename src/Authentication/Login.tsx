import React, { useEffect } from 'react'
import { Linking, TouchableWithoutFeedback, View, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { validate } from '../../helpers'
import { Box, Text } from '../components'
import Button from '../components/Button'
import Input from '../components/Input'
import { useTheme } from '@shopify/restyle'
import { Theme } from 'src/components/theme'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions'
import { LoginResposne } from 'types/response'
import axios, { AxiosResponse } from 'axios'
import { Formik } from 'formik'
import { State, AuthType, Routes} from 'types'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'



const { height} = Dimensions.get('window')

interface Prop {
    navigation : StackNavigationProp<Routes,"Login">,
    route: RouteProp<Routes,"Login">
}
const Login = ({ navigation  }: Prop) => {
    const theme = useTheme<Theme>()
    const dispatch = useDispatch()
    const { isLoggedIn, ID  } = useSelector<State,AuthType>((state) => {
        console.log('State',state)
        return state.authReducer
    })
    useEffect(() => {
        if(isLoggedIn && ID) 
            navigation.navigate('Home')
    })
    return (
        <View style={{  padding: theme.spacing.l, marginTop: theme.spacing.l, height }} >
            <Box flexDirection="row" marginBottom="xl" >
                <Feather name="map-pin" size={24} />
                <Text variant="body"> Delhi, India</Text>
            </Box>
            <Text variant="header" >Let's Sign You In </Text>
            <Text variant="body1">Welcome back, you’ve been missed!</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values, { setErrors, setSubmitting }) =>{
                    const errors = validate(values)
                    if(errors.email || errors.password ) {
                    setErrors(errors)
                    setSubmitting(false)
                    return
                    }
                    try{
                        const { data }:AxiosResponse<LoginResposne> = await axios({
                            url: 'https://blood-request-api.herokuapp.com/v2/authenticate',
                            method: 'POST',
                            data: { email: values.email, phone: values.password }
                        })
                        if(data.error) {
                            setErrors({ password : data.error })
                            setSubmitting(false)
                            return 
                        } 
                        dispatch(login(data))
                        navigation.navigate('Home')
                        console.log(data.user)
                    } catch (error) { 
                        setErrors({ email: error.message })
                        setSubmitting(false)
                    }
                    console.log(values)
                    
                }}
            >
                {({ handleChange, handleSubmit, values , isSubmitting}) => (
                    <View style={{ flex: 1}}>
                        <Box marginTop="xl" flex={1} flexDirection="column">
                            <Input handleChange={handleChange('email')} value={values.email} label='Username or Email' name="email"  />
                            <Input handleChange={handleChange('password')} value={values.password} label='Password' variant="password" name="password" />
                        </Box>
                        <Box marginTop="xl" flex={1} >
                            <Button isLoading={isSubmitting} onPress={handleSubmit} variant="login" />
                            <Box flexDirection="row" marginVertical="s" alignItems="center" justifyContent="center">
                                <Text variant="body1" textAlign="center" >Facing some errors? reach us </Text>
                                <TouchableWithoutFeedback onPress={()=> Linking.openURL('mailto:anish.yadav@bloodconnect.org?subject=Workfly Issue&body=Description') }><Text variant="body">here</Text></TouchableWithoutFeedback>
                            </Box>
                        </Box>
                    </View>
                )}
            </Formik>

        </View>

    )
}

export default Login