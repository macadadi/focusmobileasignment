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

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
const data = [
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
  rest.get(`${url}`, (req, res, ctx) => {
    return res(ctx.json(data), ctx.delay(150));
  }),
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

describe("test various functionality of our app", () => {
  beforeEach(() => {
    renderApp();
  });
  afterEach(cleanup);
  it("loading is displayed while  the page is fetching data", async () => {
    const load = await screen.getByText(/Loading/i);
    expect(load).toBeInTheDocument();
  });
  test("title is displayed when the page loads", async () => {
    const amazin = await screen.findByText(/TITLE/i);
    expect(amazin).toBeInTheDocument();
  });

  test("initial value of cart is 0 when page loads", async () => {
    const cartvalue = await screen.findByTestId("cart");
    expect(cartvalue).toHaveTextContent("0");
  });
  jest.setTimeout(70000);
  it("clicking details link redirects to detail page of  a single product", async () => {
    await new Promise((r) => setTimeout(r, 5000));
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
  it("buttons to increase and decrease quantity works correctly", () => {
    const addbtn = screen.getByTestId("increasebtn");
    const redbtn = screen.getByTestId("reducebtn");
    const disp = screen.getByTestId("quantitybtn");
    userEvent.click(addbtn);
    expect(disp).toHaveTextContent("2");
  });

  test("clicking cart icon redirects to cart detail page", async () => {
    const link = await screen.findByTestId("cart-btn");
    userEvent.click(link);
    expect(screen.getByText(/cart details page/i)).toBeInTheDocument();
  });
});
