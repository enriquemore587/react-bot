'use strict';

class ChatHeader extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      { className: this.props.className },
      this.props.title
    );
  }
}

class ChatBody extends React.Component {
  constructor(props){
    super(props);
  }
  showMessage(){
    let messageToPrint = [];
    messages.map((msg, index) => {
      messageToPrint.push(e(
        DivTextMessage, { key : index, text: msg, send : index % 2 == 0 ? true : false }
      ));
    });
    return messageToPrint;
  }

  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      {className: this.props.className},
      this.showMessage()
    );
  }

}

class ChatFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  buildInputText(){
    let args = { type: "text", className : 'form-control', placeholder : "Escribir..."};
    return React.createElement( InputText, args );
  }
  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      {className : this.props.className},
      this.buildInputText()
    );
  }
}

class Chat extends React.Component { 

  constructor(props) {
    super(props);
  }

  buildHeader(){
    let args = { key: 1, className: 'card-header', title: this.props.title};
    return React.createElement( ChatHeader, args ) ;
  }

  buildBody(){
    let args = { key: 2, className: 'card-body' };
    return React.createElement( ChatBody, args );
  }

  buildFooter(){
    let args = { key : 3, className : 'card-footer text-muted'};
    return React.createElement( ChatFooter, args );
  }

  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      { className: this.props.className },
      [
        this.buildHeader(),
        this.buildBody(),
        this.buildFooter()]
    );
  }
}

