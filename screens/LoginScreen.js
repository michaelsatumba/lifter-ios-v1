import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import * as Google from 'expo-auth-session/providers/google';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithCredential,
} from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
	const { signInWithGoogle, loading } = useAuth();

	// const showAlert = () => {
	// 	alert('hi');
	// };

	// const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
	// 	androidClientId:
	// 		'716473907866-ts1gjlj7lv544poutddhnogujv4k4sae.apps.googleusercontent.com',
	// });

	// React.useEffect(() => {
	// 	if (response?.type === 'success') {
	// 		const { id_token } = response.params;

	// 		const auth = getAuth();
	// 		const provider = new GoogleAuthProvider();
	// 		const credential = provider.credential(id_token);
	// 		signInWithCredential(auth, credential);
	// 	}
	// }, [response]);

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
