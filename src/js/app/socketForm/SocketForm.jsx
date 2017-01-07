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
         actionButtonText: ""
      };
   }

   updateActionButtonText( props ) {
      this.setState( {
         actionButtonText: props.sending ? "Cancel" : "Send"
      } );
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
      if ( this.props.sending ) {
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

   componentWillMount() {
      this.updateActionButtonText( this.props );
   }

   componentWillReceiveProps( nextProps ) {
      this.updateActionButtonText( nextProps );
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
                     readOnly={this.props.sending}
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
                     readOnly={this.props.sending}
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
                     readOnly={this.props.sending}
                     onChange={this.handleChangeData.bind( this )}
                  />
               </Col>
            </FormGroup>
            <FormGroup
               controlId="formSend"
               bsSize="sm"
            >
               <Col smOffset={2} sm={2}>
                  <Button onClick={this.handleClickAction.bind( this )}>{this.state.actionButtonText}</Button>
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
   onCancel: React.PropTypes.func.isRequired,
   sending: React.PropTypes.bool
};