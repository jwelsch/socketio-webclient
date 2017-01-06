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
         data: "",
         enableSend: () => {
            return this.state.url.length > 0 && !this.props.sending;
         }
      };
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

   handleClickSend( e ) {
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
                     disabled={this.props.sending}
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
                     placeholder="Enter event"
                     disabled={this.props.sending}
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
                     placeholder="Enter data"
                     disabled={this.props.sending}
                     onChange={this.handleChangeData.bind( this )}
                  />
               </Col>
            </FormGroup>
            <FormGroup
               controlId="formSend"
               bsSize="sm"
            >
               <Col smOffset={2} sm={2}>
                  <Button disabled={!this.state.enableSend()} onClick={this.handleClickSend.bind( this )}>Send</Button>
               </Col>
               <div style={{marginTop: 2 + "px"}}>
                  {this.props.sending ?
                     <Col sm={3}>
                        <ColorPanel bsStyle="info" bsSize="sm" short>Sending request...</ColorPanel>
                     </Col>
                     : ""}
               </div>
            </FormGroup>
         </Form>
      );
   }
}

SocketForm.propTypes = {
   onSend: React.PropTypes.func.isRequired,
   sending: React.PropTypes.bool
};