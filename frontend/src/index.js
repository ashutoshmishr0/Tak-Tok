import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./context/ChatProvider";
import {BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode>
   <BrowserRouter>
      <ChatProvider>
   <ChakraProvider>
   
       
        <App />
        
    
    </ChakraProvider>
      </ChatProvider>
    </BrowserRouter>
    // </React.StrictMode>
  
);


