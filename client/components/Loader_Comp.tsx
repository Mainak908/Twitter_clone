import React from "react";
import { Rings } from "react-loader-spinner";

const Loader_Comp = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#0000FF"
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader_Comp;
