"use client";
import { graphqlClient } from "@/clients/api";
import LeftBar from "@/components/LeftBar";
import TweetCard from "@/components/TweetCard";
import {
  GetOneTweetDetailsQueryDocument,
  GetOneTweetDetailsQueryQuery,
  GetOneTweetDetailsQueryQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const Page = () => {
  const { postid } = useParams<{ id: string; postid: string }>();

  const fetcherfn = async () => {
    const { getOneTweetDetails } = await graphqlClient.request<
      GetOneTweetDetailsQueryQuery,
      GetOneTweetDetailsQueryQueryVariables
    >(GetOneTweetDetailsQueryDocument, { getOneTweetDetailsId: postid });
    return getOneTweetDetails;
  };

  const { data } = useQuery({
    queryFn: fetcherfn,
    queryKey: ["oneTweet"],
  });

  return (
    <div className="w-screen flex ">
      <LeftBar />
      <TweetCard data={data} />
    </div>
  );
};

export default Page;
