import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react';
import {
	View,
	Text,
	Alert,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';

const LoginScreen = () => {
	const { signInWithGoogle, loading } = useAuth();
	const navigation = useNavigation();

	const showAlert = () => {
		Alert.alert('You need to...');
	};

	return (
		<View style={tw('flex-1')}>
			<ImageBackground
				resizeMode="cover"
				style={tw('flex-1')}
				source={require('../Lifterlogo.png')}
			>
				<TouchableOpacity
					style={[
						tw('absolute bottom-40 w-52 bg-white p-4 rounded-2xl'),
						{ marginHorizontal: '25%' },
					]}
					onPress={() => {
						showAlert();
						console.log(`clicked!`);
						signInWithGoogle();
					}}
				>
					<Text style={tw('font-semibold text-center')}>Sign in</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;
