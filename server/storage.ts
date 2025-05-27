import { 
  users, recipes, userProfiles, userIngredients, userFavorites, 
  mealPlans, cookingSessions, userAchievements,
  type User, type InsertUser, type Recipe, type InsertRecipe,
  type UserProfile, type InsertUserProfile, type UserIngredient, type InsertUserIngredient,
  type UserFavorite, type InsertUserFavorite, type MealPlan, type InsertMealPlan,
  type CookingSession, type InsertCookingSession, type UserAchievement, type InsertUserAchievement
} from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // User profiles
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  // Recipes
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  getRecipesByIngredients(ingredients: string[], userId: number): Promise<Recipe[]>;
  getRecipesByDietaryRestrictions(restrictions: string[]): Promise<Recipe[]>;
  
  // User ingredients
  getUserIngredients(userId: number): Promise<UserIngredient[]>;
  addUserIngredient(ingredient: InsertUserIngredient): Promise<UserIngredient>;
  removeUserIngredient(userId: number, ingredient: string): Promise<boolean>;
  
  // Favorites
  getUserFavorites(userId: number): Promise<UserFavorite[]>;
  addUserFavorite(favorite: InsertUserFavorite): Promise<UserFavorite>;
  removeUserFavorite(userId: number, recipeId: number): Promise<boolean>;
  
  // Meal plans
  getUserMealPlan(userId: number, weekStart: string): Promise<MealPlan | undefined>;
  createMealPlan(mealPlan: InsertMealPlan): Promise<MealPlan>;
  updateMealPlan(userId: number, weekStart: string, meals: any): Promise<MealPlan | undefined>;
  
  // Cooking sessions
  createCookingSession(session: InsertCookingSession): Promise<CookingSession>;
  updateCookingSession(id: number, updates: Partial<InsertCookingSession>): Promise<CookingSession | undefined>;
  getUserCookingSessions(userId: number): Promise<CookingSession[]>;
  
  // Achievements
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  addUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProfiles: Map<number, UserProfile>;
  private recipes: Map<number, Recipe>;
  private userIngredients: Map<number, UserIngredient[]>;
  private userFavorites: Map<number, UserFavorite[]>;
  private mealPlans: Map<string, MealPlan>;
  private cookingSessions: Map<number, CookingSession>;
  private userAchievements: Map<number, UserAchievement[]>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.recipes = new Map();
    this.userIngredients = new Map();
    this.userFavorites = new Map();
    this.mealPlans = new Map();
    this.cookingSessions = new Map();
    this.userAchievements = new Map();
    this.currentId = 1;
    
    // Initialize with sample recipes
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleRecipes = [
      // Mediterranean Cuisine
      {
        name: 'Mediterranean Quinoa Bowl',
        cuisine: 'Mediterranean',
        time: 25,
        difficulty: 'easy',
        servings: 4,
        ingredients: ['quinoa', 'tomatoes', 'cucumber', 'feta cheese', 'olive oil', 'lemon', 'red onion'],
        instructions: [
          'Cook quinoa according to package directions',
          'Dice tomatoes, cucumber, and red onion',
          'Crumble feta cheese',
          'Mix olive oil and lemon juice for dressing',
          'Combine all ingredients and toss with dressing'
        ],
        nutrition: { calories: 320, protein: 12, carbs: 45, fat: 18 },
        rating: 48,
        tags: ['vegetarian', 'gluten-free', 'healthy'],
        tips: ['Use day-old quinoa for better texture', 'Add fresh herbs for extra flavor'],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Greek Chicken Souvlaki',
        cuisine: 'Mediterranean',
        time: 30,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['chicken breast', 'olive oil', 'lemon juice', 'oregano', 'garlic', 'pita bread', 'tzatziki'],
        instructions: [
          'Marinate chicken in olive oil, lemon, oregano, and garlic for 20 minutes',
          'Thread chicken onto skewers',
          'Grill for 12-15 minutes, turning occasionally',
          'Warm pita bread on grill',
          'Serve with tzatziki and vegetables'
        ],
        nutrition: { calories: 385, protein: 32, carbs: 28, fat: 16 },
        rating: 46,
        tags: ['protein-rich', 'grilled', 'dairy-free'],
        tips: ['Soak wooden skewers in water first', 'Don\'t overcook to keep chicken tender'],
        imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Hummus Power Bowl',
        cuisine: 'Mediterranean',
        time: 15,
        difficulty: 'easy',
        servings: 2,
        ingredients: ['hummus', 'chickpeas', 'cucumber', 'tomatoes', 'olives', 'spinach', 'tahini'],
        instructions: [
          'Spread hummus in bottom of bowl',
          'Arrange fresh vegetables on top',
          'Add roasted chickpeas',
          'Drizzle with tahini',
          'Season with za\'atar if available'
        ],
        nutrition: { calories: 290, protein: 14, carbs: 35, fat: 12 },
        rating: 44,
        tags: ['vegan', 'protein-rich', 'quick'],
        tips: ['Roast chickpeas for extra crunch', 'Add lemon juice for freshness'],
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // Asian Cuisine
      {
        name: 'Spicy Thai Basil Chicken',
        cuisine: 'Thai',
        time: 15,
        difficulty: 'medium',
        servings: 2,
        ingredients: ['chicken breast', 'thai basil', 'garlic', 'chili', 'fish sauce', 'soy sauce', 'rice'],
        instructions: [
          'Heat oil in wok over high heat',
          'Add minced garlic and chili',
          'Add chicken and stir-fry until cooked',
          'Add sauces and thai basil',
          'Serve over steamed rice'
        ],
        nutrition: { calories: 380, protein: 28, carbs: 35, fat: 12 },
        rating: 49,
        tags: ['spicy', 'quick', 'protein-rich'],
        tips: ['Use holy basil if available', 'High heat is essential for authentic flavor'],
        imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Teriyaki Salmon Bowl',
        cuisine: 'Japanese',
        time: 20,
        difficulty: 'easy',
        servings: 2,
        ingredients: ['salmon fillets', 'soy sauce', 'mirin', 'brown sugar', 'ginger', 'rice', 'broccoli'],
        instructions: [
          'Mix soy sauce, mirin, brown sugar for teriyaki',
          'Pan-fry salmon until cooked through',
          'Steam broccoli until tender',
          'Glaze salmon with teriyaki sauce',
          'Serve over rice with vegetables'
        ],
        nutrition: { calories: 420, protein: 35, carbs: 42, fat: 14 },
        rating: 47,
        tags: ['protein-rich', 'healthy', 'omega-3'],
        tips: ['Don\'t overcook salmon', 'Add sesame seeds for garnish'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Vegetable Pad Thai',
        cuisine: 'Thai',
        time: 25,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['rice noodles', 'tofu', 'bean sprouts', 'carrots', 'eggs', 'tamarind paste', 'fish sauce', 'palm sugar'],
        instructions: [
          'Soak rice noodles in warm water',
          'Scramble eggs and set aside',
          'Stir-fry tofu until golden',
          'Add noodles and sauce ingredients',
          'Toss with vegetables and eggs'
        ],
        nutrition: { calories: 340, protein: 16, carbs: 48, fat: 10 },
        rating: 45,
        tags: ['vegetarian', 'stir-fry', 'comfort-food'],
        tips: ['Don\'t over-soak noodles', 'Balance sweet, sour, and salty flavors'],
        imageUrl: 'https://images.unsplash.com/photo-1559847844-d7d5fb61b0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Korean Bibimbap',
        cuisine: 'Korean',
        time: 40,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['rice', 'beef', 'spinach', 'carrots', 'mushrooms', 'bean sprouts', 'gochujang', 'sesame oil'],
        instructions: [
          'Cook rice and keep warm',
          'Marinate and cook beef strips',
          'Blanch and season each vegetable separately',
          'Arrange over rice in bowl',
          'Top with fried egg and gochujang'
        ],
        nutrition: { calories: 450, protein: 24, carbs: 52, fat: 16 },
        rating: 48,
        tags: ['protein-rich', 'balanced', 'colorful'],
        tips: ['Each vegetable should be seasoned individually', 'Crispy rice bottom is traditional'],
        imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // Italian Cuisine
      {
        name: 'Creamy Mushroom Risotto',
        cuisine: 'Italian',
        time: 35,
        difficulty: 'hard',
        servings: 4,
        ingredients: ['arborio rice', 'mushrooms', 'vegetable broth', 'white wine', 'parmesan', 'onion', 'butter'],
        instructions: [
          'Sauté mushrooms until golden, set aside',
          'Cook onion until translucent',
          'Add rice and toast for 2 minutes',
          'Add wine and stir until absorbed',
          'Gradually add warm broth, stirring constantly',
          'Fold in mushrooms, butter, and parmesan'
        ],
        nutrition: { calories: 420, protein: 14, carbs: 52, fat: 16 },
        rating: 47,
        tags: ['vegetarian', 'comfort-food', 'creamy'],
        tips: ['Keep broth warm throughout cooking', 'Stir constantly for creamy texture'],
        imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Classic Margherita Pizza',
        cuisine: 'Italian',
        time: 45,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'basil', 'olive oil', 'garlic'],
        instructions: [
          'Preheat oven to 475°F',
          'Roll out pizza dough',
          'Spread thin layer of tomato sauce',
          'Add torn mozzarella pieces',
          'Bake for 12-15 minutes until golden',
          'Top with fresh basil and olive oil'
        ],
        nutrition: { calories: 380, protein: 18, carbs: 48, fat: 14 },
        rating: 46,
        tags: ['vegetarian', 'comfort-food', 'crowd-pleaser'],
        tips: ['Use fresh mozzarella for best results', 'Don\'t overload with sauce'],
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Spaghetti Carbonara',
        cuisine: 'Italian',
        time: 20,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['spaghetti', 'eggs', 'parmesan', 'pancetta', 'black pepper', 'garlic'],
        instructions: [
          'Cook spaghetti until al dente',
          'Crisp pancetta in large pan',
          'Whisk eggs with parmesan and pepper',
          'Toss hot pasta with pancetta',
          'Remove from heat, add egg mixture',
          'Toss quickly to create creamy sauce'
        ],
        nutrition: { calories: 520, protein: 22, carbs: 56, fat: 22 },
        rating: 49,
        tags: ['comfort-food', 'quick', 'protein-rich'],
        tips: ['Don\'t scramble the eggs', 'Work quickly when adding egg mixture'],
        imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8084282ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // Mexican Cuisine
      {
        name: 'Chicken Burrito Bowl',
        cuisine: 'Mexican',
        time: 30,
        difficulty: 'easy',
        servings: 4,
        ingredients: ['chicken breast', 'rice', 'black beans', 'corn', 'avocado', 'salsa', 'lime', 'cilantro'],
        instructions: [
          'Season and grill chicken breast',
          'Cook rice with cilantro and lime',
          'Warm black beans with cumin',
          'Slice chicken and avocado',
          'Assemble bowls with all ingredients',
          'Top with salsa and lime juice'
        ],
        nutrition: { calories: 425, protein: 32, carbs: 48, fat: 12 },
        rating: 47,
        tags: ['protein-rich', 'healthy', 'balanced'],
        tips: ['Let chicken rest before slicing', 'Add avocado just before serving'],
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Fish Tacos with Mango Salsa',
        cuisine: 'Mexican',
        time: 25,
        difficulty: 'easy',
        servings: 4,
        ingredients: ['white fish', 'corn tortillas', 'mango', 'red onion', 'cilantro', 'lime', 'cabbage', 'cumin'],
        instructions: [
          'Season fish with cumin and lime',
          'Dice mango and mix with onion, cilantro',
          'Grill or pan-fry fish until flaky',
          'Warm tortillas',
          'Assemble tacos with fish, cabbage, salsa',
          'Serve with lime wedges'
        ],
        nutrition: { calories: 310, protein: 25, carbs: 35, fat: 8 },
        rating: 45,
        tags: ['healthy', 'light', 'omega-3'],
        tips: ['Don\'t overcook the fish', 'Make salsa ahead for better flavor'],
        imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // Indian Cuisine
      {
        name: 'Chicken Tikka Masala',
        cuisine: 'Indian',
        time: 45,
        difficulty: 'medium',
        servings: 6,
        ingredients: ['chicken breast', 'yogurt', 'tomatoes', 'cream', 'garam masala', 'ginger', 'garlic', 'onion'],
        instructions: [
          'Marinate chicken in yogurt and spices',
          'Grill or broil chicken pieces',
          'Sauté onion, ginger, garlic',
          'Add tomatoes and spices, simmer',
          'Add cream and cooked chicken',
          'Simmer until sauce thickens'
        ],
        nutrition: { calories: 380, protein: 28, carbs: 12, fat: 24 },
        rating: 48,
        tags: ['protein-rich', 'comfort-food', 'spicy'],
        tips: ['Marinate chicken for at least 2 hours', 'Adjust spice level to taste'],
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Vegetable Curry',
        cuisine: 'Indian',
        time: 35,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['cauliflower', 'potatoes', 'peas', 'coconut milk', 'curry powder', 'turmeric', 'onion', 'tomatoes'],
        instructions: [
          'Sauté onion until golden',
          'Add spices and cook until fragrant',
          'Add vegetables and tomatoes',
          'Pour in coconut milk',
          'Simmer until vegetables are tender',
          'Adjust seasoning and serve'
        ],
        nutrition: { calories: 220, protein: 8, carbs: 32, fat: 8 },
        rating: 44,
        tags: ['vegan', 'healthy', 'comfort-food'],
        tips: ['Toast spices for deeper flavor', 'Add vegetables in order of cooking time'],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // American Comfort Food
      {
        name: 'Classic Mac and Cheese',
        cuisine: 'American',
        time: 30,
        difficulty: 'easy',
        servings: 6,
        ingredients: ['macaroni', 'cheddar cheese', 'milk', 'butter', 'flour', 'breadcrumbs', 'mustard powder'],
        instructions: [
          'Cook macaroni until al dente',
          'Make roux with butter and flour',
          'Gradually add milk, whisk smooth',
          'Add cheese and seasonings',
          'Combine with pasta',
          'Top with breadcrumbs and bake'
        ],
        nutrition: { calories: 420, protein: 18, carbs: 42, fat: 20 },
        rating: 46,
        tags: ['comfort-food', 'vegetarian', 'crowd-pleaser'],
        tips: ['Use block cheese, not pre-shredded', 'Don\'t let sauce boil after adding cheese'],
        imageUrl: 'https://images.unsplash.com/photo-1543339318-c4703e94c47d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'BBQ Pulled Pork Sandwich',
        cuisine: 'American',
        time: 240,
        difficulty: 'easy',
        servings: 8,
        ingredients: ['pork shoulder', 'bbq sauce', 'brown sugar', 'paprika', 'garlic powder', 'onion powder', 'buns', 'coleslaw'],
        instructions: [
          'Season pork with spice rub',
          'Slow cook for 6-8 hours until tender',
          'Shred meat with forks',
          'Mix with BBQ sauce',
          'Serve on buns with coleslaw',
          'Add pickles if desired'
        ],
        nutrition: { calories: 480, protein: 32, carbs: 38, fat: 18 },
        rating: 47,
        tags: ['protein-rich', 'comfort-food', 'crowd-pleaser'],
        tips: ['Low and slow is key', 'Let meat rest before shredding'],
        imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e94497a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // Healthy Options
      {
        name: 'Keto Cauliflower Bowl',
        cuisine: 'Modern',
        time: 25,
        difficulty: 'easy',
        servings: 2,
        ingredients: ['cauliflower', 'avocado', 'eggs', 'bacon', 'spinach', 'olive oil', 'lemon'],
        instructions: [
          'Roast cauliflower with olive oil',
          'Cook bacon until crispy',
          'Fry eggs to desired doneness',
          'Wilt spinach in pan',
          'Assemble bowl with all ingredients',
          'Drizzle with lemon and olive oil'
        ],
        nutrition: { calories: 380, protein: 18, carbs: 8, fat: 32 },
        rating: 43,
        tags: ['keto', 'low-carb', 'protein-rich'],
        tips: ['Don\'t overcook cauliflower', 'Add herbs for extra flavor'],
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Quinoa Power Salad',
        cuisine: 'Modern',
        time: 20,
        difficulty: 'easy',
        servings: 4,
        ingredients: ['quinoa', 'kale', 'chickpeas', 'sweet potato', 'pomegranate', 'almonds', 'lemon', 'tahini'],
        instructions: [
          'Cook quinoa and let cool',
          'Roast sweet potato cubes',
          'Massage kale with lemon juice',
          'Mix quinoa with vegetables',
          'Add roasted chickpeas and almonds',
          'Drizzle with tahini dressing'
        ],
        nutrition: { calories: 340, protein: 14, carbs: 48, fat: 12 },
        rating: 45,
        tags: ['vegan', 'gluten-free', 'superfood'],
        tips: ['Massage kale to soften', 'Toast nuts for extra crunch'],
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // Quick & Easy
      {
        name: 'Avocado Toast Plus',
        cuisine: 'Modern',
        time: 10,
        difficulty: 'easy',
        servings: 2,
        ingredients: ['sourdough bread', 'avocado', 'eggs', 'tomatoes', 'feta cheese', 'olive oil', 'everything bagel seasoning'],
        instructions: [
          'Toast bread until golden',
          'Mash avocado with lemon and salt',
          'Fry or poach eggs',
          'Spread avocado on toast',
          'Top with tomatoes, egg, and feta',
          'Sprinkle with seasoning'
        ],
        nutrition: { calories: 320, protein: 14, carbs: 28, fat: 18 },
        rating: 44,
        tags: ['quick', 'healthy', 'breakfast'],
        tips: ['Use ripe but firm avocado', 'Season each layer'],
        imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Mediterranean Wrap',
        cuisine: 'Mediterranean',
        time: 15,
        difficulty: 'easy',
        servings: 2,
        ingredients: ['tortilla', 'hummus', 'cucumber', 'tomatoes', 'olives', 'feta cheese', 'spinach', 'red onion'],
        instructions: [
          'Warm tortilla slightly',
          'Spread hummus evenly',
          'Layer with spinach leaves',
          'Add sliced vegetables and feta',
          'Roll tightly, tucking in sides',
          'Cut in half diagonally'
        ],
        nutrition: { calories: 280, protein: 12, carbs: 32, fat: 12 },
        rating: 42,
        tags: ['vegetarian', 'quick', 'portable'],
        tips: ['Don\'t overfill wrap', 'Use large tortilla for easier rolling'],
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38174c238d3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      
      // Breakfast Options
      {
        name: 'Protein Pancakes',
        cuisine: 'American',
        time: 15,
        difficulty: 'easy',
        servings: 2,
        ingredients: ['oats', 'eggs', 'banana', 'protein powder', 'milk', 'baking powder', 'berries', 'maple syrup'],
        instructions: [
          'Blend oats into flour',
          'Mix with protein powder and baking powder',
          'Whisk eggs, milk, and mashed banana',
          'Combine wet and dry ingredients',
          'Cook pancakes in hot pan',
          'Serve with berries and syrup'
        ],
        nutrition: { calories: 380, protein: 28, carbs: 42, fat: 8 },
        rating: 45,
        tags: ['protein-rich', 'breakfast', 'healthy'],
        tips: ['Don\'t overmix batter', 'Let pan get properly hot'],
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      },
      {
        name: 'Overnight Oats',
        cuisine: 'Modern',
        time: 5,
        difficulty: 'easy',
        servings: 1,
        ingredients: ['rolled oats', 'chia seeds', 'milk', 'yogurt', 'honey', 'vanilla', 'berries', 'nuts'],
        instructions: [
          'Mix oats, chia seeds, and milk',
          'Add yogurt, honey, and vanilla',
          'Stir well and refrigerate overnight',
          'Top with berries and nuts',
          'Enjoy cold or warm slightly',
          'Add more milk if too thick'
        ],
        nutrition: { calories: 320, protein: 12, carbs: 48, fat: 8 },
        rating: 44,
        tags: ['healthy', 'make-ahead', 'breakfast'],
        tips: ['Prepare several jars at once', 'Adjust liquid for desired consistency'],
        imageUrl: 'https://images.unsplash.com/photo-1571197119397-3d9c2b8dd7ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      }
    ];

    sampleRecipes.forEach(recipe => {
      const id = this.currentId++;
      this.recipes.set(id, { ...recipe, id } as Recipe);
    });
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // User profiles
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return this.userProfiles.get(userId);
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentId++;
    const userProfile: UserProfile = { ...profile, id };
    this.userProfiles.set(profile.userId, userProfile);
    return userProfile;
  }

  async updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const existing = this.userProfiles.get(userId);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...profile };
    this.userProfiles.set(userId, updated);
    return updated;
  }

  // Recipes
  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async createRecipe(recipe: InsertRecipe): Promise<Recipe> {
    const id = this.currentId++;
    const newRecipe: Recipe = { ...recipe, id, createdAt: new Date() };
    this.recipes.set(id, newRecipe);
    return newRecipe;
  }

  async getRecipesByIngredients(ingredients: string[], userId: number): Promise<Recipe[]> {
    const allRecipes = Array.from(this.recipes.values());
    return allRecipes.filter(recipe => {
      const matchCount = recipe.ingredients.filter(ingredient =>
        ingredients.some(userIngredient =>
          ingredient.toLowerCase().includes(userIngredient.toLowerCase()) ||
          userIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      ).length;
      return matchCount >= Math.ceil(recipe.ingredients.length * 0.5);
    });
  }

  async getRecipesByDietaryRestrictions(restrictions: string[]): Promise<Recipe[]> {
    if (restrictions.length === 0) return Array.from(this.recipes.values());
    
    return Array.from(this.recipes.values()).filter(recipe =>
      restrictions.some(restriction => recipe.tags.includes(restriction))
    );
  }

  // User ingredients
  async getUserIngredients(userId: number): Promise<UserIngredient[]> {
    return this.userIngredients.get(userId) || [];
  }

  async addUserIngredient(ingredient: InsertUserIngredient): Promise<UserIngredient> {
    const id = this.currentId++;
    const newIngredient: UserIngredient = { 
      ...ingredient, 
      id, 
      addedAt: new Date() 
    };
    
    const userIngredients = this.userIngredients.get(ingredient.userId) || [];
    userIngredients.push(newIngredient);
    this.userIngredients.set(ingredient.userId, userIngredients);
    
    return newIngredient;
  }

  async removeUserIngredient(userId: number, ingredient: string): Promise<boolean> {
    const userIngredients = this.userIngredients.get(userId) || [];
    const index = userIngredients.findIndex(ing => 
      ing.ingredient.toLowerCase() === ingredient.toLowerCase()
    );
    
    if (index === -1) return false;
    
    userIngredients.splice(index, 1);
    this.userIngredients.set(userId, userIngredients);
    return true;
  }

  // Favorites
  async getUserFavorites(userId: number): Promise<UserFavorite[]> {
    return this.userFavorites.get(userId) || [];
  }

  async addUserFavorite(favorite: InsertUserFavorite): Promise<UserFavorite> {
    const id = this.currentId++;
    const newFavorite: UserFavorite = { 
      ...favorite, 
      id, 
      addedAt: new Date() 
    };
    
    const userFavorites = this.userFavorites.get(favorite.userId) || [];
    userFavorites.push(newFavorite);
    this.userFavorites.set(favorite.userId, userFavorites);
    
    return newFavorite;
  }

  async removeUserFavorite(userId: number, recipeId: number): Promise<boolean> {
    const userFavorites = this.userFavorites.get(userId) || [];
    const index = userFavorites.findIndex(fav => fav.recipeId === recipeId);
    
    if (index === -1) return false;
    
    userFavorites.splice(index, 1);
    this.userFavorites.set(userId, userFavorites);
    return true;
  }

  // Meal plans
  async getUserMealPlan(userId: number, weekStart: string): Promise<MealPlan | undefined> {
    const key = `${userId}_${weekStart}`;
    return this.mealPlans.get(key);
  }

  async createMealPlan(mealPlan: InsertMealPlan): Promise<MealPlan> {
    const id = this.currentId++;
    const newMealPlan: MealPlan = { 
      ...mealPlan, 
      id, 
      createdAt: new Date() 
    };
    
    const key = `${mealPlan.userId}_${mealPlan.weekStart}`;
    this.mealPlans.set(key, newMealPlan);
    
    return newMealPlan;
  }

  async updateMealPlan(userId: number, weekStart: string, meals: any): Promise<MealPlan | undefined> {
    const key = `${userId}_${weekStart}`;
    const existing = this.mealPlans.get(key);
    if (!existing) return undefined;
    
    const updated = { ...existing, meals };
    this.mealPlans.set(key, updated);
    return updated;
  }

  // Cooking sessions
  async createCookingSession(session: InsertCookingSession): Promise<CookingSession> {
    const id = this.currentId++;
    const newSession: CookingSession = { 
      ...session, 
      id, 
      startedAt: new Date(),
      completedAt: null
    };
    
    this.cookingSessions.set(id, newSession);
    return newSession;
  }

  async updateCookingSession(id: number, updates: Partial<InsertCookingSession>): Promise<CookingSession | undefined> {
    const existing = this.cookingSessions.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    if (updates.status === 'completed') {
      updated.completedAt = new Date();
    }
    
    this.cookingSessions.set(id, updated);
    return updated;
  }

  async getUserCookingSessions(userId: number): Promise<CookingSession[]> {
    return Array.from(this.cookingSessions.values()).filter(
      session => session.userId === userId
    );
  }

  // Achievements
  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return this.userAchievements.get(userId) || [];
  }

  async addUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement> {
    const id = this.currentId++;
    const newAchievement: UserAchievement = { 
      ...achievement, 
      id, 
      unlockedAt: new Date() 
    };
    
    const userAchievements = this.userAchievements.get(achievement.userId) || [];
    userAchievements.push(newAchievement);
    this.userAchievements.set(achievement.userId, userAchievements);
    
    return newAchievement;
  }
}

export const storage = new MemStorage();
