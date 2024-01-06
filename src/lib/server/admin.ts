import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import {
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_PROJECT_ID
} from '$env/static/private';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FIREBASE_PROJECT_ID,
			clientEmail: FIREBASE_CLIENT_EMAIL,
			privateKey: FIREBASE_PRIVATE_KEY
		})
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (err: any) {
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

export const ADMIN_DB = getFirestore();
export const ADMIN_AUTH = getAuth();
