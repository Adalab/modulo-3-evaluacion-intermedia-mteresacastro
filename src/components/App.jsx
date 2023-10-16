//imports dependencias, imagenes, componentes, stylos
import { useEffect, useState } from 'react';
import '../styles/App.scss'


function App() {
  
  const [infoCountries, setInfoCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [continents, setContinents] = useState('TodosAll');
   /*const [newCountry, setNewCountry] = useState({
    name: '',
    capital:'' ,
    flag:'' ,
    continents:'' ,
    cca2:'',
  });
  const [errorMessage, seterrorMessage] = useState('hidden');*/

  

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,flag,continents")
      .then((response) => response.json())
      .then((response) => {
        const dataApi = response.map((country) =>({
          name: country.name.common,
          capital: country.capital[0],
          flag: country.flag,
          continents: country.continents[0],
          //cca2: country.cca2,
        }));
        console.log(dataApi[0].cca2);
        setInfoCountries(dataApi)
      })
  }, [])
//funciones, variables, handles, 
 
const handleInputSearch = (ev) => {
  setSearch(ev.target.value)
}

const handleForm = (ev) => {
  ev.preventDefault()
}

const renderCountries = () => {
  return infoCountries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())) 

 
    .map((country, i) =>
    (<li className="country_li" key={i}>
      <i>{country.flag}</i>
      <p>{country.name}</p>
      <p>{country.capital}</p>
      <p>{country.continents}</p>
    </li>))
}
//html
  return (
    <>
    <header>
      <h1> Country Info App</h1>
      <p>Explore information about countries, capitals and flags. Add new countries and filter througth the list!</p>
    </header>
    <main>
      <form onSubmit={handleForm}>
        <fieldset>
          <legend>Filters</legend>
          <label htmlFor="byCountry">By Country</label>
          <input onChange={handleInputSearch} id="byCountry" type="text" placeholder="Spain..." />
          <label htmlFor="byContinent">By Cotinent</label>
          <select id="byContinent" name="byContinent" onChange={handleInputSearch}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Add Country</legend>
          <input id= "name" type="text" placeholder="Country name" />
          <input id= "capital" type="text" placeholder="Capital" />
          <input id= "flag" type="text" placeholder="Flag icon"  />
          <input id= "continents" type="text" placeholder="Continent" />
          <button>Add Country</button>
        </fieldset>
      </form>
      <ul className="ulCountries">
        {renderCountries()}
      </ul>
    </main>
    </>
  )
}

export default App
