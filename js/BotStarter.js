'use strict';

function start(elementID, title, className){
    const domContainer = document.querySelector('#'+elementID);
    ReactDOM.render(React.createElement(Chat, {title, className}), domContainer);
}


function call(){
    fetch("https://bot-starter-1.appspot.com/somos-jubilados/inicio?name=elenrique")
    .then(res => res.json())
    .then(
        result => console.log(result),
        error => console.log(error)
    );
}

call();

start('bot', 'MI BOT', 'card text-center bg-secondary text-white');