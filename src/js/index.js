"use strict";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.jsx";

(async function() {
   try {
      //
      // Render the main App component into the DOM.
      //
      ReactDOM.render( <App />, document.getElementById( "react-target" ) );
   }
   catch ( ex ) {
      console.error( "index.js - Fatal error - ex: " + ex );
   }
})();