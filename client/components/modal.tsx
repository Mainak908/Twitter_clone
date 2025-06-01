"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, Loader2 } from "lucide-react";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { graphqlClient } from "@/clients/api";

import {
  VerifyUserGoogleTokenQuery,
  VerifyUserGoogleTokenQueryVariables,
  VerifyUserGoogleTokenDocument,
  CheckUsernameQueryQuery,
  CheckUsernameQueryQueryVariables,
  CheckUsernameQueryDocument,
} from "@/gql/graphql";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function UsernameModal({
  setmodal,
  modal,
  googleToken,
}: {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  googleToken: string;
}) {
  const [username, setUsername] = useState("");
  const [available, setAvailable] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const queryClient = useQueryClient();
  const router = useRouter();

  const checkUName = async (UName: string) => {
    setAvailable("checking");
    const { CheckUsername } = await graphqlClient.request<
      CheckUsernameQueryQuery,
      CheckUsernameQueryQueryVariables
    >(CheckUsernameQueryDocument, { username: UName });

    setAvailable(CheckUsername ? "available" : "taken");
  };

  const debouncedFn = useCallback(debounce(checkUName, 1000), []);

  useEffect(() => {
    if (!username) {
      setAvailable("idle");
      return;
    }
    debouncedFn(username);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (available !== "available") return;
    const { verifyGoogleToken } = await graphqlClient.request<
      VerifyUserGoogleTokenQuery,
      VerifyUserGoogleTokenQueryVariables
    >(VerifyUserGoogleTokenDocument, { token: googleToken, username });

    toast(verifyGoogleToken ? "success" : "failed");
    if (verifyGoogleToken) {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/home");
    }
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl w-[95%] max-w-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Pick your unique username
              </h2>
              <button
                onClick={() => setmodal(false)}
                className="text-gray-400 hover:text-gray-800 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="@username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={clsx(
                    "w-full px-4 py-3 text-lg rounded-xl border transition-all",
                    "bg-white dark:bg-zinc-800 text-gray-800 dark:text-white",
                    "focus:outline-none focus:ring-2",
                    {
                      "border-gray-300 focus:ring-blue-500":
                        available === "idle",
                      "border-blue-400": available === "available",
                      "border-red-400": available === "taken",
                      "border-yellow-400": available === "checking",
                    }
                  )}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {available === "checking" && (
                    <Loader2 className="animate-spin text-yellow-500 w-5 h-5" />
                  )}
                  {available === "available" && (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  )}
                  {available === "taken" && (
                    <XCircle className="text-red-500 w-5 h-5" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={available !== "available"}
                className={clsx(
                  "w-full py-3 text-lg font-semibold rounded-xl transition-colors",
                  available === "available"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed"
                )}
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
