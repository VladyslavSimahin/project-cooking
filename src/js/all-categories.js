import axios from 'axios';
import { fetchCategories } from './API-categories.js';

const API_URL = 'https://tasty-treats-backend.p.goit.global/api';
const allCategoriesList = document.querySelector('.all-categories-list');
const allCategoriesButton = document.querySelector('.all-categories-button');
const allCategoriesButtons = document.querySelectorAll('.all-categories-item-button');

let activeCategory = null;

async function handleClickedCategories(event) {
  const target = event.target;

  if (target.classList.contains('all-categories-item-button')) {
    const activeButton = document.querySelector('.all-categories-item-button.is-active');

    if (activeButton) {
      activeButton.classList.remove('is-active');
    }

    if (activeCategory === target.innerText) {
      activeCategory = null;
    } else {
      target.classList.add('is-active');
      activeCategory = target.innerText;
    }

    allCategoriesButton.classList.remove('is-active');
    await fetchRecipes(activeCategory);
  }
}

async function handleClickedAllCategories(event) {
  allCategoriesButtons.forEach(button => {
    if (button !== allCategoriesButton) {
      button.classList.remove('is-active');
    }
  });

  activeCategory = null;
  allCategoriesButton.classList.add('is-active');
  await fetchRecipes(activeCategory);
}

async function fetchRecipes(category) {
  try {
    let url = `${API_URL}/recipes`;

    if (category) {
      url += `?category=${category}`;
    }

    const response = await axios.get(url);
    const recipes = response.data;

    console.log(recipes);

 
    const activeButton = document.querySelector('.all-categories-item-button.is-active');
    if (activeButton) {
      activeButton.classList.remove('is-active');
    }
    if (activeCategory === null) {
      allCategoriesButton.classList.add('is-active');
    }
  } catch (error) {
    console.error('ERROR', error);
  }
}

async function markupAllCategoriesListItem() {
  const categories = await fetchCategories();

  const allCategoriesListItem = categories
    .map(category => {
      return `<li class="all-categories-item">
                <button class="all-categories-item-button"
                  type="button">${category}
                </button>
              </li>`;
    })
    .join('');

  allCategoriesList.insertAdjacentHTML('afterbegin', allCategoriesListItem);
}

markupAllCategoriesListItem();
allCategoriesList.addEventListener('click', handleClickedCategories);
allCategoriesButton.addEventListener('click', handleClickedAllCategories);
