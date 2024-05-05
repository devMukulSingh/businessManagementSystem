
"use client";
import { Triangle } from "react-loader-spinner";

const RouteLoader = () => {
  return (
    <>
      <Triangle
        visible={true}
        height="80"
        width="100"
        color="#ffffff"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
}

export default RouteLoader