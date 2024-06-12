"use client";
import { LoginButton } from "../consts/LoginButton";

export const GatedContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="mx-auto">
        <LoginButton />
      </div>
      <div className="text-center mt-12 text-secondary">
        Welcome, stranger. Only a selected few can see this message. You are rare!
      </div>
    </div>
  );
};
