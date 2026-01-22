import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Monitor,
  Server,
  HardDrive,
  ArrowLeftRight,
  Lightbulb,
  Car,
  Camera,
  Search,
  MapPin,
  Calendar,
  Battery,
  CreditCard,
  Heart,
  MessageCircle,
  Image,
  User,
  Bell,
  Globe,
  FileText,
  Clock,
  Zap
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 2 Real Examples Section
 * Shows how real apps (Vloto, Instagram, Google) use Frontend, Backend, Database, API
 */

const appData = {
  vloto: {
    name: 'Vloto App',
    icon: Car,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    description: 'Electric car sharing for everyday adventures',
    components: {
      frontend: {
        label: 'Frontend',
        items: ['Map showing nearby cars', 'Book now button', 'Trip history screen', 'Price calculator'],
        color: 'purple'
      },
      backend: {
        label: 'Backend',
        items: ['Check car availability', 'Calculate trip cost', 'Process booking request', 'Send confirmation'],
        color: 'cyan'
      },
      database: {
        label: 'Database',
        items: ['User accounts & licenses', 'Car locations & status', 'Booking records', 'Payment history'],
        color: 'emerald'
      },
      api: {
        label: 'API',
        items: ['Fetch available cars', 'Submit booking', 'Get trip details', 'Update car status'],
        color: 'orange'
      }
    },
    mockupParts: [
      { id: 'map', label: 'Map View', x: 10, y: 15, width: 80, height: 40, component: 'frontend', description: 'What you SEE - the visual map display' },
      { id: 'carIcon', label: 'Car Markers', x: 25, y: 25, width: 15, height: 15, component: 'api', description: 'Data FETCHED from the server about car locations' },
      { id: 'bookBtn', label: 'Book Button', x: 30, y: 60, width: 40, height: 10, component: 'frontend', description: 'What you CLICK - sends a request' },
      { id: 'price', label: 'Price Display', x: 60, y: 75, width: 30, height: 8, component: 'backend', description: 'CALCULATED by the server based on distance/time' },
      { id: 'profile', label: 'User Profile', x: 75, y: 5, width: 15, height: 8, component: 'database', description: 'STORED information about you' }
    ]
  },
  instagram: {
    name: 'Instagram',
    icon: Camera,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    description: 'Photo and video sharing social network',
    components: {
      frontend: {
        label: 'Frontend',
        items: ['Photo feed with scrolling', 'Like & comment buttons', 'Story circles at top', 'Profile grid layout'],
        color: 'purple'
      },
      backend: {
        label: 'Backend',
        items: ['Rank posts by algorithm', 'Compress uploaded images', 'Check if username available', 'Send push notifications'],
        color: 'cyan'
      },
      database: {
        label: 'Database',
        items: ['Billions of photos', 'User follower lists', 'Comment & like data', 'Direct messages'],
        color: 'emerald'
      },
      api: {
        label: 'API',
        items: ['Load your feed', 'Post a new photo', 'Follow/unfollow user', 'Send a message'],
        color: 'orange'
      }
    }
  },
  google: {
    name: 'Google Search',
    icon: Search,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    description: 'The world\'s most used search engine',
    components: {
      frontend: {
        label: 'Frontend',
        items: ['Search box with autocomplete', 'Results list with snippets', 'Image/video tabs', 'Related searches'],
        color: 'purple'
      },
      backend: {
        label: 'Backend',
        items: ['Match query to indexed pages', 'Rank results by relevance', 'Filter spam/bad content', 'Personalize based on history'],
        color: 'cyan'
      },
      database: {
        label: 'Database',
        items: ['Index of entire web (billions of pages)', 'Search history', 'Ad campaign data', 'User preferences'],
        color: 'emerald'
      },
      api: {
        label: 'API',
        items: ['Send search query', 'Get autocomplete suggestions', 'Load image results', 'Track clicks for ranking'],
        color: 'orange'
      }
    }
  }
};

const comparisonData = [
  {
    aspect: 'Frontend Focus',
    vloto: 'Map & booking flow',
    instagram: 'Photo display & interactions',
    google: 'Search box & results'
  },
  {
    aspect: 'Backend Magic',
    vloto: 'Availability & pricing logic',
    instagram: 'Content ranking algorithm',
    google: 'Web indexing & ranking'
  },
  {
    aspect: 'Database Scale',
    vloto: 'Thousands of cars & bookings',
    instagram: 'Billions of photos',
    google: 'Entire internet indexed'
  },
  {
    aspect: 'Key API Calls',
    vloto: '~10 per booking',
    instagram: '~50 per session',
    google: '~5 per search'
  }
];

