import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector } from "../../app/hooks";

function NavigationBar() {
  const cart = useAppSelector((state) => state.product.Cart);
  return (
    <div className="bg-info">
      <div className="d-flex justify-content-between mx-3">
        <div>
          <h1>Amazin </h1>
        </div>
        <div>
          <div className="m-2">
            <ShoppingCartOutlinedIcon className="mx-0" />{" "}
            <sup style={{ color: "red", fontSize: 12 }}>{cart.length}</sup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
