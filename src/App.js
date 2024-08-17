import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMSearch } from 'react-icons/io'
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsSearch } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { ImSpinner } from 'react-icons/im'


//api Key
const APIkey = 'd7a9ebbf7991f925832edb2204435485'

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Nairobi');
  const [inputValue, setInputValue] = useState('')
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    console.log(inputValue)
    // if input value is not empty
    if (inputValue !== '') {
      // set location
      setLocation(inputValue)
    }

    //if input is empty
    if (input.value === '') {
      setAnimate(true)

      setTimeout(() => {
        setAnimate(false)
      }, 500)
    }

    // select input
    const input = document.querySelector('input')

    // clear input
    input.value = ''
    //prevent defaults
    e.preventDefault()
  }

  useEffect(() => {
    // set loading true
    setLoading(true)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);

        // set loading false
        // setLoading(fa1se);
      }, 1500);
    })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      })
  }, [location])

  // err msg 
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000);
    // clear timer
    return () => clearTimeout(timer);
  })

  if (!data) {
    return (
      <div className='w-full h-screen bg-gradientBg bgnore bg-cover bgce flex flex-col justify-center items-center'>
        <div>
          <ImSpinner className="text-5xl animate-spin text-white" />
        </div>
      </div>
    )
  }

  let icon
  //icon according to weather

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      case 'Rain':
        icon = <IoMdRainy className='text-[#31cafb]' />
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]' />
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]' />
    case 'Snow':
      icon = <IoMdSnow className='text-white' />
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break
  }

  // date
  const date = new Date()

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {errorMsg &&
        <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'>
          {`${errorMsg.response.data.message}`}
        </div>}
      {/* form */}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full'
            type='text' placeholder='Search by city or country' />
          <button
            onClick={(e) => handleSubmit(e)}
            className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'>
            {/* <IoMdSearch /> */}
            <BsSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      {/* card */}
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] shadow-xl rounded-[32px] py-12 px-6' >
        {loading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner className='text-white text-5xl animate-spin' />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className='flex items-center gap-x-5'>
              {/* icon bg-pink-100/30  */}
              <div className='text-[87px]'>{icon}</div>
              <div>

                {/* country name */}
                <div className='text-2xl font-semibold'>
                  {data.name}, {data.sys.country}
                </div>
                {/* date */}
                <div>{
                  date.getUTCDate()} / {date.getUTCMonth() + 1} / {date.getUTCFullYear()}
                </div>
              </div>
            </div>

            {/* card body */}
            <div className='my-20'>
              <div className='flex justify-center'>
                {/* temp */}
                <div className='text-[144px] leading-none font-light'>
                  {parseInt(data.main.temp)}
                </div>
                {/* celcius icon*/}
                <div className='text-5xl'>
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather desc */}
              <div className='capitalize text-center'>{data.weather[0].description}</div>
            </div>

            {/* card bottom */}
            <div className='max-w-[378] mx-auto flex flex-col gap-y-6'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsEye />
                  </div>
                  <div>
                    Visibility{' '} <span className='ml-2'>{data.visibility / 1000} km </span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsThermometer />
                  </div>
                  <div className='flex'>
                    Feels like <div className='flex ml-2'>{parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsWater />
                  </div>
                  <div>
                    Humidity <span className='ml-2'>{data.main.humidity} %</span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsWind />
                  </div>
                  <div className=''>
                    Wind <span className='ml-2'>{data.wind.speed} m/s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        )}

      </div>
    </div>
  )

}


export default App;
