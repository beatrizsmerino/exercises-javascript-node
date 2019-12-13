// 1. - Sacar en el html los datos de polen.

let urlAPI = "http://airemad.com/api/v1/pollen";

let resultBox = document.querySelectorAll("#ejercicio1 .content")[0];
let ejercicio1Button = document.querySelector("#ejercicio1Button");

function peticionAjax(url) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 1) {
      let loadingElem = document.createElement("p");
      loadingElem.setAttribute("id", "loading");
      let loadingText = document.createTextNode("...");

      loadingElem.appendChild(loadingText);
      document.body.appendChild(loadingElem);
    } else if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      let url = JSON.parse(xmlHttp.responseText);
      setData(url);
      // remove element loading
      let loading = document.getElementById("loading");
      document.body.removeChild(loading);
    } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
      console.error("ERROR! 404");
      console.info(JSON.parse(xmlHttp.responseText));
    }
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
}

function setData(object) {
  object.forEach(element => {
    // LOCATION:
    function location() {
      const locationName = element.name;
      const locationId = element.id;
      const locationLongitude = element.UTM_longitud;
      const locationLatitude = element.UTM_latitud;
      const locationHeight = element.altura;

      // LOCATION
      let cardElem = document.createElement("div");
      cardElem.setAttribute("data-index", locationId);
      cardElem.setAttribute("class", "location");

      // NAME
      let nameElem = document.createElement("h2");
      let nameText = document.createTextNode(locationName);

      // INFO (latitude, longitude, height)
      let infoElem = document.createElement("p");
      let infoText = document.createTextNode(
        "Latitude and Longitude (" +
          locationLongitude +
          ", " +
          locationLatitude +
          "), Height: " +
          locationHeight
      );

      // zone(element);
      // parameters();
      // measurements();

      // LOCATION (name and info)
      nameElem.appendChild(nameText); // name
      cardElem.appendChild(nameElem);

      infoElem.appendChild(infoText); // info
      cardElem.appendChild(infoElem);
      resultBox.appendChild(cardElem);
    }

    // ZONE:
    function addZone(location) {
      for (const key in location.parametros) {
        let zoneElem = document.createElement("ul");
        let zoneItemElem = document.createElement("li");
        let zoneItemNameElem = document.createElement("h3");
        let zoneItemNameText = document.createTextNode(key);

        zoneItemNameElem.appendChild(zoneItemNameText);
        zoneItemElem.appendChild(zoneItemNameElem);
        zoneElem.appendChild(zoneItemElem);
      }
    }

    function getZone(location) {
      for (const key in location.parametros) {
        return key;
      }
    }

    // ZONES: PARAMETERS
    function parameters(zone) {
      const locationParameters = element.parametros;
      for (const key in locationParameters) {
        const element = locationParameters[key];

        // ZONE: PARAMETERS
        const middle = element.medio;
        const high = element.alto;
        const veryHigh = element.muy_alto;

        let parametersTitleElem = document.createElement("h4");
        let parametersTitleText = document.createTextNode("Parameters: ");
        parametersTitleElem.appendChild(parametersTitleText);
        zoneItemElem.appendChild(parametersTitleElem);

        let parametersListElem = document.createElement("ul");
        parametersListElem.setAttribute("id", "parameters");
        parametersListElem.setAttribute("id", "list");
        // -----------
        let middleElem = document.createElement("li");
        let middleText = document.createTextNode("Medio: " + middle);
        // -----------
        let highElem = document.createElement("li");
        let highText = document.createTextNode("Alto: " + high);
        // -----------
        let veryHighElem = document.createElement("li");
        let veryHighText = document.createTextNode("Muy alto: " + veryHigh);

        // insert text to element
        middleElem.appendChild(middleText);
        highElem.appendChild(highText);
        veryHighElem.appendChild(veryHighText);

        // insert li to ul
        parametersListElem.appendChild(middleElem);
        parametersListElem.appendChild(highElem);
        parametersListElem.appendChild(veryHighElem);

        // insert list of parameters to zone
        zoneElem.appendChild(parametersListElem);

        // insert zone to location card
        cardElem.appendChild(zoneElem);
      }

      resultBox.appendChild(cardElem); // all
    }

    // ZONES: MEASUREMENTS
    function measurements(zone) {
      const locationMeasurements = element.mediciones;
      for (const key in locationMeasurements) {
        const element = locationMeasurements[key];

        // ZONE: MEASUREMENTS
        const date = element.fecha;
        const value = element.valor;
        const summary = element.resumen;

        let measurementsTitleElem = document.createElement("h4");
        let measurementsTitleText = document.createTextNode("Measurements: ");
        measurementsTitleElem.appendChild(measurementsTitleText);
        zoneItemElem.appendChild(measurementsTitleElem);

        let measurementsListElem = document.createElement("ul"); // parameter list
        measurementsListElem.setAttribute("class", "list");
        measurementsListElem.setAttribute("id", "measurements");
        // -----------
        let dateElem = document.createElement("li");
        let dateText = document.createTextNode("Fecha: " + date);
        // -----------
        let valueElem = document.createElement("li");
        let valueText = document.createTextNode("Valor: " + value);
        // -----------
        let summaryElem = document.createElement("li");
        let summaryText = document.createTextNode("Resumen: " + summary);

        // insert text to element
        dateElem.appendChild(dateText);
        valueElem.appendChild(valueText);
        summaryElem.appendChild(summaryText);

        // insert li to ul
        measurementsListElem.appendChild(dateElem);
        measurementsListElem.appendChild(valueElem);
        measurementsListElem.appendChild(summaryElem);

        // insert list of measurements to zone
        zoneElem.appendChild(measurementsListElem);
      }
    }

    location();
  });
}

ejercicio1Button.addEventListener("click", function() {
  let requestAPI = peticionAjax(urlAPI);
});
