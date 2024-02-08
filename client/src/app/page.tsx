import FeedCard from "@/_components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useCallback } from "react";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

interface TwitterSideBarBtn {
  title: string;
  icon: React.ReactNode;
}
const SideBarMenu: TwitterSideBarBtn[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];
export default function Home() {
  const HanldeLogin = useCallback((cred: CredentialResponse) => {}, []);
  return (
    <div className="grid  grid-cols-1 lg:grid-cols-12 h-screen w-screen px-56">
      <div className="col-span-3 pt-1 ml-28 sm:hidden lg:block">
        <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
          <RiTwitterXFill />
        </div>
        <div className="mt-4 text-xl font-semibold mr-3">
          <ul>
            {SideBarMenu.map((item) => (
              <li
                className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer"
                key={item.title}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.title} </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 px-3">
            <button className="bg-[#1d9bf0] font-semibold text-lg px-4 py-2 rounded-full w-full">
              Tweet
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-400">
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      <div className="col-span-3 sm:hidden lg:block p-5">
        <div className=" p-5 bg-slate-700 rounded-lg">
          <h1>New To Twitter</h1>
          <GoogleLogin onSuccess={(cred) => console.log(cred)} />
        </div>
      </div>
    </div>
  );
}
