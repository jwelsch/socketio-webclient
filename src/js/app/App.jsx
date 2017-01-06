import React, { Component, PropTypes } from "react";
import SocketForm from "./socketForm/SocketForm.jsx";
import SocketResponse from "./socketResponse/SocketResponse.jsx";
import { Col } from "react-bootstrap";
import SocketManager from "../socketManager.js";
import Util from "../util.js";
import "./app.css";

export default class App extends Component {
   constructor( props ) {
      super( props );
      this.state = {
         response: "",
         sending: false,
         error: null
      };
   }

   handleSend( args ) {
      this.setCursor( true );
      this.setState( {
         sending: true,
         error: null
      } );

      const socket = new SocketManager();

      try {
         const waitConnect = socket.connect( args.url );

         waitConnect.then( () => {
            const strObj = args.data;
            const obj = eval( "(" + strObj + ")" );
            const waitRequest = socket.request( args.event, obj );

            waitRequest.then( response => {
               // Successfully received response.
               this.setCursor( false );
               this.setState( {
                  response: Util.objectToString( response ),
                  sending: false
               } );
            } )
            .catch ( error => {
               this.setErrorState( {
                  header: `Error Sending Request`,
                  message: Util.objectToString( error )
               } );
            } );
         } )
         .catch ( error => {
            this.setErrorState( {
               header: `Error Connecting`,
               message: Util.objectToString( error )
            } );
         } );
      }
      catch ( ex ) {
         this.setErrorState( {
            header: `Error`,
            message: Util.objectToString( ex )
         } );
      }
   }

   setErrorState( error ) {
      this.setCursor( false );
      this.setState( {
         sending: false,
         error: error
      } );
      console.error( error.header + ": " + error.message );
   }

   setCursor( isWait ) {
      const body = document.getElementsByTagName( "body" )[0];
      if ( isWait ) {
         body.classList.add( "waitCursor" );
      }
      else {
         body.classList.remove( "waitCursor" );
      }
   }

   render() {
      return (
         <div>
            <h1>Socket.io Client</h1>
            <SocketForm onSend={this.handleSend.bind( this )} sending={this.state.sending} />
            <Col sm={7}>
               <hr/>
            </Col>
            <SocketResponse response={this.state.response} error={this.state.error} />
         </div>
      );
   }
}

App.propTypes = {
   // TODO: Specify prop types here.
};