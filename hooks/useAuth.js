import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import * as Google from 'expo-google-app-auth';

import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
} from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

const config = {
	androidClientId:
		'716473907866-u91djp14bj54sb58jfmnrlfoajanacb4.apps.googleusercontent.com',
	iosClientId:
		// real
		// '716473907866-7vmae79ied1f6lj80bie6bc0c2vng4a0.apps.googleusercontent.com',
		// expo
		'716473907866-u9mvqtjkfiudblekl4dr05225qs1lup6.apps.googleusercontent.com',
	iosStandaloneAppClientId:
		'716473907866-7vmae79ied1f6lj80bie6bc0c2vng4a0.apps.googleusercontent.com',
	webClientId:
		'716473907866-u91djp14bj54sb58jfmnrlfoajanacb4.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
	permissions: ['public_profile', 'email', 'gender', 'location'],
};

export const AuthProvider = ({ children }) => {
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// Logged in
					setUser(user);
				} else {
					// Not logged in
					setUser(null);
				}
				setLoadingInitial(false);
			}),
		[]
	);

	const logout = () => {
		setLoading(true);

		signOut(auth)
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	const signInWithGoogle = async () => {
		setLoading(true);

		try {
			console.log(`about to call logInAsync()`);
			let logInResult = await Google.logInAsync(config);
			console.log(`Got logInResult: (${logInResult.type})`);
			if (logInResult.type === 'success') {
				//login...
				const { idToken, accessToken } = logInResult;
				const credential = GoogleAuthProvider.credential(idToken, accessToken);

				// we might not do anything w/ the return, but we want to catch an exception
				let signInCredentials = await signInWithCredential(auth, credential);
			}

			// same result as 'return Promise.reject()'
			throw new Error(`Login to Google failed: (${logInResult.type})`);
		} catch (ex) {
			console.error(ex);
		}
		setLoading(false);
		return null; // success!
	};

	const memoedValue = useMemo(
		() => ({
			user,
			loading,
			error,
			signInWithGoogle,
			logout,
		}),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!loadingInitial && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
