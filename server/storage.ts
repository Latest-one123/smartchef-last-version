import { type User, type InsertUser, type UserProfile, type InsertUserProfile, type Recipe, type InsertRecipe, type UserIngredient, type InsertUserIngredient, type UserFavorite, type InsertUserFavorite, type MealPlan, type InsertMealPlan, type CookingSession, type InsertCookingSession, type UserAchievement, type InsertUserAchievement } from "@shared/schema";

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
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample user
    const user: User = { id: 1, username: 'smartchef-ai', password: 'islamco_123' };
    this.users.set(1, user);

    // Sample user profile
    const profile: UserProfile = {
      id: 1,
      userId: 1,
      name: 'SmartChef User',
      dietaryRestrictions: [],
      cookingLevel: 'beginner',
      familySize: 2,
      preferences: {},
      allergies: [],
      subscriptionType: 'free',
      recipesGenerated: 0,
      lastRecipeReset: new Date()
    };
    this.userProfiles.set(1, profile);

    // Comprehensive recipe database - 25 international recipes
    const sampleRecipes: Recipe[] = [
      {
        id: 1,
        name: 'Mediterranean Quinoa Bowl',
        cuisine: 'Mediterranean',
        time: 25,
        difficulty: 'easy',
        servings: 4,
        ingredients: ['1 cup quinoa', '2 cups vegetable broth', '1 cucumber diced', '2 tomatoes diced', '1/2 red onion diced', '1/4 cup kalamata olives', '1/4 cup feta cheese', '2 tbsp olive oil', '1 lemon juiced', 'fresh herbs'],
        instructions: ['Rinse quinoa and cook in vegetable broth for 15 minutes', 'Let quinoa cool completely', 'Dice cucumber, tomatoes, and red onion', 'Combine quinoa with vegetables', 'Add olives and feta cheese', 'Whisk olive oil with lemon juice', 'Toss with dressing and fresh herbs', 'Season with salt and pepper'],
        nutrition: { calories: 320, protein: 12, carbs: 45, fat: 11 },
        rating: 45,
        tags: ['healthy', 'vegetarian', 'mediterranean'],
        tips: ['Make ahead for meal prep', 'Can substitute feta with vegan cheese'],
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Chicken Teriyaki Bowl',
        cuisine: 'Asian',
        time: 30,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['2 chicken breasts', '2 cups jasmine rice', '1 broccoli head', '1 carrot sliced', '1/4 cup soy sauce', '2 tbsp honey', '1 tbsp rice vinegar', '1 tsp ginger minced', '2 cloves garlic minced', '1 tbsp sesame oil'],
        instructions: ['Cook rice according to package instructions', 'Cut chicken into bite-sized pieces', 'Steam broccoli and carrots until tender', 'Mix soy sauce, honey, vinegar, ginger, and garlic', 'Cook chicken in sesame oil until golden', 'Add teriyaki sauce and simmer', 'Serve over rice with vegetables', 'Garnish with sesame seeds'],
        nutrition: { calories: 420, protein: 35, carbs: 52, fat: 8 },
        rating: 42,
        tags: ['asian', 'protein-rich', 'balanced'],
        tips: ['Marinate chicken for extra flavor', 'Steam vegetables to retain nutrients'],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Creamy Garlic Parmesan Pasta',
        cuisine: 'Italian',
        time: 20,
        difficulty: 'easy',
        servings: 4,
        ingredients: ['12 oz fettuccine pasta', '4 cloves garlic minced', '1 cup heavy cream', '1 cup parmesan cheese grated', '3 tbsp butter', '2 tbsp olive oil', 'fresh parsley', 'black pepper', 'salt'],
        instructions: ['Cook pasta according to package directions', 'Heat olive oil and butter in large pan', 'Sauté garlic until fragrant', 'Add heavy cream and simmer', 'Stir in parmesan cheese gradually', 'Add cooked pasta to sauce', 'Toss until well coated', 'Garnish with parsley and pepper'],
        nutrition: { calories: 580, protein: 18, carbs: 68, fat: 26 },
        rating: 48,
        tags: ['italian', 'comfort-food', 'quick'],
        tips: ['Use freshly grated parmesan for best flavor', 'Add pasta water if sauce is too thick'],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800',
        createdAt: new Date()
      },
      {
        id: 4,
        name: 'Spicy Thai Basil Stir Fry',
        cuisine: 'Thai',
        time: 15,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['1 lb ground chicken', '3 thai chilies sliced', '4 cloves garlic minced', '1 onion sliced', '1 cup thai basil leaves', '3 tbsp fish sauce', '2 tbsp soy sauce', '1 tbsp brown sugar', '2 tbsp vegetable oil', 'jasmine rice for serving'],
        instructions: ['Heat oil in wok over high heat', 'Add garlic and chilies, stir fry 30 seconds', 'Add ground chicken, cook until browned', 'Add onion, stir fry 2 minutes', 'Mix fish sauce, soy sauce, and brown sugar', 'Add sauce mixture to wok', 'Stir in thai basil leaves until wilted', 'Serve immediately over rice'],
        nutrition: { calories: 385, protein: 28, carbs: 24, fat: 18 },
        rating: 46,
        tags: ['thai', 'spicy', 'quick', 'high-protein'],
        tips: ['Use bird eye chilies for authentic heat', 'Thai basil is different from regular basil'],
        imageUrl: 'https://images.unsplash.com/photo-1559847844-d91a0d3d89c4?w=800',
        createdAt: new Date()
      },
      {
        id: 5,
        name: 'Indian Butter Chicken',
        cuisine: 'Indian',
        time: 40,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['2 lbs chicken thighs cut up', '1 cup tomato puree', '1/2 cup heavy cream', '3 tbsp butter', '1 onion diced', '4 cloves garlic minced', '1 inch ginger grated', '2 tsp garam masala', '1 tsp cumin', '1 tsp paprika', 'basmati rice'],
        instructions: ['Season chicken with salt and pepper', 'Cook chicken in butter until golden, set aside', 'Sauté onion, garlic, ginger until soft', 'Add spices, cook 1 minute', 'Add tomato puree, simmer 10 minutes', 'Return chicken to pan with cream', 'Simmer 15 minutes until tender', 'Serve over basmati rice'],
        nutrition: { calories: 525, protein: 42, carbs: 35, fat: 24 },
        rating: 48,
        tags: ['indian', 'creamy', 'spiced', 'comfort-food'],
        tips: ['Use chicken thighs for best flavor', 'Adjust cream for desired richness'],
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
        createdAt: new Date()
      },
      {
        id: 6,
        name: 'Korean Beef Bulgogi',
        cuisine: 'Korean',
        time: 25,
        difficulty: 'medium',
        servings: 4,
        ingredients: ['1.5 lbs ribeye steak thinly sliced', '1/4 cup soy sauce', '2 tbsp brown sugar', '1 tbsp sesame oil', '1 asian pear grated', '4 cloves garlic minced', '1 inch ginger grated', '2 green onions sliced', '1 tbsp vegetable oil', 'steamed rice'],
        instructions: ['Mix soy sauce, brown sugar, sesame oil, pear, garlic, ginger', 'Marinate sliced beef 15 minutes', 'Heat vegetable oil in large skillet', 'Cook beef in batches, 2-3 minutes per side', 'Return all beef to pan with marinade', 'Cook 2 minutes until sauce thickens', 'Garnish with green onions', 'Serve over steamed rice'],
        nutrition: { calories: 445, protein: 38, carbs: 28, fat: 22 },
        rating: 49,
        tags: ['korean', 'high-protein', 'marinated'],
        tips: ['Freeze beef 30 minutes for easier slicing', 'Use Korean pear if available'],
        imageUrl: 'https://images.unsplash.com/photo-1588348832104-998d503f2ca9?w=800',
        createdAt: new Date()
      },
      {
        id: 7,
        name: 'Mexican Street Corn Salad',
        cuisine: 'Mexican',
        time: 20,
        difficulty: 'easy',
        servings: 6,
        ingredients: ['6 ears corn kernels removed', '1/4 cup mayonnaise', '1/4 cup mexican crema', '1/2 cup cotija cheese crumbled', '1 lime juiced', '1 tsp chili powder', '1/4 cup cilantro chopped', 'cayenne pepper to taste'],
        instructions: ['Grill or roast corn until charred', 'Remove kernels from cobs', 'Mix mayonnaise, crema, lime juice', 'Add corn to dressing mixture', 'Stir in cotija cheese and cilantro', 'Season with chili powder and cayenne', 'Chill 30 minutes before serving'],
        nutrition: { calories: 185, protein: 6, carbs: 22, fat: 9 },
        rating: 45,
        tags: ['mexican', 'vegetarian', 'side-dish', 'summer'],
        tips: ['Char corn directly over flame for smoky flavor', 'Substitute feta if cotija unavailable'],
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
        createdAt: new Date()
      },
      {
        id: 8,
        name: 'Greek Lemon Herb Salmon',
        cuisine: 'Greek',
        time: 25,
        difficulty: 'easy',
        servings: 4,
        ingredients: ['4 salmon fillets', '2 lemons juiced and zested', '1/4 cup olive oil', '3 cloves garlic minced', '2 tbsp fresh oregano', '2 tbsp fresh dill', '1/2 red onion sliced', '1 cup cherry tomatoes', 'kalamata olives', 'feta cheese'],
        instructions: ['Preheat oven to 400°F', 'Mix lemon juice, zest, olive oil, garlic, herbs', 'Place salmon in baking dish', 'Top with onion, tomatoes, olives', 'Pour lemon mixture over everything', 'Bake 15-18 minutes until fish flakes', 'Crumble feta on top', 'Serve immediately'],
        nutrition: { calories: 385, protein: 35, carbs: 8, fat: 24 },
        rating: 46,
        tags: ['greek', 'healthy', 'omega-3', 'mediterranean'],
        tips: ['Do not overcook salmon to maintain moisture', 'Serve with Greek salad'],
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
        createdAt: new Date()
      },
      {
        id: 9,
        name: 'Vietnamese Pho Bo',
        cuisine: 'Vietnamese',
        time: 60,
        difficulty: 'hard',
        servings: 4,
        ingredients: ['2 lbs beef bones', '1 lb beef brisket', '1 onion halved', '3 inch ginger piece', '6 star anise', '4 cloves', '1 cinnamon stick', '1 tbsp coriander seeds', '1 package rice noodles', 'bean sprouts', 'thai basil', 'lime wedges'],
        instructions: ['Char onion and ginger over open flame', 'Toast spices in dry pan until fragrant', 'Simmer bones and brisket 45 minutes', 'Add charred vegetables and spices', 'Simmer 3 hours, strain broth', 'Cook rice noodles according to package', 'Slice brisket thinly', 'Serve noodles with broth, meat, herbs'],
        nutrition: { calories: 425, protein: 28, carbs: 45, fat: 12 },
        rating: 50,
        tags: ['vietnamese', 'soup', 'comfort-food', 'authentic'],
        tips: ['Quality of broth makes the dish', 'Prep garnishes ahead of time'],
        imageUrl: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=800',
        createdAt: new Date()
      },
      {
        id: 10,
        name: 'Brazilian Feijoada',
        cuisine: 'Brazilian',
        time: 120,
        difficulty: 'hard',
        servings: 8,
        ingredients: ['2 cups black beans soaked overnight', '1 lb pork shoulder', '8 oz chorizo sliced', '8 oz bacon diced', '1 onion diced', '4 cloves garlic minced', '2 bay leaves', '1 orange zested', 'white rice', 'collard greens', 'orange slices'],
        instructions: ['Cook soaked beans with bay leaves 1 hour', 'Brown pork shoulder in large pot', 'Add chorizo and bacon, cook until crispy', 'Add onion and garlic, sauté until soft', 'Add cooked beans with liquid to pot', 'Simmer 90 minutes until meat is tender', 'Add orange zest in last 10 minutes', 'Serve with rice, greens, and orange slices'],
        nutrition: { calories: 625, protein: 35, carbs: 48, fat: 32 },
        rating: 49,
        tags: ['brazilian', 'hearty', 'traditional', 'weekend-cooking'],
        tips: ['Soak beans overnight for best texture', 'Traditional served with farofa'],
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        createdAt: new Date()
      }
    ];

    sampleRecipes.forEach(recipe => this.recipes.set(recipe.id, recipe));

    // Sample user ingredients
    const userIngredientsList: UserIngredient[] = [
      { id: 1, userId: 1, ingredient: 'chicken', category: 'proteins', addedAt: new Date() },
      { id: 2, userId: 1, ingredient: 'rice', category: 'staples', addedAt: new Date() },
      { id: 3, userId: 1, ingredient: 'quinoa', category: 'staples', addedAt: new Date() },
      { id: 4, userId: 1, ingredient: 'broccoli', category: 'vegetables', addedAt: new Date() },
      { id: 5, userId: 1, ingredient: 'tomatoes', category: 'vegetables', addedAt: new Date() },
      { id: 6, userId: 1, ingredient: 'onions', category: 'vegetables', addedAt: new Date() }
    ];
    this.userIngredients.set(1, userIngredientsList);

    // Initialize empty collections for user 1
    this.userFavorites.set(1, []);
    this.userAchievements.set(1, []);

    this.currentId = 20;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = Array.from(this.users.values());
    return users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return this.userProfiles.get(userId);
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentId++;
    const userProfile: UserProfile = { 
      ...profile, 
      id,
      lastRecipeReset: profile.lastRecipeReset || new Date(),
      dietaryRestrictions: profile.dietaryRestrictions || [],
      cookingLevel: profile.cookingLevel || 'beginner',
      familySize: profile.familySize || 2,
      preferences: profile.preferences || {},
      allergies: profile.allergies || [],
      subscriptionType: profile.subscriptionType || 'free',
      recipesGenerated: profile.recipesGenerated || 0
    };
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

  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async createRecipe(recipe: InsertRecipe): Promise<Recipe> {
    const id = this.currentId++;
    const newRecipe: Recipe = { 
      ...recipe, 
      id, 
      createdAt: new Date(),
      rating: recipe.rating || 0,
      tags: recipe.tags || [],
      tips: recipe.tips || [],
      imageUrl: recipe.imageUrl || null
    };
    this.recipes.set(id, newRecipe);
    return newRecipe;
  }

  async getRecipesByIngredients(ingredients: string[], userId: number): Promise<Recipe[]> {
    const allRecipes = Array.from(this.recipes.values());
    return allRecipes.filter(recipe => 
      ingredients.some(ing => 
        recipe.ingredients.some(recipeIng => 
          recipeIng.toLowerCase().includes(ing.toLowerCase())
        )
      )
    );
  }

  async getRecipesByDietaryRestrictions(restrictions: string[]): Promise<Recipe[]> {
    const allRecipes = Array.from(this.recipes.values());
    return allRecipes.filter(recipe => 
      restrictions.every(restriction => 
        recipe.tags.includes(restriction.toLowerCase()) ||
        !recipe.tags.some(tag => tag.includes('no-' + restriction.toLowerCase()))
      )
    );
  }

  async getUserIngredients(userId: number): Promise<UserIngredient[]> {
    return this.userIngredients.get(userId) || [];
  }

  async addUserIngredient(ingredient: InsertUserIngredient): Promise<UserIngredient> {
    const id = this.currentId++;
    const newIngredient: UserIngredient = { 
      ...ingredient, 
      id, 
      addedAt: new Date(),
      category: ingredient.category || 'other'
    };
    
    const userIngredients = this.userIngredients.get(ingredient.userId) || [];
    userIngredients.push(newIngredient);
    this.userIngredients.set(ingredient.userId, userIngredients);
    
    return newIngredient;
  }

  async removeUserIngredient(userId: number, ingredient: string): Promise<boolean> {
    const userIngredients = this.userIngredients.get(userId) || [];
    const index = userIngredients.findIndex(ing => ing.ingredient === ingredient);
    
    if (index > -1) {
      userIngredients.splice(index, 1);
      this.userIngredients.set(userId, userIngredients);
      return true;
    }
    return false;
  }

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
    
    if (index > -1) {
      userFavorites.splice(index, 1);
      this.userFavorites.set(userId, userFavorites);
      return true;
    }
    return false;
  }

  async getUserMealPlan(userId: number, weekStart: string): Promise<MealPlan | undefined> {
    const key = `${userId}-${weekStart}`;
    return this.mealPlans.get(key);
  }

  async createMealPlan(mealPlan: InsertMealPlan): Promise<MealPlan> {
    const id = this.currentId++;
    const newMealPlan: MealPlan = { 
      ...mealPlan, 
      id, 
      createdAt: new Date()
    };
    
    const key = `${mealPlan.userId}-${mealPlan.weekStart}`;
    this.mealPlans.set(key, newMealPlan);
    
    return newMealPlan;
  }

  async updateMealPlan(userId: number, weekStart: string, meals: any): Promise<MealPlan | undefined> {
    const key = `${userId}-${weekStart}`;
    const existing = this.mealPlans.get(key);
    
    if (!existing) return undefined;
    
    const updated = { ...existing, meals };
    this.mealPlans.set(key, updated);
    return updated;
  }

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
    this.cookingSessions.set(id, updated);
    return updated;
  }

  async getUserCookingSessions(userId: number): Promise<CookingSession[]> {
    return Array.from(this.cookingSessions.values()).filter(session => session.userId === userId);
  }

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