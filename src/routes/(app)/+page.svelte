<script lang="ts">
	import { page } from '$app/stores';
	import { toast } from '$lib/components/toast/toast';

	$: {
		const signInSuccess = $page.url.searchParams.get('success');
		if (signInSuccess) {
			toast({
				title: 'Successfully signed in!',
				description: 'Welcome to Go Kay!',
				duration: 5000
			});
		}
	}
</script>

<div>
	<h1 class="mt-8">TODO:</h1>
	<div class="flex space-x-4 items-center mt-8">
		<input type="checkbox" class="scale-150" />
		<h3>Comunity Page</h3>
	</div>
	<div class="flex space-x-4 items-center mt-2">
		<input type="checkbox" class="scale-150" />
		<h3>Housing page</h3>
	</div>
</div>
