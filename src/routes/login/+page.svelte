<script lang="ts">
	import { FIREBASE_AUTH } from '$lib/firebase';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signOut as firebaseSignOut,
		signOut
	} from 'firebase/auth';
	import { user } from '$lib/firebase';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(FIREBASE_AUTH, provider);

		const idToken = await credential.user.getIdToken();

		await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});
	}

	async function signOutSSR() {
		await fetch('/api/signin', {
			method: 'DELETE'
		});

		await signOut(FIREBASE_AUTH);
	}
</script>

{#if $user}
	<slot />
	<h2>Welcome {$user.displayName}</h2>
	<button class="btn btn-primary w-1/2" on:click={signOutSSR}>Sign out</button>
{:else}
	<h2>Sign In</h2>
	<button class="btn btn-primary w-1/2" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
