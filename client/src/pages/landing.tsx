import React from 'react';
import { ChefHat, Sparkles, Clock, Users, Star, Shield, Zap, Camera, Calendar, Trophy, Heart, TrendingUp, CheckCircle2, Crown, Globe, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">SmartChef AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-orange-500 transition-colors">Reviews</a>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
              🎉 Now with AI Recipe Generation
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your AI-Powered
            <span className="text-orange-500 block">Culinary Companion</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your cooking experience with intelligent recipe suggestions, personalized meal planning, 
            and step-by-step guidance. Cook like a pro with ingredients you already have.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors flex items-center">
              <Sparkles className="w-6 h-6 mr-2" />
              Start Cooking Smarter
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-orange-500 hover:text-orange-500 transition-colors">
              Watch Demo
            </button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>10,000+ recipes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Revolutionary Cooking Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of home cooking with our AI-powered platform designed to make every meal extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Recipe Generation</h3>
              <p className="text-gray-600">
                Get personalized recipes based on your available ingredients, dietary preferences, and cooking skill level. Our AI creates unique dishes just for you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Pantry Scanner</h3>
              <p className="text-gray-600">
                Simply scan your pantry with your phone camera. Our AI recognizes ingredients instantly and suggests recipes you can make right now.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Meal Planning</h3>
              <p className="text-gray-600">
                Auto-generate weekly meal plans based on your schedule, nutrition goals, and family preferences. Save time and reduce food waste.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Voice-Guided Cooking</h3>
              <p className="text-gray-600">
                Hands-free cooking with voice commands and audio instructions. Perfect for busy kitchens where your hands are occupied.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Analytics</h3>
              <p className="text-gray-600">
                Track your nutritional intake with detailed analytics. Get insights into your eating patterns and achieve your health goals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Cuisine Library</h3>
              <p className="text-gray-600">
                Explore authentic recipes from 25+ countries. Learn traditional cooking techniques and expand your culinary horizons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-orange-100">Active Chefs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-orange-100">Recipes Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-orange-100">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-orange-100">Cuisines</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Culinary Journey</h2>
            <p className="text-xl text-gray-600">Start free and upgrade as your cooking skills grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-500">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>3 AI recipes per day</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Basic meal planning</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Recipe collection</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Nutrition tracking</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border-2 border-orange-500 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$9.99</div>
                <div className="text-gray-500">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Unlimited AI recipes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Smart pantry scanner</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Voice-guided cooking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Advanced nutrition analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Upgrade to Premium
              </button>
            </div>

            {/* Family Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Family</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$14.99</div>
                <div className="text-gray-500">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Up to 6 family accounts</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Shared meal planning</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Grocery list sync</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>Family nutrition dashboard</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Choose Family
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Chefs Say</h2>
            <p className="text-xl text-gray-600">Join thousands of home cooks transforming their kitchens</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "SmartChef AI has completely changed how I approach cooking. The AI suggestions are spot-on, and I've discovered so many new cuisines!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-500">Home Cook</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The meal planning feature saves me hours every week. My family loves the variety, and we've cut our food waste in half."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Rodriguez</div>
                  <div className="text-sm text-gray-500">Busy Parent</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "As someone new to cooking, the step-by-step guidance is invaluable. I've gone from takeout every night to cooking gourmet meals!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">Emma Johnson</div>
                  <div className="text-sm text-gray-500">Beginner Chef</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Cooking?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join over 50,000 home cooks who have revolutionized their kitchens with SmartChef AI
          </p>
          <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
            Start Your Free Trial Today
          </button>
          <p className="text-orange-100 mt-4 text-sm">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="w-6 h-6 text-orange-500" />
                <span className="text-xl font-bold">SmartChef AI</span>
              </div>
              <p className="text-gray-400">
                Your AI-powered culinary companion for extraordinary home cooking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SmartChef AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}