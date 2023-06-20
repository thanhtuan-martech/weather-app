import React, {useState, useEffect} from 'react';
import Loading from './components/Loading';
import './App.css';

const api ={
  key: "b25e2b36f193c8b08ebb581794621182",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            <>
              <div className='city'>{data.name}, {data.sys.country}</div>
              <div className='temp'>{data.main.temp}°C</div>
              <div className='weather'>{data.weather[0].description}</div>
            </>
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message)
        }
      } catch (error) {
        setErrorMessage(error.message)
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity])

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  }
  
  return (
    <>
    <div className='card'>
      <form className='search' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='City'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className='btn-search'>Search</button>
      </form>
      {loading ? (
        <Loading />
        ) : (
        <>
        {errorMessage ? (<div className='error'>{errorMessage}</div>) : (<div> {weatherInfo} </div>) }
        </>
        )
      }
    </div>
      

      </>
  );
}

export default App;
