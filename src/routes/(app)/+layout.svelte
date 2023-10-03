<script>
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

<nav class="fixed w-screen bg-background border-b">
	<div class="max-w-[800px] mx-auto flex h-12 px-8 items-center justify-between">
		<h6>GoKay</h6>
		<button on:click={handleSwitchDarkMode}>
			<i class="fa fa-lightbulb dark:text-yellow-300" />
		</button>
	</div>
</nav>
<div class="pt-16 px-8 max-w-[800px] mx-auto">
	<slot />
</div>
