import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	View,
	SafeAreaView,
	TextInput,
	Button,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	FlatList,
} from 'react-native';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import tw from 'tailwind-rn';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import {
	addDoc,
	collection,
	onSnapshot,
	query,
	orderBy,
	serverTimestamp,
} from '@firebase/firestore';
import { db } from '../firebase';
import { Base64 } from 'js-base64';

//success!
// var encode = Base64.encode('hello');
// console.log(encode);
// var decode = Base64.decode(encode);
// console.log(decode);

// const decode = Base64.decode();

const encode = function (day) {
	return Base64.encode(day);
};

// console.log(encode('hello'));

const decode = function (week) {
	return Base64.decode(week);
};

const MessageScreen = () => {
	const { user } = useAuth();
	const { params } = useRoute();
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);

	const { matchDetails } = params;

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, 'matches', matchDetails.id, 'messages'),
					orderBy('timestamp', 'desc')
				),
				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),
		[matchDetails, db]
	);

	const sendMessage = () => {
		addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
			timestamp: serverTimestamp(),
			userId: user.uid,
			displayName: user.displayName,
			photoURL: matchDetails.users[user.uid].photoURL,
			messageEncrypted: encode(input),
		});

		setInput('');
	};

	// const messageDecrypt = Base64.decode(Base64.encode(input));
	// console.log(messageDecrypt);

	return (
		<SafeAreaView style={tw('flex-1')}>
			<Header
				title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
				// callEnabled
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={tw('flex-1')}
				keyboradVerticalOffset={10}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<FlatList
						data={messages}
						inverted={-1}
						style={tw('pl-4')}
						keyExtractor={(item) => item.id}
						renderItem={({ item: messageEncrypted }) =>
							messageEncrypted.userId === user.uid ? (
								<SenderMessage
									key={messageEncrypted.id}
									message={messageEncrypted}
								/>
							) : (
								<ReceiverMessage
									key={messageEncrypted.id}
									message={messageEncrypted}
								/>
							)
						}
					/>
				</TouchableWithoutFeedback>

				<View
					style={tw(
						'flex-row justify-between items-center border-t border-gray-200 px-5 py-2'
					)}
				>
					<TextInput
						style={tw('h-10 text-lg')}
						placeholder="Send Message..."
						onChangeText={setInput}
						onSubmitEditing={sendMessage}
						value={input}
					/>
					<Button onPress={sendMessage} title="Send" color="#FF00BF" />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default MessageScreen;
