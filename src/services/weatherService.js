import axios from "axios";
import { API_KEY } from "../utils/constants";

export const fetchWeather = async (city) => {
  console.log(city)
  try {
    const response = await axios.get(`https://open-weather13.p.rapidapi.com/city/${city}/EN`, {
      headers: {
        "Accept" : "application/json",
        "Content-Type":'Application/json',
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      }
    });
    console.log(JSON.stringify(response))
    return {data:response.data,message:response?.message};
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message)
      return {data:"",message:error.response.data.message};
    }else {
      return {data:"",message:error?.message}
    }
    }
  }

