import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Icart } from "../../components/Details/DetailsPage";

export interface Iprice {
  currency: string;
  price: number;
}
export interface Iprod {
  name: string;
  image_url: string;
  description: string;
  rating: number;
  available_quantity: number;
  prices: Iprice[];
}

export interface productState {
  status: "idle" | "loading" | "failed" | "fullfiled";
  product: {
    products: Iprod[];
  };
  Cart: Icart[];
}

const initialState: productState = {
  status: "idle",
  product: {
    products: [
      {
        name: "",
        image_url: "",
        description: "",
        rating: 0,
        available_quantity: 0,
        prices: [
          {
            currency: "",
            price: 0,
          },
        ],
      },
    ],
  },
  Cart: [
    {
      name: "",
      price: {
        currency: "",
        price: 0,
      },
      quantity: 0,
    },
  ],
};

// make a sync request to fetch data.
export const url = `https://evening-garden-83449.herokuapp.com/https://drive.google.com/uc?export=view&id=1N6y4ZEVdScye93DRppbz7M0lQTAlz3HF&format=json`;
export const fetchdata = createAsyncThunk("product/fetchdata", async () => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  return response;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItemtoCart: (state, action) => {
      state.Cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.Cart = state.Cart.filter((item) => item.name !== action.payload);
    },
    ItemQuantity: (state, action) => {
      state.Cart = state.Cart.filter(
        (item) => item.name !== action.payload.name
      );
      state.Cart.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchdata.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        state.status = "fullfiled";
        state.product = action.payload;
      })
      .addCase(fetchdata.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectProduct = (state: RootState) => state.product.product;

export const { addItemtoCart, removeFromCart, ItemQuantity } =
  productSlice.actions;

export default productSlice.reducer;
