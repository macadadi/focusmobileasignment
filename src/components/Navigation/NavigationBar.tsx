import React from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector } from "../../app/hooks";
import LanguageSelector from "./LanguageSelector";

function NavigationBar() {
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.product.Cart);
  return (
    <div className=" navbar sticky-top navbar-light bg-light ">
      <div className="mx-3">
        <h1>{t("TITLE")}</h1>
      </div>
      <div>
        <LanguageSelector />
      </div>
      <div>
        <div className="m-2 mx-3">
          <Link to="/cart/details" className="link" data-testid="cart-btn">
            <ShoppingCartOutlinedIcon className="mx-0" />{" "}
            <sup style={{ color: "red", fontSize: 12 }} data-testid="cart">
              {cart.length - 1}
            </sup>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
