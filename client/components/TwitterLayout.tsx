import FeedCard from "./FeedCard";
import LeftBar from "./LeftBar";
import Rightbar from "./Rightbar";
import TweetSection from "./TweetSection";
import { graphqlClient } from "@/clients/api";
import {
  GetAllTweetsQueryDocument,
  GetAllTweetsQueryQuery,
  GetAllTweetsQueryQueryVariables,
} from "@/gql/graphql";

const Twitterlayout = async () => {
  const { getAllTweets: Tweets } = await graphqlClient.request<
    GetAllTweetsQueryQuery,
    GetAllTweetsQueryQueryVariables
  >(GetAllTweetsQueryDocument);

  return (
    <div className="grid grid-cols-12 w-screen h-screen sm:px-56">
      <LeftBar />
      <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px]  border-blue-600">
        <TweetSection />
        {Tweets?.map((tweet) => (
          <FeedCard data={tweet} key={tweet?.id} />
        ))}
      </div>

      <Rightbar />
    </div>
  );
};

export default Twitterlayout;
