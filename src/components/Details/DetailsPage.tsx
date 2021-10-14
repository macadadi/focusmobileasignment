import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addItemtoCart,
  removeFromCart,
  Iprice,
  Iprod,
  ItemQuantity,
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
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<Iprice>({} as Iprice);
  const [displayQuantity, setDisplayQuantity] = useState(false);

  //   get items in the cart
  const cart = useAppSelector((state) => state.product.Cart);
  //   filter to see if the item is already in cart
  let Item: Icart = cart?.filter((prod) => prod.name === link.name)[0];

  //   function  to toggle when to show remove btn /add to cart btn and quantity tbn
  const toogleQuantitibtn = () => {
    if (typeof Item === "undefined") {
      setDisplayQuantity(false);
    } else {
      setQuantity(Item.quantity);
      setDisplayQuantity(true);
    }
  };

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
      quantity: quantity,
    };
    dispatch(addItemtoCart(cart));
    setDisplayQuantity(true);
  };
  //   add quantity
  const addQuantity = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (quantity < product?.available_quantity) {
      setQuantity(quantity + 1);
      let cart: Icart = {
        name: product?.name,
        price: price,
        quantity: quantity + 1,
      };
      dispatch(ItemQuantity(cart));
    }
  };
  // reduce quantity
  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      let cart: Icart = {
        name: product?.name,
        price: price,
        quantity: quantity - 1,
      };
      dispatch(ItemQuantity(cart));
    }
  };
  const removeItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    dispatch(removeFromCart(link.name));
    setDisplayQuantity(false);
  };

  //   set default currency on load
  useEffect(() => {
    setPrice(default_currency);
    toogleQuantitibtn();
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
              data-testid="select"
            >
              {product?.prices.map((price, index) => (
                <option
                  data-testid="select-option"
                  value={price.currency}
                  key={price.currency}
                >
                  {price.currency}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex">
            <p data-testid="cost">
              Price: {price?.currency} {price?.price}
            </p>
            {/* display btn to increase quantity only if product has been added to card */}
            {displayQuantity && (
              <div className="d-flex mx-3">
                <p>quantity</p>
                <button
                  className="btn mx-2 m-0 p-0 px-4 bg-info"
                  onClick={() => reduceQuantity()}
                  data-testid="reducebtn"
                >
                  -
                </button>{" "}
                <button
                  className="btn  m-0 p-0 px-2"
                  style={{ maxWidth: "5px" }}
                  data-testid="quantitybtn"
                >
                  {quantity}
                </button>{" "}
                <button
                  className="btn mx-2 m-0 p-0 px-4 bg-info"
                  onClick={(e) => addQuantity(e)}
                  data-testid="increasebtn"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div>
            <p>{product?.description}</p>
            <div className="d-flex">
              {product?.available_quantity > 0 ? (
                <div>
                  {/* display add to cart btn if a product has not been added to cart else display remove from cart btn */}
                  {displayQuantity ? (
                    <Link
                      to={`/details/${product?.name}`}
                      className="mx-3 link p-2 "
                      onClick={removeItem}
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Remove from cart
                    </Link>
                  ) : (
                    <Link
                      to={`/details/${product?.name}`}
                      className="mx-3 link p-2"
                      onClick={addToCart}
                      style={{ backgroundColor: "blue", color: "white" }}
                    >
                      Add to cart
                    </Link>
                  )}
                </div>
              ) : (
                <div
                  className="mx-3 link p-2"
                  style={{ backgroundColor: "pink", color: "white" }}
                >
                  Out of Stock
                </div>
              )}

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
