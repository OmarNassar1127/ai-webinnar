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

  // Define gradient colors explicitly for each app
  const gradientStyles = {
    vloto: 'from-purple-500 to-violet-600',
    instagram: 'from-pink-500 to-rose-600',
    google: 'from-blue-500 to-cyan-600'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all overflow-hidden ${
        isActive
          ? 'text-white shadow-lg'
          : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-gray-300'
      }`}
      style={isActive ? {
        background: app.color === 'purple'
          ? 'linear-gradient(to right, rgb(168, 85, 247), rgb(124, 58, 237))'
          : app.color === 'pink'
          ? 'linear-gradient(to right, rgb(236, 72, 153), rgb(225, 29, 72))'
          : 'linear-gradient(to right, rgb(59, 130, 246), rgb(6, 182, 212))'
      } : {}}
    >
      <IconComponent className="w-5 h-5 relative z-10" />
      <span className="relative z-10">{app.name}</span>
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

            {/* Interactive Parts - Always visible with pulsing effect */}
            {parts.map((part, index) => {
              const componentColors = {
                frontend: 'border-purple-400 bg-purple-500/20',
                backend: 'border-cyan-400 bg-cyan-500/20',
                database: 'border-emerald-400 bg-emerald-500/20',
                api: 'border-orange-400 bg-orange-500/20'
              };
              const pulseColors = {
                frontend: 'bg-purple-400',
                backend: 'bg-cyan-400',
                database: 'bg-emerald-400',
                api: 'bg-orange-400'
              };

              return (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPartClick(part)}
                  className={`absolute cursor-pointer rounded-lg border-2 transition-all ${
                    selectedPart?.id === part.id
                      ? 'border-white bg-white/30 shadow-lg shadow-white/30 z-20'
                      : `${componentColors[part.component]} hover:bg-white/20`
                  }`}
                  style={{
                    left: `${part.x}%`,
                    top: `${part.y}%`,
                    width: `${part.width}%`,
                    height: `${part.height}%`
                  }}
                >
                  {/* Pulsing indicator dot */}
                  <motion.div
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${pulseColors[part.component]}`}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                  />

                  {/* Part highlight indicator */}
                  {selectedPart?.id === part.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30"
                    >
                      <span className="px-2 py-1 rounded bg-white text-slate-900 text-xs font-medium shadow-lg">
                        {part.label}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

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

// Simple Interactive Booking Flow
const BookingFlowAnimation = () => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const scenarios = [
    {
      id: 'find-cars',
      label: 'Find Nearby Cars',
      icon: Search,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-violet-600',
      description: 'When you open the app and look for available cars',
      steps: [
        { from: 'user', to: 'app', message: 'You open the Vloto app' },
        { from: 'app', to: 'server', message: 'App requests nearby cars' },
        { from: 'server', to: 'database', message: 'Server queries database' },
        { from: 'database', to: 'server', message: '3 cars found!' },
        { from: 'server', to: 'app', message: 'Server sends car data' },
        { from: 'app', to: 'user', message: 'Map shows available cars!' }
      ]
    },
    {
      id: 'book-car',
      label: 'Book a Car',
      icon: CreditCard,
      color: '#06B6D4',
      gradient: 'from-cyan-500 to-blue-600',
      description: 'When you tap "Book Now" to reserve a car',
      steps: [
        { from: 'user', to: 'app', message: 'You tap "Book Now"' },
        { from: 'app', to: 'server', message: 'App sends booking request' },
        { from: 'server', to: 'database', message: 'Check car availability' },
        { from: 'database', to: 'server', message: 'Car is available!' },
        { from: 'server', to: 'database', message: 'Save booking record' },
        { from: 'database', to: 'server', message: 'Booking #12345 created' },
        { from: 'server', to: 'app', message: 'Booking confirmed!' },
        { from: 'app', to: 'user', message: 'Shows confirmation screen' }
      ]
    },
    {
      id: 'unlock-car',
      label: 'Unlock the Car',
      icon: Zap,
      color: '#10B981',
      gradient: 'from-emerald-500 to-green-600',
      description: 'When you tap unlock to start your trip',
      steps: [
        { from: 'user', to: 'app', message: 'You tap "Unlock"' },
        { from: 'app', to: 'server', message: 'App sends unlock request' },
        { from: 'server', to: 'database', message: 'Verify your booking' },
        { from: 'database', to: 'server', message: 'Booking valid!' },
        { from: 'server', to: 'car', message: 'Send unlock command' },
        { from: 'car', to: 'server', message: 'Doors unlocked!' },
        { from: 'server', to: 'app', message: 'Success!' },
        { from: 'app', to: 'user', message: 'Car is unlocked!' }
      ]
    }
  ];

  const nodeConfig = {
    user: { label: 'You', sublabel: 'User', icon: User, gradient: 'from-slate-500 to-slate-600', glow: 'rgba(100,116,139,0.5)' },
    app: { label: 'App', sublabel: 'Frontend', icon: Smartphone, gradient: 'from-purple-500 to-violet-600', glow: 'rgba(139,92,246,0.5)' },
    server: { label: 'Server', sublabel: 'Backend', icon: Server, gradient: 'from-cyan-500 to-blue-600', glow: 'rgba(6,182,212,0.5)' },
    database: { label: 'Database', sublabel: 'Storage', icon: HardDrive, gradient: 'from-emerald-500 to-green-600', glow: 'rgba(16,185,129,0.5)' },
    car: { label: 'Car', sublabel: 'IoT Device', icon: Car, gradient: 'from-orange-500 to-amber-600', glow: 'rgba(249,115,22,0.5)' }
  };

  const runScenario = (scenario) => {
    if (isAnimating) return;

    setActiveScenario(scenario);
    setCurrentStepIndex(-1);
    setIsAnimating(true);

    const stepDuration = 2000; // 2 seconds per step - nice and slow

    scenario.steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStepIndex(index);
      }, (index + 1) * stepDuration);
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, (scenario.steps.length + 1) * stepDuration);
  };

  const currentStep = activeScenario && currentStepIndex >= 0
    ? activeScenario.steps[currentStepIndex]
    : null;

  // Check if a specific node is the SOURCE (from) in current step
  const isNodeSource = (nodeId) => currentStep?.from === nodeId;

  // Check if a specific node is the DESTINATION (to) in current step
  const isNodeDestination = (nodeId) => currentStep?.to === nodeId;

  // Check if node is involved in current step
  const isNodeActive = (nodeId) => isNodeSource(nodeId) || isNodeDestination(nodeId);

  // Check if a specific connection is active and get its direction
  // Returns: null (not active), 'forward', or 'reverse'
  const getConnectionState = (nodeA, nodeB) => {
    if (!currentStep) return null;
    if (currentStep.from === nodeA && currentStep.to === nodeB) return 'forward';
    if (currentStep.from === nodeB && currentStep.to === nodeA) return 'reverse';
    return null;
  };

  const showCar = activeScenario?.id === 'unlock-car';
  const color = activeScenario?.color || '#8B5CF6';

  // Render a single node
  const renderNode = (nodeId) => {
    const config = nodeConfig[nodeId];
    const IconComponent = config.icon;
    const isSource = isNodeSource(nodeId);
    const isDest = isNodeDestination(nodeId);
    const active = isSource || isDest;

    return (
      <div key={nodeId} className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: active ? 1.15 : 1,
            y: active ? -6 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative"
        >
          {/* Glow effect - pulses when destination, steady when source */}
          {active && (
            <motion.div
              className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${config.gradient}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isDest ? [0.4, 0.7, 0.4] : 0.5 }}
              transition={{ duration: isDest ? 1 : 0.3, repeat: isDest ? Infinity : 0 }}
              style={{ filter: 'blur(12px)' }}
            />
          )}
          <div
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-xl transition-all duration-300`}
            style={{
              boxShadow: active
                ? `0 0 ${isDest ? '45px' : '30px'} ${config.glow}`
                : '0 8px 24px rgba(0,0,0,0.4)'
            }}
          >
            <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
        </motion.div>
        <p className="text-white font-semibold mt-2 text-sm">{config.label}</p>
        <p className="text-gray-500 text-xs">{config.sublabel}</p>
      </div>
    );
  };

  // Render horizontal connection arrow between nodes (direction-aware)
  const renderHorizontalArrow = (leftNode, rightNode) => {
    const state = getConnectionState(leftNode, rightNode);
    const isForward = state === 'forward';
    const isReverse = state === 'reverse';
    const isActive = isForward || isReverse;

    return (
      <div className="flex-1 flex items-center justify-center px-2 min-w-[50px] max-w-[100px]">
        <div className="relative w-full h-8 flex items-center">
          {/* Base line */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-slate-700 -translate-y-1/2" />

          {/* Animated glow line - direction aware */}
          {isActive && (
            <motion.div
              key={`${leftNode}-${rightNode}-${currentStepIndex}`}
              className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
              initial={isReverse ? { right: 0, left: 'auto', width: 0 } : { left: 0, right: 'auto', width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}

          {/* Arrow heads on both ends - light up based on direction */}
          <ArrowRight
            className={`absolute left-0 w-4 h-4 rotate-180 transition-all duration-300 ${
              isReverse ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ color: isReverse ? color : '#475569' }}
          />
          <ArrowRight
            className={`absolute right-0 w-4 h-4 transition-all duration-300 ${
              isForward ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ color: isForward ? color : '#475569' }}
          />
        </div>
      </div>
    );
  };

  // Render vertical arrow (server <-> database) - direction aware
  const renderVerticalArrow = (topNode, bottomNode) => {
    const state = getConnectionState(topNode, bottomNode);
    const isDown = state === 'forward';
    const isUp = state === 'reverse';
    const isActive = isDown || isUp;

    return (
      <div className="flex justify-center py-3">
        <div className="relative w-8 h-12 flex flex-col items-center">
          {/* Base line */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-slate-700 -translate-x-1/2" />

          {/* Animated glow line - direction aware */}
          {isActive && (
            <motion.div
              key={`${topNode}-${bottomNode}-${currentStepIndex}`}
              className="absolute left-1/2 -translate-x-1/2 w-1 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
              initial={isUp ? { bottom: 0, top: 'auto', height: 0 } : { top: 0, bottom: 'auto', height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}

          {/* Arrow heads - show direction */}
          <ArrowRight
            className={`absolute top-0 w-4 h-4 -rotate-90 transition-all duration-300 ${
              isUp ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ color: isUp ? color : '#475569' }}
          />
          <ArrowRight
            className={`absolute bottom-0 w-4 h-4 rotate-90 transition-all duration-300 ${
              isDown ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ color: isDown ? color : '#475569' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Scenario Buttons */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-white">What happens when you...</h3>
        <p className="text-gray-400 text-sm">Click a scenario to watch data flow through the system</p>

        <div className="flex flex-wrap justify-center gap-3">
          {scenarios.map((scenario) => {
            const IconComponent = scenario.icon;
            const isActive = activeScenario?.id === scenario.id;

            return (
              <motion.button
                key={scenario.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => runScenario(scenario)}
                disabled={isAnimating}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${scenario.gradient} text-white shadow-lg`
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {scenario.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Simple Flowchart with CSS */}
      <div className="relative bg-slate-900/80 rounded-2xl border border-white/10 p-6 md:p-8 min-h-[400px]">
        {/* Top Row: User ↔ App ↔ Server */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {renderNode('user')}
          {renderHorizontalArrow('user', 'app')}
          {renderNode('app')}
          {renderHorizontalArrow('app', 'server')}
          {renderNode('server')}
        </div>

        {/* Vertical connection: Server ↔ Database */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            {renderVerticalArrow('server', 'database')}
          </div>
        </div>

        {/* Bottom Row: Database (and Car for unlock) */}
        <div className="flex items-center justify-center gap-0">
          {!showCar && <div className="flex-1" />}
          {renderNode('database')}
          {showCar && (
            <>
              {renderHorizontalArrow('database', 'car')}
              {renderNode('car')}
            </>
          )}
          {!showCar && <div className="flex-1" />}
        </div>

        {/* Current Step Message */}
        <AnimatePresence mode="wait">
          {currentStep ? (
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className={`p-4 rounded-xl bg-gradient-to-r ${activeScenario?.gradient} shadow-2xl`}>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{currentStepIndex + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{currentStep.message}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {activeScenario?.steps.map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={false}
                          animate={{ scaleY: idx === currentStepIndex ? 1.5 : 1 }}
                          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                            idx <= currentStepIndex ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : !activeScenario && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-500/40 mb-4"
                >
                  <Zap className="w-10 h-10 text-purple-400" />
                </motion.div>
                <p className="text-white font-semibold text-lg">Select a scenario above</p>
                <p className="text-gray-400 text-sm mt-1">Watch how data flows through the system</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key insight */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
        <Lightbulb className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="text-purple-400 font-medium">Key Insight:</span> Every app follows this same pattern!
          Data flows from you → through the app → to servers → to databases. The car is just another computer that receives commands over the internet.
        </p>
      </div>
    </div>
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

              {/* Vloto Interactive Flow Animation */}
              {activeTab === 'vloto' && (
                <BookingFlowAnimation />
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
