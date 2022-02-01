import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-rn';
import { Base64 } from 'js-base64';

const SenderMessage = ({ message }) => {
	const decode = function (week) {
		return Base64.decode(week);
	};
	// console.log(decode(message.messageEncrypted));
	return (
		<View
			style={[
				tw('bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2'),
				{ alignSelf: 'flex-start', marginLeft: 'auto' },
			]}
		>
			<Text style={tw('text-white')}>{decode(message.messageEncrypted)}</Text>
		</View>
	);
};

export default SenderMessage;
