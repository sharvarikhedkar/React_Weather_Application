import React, {useState} from 'react';
import './App.css';

const api = {
  key:"1eba10cda9c822c547e212ee871facfe",
  base:"https://api.openweathermap.org/data/2.5/"
}


function App() {  

  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }
  
  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") 
      ? ((weather.main.temp > 22) 
        ? 'app warm' 
        : 'app') 
      : 'app'}>
      
      <main>
        <div className="search-box">
          
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter City Name to get temperature" 
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}/>
        
        </div>

        {(typeof weather.main != "undefined") ? (
        <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">

              <div className="temp">
                {Math.round(weather.main.temp)} ° C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
              
            </div>
        </div>
        ) :('')} 

      </main>
    </div>
  );
}

export default App;
