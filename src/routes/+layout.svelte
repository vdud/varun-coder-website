<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon_io/favicon.ico';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { onMount } from 'svelte';
	import WalletConnect from '$lib/components/WalletConnectClient.svelte';
	import { Home, CircleHelp, Laptop, Mail, Sun, Moon, Monitor, Menu } from '@lucide/svelte';

	let { children } = $props();
	let sidebarOpen = $state(false);
	let activeSection = $state('home');
	let theme = $state<'light' | 'dark' | 'system'>('system');

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	function setActiveSection(section: string) {
		activeSection = section;
		closeSidebar();
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
		theme = savedTheme || 'system';

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeSidebar();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	function cycleTheme() {
		const themes: ('light' | 'dark' | 'system')[] = ['system', 'light', 'dark'];
		const currentIndex = themes.indexOf(theme);
		theme = themes[(currentIndex + 1) % themes.length];
		const event = new CustomEvent('theme-change', { detail: { theme } });
		window.dispatchEvent(event);
		localStorage.setItem('theme', theme);
	}

	injectAnalytics();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
	<title>Varun Dudeja | Web Developer</title>
	<meta
		name="description"
		content="Varun Dudeja - Professional Web Developer crafting modern, fast, and beautiful web experiences."
	/>
</svelte:head>

<div class="app-container" class:sidebar-open={sidebarOpen}>
	<!-- Accessible mobile overlay -->
	{#if sidebarOpen}
		<div
			class="mobile-overlay"
			onclick={closeSidebar}
			role="button"
			tabindex="0"
			aria-label="Close sidebar overlay"
			onkeydown={(e) => e.key === 'Enter' && closeSidebar()}
		></div>
	{/if}

	<!-- Left Sidebar -->
	<aside class="sidebar" aria-label="Main navigation">
		<div class="sidebar-content">
			<!-- Logo Section -->
			<div class="sidebar-header">
				<a href="#home" class="logo-group" onclick={() => setActiveSection('home')}>
					<span class="logo-text">VD</span>
					<span class="logo-dot">.</span>
				</a>
			</div>

			<!-- Navigation Items -->
			<nav class="nav-items" aria-label="Primary navigation">
				<a
					href="#home"
					class="nav-item {activeSection === 'home' ? 'active' : ''}"
					onclick={() => setActiveSection('home')}
					aria-label="Home"
				>
					<Home class="nav-icon" size={24} />
					<span class="nav-text">Home</span>
				</a>

				<a
					href="#about"
					class="nav-item {activeSection === 'about' ? 'active' : ''}"
					onclick={() => setActiveSection('about')}
					aria-label="About"
				>
					<CircleHelp class="nav-icon" size={24} />
					<span class="nav-text">About</span>
				</a>

				<a
					href="#skills"
					class="nav-item {activeSection === 'skills' ? 'active' : ''}"
					onclick={() => setActiveSection('skills')}
					aria-label="Skills"
				>
					<Laptop class="nav-icon" size={24} />
					<span class="nav-text">Skills</span>
				</a>

				<a
					href="#contact"
					class="nav-item {activeSection === 'contact' ? 'active' : ''}"
					onclick={() => setActiveSection('contact')}
					aria-label="Contact"
				>
					<Mail class="nav-icon" size={24} />
					<span class="nav-text">Contact</span>
				</a>
			</nav>

			<!-- Bottom Actions -->
			<div class="-bottom">
				<button
					class="nav-item theme-toggle-btn mb-2"
					onclick={cycleTheme}
					aria-label="Toggle theme"
					title={theme === 'system'
						? 'System theme'
						: theme === 'light'
							? 'Light mode'
							: 'Dark mode'}
				>
					{#if theme === 'system'}
						<Monitor class="nav-icon" size={24} />
					{:else if theme === 'light'}
						<Sun class="nav-icon" size={24} />
					{:else}
						<Moon class="nav-icon" size={24} />
					{/if}
					<span class="nav-text">Theme</span>
				</button>

				<div class="wallet-connect-container mb-2">
					<WalletConnect isInNav={true} />
				</div>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="main-content">
		{@render children()}
	</main>

	<!-- Mobile Bottom Bar -->
	<nav class="mobile-bottom-bar" aria-label="Mobile navigation">
		<a href="#home" class="mobile-nav-item" aria-label="Home">
			<Home size={24} />
		</a>
		<a href="#skills" class="mobile-nav-item" aria-label="Skills">
			<Laptop size={24} />
		</a>
		<a href="#contact" class="mobile-nav-item" aria-label="Contact">
			<Mail size={24} />
		</a>
		<button class="mobile-nav-item" onclick={toggleSidebar} aria-label="Open menu">
			<Menu size={24} />
		</button>
	</nav>
</div>

<!-- {#if modal}
  <div id="appkit-modal-container"></div>
{/if} -->
