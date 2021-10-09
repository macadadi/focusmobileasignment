import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addItemtoCart,
  Iprice,
  Iprod,
} from "../../features/counter/ProductSlice";

export interface Icart {
  name: string;
  price: Iprice;
  quantity: number;
}

function DetailsPage() {
  // fetch query param from url
  const link: { name: string } = useParams();
  const dispatch = useAppDispatch();
  const [price, setPrice] = useState<Iprice>({} as Iprice);

  // get products from redux store
  const products = useAppSelector((state) => state.product.product?.products);
  //   filter the list of prducts and return a single product
  let product: Iprod = products?.filter((item) => item.name === link.name)[0];
  //   extract image id
  const proId: string = product?.image_url.slice(32, -5);
  const default_currency = product?.prices[0];

  const setCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let option = product.prices.filter(
      (price) => price.currency === e.target.value
    )[0];
    setPrice(option);
  };
  //   add item to cart
  const addToCart = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    let cart: Icart = {
      name: product?.name,
      price: price,
      quantity: 0,
    };
    dispatch(addItemtoCart(cart));
  };
  //   set default currency on load
  useEffect(() => {
    setPrice(default_currency);
  }, [products]);
  return (
    <div>
      <div>
        <h5> {product?.name}</h5>
        <p>{product?.available_quantity} available in stock</p>
        <div>
          <div className="d-flex">
            <img
              src={`https://drive.google.com/uc?export=view&id=${proId}`}
              alt={product?.name}
            />
            <p>Select currency </p>
            <select
              className="select-btn mx-2"
              aria-label=".form-select-sm example"
              onChange={setCurrency}
            >
              {product?.prices.map((price) => (
                <option value={price.currency}>{price.currency}</option>
              ))}
            </select>
          </div>
          <p>
            Price: {price?.currency} {price?.price}
          </p>
          <div>
            <p>{product?.description}</p>
            <div>
              <Link
                to={`/details/${product?.name}`}
                className="mx-3 link"
                onClick={addToCart}
              >
                Add to cart
              </Link>
              <Link to="/" className="mx-3 link">
                Back to shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
