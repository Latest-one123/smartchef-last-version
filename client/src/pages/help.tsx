import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Book, MessageCircle, Mail, Phone, Clock, CheckCircle2, AlertCircle, HelpCircle, Camera, Sparkles, Calendar, Users, Shield, CreditCard } from 'lucide-react';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('getting-started');

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      questions: [
        {
          question: "How do I create my first recipe with SmartChef AI?",
          answer: "Simply add your available ingredients to your pantry, then click 'AI Recipes' on the home screen. Our AI will analyze your ingredients and generate personalized recipes instantly. You can also scan your pantry with your camera for faster ingredient detection."
        },
        {
          question: "What makes SmartChef AI different from other recipe apps?",
          answer: "SmartChef AI uses advanced machine learning to create personalized recipes based on your specific ingredients, dietary preferences, and cooking skill level. Unlike static recipe databases, our AI generates unique recipes tailored to what you have in your kitchen right now."
        },
        {
          question: "Do I need cooking experience to use SmartChef AI?",
          answer: "Not at all! SmartChef AI adapts to your skill level. Beginners get detailed step-by-step instructions with cooking tips, while experienced cooks receive more advanced techniques. Our voice-guided cooking mode makes it even easier for newcomers."
        },
        {
          question: "How accurate is the AI recipe generation?",
          answer: "Our AI has been trained on over 100,000 professional recipes and tested by certified chefs. Recipe accuracy is 94% based on user feedback, with continuous improvements from our machine learning algorithms."
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Functionality',
      icon: Sparkles,
      questions: [
        {
          question: "How does the Smart Pantry Scanner work?",
          answer: "Point your phone camera at your pantry, fridge, or ingredients. Our computer vision AI recognizes food items instantly and adds them to your digital pantry. The scanner works with over 5,000 common ingredients and gets smarter with each use."
        },
        {
          question: "Can I plan meals for my entire family?",
          answer: "Yes! Our Family Plan supports up to 6 accounts with shared meal planning, grocery lists, and nutrition tracking. You can set different dietary preferences for each family member and generate meals that satisfy everyone."
        },
        {
          question: "What cuisines are available?",
          answer: "SmartChef AI features authentic recipes from 25+ global cuisines including Italian, Asian, Mexican, Indian, Mediterranean, Thai, French, Korean, and many more. Our AI can also fusion cuisines to create unique flavor combinations."
        },
        {
          question: "How does voice-guided cooking work?",
          answer: "Premium users can activate hands-free cooking mode. Simply say 'Hey SmartChef' followed by commands like 'next step', 'repeat', or 'set timer for 10 minutes'. The AI responds with clear audio instructions, perfect for busy kitchens."
        }
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Health',
      icon: Calendar,
      questions: [
        {
          question: "How accurate is the nutrition tracking?",
          answer: "Our nutrition data comes from USDA databases and is accurate to within 5% for calories and macronutrients. The AI calculates nutrition based on actual ingredient quantities and cooking methods used in each recipe."
        },
        {
          question: "Can SmartChef AI accommodate dietary restrictions?",
          answer: "Absolutely! We support 20+ dietary preferences including vegetarian, vegan, keto, paleo, gluten-free, dairy-free, low-sodium, and more. Set your restrictions once, and all AI-generated recipes will automatically comply."
        },
        {
          question: "Does the app help with weight management goals?",
          answer: "Yes! Set your calorie and macro targets, and SmartChef AI will suggest recipes that fit your goals. The nutrition dashboard tracks your daily intake and provides insights to help you stay on track."
        },
        {
          question: "Can I track nutrition for my whole family?",
          answer: "Family Plan users get a comprehensive nutrition dashboard showing intake for all family members. You can set individual goals for each person and monitor overall family health trends."
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Billing',
      icon: Users,
      questions: [
        {
          question: "What's included in the free plan?",
          answer: "Free users get 3 AI recipe generations per day, basic meal planning, recipe collection, and nutrition tracking. You can access our full recipe database and use core features without any payment."
        },
        {
          question: "How do I upgrade to Premium?",
          answer: "Click 'Upgrade' in your account settings or when prompted during feature use. Premium unlocks unlimited AI recipes, pantry scanner, voice guidance, advanced analytics, and priority support for $9.99/month."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes! Cancel anytime in your account settings. You'll keep Premium features until your billing period ends, then automatically revert to the free plan. No cancellation fees or hassles."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use bank-level encryption and partner with Stripe for payment processing. We never store your full credit card information on our servers. All transactions are PCI DSS compliant."
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: AlertCircle,
      questions: [
        {
          question: "Why isn't the camera scanner recognizing my ingredients?",
          answer: "Ensure good lighting and hold ingredients clearly in view. The scanner works best with individual items rather than mixed collections. If issues persist, manually add ingredients and the AI will learn from your corrections."
        },
        {
          question: "My AI recipes seem repetitive. How can I get more variety?",
          answer: "Try adding more diverse ingredients to your pantry, update your cuisine preferences, or explore different difficulty levels. Premium users can also specify 'surprise me' mode for more experimental recipe suggestions."
        },
        {
          question: "The app is running slowly. How can I fix this?",
          answer: "Clear your browser cache, ensure stable internet connection, and close unnecessary tabs. Mobile users should restart the app. If problems persist, contact support with your device details."
        },
        {
          question: "How do I sync my data across devices?",
          answer: "Your account automatically syncs across all devices when logged in. If sync is delayed, pull down to refresh on mobile or reload the page on web. Data updates within 30 seconds typically."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">Find answers to common questions and learn how to make the most of SmartChef AI</p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            const isOpen = openCategory === category.id;
            
            return (
              <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenCategory(isOpen ? null : category.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                      <p className="text-gray-500 text-sm">{category.questions.length} questions</p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="border-t border-gray-200">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="p-6 border-b border-gray-100 last:border-b-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                          <HelpCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed pl-7">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try different keywords or browse our categories above</p>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-orange-100 mb-6">Our support team is here to help you succeed in the kitchen</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <MessageCircle className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-orange-100 mb-4">Get instant help from our team</p>
                <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-orange-100 mb-4">We'll respond within 24 hours</p>
                <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Send Email
                </button>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-orange-100 mb-4">Premium users only</p>
                <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-semibold text-gray-900">All Systems Operational</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: 2 minutes ago</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>AI Recipe Generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Camera Scanner</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Voice Commands</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}