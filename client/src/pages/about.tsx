import React from 'react';
import { ChefHat, Users, Target, Award, Globe, Lightbulb, Heart, TrendingUp, Shield, Zap, Brain, Camera } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <ChefHat className="w-12 h-12 text-orange-500" />
              <h1 className="text-5xl font-bold text-gray-900">SmartChef AI</h1>
            </div>
            <p className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              We're revolutionizing home cooking with artificial intelligence, making gourmet meals accessible to everyone, regardless of skill level or available ingredients.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Founded 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Global Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>50K+ Active Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize exceptional cooking by leveraging artificial intelligence to bridge the gap between professional culinary expertise and home kitchens worldwide.
              </p>
              <p className="text-gray-600 mb-8">
                We believe everyone deserves access to personalized, nutritious, and delicious meals made from ingredients they already have. Our AI transforms the overwhelming world of cooking into an intuitive, enjoyable experience that adapts to your lifestyle, preferences, and skill level.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Accessibility</h4>
                    <p className="text-sm text-gray-600">Cooking for everyone</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Health</h4>
                    <p className="text-sm text-gray-600">Nutritious meals daily</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-orange-100 mb-6">
                To create a world where every home cook has access to personalized culinary intelligence, transforming kitchens into spaces of creativity, health, and joy.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-orange-200" />
                  <span>AI-powered personalization for every user</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-orange-200" />
                  <span>Global cuisine accessibility</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-orange-200" />
                  <span>Sustainable cooking practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cutting-Edge Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines machine learning, computer vision, and natural language processing to deliver an unparalleled cooking experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Recipe Engine</h3>
              <p className="text-gray-600 mb-4">
                Our proprietary neural networks analyze over 100,000 professional recipes to generate personalized dishes based on your available ingredients and preferences.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Deep learning algorithms</li>
                <li>• Flavor profile matching</li>
                <li>• Nutritional optimization</li>
                <li>• Cultural authenticity preservation</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Computer Vision</h3>
              <p className="text-gray-600 mb-4">
                Advanced image recognition technology identifies ingredients with 95% accuracy, making pantry management effortless and intuitive.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Real-time ingredient detection</li>
                <li>• Freshness assessment</li>
                <li>• Quantity estimation</li>
                <li>• Multi-object recognition</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Personalization</h3>
              <p className="text-gray-600 mb-4">
                Machine learning algorithms continuously adapt to your cooking patterns, dietary needs, and taste preferences for increasingly personalized recommendations.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Behavioral analysis</li>
                <li>• Preference learning</li>
                <li>• Adaptive difficulty scaling</li>
                <li>• Health goal optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Industry experts passionate about the intersection of technology and culinary arts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">SM</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Mitchell</h3>
              <p className="text-orange-600 font-semibold mb-3">CEO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Former Head of AI at FoodTech Corp. 15+ years in machine learning and culinary technology. Culinary Institute graduate with a passion for democratizing gourmet cooking.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">DK</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">David Kim</h3>
              <p className="text-blue-600 font-semibold mb-3">CTO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Former Senior Engineer at Google AI. PhD in Computer Vision from Stanford. Expert in image recognition and natural language processing with 20+ published papers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">AR</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Antoine Rodriguez</h3>
              <p className="text-green-600 font-semibold mb-3">Head of Culinary AI</p>
              <p className="text-gray-600 text-sm">
                Michelin-starred chef turned technologist. James Beard Award winner with expertise in global cuisines. Leads our recipe development and authenticity verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recognition & Achievements</h2>
            <p className="text-xl text-gray-600">
              Industry recognition for innovation in culinary technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">TechCrunch Disrupt</h4>
              <p className="text-sm text-gray-600">Winner - Best AI Innovation 2024</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Food & Wine</h4>
              <p className="text-sm text-gray-600">Best Cooking App 2024</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Forbes</h4>
              <p className="text-sm text-gray-600">30 Under 30 - Consumer Tech</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">App Store</h4>
              <p className="text-sm text-gray-600">Editor's Choice - Health & Fitness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Impact by Numbers</h2>
              <p className="text-xl text-orange-100">
                Transforming kitchens and lives around the world
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-orange-100">Active Home Cooks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2M+</div>
                <div className="text-orange-100">Recipes Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15M+</div>
                <div className="text-orange-100">Meals Cooked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-orange-100">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible in culinary technology, always seeking new ways to enhance the cooking experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accessibility</h3>
              <p className="text-gray-600">
                Great cooking should be available to everyone, regardless of skill level, budget, or dietary restrictions. We design for inclusivity.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Authenticity</h3>
              <p className="text-gray-600">
                We respect culinary traditions while embracing innovation, ensuring our AI preserves the cultural significance of global cuisines.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Our platform promotes sustainable cooking practices, reducing food waste through intelligent ingredient utilization.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">
                We believe in the power of shared culinary experiences and foster a global community of passionate home cooks.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Every feature we build meets the highest standards of quality, from AI accuracy to user experience design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Culinary Revolution</h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of the future of cooking. Start your journey with SmartChef AI today.
          </p>
          <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors">
            Start Cooking Smarter
          </button>
          <p className="text-gray-500 mt-4">Join 50,000+ home cooks worldwide</p>
        </div>
      </section>
    </div>
  );
}