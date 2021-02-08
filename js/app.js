// Search button trigger
const searchMeal = () => {
  const searchText = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(res => res.json())
    .then(data => {
      displayMeal(data);
    })
    .catch(error => {
      mealError();
    })
}


// Display all searched meal
const displayMeal = mealData => {
  const searchResultContainer = document.getElementById('search-result');
  const mealDetails = document.getElementById('meal-detail');

  if (searchResultContainer.hasChildNodes()) {
    searchResultContainer.innerHTML = '';
  }

  if (mealDetails.hasChildNodes()) {
    mealDetails.innerHTML = '';
  }

  if (mealData.meals === null) {
    const searchError = document.getElementById('search-error');
    searchError.style.display = 'block';
  } else {
    const searchError = document.getElementById('search-error');
    searchError.style.display = 'none';
    const totalMeal = mealData.meals;
    totalMeal.forEach(meal => {
      const mealName = meal.strMeal;
      const mealThumb = meal.strMealThumb;
      const searchItem = document.createElement('div');
      searchItem.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
      searchItem.innerHTML = `
        <div class = "card border-0 shadow rounded-3" onclick = "callMealDetails('${mealName}');">
          <img src="${mealThumb}" class="card-img-top">
          <div class="card-body bg-light text-center text-capitalize">
            <h5 class="card-title">${mealName}</h5>
          </div>
        </div>
      `;
      searchResultContainer.appendChild(searchItem);
    })
  }
  document.getElementById('search-input').value = '';
}


// If any error occur while parsing data
const mealError = () => {
  const searchError = document.getElementById('search-error');
  searchError.style.display = 'block';
}


// Calling for meal details
const callMealDetails = meal => {
  const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
  fetch(mealUrl)
    .then(res => res.json())
    .then(data => {
      displayMealDetails(data.meals[0])
    })
}


// Display meal details on the top
const displayMealDetails = meal => {
  const mealName = meal.strMeal;
  const mealThumb = meal.strMealThumb;

  // All Ingredient value
  const ingredient1 = meal.strIngredient1;
  const ingredient2 = meal.strIngredient2;
  const ingredient3 = meal.strIngredient3;
  const ingredient4 = meal.strIngredient4;
  const ingredient5 = meal.strIngredient5;
  const ingredient6 = meal.strIngredient6;
  const ingredient7 = meal.strIngredient7;
  const ingredient8 = meal.strIngredient8;
  const ingredient9 = meal.strIngredient9;
  const ingredient10 = meal.strIngredient10;
  const ingredientList = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8, ingredient9, ingredient10];

  // All Measure value
  const measure1 = meal.strMeasure1;
  const measure2 = meal.strMeasure2;
  const measure3 = meal.strMeasure3;
  const measure4 = meal.strMeasure4;
  const measure5 = meal.strMeasure5;
  const measure6 = meal.strMeasure6;
  const measure7 = meal.strMeasure7;
  const measure8 = meal.strMeasure8;
  const measure9 = meal.strMeasure9;
  const measure10 = meal.strMeasure10;
  const measureList = [measure1, measure2, measure3, measure4, measure5, measure6, measure7, measure8, measure9, measure10];

  const mealDetails = document.getElementById('meal-detail');
  if (mealDetails.hasChildNodes()) {
    mealDetails.innerHTML = '';
  }
  const mealItem = document.createElement('div');
  mealItem.classList.add('col-lg-5', 'col-md-8');
  mealItem.innerHTML = `
    <div class="card border-0 shadow rounded-3">
      <img src="${mealThumb}" class="card-img-top">
      <div class="card-body">
        <h3 class="card-title mb-4">${mealName}</h3>
        <h5 class="card-title mb-3">Ingredients</h5>
        <ul id="mealIngredient">
          
        </ul>
      </div>
    </div>
  `;
  mealDetails.appendChild(mealItem);

  const mealIngredient = document.getElementById('mealIngredient');
  for (let i = 0; i < ingredientList.length; i++) {
    const ingredient = ingredientList[i];
    const measure = measureList[i];
    if (ingredient !== '') {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="img/check.svg"> <span>${measure} ${ingredient}</span>
      `;
      mealIngredient.appendChild(li);
    }
  }
}