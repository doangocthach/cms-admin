import React from "react";
import Main from "./Main";
import Container from "@material-ui/core/Container";
import { StoreProvider } from "easy-peasy";
import { createStore } from "easy-peasy";
import storeModel from "./store/store";
const store = createStore(storeModel);

function App() {
  return (
    <StoreProvider store={store}>
      <Container>
        <Main />
      </Container>
    </StoreProvider>
  );
}

export default App;
