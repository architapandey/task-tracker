import { useReducer, createContext } from "react";

const initialState = {
  projectDetails: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECT_DETAILS":
      return { ...state, projectDetails: action.data };

    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
