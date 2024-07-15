import { Provider } from "react-redux";
import { store } from "./store.ts";
import App from "../App.tsx";

export const ReduxApp = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);
