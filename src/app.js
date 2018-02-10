// const CitySelector = require('./CitySelector');
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

import CitySelector from "./CitySelector"

class App{
    constructor(){
        this._$createBtn = $('#createCitySelector');
        this.init();
    }

    init(){
        this._$createBtn.on("click", (event)=>{
            if($('.js-select-regions').length === 0 && $("#selectRegion").length === 0){
                this.citySelector = new CitySelector({
                    elementId: 'citySelector',
                    regionsUrl: 'http://localhost:7000/regions',
                    localitiesUrl: 'http://localhost:7000/localities',
                    saveUrl: 'http://localhost:7000/selectedRegions'
                });
            }
        })
    }

}

new App();