import './style.sass'
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

export default class SelectedCity {
    constructor(data) {
        this.data = data;
        this.selectedRegion = false;
        this.selectedCity = false;
        this.selectRegion();
        this.selectLocalities();
        this.saveCity();

        $("#selectRegion").off('click').on("click", () => {
            $("#" + data.elementId).html('');
            $.ajax({
                url: data.regionsUrl,
                context: $("#" + data.elementId),
                success: (data) => {
                    this.showRegions(data);
                }
            });
        });
    }
    destroy(){
        $(document).off("click", "#saveCity");
        $(document).off("click", ".js-select-regions > li");
        $(document).off("click", ".js-select-locality > li");
    }
    saveCity() {
        $(document).on("click", "#saveCity", () => {
            console.log(this, "thisSave");
            console.log(this.selectedCity);
            console.log(this.selectedRegion);
            $.ajax({
                url: this.data.saveUrl,
                type: "POST",
                async: false,
                data: {
                    city: this.selectedCity,
                    idRegion: this.selectedRegion,
                },
                success: (data) => {
                    alert(data);
                }
            });
        })
    }

    selectRegion() {
        $(document).on("click", ".js-select-regions > li", (event) => {
            let $this = $(event.currentTarget);
            if (!$this.hasClass('list__item--selected')) {
                $('.js-select-regions > .list__item--selected').removeClass('list__item--selected');
                $this.addClass('list__item--selected');
                this.selectedCity = false;
                let idRegion = $this.data("id");
                this.selectedRegion = idRegion;
                $.ajax({
                    url: this.data.localitiesUrl + '/' + idRegion,
                    context: $this,
                    success: (data) => {
                        this.showLocalities(data);
                    }
                });
                if ($('#saveCity').length !== 0) {
                    $('#saveCity').attr("disabled", true);
                }
                this.updateInfo();

            }
        })
    }

    selectLocalities() {
        $(document).on("click", ".js-select-locality > li", (event) => {
            let $this = $(event.currentTarget);
            if (!$this.hasClass('list__item--selected')) {
                $('#saveCity').attr("disabled", false);
                $('.js-select-locality .list__item--selected').removeClass('list__item--selected');
                $this.addClass('list__item--selected');
                this.selectedCity = $this.data('value');
                if ($('#saveCity').length === 0) {
                    this.showSaveBtn();
                }
                this.updateInfo()

            }
        });
    }

    updateInfo() {
        console.log(this.selectedRegion, this.selectedCity);
        this.updateItem('#regionText', this.selectedRegion);
        this.updateItem('#localityText', this.selectedCity);

    }

    updateItem(selector, value) {
        value !== false ? $(selector).text(value) : $(selector).text('');
    }

    showSaveBtn() {
        $("#" + this.data.elementId).append('<button id="saveCity">Сохранить</button>');
    }

    showLocalities(data) {
        $('.js-select-locality').html("");
        let localitiesHtml = "";
        $.each(data.list, (i, item) => {
            localitiesHtml += `<li class="list__item" data-value='${item}'>${item}</li>`
        });
        $("#cities").append(localitiesHtml);

    }

    showRegions(data) {
        let regionsHtml = "<ul class='list js-select-regions'>";
        $.each(data, (i, item) => {
            regionsHtml += `<li class="list__item" data-id = ${item.id}>${item.title}</li>`
        });
        regionsHtml += "</ul><ul id='cities' class='list js-select-locality'></ul>"
        $("#" + this.data.elementId).append(regionsHtml);
    }
}