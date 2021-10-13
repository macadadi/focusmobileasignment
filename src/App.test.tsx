import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "./app/store";
import App from "./App";

import url from "./features/counter/ProductSlice";

import { rest } from "msw";
import { setupServer } from "msw/node";

const data = [
  {
    name: "cellphone",
    rating: 3,
    image_url: "url",

    description: "some desc",
    prices: [{ currency: "ksh", price: 200 }],
    available_quantity: 2,
  },
  {
    name: "cellphone",
    rating: 3,
    image_url: "url",

    description: "some desc",
    prices: [{ currency: "ksh", price: 200 }],
    available_quantity: 2,
  },
];
export const handlers = [
  rest.get(
    ` https://evening-garden-83449.herokuapp.com/https://drive.google.com/uc`,
    (req, res, ctx) => {
      return res(ctx.json(data), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const renderApp = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe("test entire component", () => {
  beforeEach(() => {
    renderApp();
  });
  afterEach(cleanup);
  it("renders loading", () => {
    const load = screen.getByText(/Loading/i);
    expect(load).toBeInTheDocument();
  });
  test("renders title on load", async () => {
    const amazin = await screen.findByText(/TITLE/i);
    expect(amazin).toBeInTheDocument();
  });

  test("initial value of cart is 0 on render", async () => {
    const cartvalue = await screen.findByTestId("cart");
    expect(cartvalue).toHaveTextContent("0");
  });
  it("clicking details link redirects to detail page of  a single product", async () => {
    const link = await screen.findAllByRole("link", { name: /Details/ });
    userEvent.click(link[0]);
    const name = screen.getByText(/Cellphone/);
    expect(name).toBeInTheDocument();
  });
  it("clicking add to cart button increases cart counter to 1", () => {
    const button = screen.getByRole("link", { name: /Add to cart/ });
    userEvent.click(button);
    const cartvalue = screen.getByTestId("cart");
    expect(cartvalue).toHaveTextContent("1");
  });
  it("increase and decrease btn works correctly", () => {
    const addbtn = screen.getByTestId("increasebtn");
    const subbtn = screen.getByTestId("reducebtn");
    const disp = screen.getByTestId("quantitybtn");
    userEvent.click(addbtn);
    expect(disp).toHaveTextContent("2");
    userEvent.click(subbtn);
    expect(disp).toHaveTextContent("1");
  });

  test("clicking cart icon redirects to cart detail page", async () => {
    const link = await screen.findByTestId("cart-btn");
    userEvent.click(link);
    expect(screen.getByText(/cart details page/i)).toBeInTheDocument();
  });
});
