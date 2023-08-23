import { useState } from "react"

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = '57c5ce185c08b39524ba75137b5d677a'
    const difkelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const heandleCambioCiudad = (e) =>{
        setCiudad(e.target.value)
    }
    const handlesubmit = (e) =>{
      e.preventDefault()
      if (ciudad.length > 0) fetchclima()
      
    }

    const fetchclima = async () =>{
        try{
          const response = await fetch (`${urlBase}?q=${ciudad}&appid=${apiKey}`)
          const data = await response.json()
          setDataClima(data)
        }catch(error){
            console.error('Ocurrio el siguiente problema: ',error)

        }
    }

  return (
    <div className="container">
        <h1>Aplicación de Clima</h1>
        <form onSubmit={handlesubmit}>
            <input type="text" 
            value={ciudad}
            onChange={heandleCambioCiudad}
            
            />

            <button type="submit">Buscar</button>
        </form>
        {
            dataClima && (
                <div>
                    <div className="ciudad-div">
               <h2>{dataClima.name}</h2>
               <p>Temperatura: {parseInt(dataClima?.main?.temp - difkelvin)}°C</p>
               <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
               <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
               </div>
               <div className="col">
                <div className="humedad">
                <i className="fa-solid fa-water"></i>
                    <p>Humedad</p>
                    <p>{dataClima.main.humidity}</p>
                </div>
                <div className="viento">
                <i className="fa-solid fa-wind"></i>
                <p>Viento</p>
                <p>{dataClima.wind.speed} Kh/h</p>
                </div>
                <div className="sensacion">
                <i className="fa-solid fa-thermometer"></i>
                <p>Sensación </p>
                <p>térmica</p>
                <p>{parseInt(dataClima?.main?.feels_like - difkelvin)}°C</p>
                </div>
               </div>

                </div>
            
            )
                
        }

    </div>
  )
}
