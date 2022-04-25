import { $dataMetaSchema } from 'ajv';
import './styles/main.scss';

class CityPicker {
  constructor() {
    this.inputField = document.getElementById('city-input');
    this.state = {
      fieldValue: '',
      citiesList: this.fetchCitiesList(),
    };
  }

  async fetchCitiesList() {
    const response = await fetch('https://kladr-api.ru/api.php?query=Арх&contentType=city&withParent=1&limit=2', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => { console.log(err) })

    console.log(response);
    return response;
  }
}

window.pickerInstance = new CityPicker();