import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';

const ModalScreen = () => {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [interest, setInterest] = useState(null);
	const [age, setAge] = useState(null);

	const incompleteForm = !interest || !age;

	const updateUserProfile = () => {
		setDoc(doc(db, 'users', user.uid), {
			id: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL,
			interest: interest,
			age: age,
			timestamp: serverTimestamp(),
		})
			.then(() => {
				navigation.navigate('Home');
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<View style={tw('flex-1 items-center pt-1')}>
			<Image
				style={tw('h-20 w-full')}
				resizeMode="contain"
				source={require('../Lifterlogo2.png')}
			/>

			<Text style={tw('text-xl text-gray-500 font-bold')}>
				Welcome {user.displayName}
			</Text>

			<Text style={tw('text-center p-1 font-bold text-pink-400')}>
				Step 1: Age
			</Text>
			<TextInput
				value={age}
				onChangeText={setAge}
				style={tw('text-center text-xl pb-2')}
				placeholder="Enter your age"
				keyboardType="numeric"
				maxLength={2}
			/>

			<Text style={tw('text-center p-4 font-bold text-pink-400')}>
				Step 2: Exercise interest(s)
			</Text>
			<TextInput
				value={interest}
				onChangeText={setInterest}
				style={tw('text-center text-xl pb-2')}
				placeholder="Enter an exercise interest(s)"
			/>

			<TouchableOpacity
				disabled={incompleteForm}
				style={[
					tw('w-64 p-3 rounded-xl'),
					incompleteForm ? tw('bg-gray-400') : tw('bg-pink-400'),
				]}
				onPress={updateUserProfile}
			>
				<Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ModalScreen;