const TabButton = ({ app, isActive, onClick }) => {
  const IconComponent = app.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
        isActive
          ? `bg-gradient-to-r ${app.gradient} text-white shadow-lg`
          : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-gray-300'
      }`}
    >
      <IconComponent className="w-5 h-5" />
      <span>{app.name}</span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-20"
          style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
        />
      )}
    </motion.button>
  );
};

const ComponentDiagram = ({ app }) => {
  const components = [
    { key: 'frontend', icon: Monitor, label: 'Frontend', color: 'purple', gradient: 'from-purple-500 to-violet-600' },
    { key: 'api', icon: ArrowLeftRight, label: 'API', color: 'orange', gradient: 'from-orange-500 to-amber-600' },
    { key: 'backend', icon: Server, label: 'Backend', color: 'cyan', gradient: 'from-cyan-500 to-blue-600' },
    { key: 'database', icon: HardDrive, label: 'Database', color: 'emerald', gradient: 'from-emerald-500 to-green-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {components.map((comp, index) => {
        const IconComponent = comp.icon;
        const appComp = app.components[comp.key];

        return (
          <motion.div
            key={comp.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              glowColor={comp.color}
              className="h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${comp.gradient}`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">{comp.label}</h4>
                </div>
                <ul className="space-y-2">
                  {appComp.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${comp.gradient}`} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

const VlotoMockup = ({ parts, onPartClick, selectedPart }) => {
  return (
    <div className="relative aspect-[9/16] max-w-xs mx-auto">
      {/* Phone Frame */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-slate-700 to-slate-800 p-2 shadow-2xl">
        <div className="relative h-full rounded-[2.5rem] bg-slate-900 overflow-hidden border border-slate-700">
          {/* Status Bar */}
          <div className="h-6 bg-slate-800 flex items-center justify-between px-6 text-xs text-gray-400">
            <span>9:41</span>
            <div className="flex gap-1">
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-6 h-6 text-white" />
              <span className="font-bold text-white">Vloto</span>
            </div>
            <User className="w-5 h-5 text-white/80" />
          </div>

          {/* Mock Content */}
          <div className="relative h-full bg-slate-800">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700 to-slate-800">
              {/* Grid lines to simulate map */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute w-full h-px bg-slate-500" style={{ top: `${i * 12.5}%` }} />
                ))}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute h-full w-px bg-slate-500" style={{ left: `${i * 20}%` }} />
                ))}
              </div>

              {/* Mock car markers */}
              <motion.div
                className="absolute top-[25%] left-[30%]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                  <Car className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-[40%] left-[60%]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                  <Car className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-[55%] left-[25%]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                  <Car className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Interactive Parts */}
            {parts.map((part) => (
              <motion.div
                key={part.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPartClick(part)}
                className={`absolute cursor-pointer rounded-lg border-2 transition-all ${
                  selectedPart?.id === part.id
                    ? 'border-white bg-white/20 shadow-lg shadow-white/30'
                    : 'border-transparent hover:border-white/50 hover:bg-white/10'
                }`}
                style={{
                  left: `${part.x}%`,
                  top: `${part.y}%`,
                  width: `${part.width}%`,
                  height: `${part.height}%`
                }}
              >
                {/* Part highlight indicator */}
                {selectedPart?.id === part.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <span className="px-2 py-1 rounded bg-white text-slate-900 text-xs font-medium">
                      {part.label}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Bottom Card */}
            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 rounded-t-3xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Nearby Cars</p>
                  <p className="text-gray-400 text-sm">3 available</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">€0.29/min</p>
                  <p className="text-gray-400 text-sm">+ €0.15/km</p>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartExplanation = ({ part }) => {
  const componentColors = {
    frontend: { gradient: 'from-purple-500 to-violet-600', text: 'text-purple-400', label: 'Frontend' },
    backend: { gradient: 'from-cyan-500 to-blue-600', text: 'text-cyan-400', label: 'Backend' },
    database: { gradient: 'from-emerald-500 to-green-600', text: 'text-emerald-400', label: 'Database' },
    api: { gradient: 'from-orange-500 to-amber-600', text: 'text-orange-400', label: 'API' }
  };

  const config = componentColors[part.component];
  const icons = {
    frontend: Monitor,
    backend: Server,
    database: HardDrive,
    api: ArrowLeftRight
  };
  const IconComponent = icons[part.component];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6"
    >
      <Card glowColor={part.component === 'frontend' ? 'purple' : part.component === 'backend' ? 'cyan' : part.component === 'database' ? 'emerald' : 'orange'}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-semibold text-white">{part.label}</h4>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.text} bg-white/10`}>
                {config.label}
              </span>
            </div>
            <p className="text-gray-300">{part.description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const ComparisonTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="overflow-x-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white">How They Compare</h3>
        <p className="text-gray-400">Different apps, same four components</p>
      </div>

      <div className="min-w-[600px] rounded-2xl overflow-hidden border border-white/10">
        {/* Header */}
        <div className="grid grid-cols-4 bg-slate-800/80">
          <div className="p-4 font-semibold text-gray-400 border-r border-white/10">Aspect</div>
          <div className="p-4 font-semibold text-purple-400 border-r border-white/10 flex items-center gap-2">
            <Car className="w-4 h-4" /> Vloto
          </div>
          <div className="p-4 font-semibold text-pink-400 border-r border-white/10 flex items-center gap-2">
            <Camera className="w-4 h-4" /> Instagram
          </div>
          <div className="p-4 font-semibold text-blue-400 flex items-center gap-2">
            <Search className="w-4 h-4" /> Google
          </div>
        </div>

        {/* Rows */}
        {comparisonData.map((row, index) => (
          <motion.div
            key={row.aspect}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`grid grid-cols-4 ${index % 2 === 0 ? 'bg-slate-900/50' : 'bg-slate-800/30'}`}
          >
            <div className="p-4 font-medium text-white border-r border-white/10">{row.aspect}</div>
            <div className="p-4 text-gray-300 border-r border-white/10 text-sm">{row.vloto}</div>
            <div className="p-4 text-gray-300 border-r border-white/10 text-sm">{row.instagram}</div>
            <div className="p-4 text-gray-300 text-sm">{row.google}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RealExamples = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [activeTab, setActiveTab] = useState('vloto');
  const [selectedPart, setSelectedPart] = useState(null);

  const headingText = "Real World Examples";

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

  // Reset selected part when changing tabs
  useEffect(() => {
    setSelectedPart(null);
  }, [activeTab]);

  const currentApp = appData[activeTab];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-6xl w-full space-y-12">
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30"
          >
            <Smartphone className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-10 bg-blue-400 align-middle"
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
                Let's see how real apps you know use these four components.
                <span className="text-blue-400 font-medium"> Every app follows the same pattern!</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tab Navigation */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {Object.entries(appData).map(([key, app]) => (
                <TabButton
                  key={key}
                  app={app}
                  isActive={activeTab === key}
                  onClick={() => setActiveTab(key)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Content */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* App Header */}
              <div className="text-center">
                <h2 className={`text-2xl font-bold bg-gradient-to-r ${currentApp.gradient} bg-clip-text text-transparent`}>
                  {currentApp.name}
                </h2>
                <p className="text-gray-400">{currentApp.description}</p>
              </div>

              {/* Vloto Interactive Mockup */}
              {activeTab === 'vloto' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-300">
                      <span className="text-purple-400 font-medium">Click on different parts</span> of the app to see which component handles them
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <VlotoMockup
                      parts={currentApp.mockupParts}
                      onPartClick={setSelectedPart}
                      selectedPart={selectedPart}
                    />

                    <div className="space-y-4">
                      <div className="text-center lg:text-left">
                        <h3 className="text-lg font-semibold text-white mb-2">What happens behind the scenes?</h3>
                        <p className="text-gray-400 text-sm">
                          {selectedPart
                            ? 'You selected an element! Here\'s what component handles it:'
                            : 'Tap any highlighted area on the phone to learn which component handles it'}
                        </p>
                      </div>

                      <AnimatePresence mode="wait">
                        {selectedPart ? (
                          <PartExplanation key={selectedPart.id} part={selectedPart} />
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-8 rounded-xl bg-slate-800/50 border border-white/10 border-dashed text-center"
                          >
                            <Zap className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500">Click an area on the mockup to explore</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Quick Legend */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {[
                          { label: 'Frontend', color: 'bg-purple-500' },
                          { label: 'Backend', color: 'bg-cyan-500' },
                          { label: 'Database', color: 'bg-emerald-500' },
                          { label: 'API', color: 'bg-orange-500' }
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-2 text-sm text-gray-400">
                            <div className={`w-3 h-3 rounded-full ${item.color}`} />
                            {item.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Component Diagram for all apps */}
              <ComponentDiagram app={currentApp} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Table */}
        {showContent && <ComparisonTable />}

        {/* Key Insight Box */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-pink-900/40 border border-blue-500/40 p-8">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />

                <div className="relative space-y-4 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 uppercase tracking-wider">
                    Key Insight
                  </h3>

                  <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                    Whether it's a{' '}
                    <span className="text-purple-400">car sharing app</span>,{' '}
                    <span className="text-pink-400">social network</span>, or{' '}
                    <span className="text-blue-400">search engine</span>{' '}
                    - they ALL have the same four parts working together!
                  </p>

                  <p className="text-gray-400 text-lg">
                    Now you can look at <em>any</em> app and identify its components.
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
              transition={{ delay: 1 }}
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

export default RealExamples;
