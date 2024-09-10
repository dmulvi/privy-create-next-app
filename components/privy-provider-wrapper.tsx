'use client';

import { PrivyProvider } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        embeddedWallets: {
          createOnLogin: "all-users"
        }
      }}
      //onSuccess={() => router.push("/dashboard")}
    >
      {children}
    </PrivyProvider>
  );
}
