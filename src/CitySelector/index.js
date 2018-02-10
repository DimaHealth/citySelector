import './style.sass'
// Your code...
import $ from 'jquery';
import SelectedCity from "./SelectedCity"

window.jQuery = $;
window.$ = $;

export default class CitySelector{
    constructor(data){
        $('#' + data.elementId).append('<button id="selectRegion">Выбрать регион</button>')
        $('#info').show();
        this.objSelCity =  new SelectedCity(data);
        this.destroy(data)

    }
    destroy(data){
        $('#destroyCitySelector').on('click', ()=>{
            $('#localityText').text('');
            $('#regionText').text('');
            $('#info').hide();
            this.objSelCity.destroy();
            $('#' + data.elementId).html('')

        })
    }
}
