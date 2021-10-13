import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Icart } from "./DetailsPage";

function CartDetails() {
  const cart: Icart[] = useAppSelector((state) => state.product.Cart).slice(1);

  return (
    <div>
      <div className="d-flex justify-content-between ">
        <h4>cart details page</h4>
        <Link to="/" className="link">
          Continue Shopping
        </Link>
      </div>
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>
                  {item.price.price} {item.price.currency}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CartDetails;
