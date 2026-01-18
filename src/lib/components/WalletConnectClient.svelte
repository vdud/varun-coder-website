<script lang="ts">
	import { Wallet, User, Network } from '@lucide/svelte';
	import { modal } from '$lib/appkit';
	import { accountState, networkState, appKitState, walletInfo } from '$lib/store';

	// Add prop to identify usage context
	export let isInNav = false;
</script>

<div class="wallet-connect-container {isInNav ? 'in-nav' : ''}">
	{#if !$appKitState?.initialized}
		<!-- Loading state -->
		<button
			class="wallet-button flex w-full items-center justify-center gap-2 rounded-lg bg-gray-700/50 px-3 py-2 text-sm font-medium transition-colors sm:justify-start"
			disabled
		>
			<div
				class="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-blue-500"
			></div>
			{#if !isInNav}
				<span class="wallet-button-text nav-text">Loading...</span>
			{/if}
		</button>
	{:else if $accountState?.isConnected}
		<!-- Connected state -->
		{@const displayAddress = $accountState?.address
			? `${$accountState.address.slice(0, 6)}...${$accountState.address.slice(-4)}`
			: ''}
		{@const caipNetwork =
			$networkState?.chainId && modal?.getCaipNetwork
				? modal.getCaipNetwork($networkState.chainId)
				: undefined}
		{@const chainName = caipNetwork?.name ?? ''}

		{#if isInNav}
			<!-- Compact nav version -->
			<button
				onclick={() => modal?.open()}
				class="wallet-button nav-compact m-auto flex items-center justify-center gap-2 rounded-lg bg-gray-900/50 p-1.5 transition-colors hover:bg-gray-800 hover:text-white"
			>
				{#if $walletInfo?.icon}
					<img src={$walletInfo.icon} alt="Wallet" class="wallet-avatar h-5 w-5 rounded-full" />
				{:else}
					<User class="nav-icon h-5 w-5" />
				{/if}
				<!-- Show address on desktop only -->
				<span class="wallet-button-text nav-text hidden sm:inline">
					{displayAddress}
				</span>
			</button>
		{:else}
			<!-- Full homepage version -->
			<div class="flex items-center gap-1 rounded-lg bg-gray-900/50 p-1.5">
				<button
					onclick={() => modal?.open()}
					class="wallet-button group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-800 hover:text-white"
				>
					{#if $walletInfo?.icon}
						<img src={$walletInfo.icon} alt="Wallet" class="wallet-avatar h-4 w-4 rounded-full" />
					{:else}
						<User class="nav-icon" />
					{/if}
					<span class="wallet-button-text hidden font-mono sm:inline">
						{displayAddress}
					</span>
				</button>

				<div class="mx-0.5 h-4 w-px bg-gray-700" />

				<button
					onclick={() => modal?.open({ view: 'Networks' })}
					class="wallet-button group flex items-center gap-1 rounded-md px-2 py-2 text-xs transition-colors hover:bg-gray-800"
				>
					<Network class="h-3 w-3 shrink-0" />
					<span class="wallet-button-text hidden text-gray-400 group-hover:text-white sm:inline">
						{chainName}
					</span>
				</button>
			</div>
		{/if}
	{:else}
		<!-- Disconnected state -->
		<button
			onclick={() => modal?.open()}
			class="wallet-button flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-700 sm:justify-start"
		>
			<Wallet class="h-4 w-4 shrink-0" />
			<span class="wallet-button-text nav-text">Connect</span>
		</button>
	{/if}
</div>
