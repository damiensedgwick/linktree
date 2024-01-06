import { ADMIN_AUTH } from '$lib/server/admin';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('__session');

	try {
		const decodedClaims = await ADMIN_AUTH.verifySessionCookie(sessionCookie!);
		event.locals.userID = decodedClaims.uid;
		console.log('found user id', decodedClaims.uid);
	} catch (e) {
		event.locals.userID = null;
		return resolve(event);
	}

	return resolve(event);
}) satisfies Handle;
