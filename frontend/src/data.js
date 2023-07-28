const recipes = [
  {
    id: 1,
    recipe_name: "Scrambled Eggs",
    image_url:
      "https://firebasestorage.googleapis.com/v0/b/recipe-sharing-website-1c5b5.appspot.com/o/uploads%2F1689947782005-faluda.jpg?alt=media&token=620322a5-3086-4f0d-9e19-610a61177145",
    summary: "Classic scrambled eggs for a quick breakfast.",
    ingredients: ["2 eggs", "2 tbsp milk", "Salt", "Pepper", "1 tbsp butter"],
    method: [
      "Crack the eggs into a bowl. Add milk, salt, and pepper.",
      "Whisk the mixture until well combined.",
      "Heat butter in a non-stick skillet over medium heat.",
      "Pour the egg mixture into the skillet and let it cook without stirring for a few seconds.",
      "Gently stir the eggs with a spatula until they reach your desired consistency.",
      "Remove from heat and serve hot.",
    ],
    rating: 4.3,
  },
  {
    id: 1,
    recipe_name: "Scrambled Eggs",
    image_url:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg",
    summary: "Classic scrambled eggs for a quick breakfast.",
    ingredients: ["2 eggs", "2 tbsp milk", "Salt", "Pepper", "1 tbsp butter"],
    method: [
      "Crack the eggs into a bowl. Add milk, salt, and pepper.",
      "Whisk the mixture until well combined.",
      "Heat butter in a non-stick skillet over medium heat.",
      "Pour the egg mixture into the skillet and let it cook without stirring for a few seconds.",
      "Gently stir the eggs with a spatula until they reach your desired consistency.",
      "Remove from heat and serve hot.",
    ],
    rating: 4.3,
  },
  {
    id: 1,
    recipe_name: "Scrambled Eggs",
    image_url:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg",
    summary: "Classic scrambled eggs for a quick breakfast.",
    ingredients: ["2 eggs", "2 tbsp milk", "Salt", "Pepper", "1 tbsp butter"],
    method: [
      "Crack the eggs into a bowl. Add milk, salt, and pepper.",
      "Whisk the mixture until well combined.",
      "Heat butter in a non-stick skillet over medium heat.",
      "Pour the egg mixture into the skillet and let it cook without stirring for a few seconds.",
      "Gently stir the eggs with a spatula until they reach your desired consistency.",
      "Remove from heat and serve hot.",
    ],
    rating: 4.3,
  },
  {
    id: 1,
    recipe_name: "Scrambled Eggs",
    image_url:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg",
    summary: "Classic scrambled eggs for a quick breakfast.",
    ingredients: ["2 eggs", "2 tbsp milk", "Salt", "Pepper", "1 tbsp butter"],
    method: [
      "Crack the eggs into a bowl. Add milk, salt, and pepper.",
      "Whisk the mixture until well combined.",
      "Heat butter in a non-stick skillet over medium heat.",
      "Pour the egg mixture into the skillet and let it cook without stirring for a few seconds.",
      "Gently stir the eggs with a spatula until they reach your desired consistency.",
      "Remove from heat and serve hot.",
    ],
    rating: 4.3,
  },
];
const comments = [
  {
    name: "John",
    date: "May 05, 2023",
    comment: "This is a great product!",
  },
  {
    name: "Alice",
    date: "May 05, 2023",
    comment: "I had a wonderful experience.",
  },
  {
    name: "Bob",
    date: "May 05, 2023",
    comment: "Could be improved in some areas.",
  },
];

const recipePage =   {
  id: 1,
  recipe_name: "Scrambled Eggs",
  by: "Riya Dhiman",
  updated:"May 05, 2023",
  image_url:
  "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg",
  summary: "Classic scrambled eggs for a quick breakfast.",
  ingredients: ["2 eggs", "2 tbsp milk", "Salt", "Pepper", "1 tbsp butter"],
  method: "1. Crack the eggs into a bowl. Add milk, salt, and pepper.\n2. Whisk the mixture until well combined.\n3. Heat butter in a non-stick skillet over medium heat.\n4. Pour the egg mixture into the skillet and let it cook without stirring for a few seconds.\n5. Gently stir the eggs with a spatula until they reach your desired consistency.\n6. Remove from heat and serve hot.",
  rating: 4.3,
  comments: comments
};

const popular_recipes = [
  '64bb7acf9ccf076dfeb8aa9e',
  '64bb80dc9ccf076dfeb8aab6',
  '64bb93359ccf076dfeb8aaf2',
  '64bb8a759ccf076dfeb8aad4'
]

const categories = [
  'Recipes',
  'Quick & Easy',
  'Holidays & Seasons'
]

const subCategories = {
  'Recipes' : [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snacks',
    'Desserts',
    'Beverages',
    'Baking & Pastry',
  ],
  'Quick & Easy' : [
    '30-Minute Meals',
    'One-Pot Recipes',
    'No-Bake Desserts',
    '5-Ingredient Recipes',
    'Microwave Recipes'
  ],
  'Holidays & Seasons' : [
    'Christmas Specials',
    'Eid Specials',
    'Diwali Specials',
    'Holi Specials',
    'Summer Grilling',
    'Spring Delights'
  ]
}

export {recipes, recipePage, categories, subCategories, popular_recipes};
