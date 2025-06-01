"use client";
import Loader_Comp from "@/components/Loader_Comp";
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
    return <Loader_Comp />;
  }

  return <Twitterlayout />;
};

export default HomePage;
