<script lang="ts">
	import { FIREBASE_AUTH } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
	import { user } from '$lib/firebase';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(FIREBASE_AUTH, provider);
		console.log(user);
	}

	async function signOut() {
		await firebaseSignOut(FIREBASE_AUTH);
	}
</script>

{#if $user}
	<slot />
	<h2>Welcome {$user.displayName}</h2>
	<button class="btn btn-primary w-1/2" on:click={signOut}>Sign out</button>
{:else}
	<h2>Sign In</h2>
	<button class="btn btn-primary w-1/2" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
