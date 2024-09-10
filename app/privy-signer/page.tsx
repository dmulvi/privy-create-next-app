"use client";

import { useWallet } from "@crossmint/client-sdk-react-ui"

export default function MyComponent() {
  const {wallet, status} = useWallet();

  if(status === "in-progress"){
    return <div>loading</div>
  }

  console.log('status:', status);
  console.log('wallet:', wallet);

  // …handle other cases

  return <div>wallet: {wallet?.address}</div>
}
