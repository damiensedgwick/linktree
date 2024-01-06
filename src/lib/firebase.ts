import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable, type Readable, derived } from 'svelte/store';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA2YzwXUifr5eUD_cRdR7VBJ2pC0UJENr8',
	authDomain: 'linktree-e298a.firebaseapp.com',
	projectId: 'linktree-e298a',
	storageBucket: 'linktree-e298a.appspot.com',
	messagingSenderId: '985288810204',
	appId: '1:985288810204:web:2cde34840335795fa61e19'
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth();
export const FIREBASE_DB = getFirestore();
export const FIREBASE_STORAGE = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
	let unsubscribe: () => void;

	if (!FIREBASE_AUTH || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(FIREBASE_AUTH?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(FIREBASE_DB, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

interface UserData {
	username: string;
	bio: string;
	photoURL: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
	if ($user) {
		return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
	} else {
		set(null);
	}
});
