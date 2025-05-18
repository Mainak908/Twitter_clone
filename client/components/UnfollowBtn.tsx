"use client";

import { useLoggedInUser } from "@/hooks/user_check";

const UnfollowBtn = ({ userInfo }: any) => {
  const { data: currentUser } = useLoggedInUser();

  return (
    <>
      {currentUser?.id !== userInfo?.id && (
        <button className="bg-white text-black px-3 py-1 rounded-full text-sm">
          Unfollow
        </button>
      )}
    </>
  );
};

export default UnfollowBtn;
