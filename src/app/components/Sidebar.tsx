import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl rounded-r-3xl w-64 p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <MountainIcon className="w-8 h-8 text-white" />
        <h1 className="text-2xl font-bold text-white">Acme Inc.</h1>
      </div>
      <nav className="flex flex-col gap-2">
        <div className="text-gray-400 font-medium">Main</div>
        <Link href="/" className="flex items-center gap-3 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg p-2 transition-colors" prefetch={false}>
          <HomeIcon className="w-5 h-5" />
          Home
        </Link>
        <Link href="/tool-one" className="flex items-center gap-3 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg p-2 transition-colors" prefetch={false}>
          <CompassIcon className="w-5 h-5" />
          Tool One
        </Link>
        <Link href="/tool-two" className="flex items-center gap-3 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg p-2 transition-colors" prefetch={false}>
          <ActivityIcon className="w-5 h-5" />
          Tool Two
        </Link> 
        <div  className="text-gray-400 font-medium mt-4">Discover</div>
        <Link href="/gated-page" className="flex items-center gap-3 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg p-2 transition-colors" prefetch={false}>
          <LayersIcon className="w-5 h-5" />
          Gated Page
        </Link>
        <Link href="#" className="flex items-center gap-3 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg p-2 transition-colors" prefetch={false}>
          <BookmarkIcon className="w-5 h-5" />
          Saved
        </Link>
        <Link href="#" className="flex items-center gap-3 text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg p-2 transition-colors" prefetch={false}>
          <TrendingUpIcon className="w-5 h-5" />
          Trending
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

const MountainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const ActivityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
  </svg>
);

const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </svg>
);

const BookmarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
