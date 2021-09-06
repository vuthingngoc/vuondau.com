import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";

test("test check", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const textElement = screen.getByText(/Vuon Dau/i);
  expect(textElement).toBeInTheDocument();
});
