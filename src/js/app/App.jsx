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
         status: "idle",
         error: null
      };

      this.socket = new SocketManager();
   }

   handleSend( args ) {
      this.setCursor( true );
      this.setState( {
         response: "",
         status: "sending",
         error: null
      } );

      try {
         const waitConnect = this.socket.connect( args.url );

         waitConnect.then( () => {
            const strObj = args.data;
            const obj = strObj ? eval( "(" + strObj + ")" ) : undefined;
            const waitRequest = this.socket.request( args.event, obj );

            waitRequest.then( response => {
               // Successfully received response.
               this.socket.disconnect();
               console.log( "Successfully received response." );
               this.setCursor( false );
               this.setState( {
                  response: Util.objectToString( response ),
                  status: "idle"
               } );
            } )
            .catch ( error => {
               this.setErrorState( {
                  header: "Error Sending Request",
                  message: Util.objectToString( error )
               } );
            } );
         } )
         .catch ( error => {
            this.setErrorState( {
               header: "Error Connecting",
               message: Util.objectToString( error )
            } );
         } );
      }
      catch ( ex ) {
         this.setErrorState( {
            header: "Error",
            message: Util.objectToString( ex )
         } );
      }
   }

   handleCancel() {
      this.setErrorState( {
         header: "Cancelled",
         message: "User cancelled send."
      } );
   }

   setErrorState( error ) {
      this.socket.disconnect();
      this.setCursor( false );
      this.setState( {
         status: "error",
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
            <h1>Socket.io Web Client</h1>
            <SocketForm onSend={this.handleSend.bind( this )} onCancel={this.handleCancel.bind( this )} status={this.state.status} error={this.state.error} />
            <Col sm={7}>
               <hr/>
            </Col>
            <SocketResponse response={this.state.response} status={this.state.status} />
         </div>
      );
   }
}

App.propTypes = {
   // TODO: Specify prop types here.
};