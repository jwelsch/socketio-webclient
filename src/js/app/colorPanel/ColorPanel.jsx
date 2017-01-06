import React, { Component, PropTypes } from "react";
import "./colorPanel.css";

export default class ColorPanel extends Component {
   constructor( props ) {
      super( props );
      this.state = {
         // TODO: Initialize state.
      };
   }

   render() {
      let size = "large";

      if ( this.props.bsSize === "medium" || this.props.bsSize === "md" ) {
         size = "medium";
      }
      else if ( this.props.bsSize === "small" || this.props.bsSize === "sm" ) {
         size = "small";
      }

      const outerClassNames = "panel"
         + ` panel-${this.props.bsStyle ? this.props.bsStyle : "default"}`
         + ( this.props.short ? ` color-panel-short` : "" )
      ;
      const bodyClassNames = "color-panel"
         + ` color-panel-${this.props.bsStyle ? this.props.bsStyle : "default"}`
         + ` color-panel-${size}`
      ;
      return (
         <div className={outerClassNames}>
            <div className={bodyClassNames}>
               {this.props.children}
            </div>
         </div>
      );
   }
}

ColorPanel.propTypes = {
   // TODO: Specify prop types here.
   bsStyle: React.PropTypes.string
};