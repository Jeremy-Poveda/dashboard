import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';



let fechaActual = () => new Date().toISOString().slice(0,10);

let cargarPrecipitacion = () => {

    //Obtenga la función fechaActual
    let actual = fechaActual();
    //Defina un arreglo temporal vacío
    let datos = [];
    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = precipitacionArr[index]
    
        if(tiempo.includes(actual)) {
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
    precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`;
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
    
        if(tiempo.includes(actual)) {
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
    uvPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [--]`;
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
    
        if(tiempo.includes(actual)) {
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
    temperaturaPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [°C]`;
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
    fetch( URL_TEMPERATURA )
      .then(responseText => responseText.json())
      .then(responseJSON => {
        
        console.log(responseJSON);
        
        //Respuesta en formato JSON

        //Referencia al elemento con el identificador plot
        let plotRef = document.getElementById('plot1');

        //Etiquetas del gráfico
        let labels = responseJSON.hourly.time;

        //Etiquetas de los datos
        let data = responseJSON.hourly.temperature_2m;

        //Objeto de configuración del gráfico
        let config = {
          type: 'line',
          data: {
            labels: labels, 
            datasets: [
              {
                label: 'Temperatura',
                data: data,
                fill: false,
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderWidth: 1,
                pointStyle: 'rectRot',
                pointRadius: 5,
                pointBorderColor: 'rgb(0, 0, 0)'
              }
            ]
          },
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
            }
          }
        };

        //Objeto con la instanciación del gráfico
        let chart1  = new Chart(plotRef, config);

    })
    .catch(console.error);

    fetch( URL_HUMEDAD )
    .then(responseText => responseText.json())
    .then(responseJSON => {
      console.log(responseJSON);
        
      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot2');

      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;

      //Etiquetas de los datos
      let data = responseJSON.hourly.relativehumidity_2m;

      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels, 
          datasets: [
            {
              label: 'Humedad relativa',
              data: data,
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderWidth: 1,
              pointStyle: 'rectRot',
              pointRadius: 5,
              pointBorderColor: 'rgb(0, 0, 0)'
            }
          ]},
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
            }
          }
        };

        //Objeto con la instanciación del gráfico
        let chart2  = new Chart(plotRef, config);

      })
      .catch(console.error);
  
  }
  
 
  cargarPrecipitacion();
  cargarTemperatura();
  cargarUV();
  cargarFechaActual();
  cargarOpenMeteo();
  