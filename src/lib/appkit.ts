import { browser } from '$app/environment';

import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrum, mainnet, optimism, polygon, bsc, base, avalanche } from '@reown/appkit/networks';

import { ethers } from 'ethers';

// Only initialize in browser environment
let modal: ReturnType<typeof createAppKit> | undefined = undefined;
let provider;

if (browser) {
	const projectId = import.meta.env.VITE_PROJECT_ID;
	if (!projectId) {
		throw new Error('VITE_PROJECT_ID is not set');
	}

	// Create adapter
	const ethersAdapter = new EthersAdapter();

	// Initialize AppKit
	modal = createAppKit({
		adapters: [ethersAdapter],
		networks: [arbitrum, mainnet, optimism, polygon, bsc, base, avalanche],
		defaultNetwork: arbitrum,
		projectId,
		features: {
			email: false,
			socials: false,
			analytics: true
		},
		// themeMode: 'dark',
		metadata: {
			name: 'Varun Dudeja',
			description: 'varundudeja.in',
			url: 'https://varundudeja.in',
			icons: ['https://www.varundudeja.in/Dp.webp']
		}
	});
}

export { modal };
