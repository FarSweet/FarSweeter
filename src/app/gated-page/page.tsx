import { cookies } from "next/headers";
import { thirdwebAuth } from "../consts/thirdwebAuth";
import { hasAccess } from "../actions/gate-condition";
import { GatedContent } from "./GatedContent";
import { LoginButton } from "../consts/LoginButton";

export default async function GatedPage() {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return <MustLogin />;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  console.log({ authResult });
  if (!authResult.valid) {
    return <MustLogin />;
  }

  const address = authResult.parsedJWT.sub;
  console.log({ paredResult: authResult.parsedJWT });
  if (!address) throw new Error("could not get wallet address");

  const _hasAccess = await hasAccess(address);
  if (!_hasAccess) return <NotAllowed />;

  return <GatedContent />;
}

const MustLogin = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
    <div className="text-center">
      You are not Signed in. <br />
      <LoginButton />
      
      
      <p  className="underline text-primary">
        Log in now
      </p>
    </div>
  </div>
);

const reason = "you do not own any NFT";

const NotAllowed = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
    <div className="text-center">
      You are logged in but you do not have access to this page because {reason}
    </div>
  </div>
);
