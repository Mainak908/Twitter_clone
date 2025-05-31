"use client";

import Link from "next/link";
import Image from "next/image";
import { useLoggedInUser } from "@/hooks/user_check";

const Rightbar = () => {
  const { data: user } = useLoggedInUser();

  return (
    <div className="hidden lg:fixed lg:right-55 lg:pt-5 lg:block">
      <div className="px-4 py-3 bg-slate-800 rounded-lg">
        <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
        {user?.recommendedUsers?.map((el) => (
          <div className="flex items-center gap-3 mt-2" key={el?.id}>
            {el?.profileImgUrl && (
              <Image
                src={el?.profileImgUrl}
                alt="user-image"
                className="rounded-full"
                width={60}
                height={60}
              />
            )}
            <div>
              <div className="text-lg">
                {el?.firstName} {el?.lastName}
              </div>
              <Link
                href={`/${el?.id}`}
                className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
