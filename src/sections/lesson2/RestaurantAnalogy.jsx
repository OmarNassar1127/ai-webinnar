import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Utensils,
  ChefHat,
  Database as DatabaseIcon,
  ArrowLeftRight,
  Lightbulb,
  ChevronDown,
  Monitor,
  Server,
  HardDrive,
  Repeat
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 2 Restaurant Analogy Section
 * Interactive cards teaching Frontend, Backend, Database, API through restaurant analogy
 */

const componentData = [
  {
    id: 'frontend',
    restaurant: 'The Dining Room',
    software: 'Frontend',
    icon: Monitor,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-purple-800/20',
    borderColor: 'border-purple-500/40',
    description: 'What customers see and interact with - the tables, menus, decor, and ambiance.',
    softwareDescription: 'What users see and click - buttons, forms, colors, and layout.',
    examples: ['Menu design', 'Table arrangement', 'Lighting & music', 'Decor & atmosphere'],
    softwareExamples: ['Buttons & forms', 'Colors & fonts', 'Layout & spacing', 'Animations'],
    keyTrait: 'Looks pretty, but can\'t cook!'
  },
  {
    id: 'backend',
    restaurant: 'The Kitchen',
    software: 'Backend',
    icon: Server,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-cyan-800/20',
    borderColor: 'border-cyan-500/40',
    description: 'Where the magic happens - chefs preparing meals, following recipes, handling special requests.',
    softwareDescription: 'Where the logic lives - processing data, running calculations, making decisions.',
    examples: ['Cooking food', 'Following recipes', 'Handling allergies', 'Timing courses'],
    softwareExamples: ['Processing orders', 'Calculating prices', 'Checking permissions', 'Running reports'],
    keyTrait: 'Does the real work, customers never see it!'
  },
  {
    id: 'database',
    restaurant: 'The Pantry',
    software: 'Database',
    icon: HardDrive,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-emerald-800/20',
    borderColor: 'border-emerald-500/40',
    description: 'Where ingredients are stored - organized shelves, inventory tracking, keeping things fresh.',
    softwareDescription: 'Where data is stored - user accounts, order history, product information.',
    examples: ['Ingredient storage', 'Inventory counts', 'Supplier records', 'Recipe cards'],
    softwareExamples: ['User profiles', 'Order history', 'Product catalog', 'Settings & preferences'],
    keyTrait: 'Remembers everything, even when closed!'
  },
  {
    id: 'api',
    restaurant: 'The Waiters',
    software: 'API',
    icon: ArrowLeftRight,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-900/40 to-orange-800/20',
    borderColor: 'border-orange-500/40',
    description: 'Messengers between dining room and kitchen - taking orders, bringing food, answering questions.',
    softwareDescription: 'Messengers between frontend and backend - carrying requests and responses.',
    examples: ['Taking orders', 'Delivering food', 'Relaying questions', 'Processing payments'],
    softwareExamples: ['Login requests', 'Fetching data', 'Saving changes', 'Getting updates'],
    keyTrait: 'Just carries messages, doesn\'t cook or serve!'
  }
];

const flowSteps = [
  { label: 'Customer orders', icon: '🍽️', component: 'frontend' },
  { label: 'Waiter takes order', icon: '📝', component: 'api' },
  { label: 'Kitchen prepares', icon: '👨‍🍳', component: 'backend' },
  { label: 'Chef checks pantry', icon: '📦', component: 'database' },
  { label: 'Food prepared', icon: '🍳', component: 'backend' },
  { label: 'Waiter delivers', icon: '🏃', component: 'api' },
  { label: 'Customer enjoys!', icon: '😋', component: 'frontend' }
];

