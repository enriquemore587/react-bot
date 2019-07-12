'use strict';

class ChatHeader extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let typingStyle = this.props.typingFlag ? {} : { display : 'none' } ;
    return React.createElement(
      HTML_ELEMENTS.div,
      { className : this.props.className, style: this.props.styles },
      e(
        HTML_ELEMENTS.div,
        { className : 'valign-wrapper' },
        [
          e(
            HTML_ELEMENTS.div,
            { key: 1,className : 'col s2 m1 l1' },
            e(
              HTML_ELEMENTS.img,
              { className : 'circle responsive-img',  src : "style/linux.png", style : { marginTop : '20px', maxWidth: '30px', marginLeft : '10px' } }
            )
          ),
          e(
            HTML_ELEMENTS.div,
            { key: 2, className : 'col s10 m11 l11' },
            [
              e(
                HTML_ELEMENTS.span,
                { key : 'nombreBot', className : 'card-title', style : {marginLeft: '15px'} },
                this.props.name
              ),
              e(
                HTML_ELEMENTS.span,
                { key : 'typingKey', className : 'badge', style : typingStyle },
                'Typing. . . . '
              )
            ]
          )
        ]
      )
    );
  }

  // render() {
  //   let typingStyle = this.props.typingFlag ? {} : { display : 'none' } ;
  //   return React.createElement(
  //     HTML_ELEMENTS.div,
  //     { className: this.props.className, style: this.props.styles },
  //     [
  //       e(
  //         HTML_ELEMENTS.span,
  //         { key : 'nombreBot', className : 'card-title', style : {marginLeft: '15px'} },
  //         this.props.name
  //       ),
  //       e(
  //         HTML_ELEMENTS.span,
  //         { key : 'typingKey', className : 'badge', style : typingStyle },
  //         'Typing. . . . '
  //       )
  //     ]
  //   );
  // }
}

class ChatBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages : this.props.messages };
  }

  valueSelected(value, indice) {
    console.log(value, indice);
    this.props.clearBtnList(indice, value);
  }

  buildUserMessage(msg, key) {
    let text = e( HTML_ELEMENTS.span, null, msg.text[0] );
    return e(  MessageTextUser, { key, text } );
  }

  buildTxtMessage(msg, index) {
    let text = [];
    msg.text.map( (txt, i) => {
      text.push( e( HTML_ELEMENTS.p, { key : i, style : { paddingLeft : '15px' }}, txt ) );
    });
    return e(MessageTextBot, { key : index, text });
  }

  buildBtnMessage(msg, key, indiceMessage) {
    let btns = [];
    let colClass = '';
    switch(msg.text.length) {
      case 4:
        colClass = 'col s3';
        break;
      case 3:
        colClass = 'col s4';
        break;
      case 2:
        colClass = 'col s6';
      case 1:
        colClass = 'col s12';
    }
    msg.text.map( (txt, indice) => {
      btns.push(
        e(
          HTML_ELEMENTS.div,
          { key : indice, className : colClass },
          e(
            HTML_ELEMENTS.a,
            {
              className : 'btn-flat grey lighten-3 blue-text text-darken-2 btn-opt',
              onClick : () => this.valueSelected(txt, indiceMessage) 
            },
            txt
          )
        )
        );
    } );
    return e(BtnMessage, { key , btns });
  }

  builListMessage(msg, key, indiceMessage) {
    let items = [];
    msg.text.map( (txt, indice) => {
      items.push(
        e(
          HTML_ELEMENTS.a,
          { 
            id : txt.replace(" ","")+indice, 
            key : indice,
            className : 'collection-item grey-text text-darken-4',
            onClick : () => this.valueSelected(txt, indiceMessage) 
          },
          txt
        )
      );
    });
    let options = e(
      HTML_ELEMENTS.div,
      { className : 'collection' },
      items
    );
    return e(ListMessageBot, { key, options });
  }

  buildBotMessage(indice, lastMessagePosition,  msg, key) {
    if (indice != lastMessagePosition) {
      return this.buildTxtMessage(msg, key);
    } else {
      if(msg.typeMsg == TYPE_MESSAGES.TEXT){
        return this.buildTxtMessage(msg, key);
      } else if (msg.typeMsg == TYPE_MESSAGES.BUTTON) {
        return this.buildBtnMessage(msg, key, indice);
      } else if (msg.typeMsg == TYPE_MESSAGES.LIST) {
        return this.builListMessage(msg, key, indice);
      }
    }
  }

  sendUserMessage(msg) {
    let body = {roster: 'XME2701', text : msg.text[0]};
    if (this.props.endpoint.body) body = this.props.endpoint.body;
    HTTP_REQUEST.post(this.props.endpoint.url, body, this.props.endpoint.headers, botMsgs => {
      botMsgs.map(botMsg => {
        this.props.addBotMsg(new Message(Message.convertBotMsg(botMsg)));
      });
    });
  }

  buildMessages() {
    let messageToPrint = [];
    this.state = { messages : this.props.messages };
    let lastMessagePosition = this.state.messages.length - 1;
    this.state.messages.map((msg, indice) => {
      let key = `msg${indice}`;
      if(msg.userSent) {
        messageToPrint.push(this.buildUserMessage(msg, key));
        if (indice == lastMessagePosition)
          this.sendUserMessage(msg);
      } else {
        messageToPrint.push(this.buildBotMessage(indice, lastMessagePosition,  msg, key));
      }
    });
    return messageToPrint;
  }

  render() {
    return React.createElement(
      HTML_ELEMENTS.div,
      { className: this.props.className, style : this.props.styles },
      this.buildMessages()
    );
  }

}

