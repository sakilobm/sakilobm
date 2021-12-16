import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import BottomTab from './Nav';

const reducer = (state = { menu: "closeMenu", log: "" }, action) => {

  switch (action.type) {
    case "OPENMENU":
      return { ...state, menu: "openMenu" };
    case "CLOSEMENU":
      return { ...state, menu: "closeMenu" };
    case "LOG":
      return { ...state, log: action.email };
    case "OPENLOGIN":
      return { ...state, menu: "openLogin" };
    case "CLOSELOGIN":
      return { ...state, menu: "closeLogin" };
    default:
      return state;
  }// if(command.type == "OPENMENU") {
  //   return { menu: "openMenu"};
  // } else if (command.type == "CLOSEMENU") {
  //   return { menu: "closeMenu"};
  // }
  // return state;
  // ;
};

const database = createStore(reducer);

const App = () => (
  <Provider store={database}>
    <BottomTab />
  </Provider>
);
export default App;