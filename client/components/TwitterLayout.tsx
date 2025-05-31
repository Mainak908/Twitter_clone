"use client";
import { useQuery } from "@tanstack/react-query";
import FeedCard from "./FeedCard";
import LeftBar from "./LeftBar";
import MobileFooter from "./mobileFooter";
import Rightbar from "./Rightbar";
import TweetSection from "./TweetSection";
import { graphqlClient } from "@/clients/api";
import {
  GetAllTweetsQueryDocument,
  GetAllTweetsQueryQuery,
  GetAllTweetsQueryQueryVariables,
} from "@/gql/graphql";

const fetcherfn = async () => {
  const { getAllTweets } = await graphqlClient.request<
    GetAllTweetsQueryQuery,
    GetAllTweetsQueryQueryVariables
  >(GetAllTweetsQueryDocument);

  return getAllTweets;
};

const Twitterlayout = () => {
  const { data: Tweets } = useQuery({
    queryKey: ["AllTweets"],
    queryFn: fetcherfn,
  });

  return (
    <div className="w-screen flex ">
      <LeftBar />
      <div className="border-r-[1px] border-l-[1px]  border-gray-600 mx-auto max-w-[500px]">
        <div className="grid grid-cols-2 border-b-1 border-gray-600 ">
          <div className="col-span-1 py-3  hover:bg-slate-900 rounded shadow cursor-pointer flex justify-center">
            <p className="font-semibold">For you</p>
          </div>
          <div className="col-span-1 py-3  hover:bg-slate-900 rounded shadow cursor-pointer flex justify-center">
            <p className="font-semibold">Following</p>
          </div>
        </div>
        <TweetSection />
        {Tweets?.map((tweet) => (
          <FeedCard data={tweet} key={tweet?.id} />
        ))}
      </div>

      <Rightbar />
      <MobileFooter />
    </div>
  );
};

export default Twitterlayout;
