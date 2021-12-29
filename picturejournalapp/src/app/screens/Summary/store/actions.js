export const GET_WEATHER_INFO = 'GET_WEATHER_INFO';

export const getWeatherInfo = location => ({
  type: GET_WEATHER_INFO,
  payload: {location},
});
