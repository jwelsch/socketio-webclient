import React, { Component, PropTypes } from "react";
import { Form, FormGroup, FormControl, Col, ControlLabel, Panel } from "react-bootstrap";
import "./socketResponse.css";

export default class SocketResponse extends Component {
   constructor( props ) {
      super( props );
      this.state = {};
   }

   renderError() {
      if ( !this.props.error ) {
         return null;
      }

      return (
         <FormGroup
            controlId="formError"
            bsSize="sm"
         >
            <Col smOffset={2} sm={10}>
               <Panel header={this.props.error.header} bsStyle="danger">{this.props.error.message}</Panel>
            </Col>
         </FormGroup>
      );
   }

   render() {
      return (
         <Form horizontal>
            {this.renderError()}
            <FormGroup
               controlId="formResponse"
               bsSize="sm"
            >
               <Col componentClass={ControlLabel} sm={2}>Response</Col>
               <Col sm={10}>
                  <FormControl
                     componentClass="textarea"
                     value={this.props.response}
                     placeholder={this.props.error ? "An error has occurred" : "Response"}
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
   error: React.PropTypes.object
};