const ComponentCard = ({ data, isExpanded, onToggle, index }) => {
  const IconComponent = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    >
      <Card
        glowColor={data.color}
        onClick={onToggle}
        className="cursor-pointer overflow-hidden"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: isExpanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className={`p-3 rounded-xl bg-gradient-to-br ${data.gradient} shadow-lg`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-sm text-gray-400">{data.restaurant}</p>
                <h3 className="text-xl font-bold text-white">{data.software}</h3>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          {/* Quick Description */}
          <p className="text-gray-300">{data.description}</p>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Software Translation */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${data.bgGradient} border ${data.borderColor}`}>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">In Software Terms</p>
                  <p className="text-white">{data.softwareDescription}</p>
                </div>

                {/* Examples Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Restaurant</p>
                    <div className="space-y-2">
                      {data.examples.map((ex, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                          {ex}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Software</p>
                    <div className="space-y-2">
                      {data.softwareExamples.map((ex, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${data.gradient}`} />
                          {ex}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Trait */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p className="text-amber-200 text-sm font-medium">{data.keyTrait}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click hint */}
          {!isExpanded && (
            <p className="text-center text-gray-500 text-sm pt-2">
              Click to learn more
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const OrderFlowAnimation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setActiveStep(prev => {
          if (prev >= flowSteps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1200);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const getComponentColor = (component) => {
    const colors = {
      frontend: 'from-purple-500 to-violet-600',
      backend: 'from-cyan-500 to-blue-600',
      database: 'from-emerald-500 to-green-600',
      api: 'from-orange-500 to-amber-600'
    };
    return colors[component];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">See It In Action</h3>
        <p className="text-gray-400 text-sm">Watch how an order flows through all four components</p>
      </div>

      {/* Flow Visualization */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 border border-white/10 p-6">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {flowSteps.map((step, index) => (
            <motion.div
              key={index}
              animate={{
                scale: activeStep === index ? 1.1 : 1,
                opacity: activeStep === index ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  boxShadow: activeStep === index
                    ? `0 0 20px rgba(139, 92, 246, 0.5)`
                    : '0 0 0 rgba(0,0,0,0)'
                }}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${getComponentColor(step.component)} ${activeStep === index ? 'ring-2 ring-white/50' : ''}`}
              >
                {step.icon}
              </motion.div>
              <motion.p
                animate={{ color: activeStep === index ? '#fff' : '#9ca3af' }}
                className="text-xs mt-2 text-center max-w-[80px]"
              >
                {step.label}
              </motion.p>
              {index < flowSteps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute"
                  style={{
                    left: `calc(${(index + 0.5) * (100 / flowSteps.length)}% + 20px)`,
                    top: '35px'
                  }}
                  animate={{
                    opacity: activeStep === index ? 1 : 0.3,
                    x: activeStep === index ? [0, 5, 0] : 0
                  }}
                  transition={{ duration: 0.5, repeat: activeStep === index ? Infinity : 0 }}
                >
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Play Button */}
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveStep(0);
              setIsPlaying(true);
            }}
            disabled={isPlaying}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
              isPlaying
                ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
            }`}
          >
            <Repeat className="w-4 h-4" />
            {isPlaying ? 'Playing...' : 'Play Animation'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const RestaurantAnalogy = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [allCardsViewed, setAllCardsViewed] = useState(false);

  const headingText = "Software is Like a Restaurant";

  // Typewriter effect for heading
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < headingText.length) {
        setDisplayedText(headingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowContent(true), 400);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Track if all cards have been viewed
  useEffect(() => {
    const viewedCount = Object.values(expandedCards).filter(Boolean).length;
    if (viewedCount >= componentData.length) {
      setAllCardsViewed(true);
    }
  }, [expandedCards]);

  const toggleCard = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-12">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30"
          >
            <Utensils className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-10 bg-orange-400 align-middle"
            />
          </h1>

          <AnimatePresence>
            {showContent && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Every application has four key parts - and they work together just like a restaurant.
                <span className="text-purple-400 font-medium"> Click each card</span> to understand the connection.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Component Cards Grid */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {componentData.map((data, index) => (
                <ComponentCard
                  key={data.id}
                  data={data}
                  isExpanded={expandedCards[data.id]}
                  onToggle={() => toggleCard(data.id)}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <AnimatePresence>
          {showContent && !allCardsViewed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-gray-500 text-sm">
                {Object.values(expandedCards).filter(Boolean).length} of {componentData.length} components explored
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Flow Animation */}
        {showContent && <OrderFlowAnimation />}

        {/* Key Insight Box */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-orange-900/30 to-cyan-900/40 border border-purple-500/40 p-8">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-orange-500/5 to-cyan-500/5" />

                <div className="relative space-y-4 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 shadow-lg shadow-orange-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 uppercase tracking-wider">
                    Key Insight
                  </h3>

                  <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                    Just like a great restaurant needs all four parts working together,{' '}
                    <span className="text-orange-400">every app has a frontend, backend, database, and APIs</span>{' '}
                    - even the simplest ones!
                  </p>

                  <p className="text-gray-400 text-lg">
                    When you understand this, you can describe <em>any</em> software tool clearly.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onComplete}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="min-w-[200px]"
              >
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RestaurantAnalogy;
