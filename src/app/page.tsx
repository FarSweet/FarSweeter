"use client";

import { useActiveAccount } from "thirdweb/react";

export default function Home() {
  const account = useActiveAccount();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-primary">Welcome to My SaaS App</h1>
      {account && (
        <div className="mt-12 text-center text-secondary">
          You are logged in.
        </div>
      )}
    </div>
  );
}
