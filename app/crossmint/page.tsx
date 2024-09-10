"use client";

import { useEffect } from "react";
import { useWallet } from "@crossmint/client-sdk-react-ui";
import { useWallets, usePrivy } from "@privy-io/react-auth";

import { getEmbeddedConnectedWallet } from "@privy-io/react-auth";

export default function MyComponent() {
	const { getOrCreateWallet, wallet, status } = useWallet();
	const { ready, wallets } = useWallets();
	const { login, logout } = usePrivy();

	useEffect(() => {
		if (ready) {
			console.log("wallets: ", wallets);
			const privyWallet = getEmbeddedConnectedWallet(wallets);
			console.log("privyWallet: ", privyWallet);

			if (privyWallet) {
				getOrCreateWallet({ type: "evm-smart-wallet", signer: privyWallet });
			} else {
				console.log("no privy wallet");
			}
		}
	}, [ready]);

	return (
		<>
			<button
				className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
				onClick={login}
			>
				Log in
			</button>
			<button
				className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
				onClick={logout}
			>
				Log Out
			</button>

			<div>wallet: {wallet?.address}</div>
		</>
	);
}
