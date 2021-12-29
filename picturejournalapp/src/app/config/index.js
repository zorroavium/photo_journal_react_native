export const BASE_URL = 'https://example-data.draftbit.com/books?_limit=10';
export const BASE_URL_LOCATION = (lat, lon) =>
  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&addressdetails=1&format=json`;
