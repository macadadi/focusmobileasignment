import { FC } from "react";
import { Link } from "react-router-dom";

import { Iprod } from "../../features/counter/ProductSlice";

type Iproduct = {
  item: Iprod;
};
//component to display a single product with name and image
const Product: FC<Iproduct> = ({ item }) => {
  const proId: string = item.image_url.slice(32, -5);
  return (
    <div className="col-md-4 col-sm-6 text-center ">
      <div className="  item m-1">
        <h3>{item.name}</h3>
        <div>
          <img
            src={`https://drive.google.com/uc?export=view&id=${proId}`}
            alt="poll boll"
          />
          <div>
            <Link
              to={`/details/${item.name}`}
              className="link"
              data-testid="detail"
            >
              Details{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
