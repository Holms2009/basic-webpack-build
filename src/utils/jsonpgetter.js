class JSONPGetter {
  constructor(options) {
    this.onLoad = options.onLoad || function (data) { console.log(data) };
    this.onError = options.onError || function (err) { console.log(err) };
    this.timeoutLimit = options.timeoutLimit || 5;
    this.callbackName = options.callbackName || 'callback';
    this.activeScript = null;
    this.activeTimeout = null;
  }

  #createNewRequest(request) {
    this.activeScript = document.createElement('script');

    this.activeScript.type = 'text/javascript';
    this.activeScript.async = true;
    this.activeScript.src = request;
    document.head.appendChild(this.activeScript);
  }

  #requestTimeoutHandler() {
    this.activeTimeout = setTimeout(() => {
      window[this.callbackName || 'callback'] = function () { };
      this.onError();
      this.activeScript.remove();
    }, this.timeoutLimit * 1000);
  }

  sendRequest(body) {
    this.#requestTimeoutHandler();

    window[this.callbackName || 'callback'] = (data) => {
      clearTimeout(this.activeTimeout);
      this.onLoad(data);
      this.activeScript.remove();
    };

    this.#createNewRequest(body + '&callback=' + this.callbackName);
  }
}

export default JSONPGetter;