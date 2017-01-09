import React, { Component, PropTypes } from "react";
import { Form, FormGroup, FormControl, Col, ControlLabel, Panel } from "react-bootstrap";
import "./socketResponse.css";

export default class SocketResponse extends Component {
   constructor( props ) {
      super( props );
      this.state = {};
   }

   render() {
      let placeholder = "";

      if ( this.props.status === "error" ) {
         placeholder = "An error has occurred"
      }
      else if ( this.props.status === "sending" ) {
         placeholder = "Waiting for response"
      }
      else {
         placeholder = "Response"
      }

      return (
         <Form horizontal>
            <FormGroup
               controlId="formResponse"
               bsSize="sm"
            >
               <Col componentClass={ControlLabel} sm={2}>Response</Col>
               <Col sm={10}>
                  <FormControl
                     componentClass="textarea"
                     value={this.props.response}
                     placeholder={placeholder}
                     readOnly
                  />
               </Col>
            </FormGroup>
         </Form>
      );
   }
}

SocketResponse.propTypes = {
   response: React.PropTypes.string,
   status: React.PropTypes.string.isRequired
};