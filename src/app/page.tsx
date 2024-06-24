"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import './styles/launchpad.css'; // Correct path based on the provided directory structure

const apps = [
  { name: "SuperCast", iconUrl: "https://i.imgur.com/zNkG5GJ.png", link: "https://www.supercast.xyz/" },
  { name: "BountyCaster", iconUrl: "https://i.imgur.com/NoD3aBe.png", link: "https://www.bountycaster.xyz/" },
  { name: "LaunchCaster", iconUrl: "https://i.imgur.com/TeKTDrI.png", link: "https://www.launchcaster.xyz/" },
  { name: "farterminal", iconUrl: "https://i.imgur.com/2LO4DTw.png", link: "https://www.farterminal.io/" },
  { name: "BUOY", iconUrl: "https://i.imgur.com/Hemr8q4.png", link: "https://buoy.club/" },
  { name: "ENS LeaderBoard", iconUrl: "https://i.imgur.com/xFAoGdK.png", link: "https://ensleaderboard.com/" },
  { name: "Farcaster Studio", iconUrl: "https://i.imgur.com/HHmIfMj.png", link: "https://farcasteruserstats.com/" },
  { name: "Kiwi News", iconUrl: "https://i.imgur.com/eE6Tdhb.png", link: "https://news.kiwistand.com/" },
  { name: "Sonata Tips", iconUrl: "https://i.imgur.com/mWnOEwG.png", link: "https://www.sonata.tips/" },
  { name: "Saymore", iconUrl: "https://i.imgur.com/oQgmh3l.png", link: "https://saymore.tv/" },
  { name: "Farcaster Channels", iconUrl: "https://i.imgur.com/t2QLUmO.png", link: "https://farcasterchannels.com/" },
  { name: "Farcaster Polls", iconUrl: "https://i.imgur.com/t2RUmX8.png", link: "https://fc-polls.vercel.app/" },
  { name: "Caster Bites", iconUrl: "https://i.imgur.com/K5uTj3H.png", link: "https://www.casterbites.com/" },
  { name: "CharmVerse", iconUrl: "https://i.imgur.com/FLsQc81.png", link: "https://charmverse.io/" },
  { name: "FarQuest Market", iconUrl: "https://i.imgur.com/BVBQAn3.png", link: "https://far.quest/market" },

  
];

export default function Home() {
  const account = useActiveAccount();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-4">FarLauncher</h1>
      {account && (
        <div className="mt-12 text-center text-secondary">
          You are logged in.
        </div>
      )}
      <input
        type="text"
        placeholder="Search apps..."
        className="mb-4 p-2 border border-gray-300 rounded bg-gray-100 text-black w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="launchpad-container">
        <div id="launchpad">
          <div className="content">
            <nav>
              {filteredApps.map((app) => (
                <a key={app.name} className="app-icon" href={app.link} target="_blank" rel="noopener noreferrer">
                  <img src={app.iconUrl} alt={app.name} />
                  <span>{app.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
