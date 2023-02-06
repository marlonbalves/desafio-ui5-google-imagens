sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {

                let imageList = {
                    Imagens: []
                };

                let imageModel = new JSONModel(imageList);

                this.getView().setModel(imageModel, "MDL_Imagens");

            },
            onPressBuscar: function () {

                var oInputBusca = this.getView().byId("inpBusca");
                var sQuery = oInputBusca.getValue();

                // chama API
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + sQuery + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "020ccfe646mshd3b229aa06388e5p16fdd0jsn19ee912c0731",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);

                    // Instanciar o modelo
                    var oView = this.getView();
                    var oResultModel = oView.getModel("MDL_Imagens");
                    var oDadosImage = oResultModel.getData();

                    // limpa dados
                    oDadosImage.Imagens = [];

                    // atribui response a oDadosImage
                    let listaResultados = response.value;
                    let newItem;

                    for (var i = 0; i < listaResultados.length; i++) {
                        newItem = listaResultados[i];
                        oDadosImage.Imagens.push(newItem);
                    }

                    oResultModel.refresh();

                    // exibe lista de resultados
                    var oList = this.getView().byId("lstResultados");
                    oList.setVisible(true);

                }.bind(this));

            }
        });
    });
