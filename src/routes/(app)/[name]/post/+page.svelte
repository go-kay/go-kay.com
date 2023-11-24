<script lang="ts">
	import { borderedInput } from '$style/input/borderedInput';
	import type { PageData } from './$types';
	import type { User } from '$db/schema';
	import { primaryButton } from '$style/button/primaryButton';
	import { enhance } from '$app/forms';
	import { toast } from '$lib/components/toast/toast';
	import Spinner from '$lib/components/spinner/Spinner.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import AuthorInfo from '$lib/components/post/AuthorInfo.svelte';
	import { backgroundButton } from '$style/button/backgroundButton';
	import type { ActionResult } from '@sveltejs/kit';
	import moment from 'moment';
	import { generateImageFileName } from '$lib/utils/generateImageFileName';

	export let data: PageData;

	let user: User,
		loading = false,
		images: File[] = [],
		{ topic, supabase } = data;
	$: user = data.user as User;
	$: topic = data.topic;
	$: supabase = data.supabase;

	const handleClickCancel = () => {
		history.back();
	};

	const handleInputImage = (e: Event) => {
		if (!e.target) return;
		const input = e.target as HTMLInputElement;
		if (input.files) {
			for (let j = 0; j < input.files.length; j++) {
				const file = input.files[j];
				if (file) {
					images = [...images, file];
				}
			}
			input.value = '';
		}
	};

	const handleEditImage = (e: Event, index: number) => {
		if (!e.target) return;
		const input = e.target as HTMLInputElement;
		if (input.files) {
			const file = input.files[0];
			if (file) {
				images[index] = file;
				images = images;
			}
		}
	};

	const handleClickDeleteImage = (index: number) => {
		images.splice(index, 1);
		images = images;
	};

	const handleActionResult = async ({ result }: { result: ActionResult }) => {
		if (result.type === 'success') {
			await invalidate('app:topics');
			await goto('/' + $page.params.name);
			toast({
				type: 'success',
				description: 'You just created a post!'
			});
		} else if (result.type === 'failure' && result.data) {
			toast({
				type: 'error',
				description: result.data.message
			});
		}
		loading = false;
	};
</script>

<div class="py-4 border-b border-primary-200 flex-col">
	<div class="flex items-center text-primary">
		<i class="{topic.icon} text-primary mr-2" />
		<p class="text-primary">{topic.name}</p>
	</div>
	<div class="flex justify-between items-end mt-2">
		<h3 class="text-primary">New Post</h3>
		<AuthorInfo {user} />
	</div>
</div>

<form
	action="?/post"
	method="POST"
	class="flex flex-col"
	enctype="multipart/form-data"
	use:enhance={async ({ cancel, formData }) => {
		loading = true;
		const now = moment.now();
		const paths = [];
		const urls = [];
		for (let i = 0; i < images.length; i++) {
			const image = images[i];
			const path = `${topic.name}/${user.id}/${now.toString()}/${generateImageFileName(
				image.name
			)}`;
			let { error } = await supabase.storage.from('images').upload(path, image, { upsert: false });
			if (error) {
				console.error(error);
				cancel();
				await supabase.storage.from('images').remove(paths);
				break;
			} else {
				let {
					data: { publicUrl }
				} = supabase.storage.from('images').getPublicUrl(path);
				paths.push(path);
				urls.push(publicUrl);
			}
		}
		formData.set('images', urls.join(', '));
		return handleActionResult;
	}}
>
	<input name="title" type="text" class="{borderedInput} text-sm mt-4" placeholder="Title" />

	<div class="flex mt-2 space-x-2">
		{#each images as image, index}
			<div class="w-20 h-20 relative">
				<img
					src={URL.createObjectURL(image)}
					alt="post"
					class="w-full h-full object-cover rounded-lg"
				/>
				<button
					class="absolute right-1 top-1 fa fa-circle-x text-primary text-sm"
					on:click={() => handleClickDeleteImage(index)}
				/>

				<label
					for="image-{index}"
					class="absolute text-primary text-sm bottom-0 w-full text-center bg-background rounded-b-lg opacity-60 cursor-pointer"
				>
					edit
				</label>
			</div>
			<input
				id="image-{index}"
				type="file"
				accept="image/png, image/jpg, image/jpeg"
				class="hidden"
				on:change={(e) => handleEditImage(e, index)}
			/>
		{/each}
		<label
			for="select"
			class="flex justify-center items-center w-20 h-20 {borderedInput} !p-0 cursor-pointer sm:hover:bg-primary-50 transition-colors"
		>
			<i class="fa fa-image text-primary-200 text-2xl" />
		</label>
		<input
			type="file"
			accept="image/png, image/jpg, image/jpeg"
			id="select"
			class="hidden"
			multiple
			on:change={handleInputImage}
		/>
	</div>
	<textarea
		name="contents"
		class="{borderedInput} mt-2 resize-none text-sm"
		rows="4"
		placeholder="Contents"
	/>

	<div class="mt-4 ml-auto space-x-2 flex">
		<button type="button" class={backgroundButton} on:click={handleClickCancel}> Cancel </button>

		<button type="submit" class="{primaryButton} w-20 h-10 flex items-center">
			{#if loading}
				<Spinner />
			{:else}
				<i class="fa fa-pen-to-square text-background mr-2" /> Post
			{/if}
		</button>
	</div>
</form>
