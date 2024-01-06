<script lang="ts">
	import UserLink from '$lib/components/UserLink.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>@{data.username} Links</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<main class="w-80 text-center mx-auto space-y-4 pt-8">
	<h1 class="text-4xl text-purple-500">
		@{data.username}
	</h1>

	<img src={data.photoURL ?? '/user.png'} alt="photoURL" width="192" class="mx-auto rounded-full" />

	<p class="text-xl">{data.bio ?? 'no bio yet...'}</p>

	<ul class="list-none space-y-3">
		{#each data.links as item}
			<li>
				<UserLink {...item} />
			</li>
		{/each}
	</ul>

	<a href="/{data.username}/edit" class="btn btn-outline btn-ghost w-full">Edit Profile</a>
</main>
