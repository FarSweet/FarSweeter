// src/app/components/ProModal.tsx
import React, { useEffect, useState } from 'react';

interface ProModalProps {
  show: boolean;
  onClose: () => void;
}

const ProModal: React.FC<ProModalProps> = ({ show, onClose }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (show) {
      setIframeLoaded(true);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded shadow-md text-center relative w-11/12 md:w-1/2 max-w-3xl">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 bg-gray-800 text-white py-2 px-4 rounded">
          Close
        </button>
        <h2 className="text-xl font-bold mb-4 bg-gray-200 text-gray-800 py-2 px-4 rounded">
          You need to mint this NFT to use Pro tools
        </h2>
        <div className="mb-4" style={{ position: 'relative', width: '100%', paddingTop: 'calc(56.25% + 72px)', maxWidth: '500px', margin: '0 auto' }}>
          {iframeLoaded ? (
            <iframe
              src="https://zora.co/collect/base:0x2755581dbb19a75693a28e593ddb2a73c1048563/17/embed?referrer=0x6f25A0DD4c3BD4eF1A89916B3E0162061249885a"
              style={{ border: 0, backgroundColor: 'transparent', position: 'absolute', inset: 0 }}
              width="100%"
              height="100%"
              allowTransparency
              allowFullScreen
              sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
            ></iframe>
          ) : (
            <div className="loader">Loading...</div>
          )}
        </div>
        <a
          href="https://zora.co/collect/base:0x2755581dbb19a75693a28e593ddb2a73c1048563/17"
          style={{ padding: '12px', textDecoration: 'none', color: '#b3b3b3', fontFamily: "'Inter', system-ui", fontSize: '10px', lineHeight: '12px', fontStyle: 'normal', fontWeight: 400 }}
        >
          B.U.I.L.D on Zora
        </a>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Go Pro to use this tool</h2>
        <p className="mb-4 text-gray-800">You need to be a Pro user to use this tool.</p>
        <a href="/pro" className="text-blue-500 underline">Learn more about going Pro</a>
      </div>
    </div>
  );
};

export default ProModal;
