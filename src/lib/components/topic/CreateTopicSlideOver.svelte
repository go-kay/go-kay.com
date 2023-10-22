<script lang="ts">
	import SlideOver from '$lib/components/layout/SlideOver.svelte';
	import { toggleCreateTopicSlideOver } from '$store/home';
	import { getIcons } from '$data/FontAwesome';
	import type { FontAwesomeIcon } from '$data/FontAwesome';
	import { borderedInput } from '$style/input/borderedInput';
	import { toast } from '$lib/components/toast/toast';
	import { primaryButton } from '$style/button/primaryButton';
	import { backgroundButton } from '$style/button/backgroundButton';
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	export let open: boolean;

	let iconSearchKeyword = '',
		icons: FontAwesomeIcon[] = [],
		openIconList = false,
		name = '',
		description = '',
		timeoutId: ReturnType<typeof setTimeout> | undefined,
		selectedIcon: FontAwesomeIcon | undefined,
		starred = false,
		loading = false;

	$: {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		if (iconSearchKeyword.length > 0) {
			timeoutId = setTimeout(() => {
				icons = getIcons(iconSearchKeyword);
			}, 500);
		} else {
			icons = [];
		}
	}

	const handleFocusIconSearchInput = () => {
		openIconList = true;
	};
	const handleBlurIconSearchInput = () => {
		setTimeout(() => {
			openIconList = false;
		}, 100);
	};

	const close = () => {
		setTimeout(() => {
			iconSearchKeyword = '';
			icons = [];
			openIconList = false;
			name = '';
			description = '';
			timeoutId = undefined;
			selectedIcon = undefined;
			starred = false;
		}, 500);
		toggleCreateTopicSlideOver(false);
	};

	const handleClickIconOption = (icon: FontAwesomeIcon) => {
		selectedIcon = icon;
	};

	const handleClickDeleteIconSearchIcon = () => {
		iconSearchKeyword = '';
	};

	const handleClickStar = () => {
		starred = !starred;
	};
</script>

<SlideOver
	{open}
	title="New Topic"
	description="Create a new topic and start sharing your stories about korea with others!"
	{close}
>
	<form
		class="flex flex-col text-sm"
		slot="contents"
		id="create-topic-form"
		action="?/createTopic"
		method="POST"
		use:enhance={() => {
			loading = true;
			return ({ result }) => {
				if (result.status === 400) {
					loading = false;
					return toast({ type: 'error', description: result.data.message });
				}
				toast({ type: 'success', title: 'Congratulation!', description: 'New topic was created!' });
				toggleCreateTopicSlideOver(false);
				loading = false;
			};
		}}
	>
		<label for="topic-name" class="w-fit text-primary">Topic name</label>
		<input type="text" name="name" bind:value={name} id="topic-name" class="{borderedInput} mt-3" />
		<label for="topic-description" class="mt-6 w-fit text-primary">Description</label>
		<textarea
			name="description"
			id="topic-description"
			bind:value={description}
			class="{borderedInput} mt-3 resize-none"
			rows="2"
		/>

		<label for="search-icon" class="mt-6 w-fit text-primary">Icon</label>
		<div class="relative h-10">
			<input
				type="text"
				id="search-icon"
				autocomplete="off"
				bind:value={iconSearchKeyword}
				placeholder="search icon"
				on:focus={handleFocusIconSearchInput}
				on:blur={handleBlurIconSearchInput}
				class="{borderedInput} mt-3 w-full h-10"
			/>
			<input type="text" name="icon" class="hidden" value={selectedIcon?.className} />
			{#if iconSearchKeyword.length > 0}
				<button on:click|preventDefault={handleClickDeleteIconSearchIcon}>
					<i class="fa fa-circle-x absolute top-6 right-2 text-primary-400" />
				</button>
			{/if}
			{#if icons.length > 0 && openIconList}
				<div
					class="absolute flex border rounded-md w-full shadow-lg border-primary-200 top-[calc(100%+20px)] left-0 max-h-56 flex-col overflow-y-scroll bg-background"
				>
					{#each icons as icon}
						<button
							class="flex items-center space-x-4 hover:bg-primary-200 p-2"
							on:click|preventDefault={() => handleClickIconOption(icon)}
						>
							<i class="{icon.className} text-primary text-2xl w-8 h-8" />
							<span class="text-xs text-primary">{icon.iconName}</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<div class="p-4 bg-primary-100 flex flex-col justify-center items-center rounded mt-6">
			<i class="{selectedIcon ? selectedIcon.className : 'fa fa-icons'} text-2xl text-primary" />
			<p class="text-xs mt-2 text-primary">
				{selectedIcon ? selectedIcon.iconName : 'please select icon'}
			</p>
		</div>

		<p class="mt-6 text-sm text-primary">Preview</p>
		<div class="flex mt-2 items-center px-4 py-2 rounded bg-primary-100">
			<i class="{selectedIcon ? selectedIcon.className : 'fa fa-icons'} text-lg text-primary" />
			<p class="text-primary text-sm ml-3">{name}</p>
			<button on:click|preventDefault={handleClickStar} class="ml-auto">
				<i class="{starred ? 'fa-solid' : 'fa-regular'} fa-star text-primary" />
			</button>
		</div>
	</form>
	<div slot="actions" class="flex justify-end space-x-3">
		<button type="button" on:click={close} class="{backgroundButton} w-20">Cancel</button>
		<button form="create-topic-form" type="submit" disabled={loading} class="{primaryButton} w-20">
			{#if loading}
				<Spinner classes="!h-5 !w-5" />
			{:else}
				Create
			{/if}
		</button>
	</div>
</SlideOver>
