import Fetcher from './utils/jsongetter';

import './styles/main.scss';
class CityPicker {
  constructor() {
    this.inputField = document.getElementById('city-input');
    this.fetcher = null;
    this.state = {
      fieldValue: '',
      citiesList: new Set(),
    };
    this.handlers = {
      inputHandler: this.#onInputHandler.bind(this)
    };

    this.#createFetcher();
    this.inputField.addEventListener('input', this.handlers.inputHandler);
  }

  #createFetcher() {
    const options = {
      onLoad: (data) => {
        this.state.citiesList = new Set();

        data.result.forEach((item) => {
          if (item.id !== 'Free') this.state.citiesList.add(item.name);
        })

        console.log(this.state.citiesList);
      },
      onError: function () {
        console.log('Request timeout!!!');
      },
      timeoputLimit: 5,
      callbackName: 'fetcherCallback'
    }

    this.fetcher = new Fetcher(options);
  }

  #onInputHandler(evt) {
    this.state.fieldValue = evt.currentTarget.value;
    this.inputField.value = this.state.fieldValue;

    if (this.state.fieldValue.length > 2) this.fetcher.sendRequest(
      `https://kladr-api.ru/api.php?query=${this.state.fieldValue}&contentType=city&withParent=1&limit=10`
    );
  }
}

new CityPicker();
