import { tiempoArr, precipitacionArr, uvArr, temperaturaArr } from './static_data.js';

const intervaloActualizacion = 3 * 60 * 60 * 1000; // 3 horas en milisegundos

let fechaActual = () => new Date().toISOString().slice(0, 10);

let cargarPrecipitacion = () => {

  //Obtenga la función fechaActual
  let actual = fechaActual();
  //Defina un arreglo temporal vacío
  let datos = [];
  //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const precipitacion = precipitacionArr[index]

    if (tiempo.includes(actual)) {
      datos.push(precipitacion)
    }
  }
  //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
  let max = Math.max(...datos); // Extender elementos de los arreglos. los desempaqueta a cada elemento
  let min = Math.min(...datos);
  let sum = datos.reduce((a, b) => a + b, 0); // Aplicar la misma propiedad de 2 en 2
  let prom = (sum / datos.length) || 0; // si abajo es 0 se utiliza 0

  //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
  let precipitacionMinValue = document.getElementById("precipitacionMinValue");
  let precipitacionPromValue = document.getElementById("precipitacionPromValue");
  let precipitacionMaxValue = document.getElementById("precipitacionMaxValue");
  //Actualice los elementos HTML con los valores correspondientes
  precipitacionMinValue.textContent = `Min ${min} [mm]`;
  precipitacionPromValue.textContent = `Prom ${Math.round(prom * 100) / 100} [mm]`;
  precipitacionMaxValue.textContent = `Max ${max} [mm]`;
}

let cargarUV = () => {
  //Obtenga la función fechaActual
  let actual = fechaActual();
  //Defina un arreglo temporal vacío
  let datos = [];
  //Itere en el arreglo tiempoArr para filtrar los valores de temperaturaArr que sean igual con la fecha actual
  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const uv = uvArr[index]

    if (tiempo.includes(actual)) {
      datos.push(uv)
    }
  }
  //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
  let max = Math.max(...datos); // Extender elementos de los arreglos. los desempaqueta a cada elemento
  let min = Math.min(...datos);
  let sum = datos.reduce((a, b) => a + b, 0); // Aplicar la misma propiedad de 2 en 2
  let prom = (sum / datos.length) || 0; // si abajo es 0 se utiliza 0

  //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
  let uvMinValue = document.getElementById("uvMinValue");
  let uvPromValue = document.getElementById("uvPromValue");
  let uvMaxValue = document.getElementById("uvMaxValue");
  //Actualice los elementos HTML con los valores correspondientes
  uvMinValue.textContent = `Min ${min} [--]`;
  uvPromValue.textContent = `Prom ${Math.round(prom * 100) / 100} [--]`;
  uvMaxValue.textContent = `Max ${max} [--]`;
}

let cargarTemperatura = () => {
  //Obtenga la función fechaActual
  let actual = fechaActual();
  //Defina un arreglo temporal vacío
  let datos = [];
  //Itere en el arreglo tiempoArr para filtrar los valores de temperaturaArr que sean igual con la fecha actual
  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const temperatura = temperaturaArr[index]

    if (tiempo.includes(actual)) {
      datos.push(temperatura)
    }
  }
  //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
  let max = Math.max(...datos); // Extender elementos de los arreglos. los desempaqueta a cada elemento
  let min = Math.min(...datos);
  let sum = datos.reduce((a, b) => a + b, 0); // Aplicar la misma propiedad de 2 en 2
  let prom = (sum / datos.length) || 0; // si abajo es 0 se utiliza 0

  //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
  let temperaturaMinValue = document.getElementById("temperaturaMinValue");
  let temperaturaPromValue = document.getElementById("temperaturaPromValue");
  let temperaturaMaxValue = document.getElementById("temperaturaMaxValue");
  //Actualice los elementos HTML con los valores correspondientes
  temperaturaMinValue.textContent = `Min ${min} [°C]`;
  temperaturaPromValue.textContent = `Prom ${Math.round(prom * 100) / 100} [°C]`;
  temperaturaMaxValue.textContent = `Max ${max} [°C]`;
}


