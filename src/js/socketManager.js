"use strict";

import Util from "./util.js";
import io from "socket.io-client";

export default class SocketManager {
   constructor() {
      this.socket = null;
   }

   async connect( url ) {
      this.socket = io( url, {
         //"forceNew": true,
         //"reconnection": true,
         //"timeout": 10000
      } );

      await this._connectSocket();
   }

   _connectSocket() {
      return new Promise( ( resolve, reject ) => {
         try {
            this.socket.on( "connect_error", ( err ) => {
               this.disconnect();
               reject( err );
            } );

            this.socket.on( "connect_timeout", ( err ) => {
               this.disconnect();
               reject( err);
            } );

            this.socket.on( "connect", ( err ) => {
               if ( err ) {
                  reject( err );
               }
               resolve( true );
            } );
         }
         catch ( ex ) {
            reject( ex );
         }
      } );
   }

   disconnect() {
      if ( this.socket ) {
         this.socket.disconnect();
      }
   }

   request( event, data ) {
      return new Promise( ( resolve, reject ) => {
         try {
            if ( !this.socket ) {
               reject( {
                  result: false,
                  message: "Socket.io is not connected."
               } );
            }

            // The socket.io server will call the function with the result.
            this.socket.emit( event, data, ( response ) => {
               response.result ? resolve( response ) : reject( response );
            } );
         }
         catch ( ex ) {
            reject( {
               result: false,
               message: ex.message
            } );
         }
      } );
   }
}