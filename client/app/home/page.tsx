"use client";
import Twitterlayout from "@/components/TwitterLayout";
import { useLoggedInUser } from "@/hooks/user_check";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const HomePage = () => {
  const { data: user } = useLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  if (user === undefined) {
    return <div className="text-white">Loading...</div>;
  }

  return <Twitterlayout />;
};

export default HomePage;
