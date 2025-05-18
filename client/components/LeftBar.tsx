"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";
import { useLoggedInUser } from "@/hooks/user_check";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const LeftBar = () => {
  const { data: currentUser } = useLoggedInUser();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(() => {
    const items: TwitterSidebarButton[] = [
      { title: "Home", icon: <BiHomeCircle />, link: "/" },
      { title: "Explore", icon: <BiHash />, link: "/" },
      { title: "Notifications", icon: <BsBell />, link: "/" },
      { title: "Messages", icon: <BsEnvelope />, link: "/" },
      { title: "Bookmarks", icon: <BsBookmark />, link: "/" },
      { title: "Twitter Blue", icon: <BiMoney />, link: "/" },
      { title: "More Options", icon: <SlOptions />, link: "/" },
    ];

    if (currentUser?.id) {
      items.splice(items.length - 1, 0, {
        title: "Profile",
        icon: <BiUser />,
        link: `/${currentUser.id}`,
      });
    }

    return items;
  }, [currentUser?.id]);

  return (
    <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
      <div>
        <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
          <BsTwitter />
        </div>
        <div className="mt-1 text-xl pr-4">
          <ul>
            {sidebarMenuItems.map((item) => (
              <li key={item.title}>
                <Link
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                  href={item.link}
                >
                  <span className=" text-3xl">{item.icon}</span>
                  <span className="hidden sm:inline">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 px-3">
            <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
              Tweet
            </button>
            <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
              <BsTwitter />
            </button>
          </div>
        </div>
      </div>
      {currentUser && (
        <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
          <Image
            className="rounded-full"
            src={currentUser.profileImgUrl}
            alt="user-image"
            height={50}
            width={50}
          />

          <div className="hidden sm:block">
            <h3 className="text-xl">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftBar;
