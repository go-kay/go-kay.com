<script lang="ts">
	function handleSwitchDarkMode() {
		let darkMode = false;
		if (localStorage.theme === 'light') {
			darkMode = true;
			localStorage.theme = 'dark';
		} else {
			localStorage.theme = 'light';
		}

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<nav class="w-screen bg-background border-b border-secondary h-12">
	<div class="px-4 flex h-12 items-center justify-between">
		<div class="flex">
			<button class="sm:hidden mr-4">
				<i class="fa-solid fa-bars text-primary" />
			</button>
			<a href="/">
				<h6 class="text-primary">GoKay</h6>
			</a>
		</div>
		<button on:click={handleSwitchDarkMode}>
			<i class="fa fa-lightbulb dark:text-yellow-300" />
		</button>
	</div>
</nav>
