<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon_io/favicon.ico";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<title>Varun Dudeja | Web Developer</title>
	<meta
		name="description"
		content="Varun Dudeja - Professional Web Developer crafting modern, fast, and beautiful web experiences."
	/>
</svelte:head>

<div class="min-h-screen">
	{@render children()}
</div>
