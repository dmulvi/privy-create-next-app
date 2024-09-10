"use client";

import { useState, useEffect } from "react";
import { CrossmintProvider, CrossmintWalletProvider } from "@crossmint/client-sdk-react-ui"
import { usePrivy } from "@privy-io/react-auth";

// This component must be placed inside a PrivyProviderWrapper
// It retrieves the JWT from the privy session, initializes an instance of 
// the Crossmint SDK, and deploys a smart wallet that's controlled with your 
// privy embedded wallet.

export default function CrossmintWrapper(props: { children: React.ReactNode }) {
  const [ jwt, setJwt ] = useState();
  const { getAccessToken, ready, authenticated } = usePrivy();

  const getPrivyJwt = async () => {
    const privyJwt = await getAccessToken();
    setJwt(privyJwt);
  }

  useEffect(() => {
    getPrivyJwt();
  }, [ready, authenticated]);

  return (
    <CrossmintProvider
      apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY || ""}
      jwt={jwt}
    >
      <CrossmintWalletProvider
        config={{
          createOnLogin: "all-users",
          type: "evm-smart-wallet",
          defaultChain: "polygon-amoy",
        }}
      >
        {props.children}
      </CrossmintWalletProvider>
    </CrossmintProvider>
  )
}
