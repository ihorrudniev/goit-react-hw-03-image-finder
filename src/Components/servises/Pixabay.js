const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23243839-9e0dbc2f727b7d3ca19c2cc88';

const fetchImages = async (searchItem, page) => {
  const rawResult = await fetch(
    `${BASE_URL}?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );

  if (!rawResult.ok) {
    throw rawResult;
  }

  const result = await rawResult.json();

  return result;
};

export default fetchImages;
