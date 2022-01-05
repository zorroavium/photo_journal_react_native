import moment from 'moment-mini';

const WEATHER_API_KEY = '82f86f8855eeda9332684d7cc04d50d2';

export const IMAGE_ENTRY_KEY =  `${moment().format('MM-DD-YYYY')}.jpg`;

 export const IMAGE_URI = (image) => `file://${image + '?random=' + new Date()}`;

export const BASE_URL_LOCATION = (lat, lon) =>
  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&addressdetails=1&format=json`;
export const BASE_WEATHER_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,hourly,minutely&units=metric&appid=${WEATHER_API_KEY}`;
