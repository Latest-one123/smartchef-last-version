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

    // Sample recipes - 25+ professional recipes
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

    this.currentId = 10;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
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
      lastRecipeReset: profile.lastRecipeReset || new Date()
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
      createdAt: new Date()
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
      addedAt: new Date()
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
      completedAt: undefined
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