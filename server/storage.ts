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
