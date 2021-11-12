import { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ThemeApp } from "./theme";
import { storeConfiguration } from "./redux";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const store = storeConfiguration();

render(
  <StrictMode>
    <Provider store={store}>
      <ThemeApp>
        <App />
      </ThemeApp>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
