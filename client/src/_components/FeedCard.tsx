import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

const FeedCard = () => {
  return (
    <div>
      <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900 transition-all ">
        <div className="grid grid-cols-12  p-3 gap-3  cursor-pointer">
          <div className="col-span-1 w-fit">
            <Image
              src="/user.jpeg"
              alt="nothing"
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <div className="col-span-11 ">
            <h5>Mainak Ghosh</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
              sapiente est, quo iusto laboriosam error ullam quasi accusamus
              laudantium illum.
            </p>
            <div className="flex mt-5 text-xl items-center justify-between p-2 w-[90%]">
              <div>
                <BiMessageRounded />
              </div>
              <div>
                <FaRetweet />
              </div>
              <div>
                <AiOutlineHeart />
              </div>
              <div>
                <BiUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
