
import { useState } from 'react';
import "./App.css";

function App() {
  const[city,setCity]=useState("")
  const[weather,setWeather]=useState(null)
  const[loading,setLoading]=useState(false)
  const apiKey="f8fb463bd3a946b4a1c213123243108"
  const fetchApi=()=>{
    if (!city) return;
    setLoading(true)
   
  const url=  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  console.log(url)
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  })
  .then(data => {
    setWeather(data);
  })
    .catch(error=>{
      console.log("error fetching data", error)
      alert("Failed to fetch weather data")
    })
    .finally(()=>{
   setLoading(false)
  })
  }
  
 
  const handleChange=(e)=>{
   setCity(e.target.value)
  }
  return (

    <>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:"10px"}}>
    <input type="text" value={city} onChange={handleChange}></input>
    <button style={{backgroundColor:"green"}} onClick={fetchApi}>Search</button>
    </div>
    {loading && <p>Loading data...</p>}
    {weather&&(
      <div className='weather-cards'>
      <div className='weather-card'>
        <p>Temperature: {weather.current.temp_c} °C</p>
      </div>
      <div className='weather-card'>
        <p>Humidity: {weather.current.humidity}</p>
      </div>
      <div className='weather-card'>
        <p>Condition: {weather.current.condition.text}</p>
      </div>
      <div className='weather-card'>
        <p>Wind speed: {weather.current.wind_kph} km/h</p>
      </div>
    </div>
      
    )}
    </>
  )
}
  

export default App;
   