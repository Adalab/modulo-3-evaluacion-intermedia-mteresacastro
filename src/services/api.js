// Fichero src/services/api.js
const callToApi = () => {
    // Llamamos a la API
    return fetch('https://restcountries.com/v3.1/all') 
      .then((response) => response.json())
      .then((dataApi) => {
        // Cuando responde la API podemos limpiar los datos aquí
        const dataApi = {
          name: response.name,
          capital: response.capital,
          flag: response.flag,
          continents: response.continents,
          cca2: response.cca2,
        };
        return dataApi;
      });
  };
  
  export default callToApi;