import { useEffect, useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { fetchUserProfile } from "../consts/fetchUserProfile";
import { generatePayload, isLoggedIn, login, logout } from "../actions/auth";
import { createWallet } from "thirdweb/wallets";
import { client } from "../consts/client";
import { hasAccess } from "../actions/gate-condition";
import Link from "next/link";

interface UserProfile {
  pfp_url: string;
  display_name: string;
  username: string;
}

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const Navbar = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hasNFTAccess, setHasNFTAccess] = useState(false);
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      fetchUserProfile(account.address)
        .then((profile) => {
          if (profile) setUserProfile(profile);
        })
        .catch((error) => console.error("Error fetching profile:", error));

      hasAccess(account.address).then((access) => setHasNFTAccess(access));
    } else {
      // Clear user profile and NFT access when account is disconnected
      setUserProfile(null);
      setHasNFTAccess(false);
    }
  }, [account]);

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MountainIcon className="w-6 h-6 text-white" />
          <h1 className="text-lg font-bold text-white">Acme Inc.</h1>
        </div>
        <nav className="flex items-center gap-4">
          {userProfile && (
            <>
              <img src={userProfile.pfp_url} alt="Profile Picture" className="w-8 h-8 rounded-full" />
              <span className="text-secondary">{userProfile.display_name}</span>
              <span className="ml-2 text-secondary">{userProfile.username}</span>
            </>
          )}
          <ConnectButton
            autoConnect={true}
            client={client}
            wallets={wallets}
            auth={{
              isLoggedIn: async (address) => await isLoggedIn(),
              doLogin: async (params) => await login(params),
              getLoginPayload: async ({ address }) => await generatePayload({ address }),
              doLogout: async () => await logout(),
            }}
          />
          {hasNFTAccess && <span className="ml-4 text-green-500">Pro Access</span>}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

const MountainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);