class ChatFooter extends React.Component {

  constructor(props) {
    super(props);
    this.typing = this.typing.bind(this);
  }

  typing(e) {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  }

  enterFunction(event) {
    if(event.key === 'Enter') {
      event.preventDefault();
      if (event.target.value != '') {
        this.props.addUserMsg(event.target.value);
        event.target.value = '';
      }
    }
  }

  buildInputText(){
    let args = {
      key: 1,
      type: "text",
      className : 'form-control',
      id: 'inMsg',
      name : 'inMsg',
      placeholder : "Escribir...",
      onKeyDown : (e) => this.enterFunction(e)
    };
    return React.createElement( InputText, args );
  }

  render(){
    return React.createElement(
      HTML_ELEMENTS.div,
      {className : this.props.className, style : this.props.styles },
      e(
        HTML_ELEMENTS.div,
        { className : 'row' },
        e(
          HTML_ELEMENTS.form,
          { className : 'col s12' },
          e(
            HTML_ELEMENTS.div,
            { className : 'row' },
            this.buildInputText()
          )
        )
      )
    );
  }
}

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages : []}
  }

  buildHeader() {
    let msgSize = this.state.messages.length;
    let typingFlag = msgSize > 0 ? this.state.messages[msgSize-1].userSent : false;
    let args = {
      key: 1,
      className: 'chat-head grey lighten-2 grey-text text-darken-4',
      name: this.props.name,
      typingFlag
    };
    return React.createElement( ChatHeader, args ) ;
  }

  buildBody() {
    let args = {
      key: 2,
      className: 'chat-body grey lighten-3',
      messages : this.state.messages,
      endpoint : this.props.endpoint,
      addBotMsg : msg => this.addBotMsg(msg),
      clearBtnList : (position, msg) => this.clearBtnList(position, msg)
    };
    return React.createElement( ChatBody, args );
  }

  buildFooter() {
    let args = {
      key : 3,
      className : 'chat-footer grey lighten-2',
      addUserMsg : msg => this.addUserMsg(msg)
    };
    return React.createElement( ChatFooter, args );
  }

  clearBtnList(position, msg) {
    let messages = [...this.state.messages.slice(0, position), ...this.state.messages.slice(position+1), new Message(Message.convertUserMsg([msg], TYPE_MESSAGES.TEXT, true))];
    this.setState({messages});
  }

  addBotMsg(msg) {
    let messages = [... this.state.messages, msg];
    this.setState({messages});
  }

  addUserMsg(msg) {
    let messages = [... this.state.messages, new Message(Message.convertUserMsg([msg], TYPE_MESSAGES.TEXT, true))];
    this.setState({messages});
  }

  render(){
    let header =  this.buildHeader();
    let body = this.buildBody();
    let footer = this.buildFooter();
    return React.createElement(
      HTML_ELEMENTS.div,
        { className : 'chat' },
        [ header, body, footer ]
    );
  }
}