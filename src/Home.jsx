import React from "react";
import "./index.css";
import { useState } from "react";
import axios from "axios";



function Home() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState({
    main: "climate",
    celcius: 20,
    name: "city name",
    humidity: 45,
    speed: 45,
    image: ''
  });

  
 
  const accessData = () => {
    if (name !== ""){
      axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7d8dd00a70a31c1eb39cb9860f3db49f&units=metric`
    )
    .then((response) => {
      
      // Handle the response data

      const wthrData = response.data;
      console.log(wthrData);

      const weatherArray = wthrData.weather
      console.log(weatherArray[0])


        let climate = weatherArray[0].main;
        let imagePath = '';
    
        if (climate === 'Clear'){
          imagePath = "../images/clear.png"
        } else if(climate === 'Clouds'){
          imagePath = "../images/clouds.png"
        }else if(climate === 'Rain'){
          imagePath = "../images/rain.png"
        }else if(climate === 'Drizzle'){
            imagePath = "../images/drizzle.png"
        }else if(climate === 'Mist'){
          imagePath = "../images/mist.png"
        }else if(climate === 'Haze'){
          imagePath = "../images/haze.png"
        }else if(climate === 'Snow'){
          imagePath = "../images/snow.png"
        }  
         
      setData({
        ...wthrData,
        main: weatherArray[0].main,
        celcius: wthrData.main.temp,
        name: wthrData.name,
        humidity: wthrData.main.humidity,
        speed: wthrData.wind.speed,
        image: imagePath
      });
      setError('');
    })
    .catch((error) => {
       if (error.response.status === 404){
        setError("Invalid city name")
       }else {
          setError('')
       }
      console.error(error);
    });
    }
    else{
      alert("Please enter city name")
      // setError('Please enter city name')
    }
  }
  
  return (
    
      <div className="  bg-black bg-opacity-70 md:max-h-full md:max-w-max  md:p-5 p-2 rounded-md">
        <div className="flex flex-row items-center justify-center px-2 md:px-5 mt-5 md:mt-5">
          <input
            type="text"
            placeholder="Enter the city name"
            className="appearance-none border-transparent w-[70%] md:w-80 px-3 py-2  bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-0 rounded-lg"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <button className=" items-center" onClick={accessData}>
            <img
              src="../images/searchIn.png"
              alt=""
              className=" ml-5 rounded-full md:h-10 h-6 hover:cursor-pointer hover:scale-125"
            />
          </button>
        </div>
       
        <div className=" text-yellow-300 text-md font-medium flex">
          <p>{error}</p>
        </div>

        <div className="flex flex-col justify-center items-center md:py-3 md:mt-5 mt-2 ">
          <img src={data.image} alt="" className="md:h-40 h-20 " />
          <p className="text-white font-sans text-xl md:text-2xl font-thin italic">
            {data.main}
          </p>
          <p className="text-white font-sans text-2xl md:text-3xl font-semibold mt-3"> {data.celcius.toFixed(2)}° C</p>
          <p className="text-white font-mono text-3xl md:text-4xl font-semibold md:font-bold uppercase mt-3">{data.name}</p>
        </div>

        <div className="flex flex-row px-5 py-3">
          <div className="flex flex-row items-center justify-center px-2 md:px-5">
            <img src="../images/humidity.png" alt="" className="h-7 md:h-14" />
            <div className="flex flex-col py-5 ml-3">
              <p className="text-white font-sans text-sm md:text-xl">{data.humidity}%</p>
              <p className="text-white font-serif text-sm md:text-xl font-medium">
                Humidity
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center px-2 md:px-5 ml-3">
            <img src="../images/wind.png" alt="" className=" h-7  md:h-14" />
            <div className="flex flex-col py-5 ml-3">
              <p className="text-white font-sans text-sm md:text-xl">{data.speed.toFixed(2)} km/h</p>
              <p className="text-white font-serif text-sm md:text-xl font-medium">
                Wind speed
              </p>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Home;