let cargarFechaActual = () => {
  //Obtenga la referencia al elemento h6
  let coleccionHTML = document.getElementsByTagName("h6")
  let tituloH6 = coleccionHTML[0]
  //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
  tituloH6.textContent = fechaActual()
}
let cargarOpenMeteo = () => {

  //URL que responde con la respuesta a cargar
  let URL_TEMPERATURA = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m&timezone=auto&forecast_days=1';
  let URL_HUMEDAD = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=relativehumidity_2m&timezone=auto&past_days=1';
  fetch(URL_TEMPERATURA)
    .then(responseText => responseText.json())
    .then(responseJSON => {

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot1');

      // Filtrar datos de temperatura cada 3 horas
      let labels = [];
      let data = [];

      responseJSON.hourly.time.forEach((hourlyData, index) => {
        if (index % 3 === 0) {
          labels.push(hourlyData);
          data.push(responseJSON.hourly.temperature_2m[index]);
        }
      });
      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperatura cada 3 horas',
              data: data,
              fill: false,
              borderColor: 'rgb(255, 159, 64, 0.3)',
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderWidth: 1,
              pointRadius: 5,
              pointBorderColor: 'rgb(0, 0, 0)'
            }
          ]
        },
        plugins: {
          legend: {
            labels: {
              responsive: true,
              usePointStyle: true,
              maintainAspectRatio: true,
              text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
            },
          }
        }
      };

      //Objeto con la instanciación del gráfico
      let chart1 = new Chart(plotRef, config);

    })
    .catch(console.error);

  fetch(URL_HUMEDAD)
    .then(responseText => responseText.json())
    .then(responseJSON => {

      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot2');

      // Filtrar datos de temperatura cada 3 horas
      let labels = [];
      let data = [];

      responseJSON.hourly.time.forEach((hourlyData, index) => {
        if (index % 2 === 0 && index < 24) {
          labels.push(hourlyData);
          data.push(responseJSON.hourly.relativehumidity_2m[index]);

        }
      });

      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Humedad relativa cada 2 horas',
              data: data,
              fill: false,
              borderColor: 'rgb(54, 162, 235, 0.3)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderWidth: 1,
              pointRadius: 5,
              pointBorderColor: 'rgb(0, 0, 0)'
            }
          ]
        },
        plugins: {
          legend: {
            labels: {
              responsive: true,
              usePointStyle: true,
              maintainAspectRatio: true,
              text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
            },
          }
        }
      };

      //Objeto con la instanciación del gráfico
      let chart2 = new Chart(plotRef, config);

    })
    .catch(console.error);

}

let parseXML = (responseText) => {

  // Parsing XML
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");

  // Referencia al elemento `#forecastbody` del documento HTML

  let forecastElement = document.querySelector("#forecastbody")
  forecastElement.innerHTML = ''

  // Procesamiento de los elementos con etiqueta `<time>` del objeto xml
  let timeArr = xml.querySelectorAll("time")

  timeArr.forEach(time => {

    let from = time.getAttribute("from").replace("T", " ")

    let humidity = time.querySelector("humidity").getAttribute("value")
    let windSpeed = time.querySelector("windSpeed").getAttribute("mps")
    let precipitation = time.querySelector("precipitation").getAttribute("probability")
    let pressure = time.querySelector("pressure").getAttribute("value")
    let cloud = time.querySelector("clouds").getAttribute("all")

    let template = `
            <tr>
                <td>${from}</td>
                <td>${humidity}</td>
                <td>${windSpeed}</td>
                <td>${precipitation}</td>
                <td>${pressure}</td>
                <td>${cloud}</td>
            </tr>
        `

    //Renderizando la plantilla en el elemento HTML
    forecastElement.innerHTML += template;
  })

}

//Callback
let selectListener = async (event) => {

  let selectedCity = event.target.value
  console.log(selectedCity);

  let cityStorage = localStorage.getItem(selectedCity);

  if (cityStorage == null) {
    try {
      //API key
      let APIkey = '669e7b4da00cacb750064fb180f05be0'
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${APIkey}`

      let response = await fetch(url)
      let responseText = await response.text()

      await parseXML(responseText)
      // Guarde la entrada de almacenamiento local
      await localStorage.setItem(selectedCity, responseText)

    } catch (error) {
      console.log(error)
    }

  } else {
    // Procese un valor previo
    parseXML(cityStorage)
  }

}

let loadForecastByCity = () => {

  //Handling event
  let selectElement = document.querySelector("select")
  selectElement.addEventListener("change", selectListener)

}
let loadExternalTable = async () => {

  //Requerimiento asíncrono
  let proxyURL = 'https://cors-anywhere.herokuapp.com/'
  let endpoint = proxyURL + 'https://www.gestionderiesgos.gob.ec/monitoreo-de-inundaciones'


  try {

    const elementoDOM = new DOMParser();
    let response = await fetch(endpoint)
    let responseText = await response.text()
    const xml = elementoDOM.parseFromString(responseText, "text/html");

    console.log(xml)

    let selectElement = xml.querySelector("#postcontent table")

    console.log(selectElement)
    let monitoreo = document.querySelector("#monitoreo")
    monitoreo.innerHTML = ''
    monitoreo.innerHTML = selectElement.outerHTML;

  } catch (error) {
    console.log(error)
  }

}

loadExternalTable()
setInterval(loadForecastByCity, intervaloActualizacion);

loadForecastByCity();
cargarPrecipitacion();
cargarTemperatura();
cargarUV();
cargarFechaActual();
cargarOpenMeteo();