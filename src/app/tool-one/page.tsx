// src/app/tool-one/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { hasAccess } from "../actions/gate-condition";
import { LoginButton } from "../consts/LoginButton";
import ProModal from "../components/ProModal";

export default function ToolOne() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [hasNFTAccess, setHasNFTAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      hasAccess(account.address).then((access) => setHasNFTAccess(access));
    } else {
      setHasNFTAccess(false);
    }
  }, [account]);

  const fetchPoster = async (url: string) => {
    if (url) {
      try {
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        const response = await fetch(`/api/getPoster?url=${encodeURIComponent(formattedUrl)}`);
        if (response.ok) {
          const data = await response.json();
          setPosterUrl(data.posterUrl);
        } else {
          setPosterUrl("");
          console.error('Failed to fetch poster URL');
        }
      } catch (error) {
        setPosterUrl("");
        console.error('Error fetching poster URL:', error);
      }
    }
  };

  const handleDownload = async () => {
    if (!account || !hasNFTAccess) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    setDownloadComplete(false);
    try {
      console.log("Initiating download...");
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      const response = await fetch(`/api/downloadVideo?url=${encodeURIComponent(formattedUrl)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadUrl;
      a.download = "output.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      console.log("Video download started");
      setDownloadComplete(true);
    } catch (error) {
      console.error("Error downloading video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Video Downloader</h1>
      <p className="mb-4"></p>
      <input
        type="text"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          fetchPoster(e.target.value);
        }}
        placeholder="Enter Warpcast URL"
        className="mb-4 p-2 border border-gray-300 rounded text-black"
      />
      {posterUrl && (
        <div className="mb-4">
          <img src={posterUrl} alt="Poster" className="max-h-64 aspect-ratio rounded" />
        </div>
      )}
      <button
        onClick={handleDownload}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mr-2"></div>
            {downloadComplete ? "Download Complete" : "Downloading..."}
          </div>
        ) : (
          "Download Video"
        )}
      </button>
      {downloadComplete && !loading && (
        <div className="mt-4 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <ProModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
