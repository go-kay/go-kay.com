<script lang="ts">
	import moment from 'moment';

	const now = moment();
	let month = now.format('MMMM'),
		day: number,
		year = 2000;
</script>

<small class="text-primary">Birthday</small>
<div class="flex space-x-4">
	<div class="border rounded border-primary w-full p-2 h-12 flex items-center">
		<select
			name="month"
			id="month"
			class="text-primary bg-background outline-none w-full"
			bind:value={month}
		>
			{#each moment.months() as month}
				<option value={month}>{month}</option>
			{/each}
		</select>
	</div>

	<div class="border rounded border-primary p-2 w-full h-12 flex items-center">
		<select
			name="day"
			id="day"
			class="text-primary bg-background outline-none w-full"
			bind:value={day}
		>
			{#each Array.from({ length: moment()
						.year(year)
						.month(month)
						.daysInMonth() }, (_, i) => i + 1) as day}
				<option value={day} class="text-primary">{day}</option>
			{/each}
		</select>
	</div>

	<div class="border rounded border-primary p-2 w-full h-12 flex items-center">
		<select
			name="year"
			id="year"
			class="text-primary bg-background outline-none w-full"
			bind:value={year}
		>
			{#each Array.from({ length: now.year() - 1990 }, (_, index) => 1990 + index) as year}
				<option class="text-primary" value={year}>{year}</option>
			{/each}
		</select>
	</div>
</div>
