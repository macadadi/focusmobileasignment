import Product from "./Product";
import { useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const data = useAppSelector((state) => state.product);

  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  if (data.status === "loading") {
    return <div>Loading please wait</div>;
  }
  return (
    <div className="row ">
      {data.product?.products.map((item, index) => (
        <Product item={item} key={index} />
      ))}
    </div>
  );
};

export default LandingPage;
