import Fetcher from './utils/jsongetter';

import './styles/main.scss';
class CityPicker {
  constructor() {
    this.inputField = document.getElementById('city-input');
    this.tip = document.getElementById('city-tip-list');
    this.fetcher = null;
    this.state = {
      fieldValue: '',
      citiesList: new Set(),
      pickedCity: null,
    };
    this.handlers = {
      inputHandler: this.#onInputHandler.bind(this),
      cityPickHandler: this.#pickCityOnClick.bind(this),
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

        this.#updateTip();
      },
      onError: function () {
        console.log('Request timeout!!!');
      },
      timeoutLimit: 4,
      callbackName: 'fetcherCallback',
    }

    this.fetcher = new Fetcher(options);
  }

  #onInputHandler(evt) {
    this.pickedCity = null;
    this.state.fieldValue = evt.currentTarget.value;
    this.inputField.value = this.state.fieldValue;
    this.#updateTip();

    if (this.state.fieldValue.length > 1) this.fetcher.sendRequest(
      `https://kladr-api.ru/api.php?query=${this.state.fieldValue}&contentType=city&withParent=0&limit=10`
    );
  }

  #updateTip() {
    const tipIsNeeded = (!this.pickedCity && this.state.fieldValue.length > 1 && this.state.citiesList.size);
    this.tip.parentElement.style.display = tipIsNeeded ? 'block' : 'none';
    this.tip.innerHTML = '';

    if (!tipIsNeeded) return false;

    this.state.citiesList.forEach(city => {
      const item = document.createElement('li');

      item.classList.add('city-picker__item');
      item.textContent = city;
      item.addEventListener('click', this.handlers.cityPickHandler);

      this.tip.appendChild(item);
    })
  }

  #pickCityOnClick(evt) {
    this.state.fieldValue = this.inputField.value = this.pickedCity = evt.currentTarget.textContent;
    this.#updateTip();
  }
}

new CityPicker();
