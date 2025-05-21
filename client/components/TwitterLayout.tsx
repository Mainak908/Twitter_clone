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

const Twitterlayout = async () => {
  const { getAllTweets: Tweets } = await graphqlClient.request<
    GetAllTweetsQueryQuery,
    GetAllTweetsQueryQueryVariables
  >(GetAllTweetsQueryDocument);

  return (
    <div className="w-screen flex ">
      <LeftBar />
      <div className=" border-r-[1px] border-l-[1px]  border-gray-600 mx-auto max-w-[550px]">
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
