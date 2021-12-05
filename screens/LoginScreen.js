import React from 'react'
import { View, Text, Button } from 'react-native'
import useAuth from '../hooks/useAuth'


const LoginScreen = () => {
        const { signInWithGoogle } = useAuth()
    return (
        <View>
            <Text>Log in to the app</Text>
            <Button title="login" onPress={signInWithGoogle} />
        </View>
    )
}

export default LoginScreen
