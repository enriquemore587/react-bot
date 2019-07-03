'use strict';

const e = React.createElement;
const HTML_ELEMENTS = {
  div: 'div',
  input: 'input'
};
const messages = ['Hola, Cómo te puedo ayudar?', 'Hola, Cómo te puedo ayudar?', 'Hola, Cómo te puedo ayudar?', 'Hola, Cómo te puedo ayudar?'];

class InputText extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return React.createElement(
        HTML_ELEMENTS.input,
        this.props
        );
    }
}

class DivTextMessage extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
      let styleMessage = this.props.send ? 'alert alert-dark text-right' : 'alert alert-light text-left';
      return (
         HTML_ELEMENTS.div,
         React.createElement(
          HTML_ELEMENTS.div,
          { className : styleMessage },
          this.props.text
         )
      );
    }
}