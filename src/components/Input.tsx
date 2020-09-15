import { useTheme } from '@shopify/restyle'
import React from 'react'
import { TextInput } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { Box, Text } from './index'
import { Theme } from './theme'
import { useField } from 'formik'

interface Props {
    label: string,
    variant?: string,
    value: string,
    handleChange: (text: string) => void,
    name: string
}


const Input: React.FC<Props> = ({ label, variant = "default", handleChange, value, name }) => {
    const [_, { error }] = useField({ name })
    const theme = useTheme<Theme>()
    return (
        <Box marginTop="m">
            <Text variant="label" marginBottom="m"> {label}</Text>
            <Box>
                <Feather name={variant === "default" ? "user" : "lock"} size={24} style={{ position: "absolute", bottom: theme.spacing.s }} />
                <TextInput
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(143, 146, 161, 0.2)',
                        paddingBottom: theme.spacing.s,
                        paddingLeft: theme.spacing.xl,
                        color: theme.colors.primaryText,
                        fontSize: 16,
                        fontFamily: 'DMSans-Medium'
                    }}
                    placeholder={variant === "default" ? "username@gmail.com" : "*********"}
                    placeholderTextColor={theme.colors.primaryText}
                    secureTextEntry={variant === "password"}
                    onChangeText={handleChange}
                    value={value}
                />
                {error ?
                    <Feather name='x' size={24} style={{ position: "absolute", right: theme.spacing.s, bottom: theme.spacing.s, color: theme.colors.danger }} /> : null
                }
            </Box>
        </Box>
    )
}

export default Input
