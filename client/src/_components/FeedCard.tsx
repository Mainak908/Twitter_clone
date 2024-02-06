import Image from "next/image";

const FeedCard = () => {
  return (
    <div className="grid grid-cols-12  p-3 hover:bg-slate-200 transition-all cursor-pointer">
      <div className="col-span-1 w-fit">
        <Image
          src="/user.jpeg"
          alt="nothing"
          height={50}
          width={50}
          className="rounded-full"
        />
      </div>
      <div className="col-span-11 bg-white">
        <h5>Mainak Ghosh</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
          sapiente est, quo iusto laboriosam error ullam quasi accusamus
          laudantium illum.
        </p>
      </div>
    </div>
  );
};

export default FeedCard;
