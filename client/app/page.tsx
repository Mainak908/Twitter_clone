"use client";
import { graphqlClient } from "@/clients/api";
import UsernameModal from "@/components/modal";
import {
  CheckUserExistQueryDocument,
  CheckUserExistQueryQuery,
  CheckUserExistQueryQueryVariables,
  LoginUserQueryDocument,
  LoginUserQueryQuery,
  LoginUserQueryQueryVariables,
} from "@/gql/graphql";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [GToken, setGToken] = useState<string>("");
  const queryClient = useQueryClient();
  const [modal, setmodal] = useState(false);
  const router = useRouter();
  const HandleLoginPre = async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) {
      toast.error("failed");
      return;
    }
    setGToken(googleToken);

    const { checkUserExist } = await graphqlClient.request<
      CheckUserExistQueryQuery,
      CheckUserExistQueryQueryVariables
    >(CheckUserExistQueryDocument, { token: googleToken });

    if (checkUserExist) {
      const { loginUser } = await graphqlClient.request<
        LoginUserQueryQuery,
        LoginUserQueryQueryVariables
      >(LoginUserQueryDocument, { token: googleToken });
      toast(loginUser ? "success" : "failed");

      if (loginUser) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        router.push("/home");
      }

      return;
    }

    setmodal(true);
  };
  return (
    <main className="flex h-screen w-full">
      {/* Left section with logo/image */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-64 h-64 fill-white"
        >
          <g>
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.49 8.49 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.12 12.12 0 0 1 3.15 4.58a4.28 4.28 0 0 0 1.32 5.72 4.22 4.22 0 0 1-1.94-.54v.05a4.29 4.29 0 0 0 3.43 4.2 4.29 4.29 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 18.13 12.1 12.1 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.33 8.33 0 0 0 22.46 6z" />
          </g>
        </svg>
      </div>

      {/* Right section with text and buttons */}
      <div className="flex flex-col justify-center items-start px-8 w-full lg:w-1/2">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-12 h-12 fill-blue-500 mb-8"
        >
          <g>
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.49 8.49 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.12 12.12 0 0 1 3.15 4.58a4.28 4.28 0 0 0 1.32 5.72 4.22 4.22 0 0 1-1.94-.54v.05a4.29 4.29 0 0 0 3.43 4.2 4.29 4.29 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 18.13 12.1 12.1 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.33 8.33 0 0 0 22.46 6z" />
          </g>
        </svg>

        <h1 className="text-5xl font-extrabold mb-6">Happening now</h1>
        <h2 className="text-2xl font-semibold mb-8">Join today.</h2>

        <GoogleLogin
          onSuccess={HandleLoginPre}
          text="continue_with"
          shape="pill"
        />
        <UsernameModal setmodal={setmodal} googleToken={GToken} modal={modal} />
      </div>
    </main>
  );
}
