'use strict';

class Bot {

    #endpoint;
    #name;

    constructor() {
        this.htmlId = 'bot';
        this.#name = 'Default name';
    }

    setHtmlId(htmlId) {
        this.htmlId = htmlId;
    }

    getHtmlId() {
        return this.htmlId;
    }

    setName(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }
    
    // metodoAEliminar() {
    //     HTTP_REQUEST.get("https://back-dot-au-bbva-somos-jubilados.appspot.com/s/v1/module-rate", (response, error) => {
    //         if (!response) console.error(error);
    //         else console.log(response);
    //     });
    // }

    startBot(endpoint) {
        this.#endpoint = endpoint;
        let domContainer = document.querySelector(`#${this.htmlId}`);
        ReactDOM.render(React.createElement(Chat, { name : this.#name,  endpoint :  this.#endpoint }), domContainer);
        // this.metodoAEliminar();
    }

    static createEndpoint(url, method, headers, body) {
        return { url, method, headers, body };
    }

    static createEndpoint(url, method) {
        let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body = null;
        return { url, method, headers, body };
    }

}

let requestConfig = Bot.createEndpoint('http://localhost:8081/somos-jubilados/conversation', 'post');
const bot = new Bot();
// bot.setName("MI BOT PERSONALIZADO");
// bot.setHtmlId("divID");
bot.startBot(requestConfig);