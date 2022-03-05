import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';

const LoginScreen = () => {
	const { signInWithGoogle, loading } = useAuth();

	// const showAlert = () => {
	// 	Alert.alert('hi');
	// };

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
						// showAlert();
						// console.log(`clicked!`);
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
