'use strict';

const e = React.createElement;

const HTML_ELEMENTS = {
  div : 'div',
  input : 'input',
  span : 'span',
  img : 'img',
  form : 'form',
  label : 'label',
  a : 'a',
  p : 'p'
};

const TYPE_MESSAGES = {
  BUTTON : 'BUTTON',
  TEXT : 'TEXT',
  LIST : 'LIST'
};

const HTTP_REQUEST = {
  get : (url, call) => {
    fetch(
      url,
      {
          method : 'get',
          headers : { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(res => res.json())
    .then( result => call(result), error => call(null, error) );
  },
  post : (url, body, headers, call) => {
    fetch(
        url,
        {
          method : 'post',
          headers,
          body : JSON.stringify(body)
        },
        )
    .then(res => res.json())
    .then( result => call(result), error => call(false, error) );
  }
}

class Message {

  #previusURL;
  #nextURL;
  #auth;

  constructor(inputData) {

    this.text = inputData.text;
    this.typeMsg = inputData.typeMsg;
    this.userSent = inputData.userSent;

    this.#previusURL = '';
    this.#nextURL = '';
    this.#auth = null;
  }

  static convertUserMsg(text, typeMsg, userSent){
    return {
      text,
      typeMsg,
      userSent
    }
  }

  static convertBotMsg(inputData) {
    return {
      text : inputData.text,
      typeMsg : inputData.typeMsg,
      userSent : inputData.userSent
    }
  }

}

class InputText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
        HTML_ELEMENTS.input,
        this.props
        );
    }
}

class MessageTextBot extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return React.createElement(
      HTML_ELEMENTS.div,
      { className : 'row grey lighten-3', style : { minHeight : '100px'} },
      e(
        HTML_ELEMENTS.span,
        { className : 'black-text' },
        this.props.text
      )
    );
  }

  // render() {
  //   return React.createElement(
  //     HTML_ELEMENTS.div,
  //     { className : 'row grey lighten-4', style : { minHeight : '100px' }  },
  //         e(
  //           HTML_ELEMENTS.div,
  //           { className : 'valign-wrapper' },
  //           [
  //             e(
  //               HTML_ELEMENTS.div,
  //               { key: 1,className : 'col s2 m1' },
  //               e(
  //                 HTML_ELEMENTS.img,
  //                 { className : 'circle responsive-img',  src : "style/linux.png", style : { marginTop : '20px', maxWidth: '50px' } }
  //               )
  //             ),
  //             e(
  //               HTML_ELEMENTS.div,
  //               { key: 2, className : 'col s10 m11' },
  //               e(
  //                 HTML_ELEMENTS.span,
  //                 { className : 'black-text' },
  //                 this.props.text
  //               )
  //             )
  //           ]
  //         )
  //   );
  // }
}

class MessageTextUser extends React.Component {

  constructor(props){
    super(props);
  }
  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      { className : 'row grey lighten-5', style : { minHeight : '100px' }  },
        e(
          HTML_ELEMENTS.div,
          { className : 'right-align', style : { marginRight : '10px' } },
          [
            e(
              HTML_ELEMENTS.div,
              { key: 2, className : 'col s11 l10', style : { marginTop : '20px' } },
              e(
                HTML_ELEMENTS.span,
                { className : 'black-text' },
                this.props.text
              )
            ),
            e(
              HTML_ELEMENTS.div,
              { key: 1,className : 'col s1 l2' },
              e(
                HTML_ELEMENTS.img,
                { className : 'circle responsive-img',  src : "style/user.jpg", style : { marginTop : '20px', maxWidth: '50px' } }
              )
            )
          ]
        )
    );
  }
}

class BtnMessage extends React.Component {
  
  constructor(props){
    super(props);
  }

  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      { className : 'row grey lighten-4', style : { minHeight : '100px' }  },
          e(
            HTML_ELEMENTS.div,
            { className : 'valign-wrapper' },
            [
              e(
                HTML_ELEMENTS.div,
                { key: 1,className : 'col s2 m1' },
                e(
                  HTML_ELEMENTS.img,
                  { className : 'circle responsive-img',  src : "style/linux.png", style : { marginTop : '20px', maxWidth: '50px' } }
                )
              ),
              e(
                HTML_ELEMENTS.div,
                { key: 2, className : 'col s10 m11', style : { overflowY : 'hidden' }  },
                this.props.btns
              )
            ]
          )
    );
  }
}

class ListMessageBot extends React.Component {
  
  constructor(props){
    super(props);
  }
  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      { className : 'row grey lighten-3', style : { minHeight : '100px' }  },
      e(
        HTML_ELEMENTS.div,
        { key: 2, className : 'col s12 m10 l6', style : { overflowY : 'hidden' }  },
        this.props.options
      )
    );
  }

  // render(){
  //   return React.createElement(
  //     HTML_ELEMENTS.div,
  //     { className : 'row grey lighten-4', style : { minHeight : '100px' }  },
  //     e(
  //       HTML_ELEMENTS.div,
  //       { className : 'valign-wrapper' },
  //       [
  //         e(
  //           HTML_ELEMENTS.div,
  //           { key: 1,className : 'col s2 m1' },
  //           e(
  //             HTML_ELEMENTS.img,
  //             { className : 'circle responsive-img',  src : "style/linux.png", style : { marginTop : '20px', maxWidth: '50px' } }
  //           )
  //         ),
  //         e(
  //           HTML_ELEMENTS.div,
  //           { key: 2, className : 'col s10 m11', style : { overflowY : 'hidden' }  },
  //           this.props.options
  //         )
  //       ]
  //     )
  //   );
  // }
}
