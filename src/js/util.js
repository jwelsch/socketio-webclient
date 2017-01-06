"use strict";

module.exports = class Util {
   static isArray( obj ) {
      return Object.prototype.toString.call( obj ) === '[object Array]';
   }

   static isString( obj ) {
      return Object.prototype.toString.call( obj ) === '[object String]';
   }

   static isNumber( obj ) {
      return Object.prototype.toString.call( obj ) === '[object Number]';
   }

   static isDate( obj ) {
      return Object.prototype.toString.call( obj ) === '[object Date]';
   }

   static isFunction( obj ) {
      return Object.prototype.toString.call( obj ) === '[object Function]';
   }

   static isObject( obj ) {
      return Object.prototype.toString.call( obj ) === '[object Object]';
   }

   static isSymbol( obj ) {
      return Object.prototype.toString.call( obj ) === '[object Symbol]';
   }

   static isBoolean( obj ) {
      return Object.prototype.toString.call( obj ) === '[object Boolean]';
   }

   static objectToString( obj, params ) {
      let text = "";

      if ( !params ) {
         params = {
            key: null,
            indent: null,
            indentSize: null,
            hideArrayIndex: null,
            hideFunctionBody: null
         }
      }

      if ( !params.indent ) {
         params.indent = 0;
      }
      if ( !params.indentSize ) {
         params.indentSize = 2;
      }

      let padding = "";
      let spaces = "";
      for ( let i = 0; i < params.indentSize; i++ ) {
         spaces += " ";
      }
      for ( let i = 0; i < params.indent; i++ ) {
         padding += spaces;
      }

      const recurse = ( inner, params ) => {
         return this.objectToString( inner, {
            key: params.key,
            indent: params.indent + 1,
            indentSize: params.indentSize,
            hideArrayIndex: params.hideArrayIndex,
            hideFunctionBody: params.hideFunctionBody
         } );
      };

      if ( Util.isArray( obj ) ) {
         text += padding + ( params.key ? params.key + ": " : "" ) + "[" + "\n";
         let keys = Object.keys( obj );
         for ( let i = 0; i < keys.length; i++ ) {
            params.key = params.hideArrayIndex ? null : keys[i];
            text += recurse( obj[keys[i]], params );
            text += ( i < keys.length - 1 ? "," : "" ) + "\n";
         }
         text += padding + "]";
      }
      else if ( Util.isString( obj ) ) {
         text += padding + ( params.key ? params.key + ": " : "" ) + "\"" + obj + "\"";
      }
      else if ( Util.isFunction( obj ) ) {
         let s = obj.toString();
         if ( params.hideFunctionBody ) {
            s = "\<function body hidden\>";
         }
         else {
            // The closing function bracket will always have the editor's indent.  Set it to what the params say.
         }
         text += padding + ( params.key ? params.key + ": " : "\n" ) + s;
      }
      else if ( Util.isSymbol( obj ) ) {
         text += padding + ( params.key ? params.key + ": " : "\n" ) + "\<symbol\>";
      }
      else if ( Util.isObject( obj ) ) {
         text += padding + ( params.key ? params.key + ": " : "" ) + "{" + "\n";
         const keys = Object.keys( obj );
         for ( let i = 0; i < keys.length; i++ ) {
            params.key = keys[i];
            text += recurse( obj[keys[i]], params );
            text += ( i < keys.length - 1 ? "," : "" ) + "\n";
         }
         text += padding + "}";
      }
      else {
         text += padding + ( params.key ? params.key + ": " : "\n" ) + obj;
      }

      return text;
   };
};
