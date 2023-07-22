export const fetchCategories = async () => {
  const API_URL = 'https://tasty-treats-backend.p.goit.global/api';

  try {
    const response = await fetch(`${API_URL}/categories`);
    const apiData = await response.json();
    const categories = apiData.map(category => category.name);

    return categories;
  } catch (error) {
    console.error('ERROR', error);
    return [];
  }
};
