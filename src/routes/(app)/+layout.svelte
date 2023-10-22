<script lang="ts">
	import AppBar from '$lib/components/layout/AppBar.svelte';
	import SideBarMain from '$lib/components/layout/SideBarMain.svelte';
	import SideBarSub from '$lib/components/layout/SideBarSub.svelte';
	import CreateTopicSlideOver from '$lib/components/topic/CreateTopicSlideOver.svelte';
	import { homeStore } from '$store/home';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	let { user } = data;

	$: {
		({ user } = data);
	}
</script>

<div class="flex flex-col h-screen">
	<AppBar />
	<main class="flex h-[calc(100vh-48px)]">
		<aside class="hidden sm:flex">
			<SideBarMain />
			<SideBarSub {user} />
		</aside>
		<section class="px-4 sm:px-16 max-w-7xl mx-auto w-full overflow-y-scroll h-full max-h-full">
			<slot />
		</section>
	</main>
</div>

<CreateTopicSlideOver open={$homeStore.createTopic} />
