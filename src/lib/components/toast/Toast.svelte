<script>
	import { toasts } from '$lib/components/toast/toast';
	import { fly } from 'svelte/transition';
</script>

<div role="alert" class="fixed top-16 right-4 flex flex-col space-y-2">
	{#each $toasts as toast}
		<div
			in:fly={{ x: 8, duration: 400 }}
			out:fly={{ x: 8, duration: 400 }}
			class="flex flex-col w-80 p-4 rounded-lg shadow-lg"
			class:bg-primary={toast.type === 'success'}
			class:bg-red-400={toast.type === 'error'}
			class:bg-orange-400={toast.type === 'warning'}
		>
			<div class="flex items-start">
				<i
					class="fa text-background mr-4"
					class:fa-circle-check={toast.type === 'success'}
					class:fa-triangle-exclamation={toast.type === 'warning' || toast.type === 'error'}
				/>

				<div class="flex flex-col mt-[-6px] mr-4">
					<p class="text-background font-semibold text-lg">{toast.title}</p>
					{#if toast.description}
						<p class="text-background mt-1">
							{toast.description}
						</p>
					{/if}
				</div>
				<button class="fa fa-xmark text-background ml-auto" on:click={toast.close} />
			</div>
		</div>
	{/each}
</div>
