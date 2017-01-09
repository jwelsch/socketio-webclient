import React, { Component, PropTypes } from "react";
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from "react-bootstrap";
import ColorPanel from "../colorPanel/ColorPanel.jsx";
import "./socketForm.css";

export default class SocketForm extends Component {
   constructor( props ) {
      super( props );

      this.state = {
         url: "",
         event: "",
         data: ""
      };
   }

   isIdle( props ) {
      return ( props ? props.status : this.props.status ) === "idle";
   }

   isSending( props ) {
      return ( props ? props.status : this.props.status ) === "sending";
   }

   isError( props ) {
      return ( props ? props.status : this.props.status ) === "error";
   }

   showMessagePanel() {
      return this.isError() || this.isSending();
   }

   handleChangeUrl( e ) {
      this.setState( {
         url: e.target.value
      } );
   }

   getValidationStateUrl() {
      const length = this.state.url.length;
      if ( length === 0 ) {
         return "error";
      }

      return "success";
   }

   handleChangeEvent( e ) {
      this.setState( {
         event: e.target.value
      } );
   }

   handleChangeData( e ) {
      this.setState( {
         data: e.target.value
      } );
   }

   handleClickAction( e ) {
      if ( this.isSending() ) {
         this.handleCancel();
      }
      else {
         this.handleSend();
      }
   }

   handleSend() {
      if ( !this.props.onSend ) {
         const message = "Error: this.props.onSend is undefined or null.";
         throw new Error( message );
      }

      let url = this.state.url;

      if ( !this.state.url.toUpperCase().startsWith( "HTTP://" ) ) {
         url = `http://${this.state.url}`;
         this.setState( {
            url: url
         } );
      }

      this.props.onSend( {
         url: url,
         event: this.state.event,
         data: this.state.data
      } );
   }

   handleCancel() {
      if ( !this.props.onCancel ) {
         const message = "Error: this.props.onCancel is undefined or null.";
         throw new Error( message );
      }

      this.props.onCancel();
   }

   renderMessagePanel( columns ) {
      if ( !this.showMessagePanel() ) {
         return "";
      }

      let bsStyle = "";
      let message = "";

      if ( this.isError() ) {
         bsStyle = "danger";
         message = this.props.error.message;
      }
      else {
         bsStyle = "info";
         message = "Sending request...";
      }

      return (
         <Col sm={columns}>
            <ColorPanel bsStyle={bsStyle} bsSize="md" flush>{message}</ColorPanel>
         </Col>
      );
   }

   render() {
      return (
         <Form horizontal>
            <FormGroup
               controlId="formUrl"
               validationState={this.getValidationStateUrl()}
               bsSize="sm"
            >
               <Col componentClass={ControlLabel} sm={2}>URL</Col>
               <Col sm={10}>
                  <FormControl
                     type="text"
                     value={this.state.url}
                     placeholder="Enter URL"
                     readOnly={this.isSending()}
                     onChange={this.handleChangeUrl.bind( this )}
                  />
               </Col>
            </FormGroup>
            <FormGroup
               controlId="formEvent"
               bsSize="sm"
            >
               <Col componentClass={ControlLabel} sm={2}>Event</Col>
               <Col sm={10}>
                  <FormControl
                     type="text"
                     value={this.state.event}
                     placeholder="Enter event (optional)"
                     readOnly={this.isSending()}
                     onChange={this.handleChangeEvent.bind( this )}
                  />
               </Col>
            </FormGroup>
            <FormGroup
               controlId="formData"
               bsSize="sm"
            >
               <Col componentClass={ControlLabel} sm={2}>Data</Col>
               <Col sm={10}>
                  <FormControl
                     componentClass="textarea"
                     value={this.state.data}
                     placeholder="Enter data (optional)"
                     readOnly={this.isSending()}
                     onChange={this.handleChangeData.bind( this )}
                  />
               </Col>
            </FormGroup>
            <FormGroup
               controlId="formSend"
               bsSize="sm"
            >
               <Col smOffset={2} sm={2}>
                  <Button onClick={this.handleClickAction.bind( this )} disabled={this.getValidationStateUrl() === "error"}>{this.isSending() ? "Cancel" : "Send"}</Button>
               </Col>
               {this.renderMessagePanel( 8 )}
            </FormGroup>
         </Form>
      );
   }
}

SocketForm.propTypes = {
   onSend: React.PropTypes.func.isRequired,
   onCancel: React.PropTypes.func.isRequired,
   status: React.PropTypes.string.isRequired,
   error: React.PropTypes.object
};