import RouteLoader from "@/components/commons/RouteLoader";

 

const loading = () => {
  return (
    <div className="mt-10 flex justify-center w-full h-screen">
      <RouteLoader />
    </div>
  );
}

export default loading