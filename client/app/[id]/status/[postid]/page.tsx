"use client";
import { graphqlClient } from "@/clients/api";
import LeftBar from "@/components/LeftBar";
import Loader_Comp from "@/components/Loader_Comp";
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

  const { data, isLoading } = useQuery({
    queryFn: fetcherfn,
    queryKey: ["oneTweet"],
  });
  if (isLoading) return <Loader_Comp />;
  return (
    <div className="w-screen flex ">
      <LeftBar />
      <TweetCard data={data} />
    </div>
  );
};

export default Page;
