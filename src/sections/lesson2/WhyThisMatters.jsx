import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Lightbulb,
  User,
  Users,
  Clock,
  Zap,
  Bot,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  Code,
  Eye
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 2 Why This Matters for AI Section
 * Explains why learning software concepts helps users work with AI tools
 */

const benefitCards = [
  {
    id: 'developers',
    icon: Users,
    title: 'Talk to Developers',
    description: 'Speak their language when discussing requirements, bugs, or new features. No more "it just doesn\'t work" - now you can say "the frontend shows the old data after saving."',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'Direct AI Tools',
    description: 'Tell AI exactly what to build. Instead of vague requests, you can describe components clearly: "Create a frontend form that saves to the database via an API."',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'evaluate',
    icon: Eye,
    title: 'Evaluate Solutions',
    description: 'Understand what AI gives you. When it shows code, you\'ll recognize "that\'s the frontend styling" vs "that\'s the backend logic" and know if it makes sense.',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600'
  }
];

const OldVsNewDiagram = () => {
  const [showNew, setShowNew] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowNew(true), 1500);
    const timer2 = setTimeout(() => setAnimationComplete(true), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Old Way */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-red-400" />
          <h4 className="text-lg font-semibold text-red-400">The Old Way</h4>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {/* You */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-400 mt-2">You</span>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex items-center"
          >
            <div className="h-1 w-12 md:w-20 bg-gradient-to-r from-slate-500 to-slate-400 rounded" />
            <ArrowRight className="w-5 h-5 text-slate-400 -ml-1" />
          </motion.div>

          {/* Developer */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-400 mt-2">Developer</span>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="flex items-center"
          >
            <div className="h-1 w-12 md:w-20 bg-gradient-to-r from-blue-500 to-red-400 rounded" />
            <ArrowRight className="w-5 h-5 text-red-400 -ml-1" />
          </motion.div>

          {/* Time */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/30">
              <span className="text-white font-bold text-sm">Months</span>
            </div>
            <span className="text-sm text-red-400 mt-2 font-medium">⏱️ Wait time</span>
          </motion.div>
        </div>

        {/* Old way caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-gray-500 text-sm mt-4"
        >
          Describe your idea → Wait for developer → Get result (maybe)
        </motion.p>
      </motion.div>

      {/* VS Divider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showNew ? 1 : 0, scale: showNew ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center gap-4"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        <span className="px-4 py-2 rounded-full bg-slate-800 text-gray-400 text-sm font-medium border border-slate-700">
          VS
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
      </motion.div>

      {/* New Way */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-green-400" />
              <h4 className="text-lg font-semibold text-green-400">The New Way (with AI)</h4>
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
              {/* You */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <User className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm text-purple-400 mt-2 font-medium">You</span>
              </motion.div>

              {/* Arrow 1 */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center"
              >
                <div className="h-1 w-12 md:w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded" />
                <ArrowRight className="w-5 h-5 text-cyan-400 -ml-1" />
              </motion.div>

              {/* AI */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    boxShadow: animationComplete
                      ? ['0 0 20px rgba(6, 182, 212, 0.3)', '0 0 40px rgba(6, 182, 212, 0.5)', '0 0 20px rgba(6, 182, 212, 0.3)']
                      : '0 0 20px rgba(6, 182, 212, 0.3)'
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                >
                  <Bot className="w-8 h-8 text-white" />
                </motion.div>
                <span className="text-sm text-cyan-400 mt-2 font-medium">AI Tools</span>
              </motion.div>

              {/* Arrow 2 */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="flex items-center"
              >
                <div className="h-1 w-12 md:w-20 bg-gradient-to-r from-cyan-500 to-green-400 rounded" />
                <ArrowRight className="w-5 h-5 text-green-400 -ml-1" />
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <span className="text-white font-bold text-sm">Hours</span>
                </div>
                <span className="text-sm text-green-400 mt-2 font-medium">⚡ Fast!</span>
              </motion.div>
            </div>

            {/* New way caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center text-gray-400 text-sm mt-4"
            >
              Describe clearly → AI builds it → Iterate together → Done!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TheCatchCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/40 p-6 md:p-8">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.1) 10px, rgba(251, 191, 36, 0.1) 20px)'
          }} />
        </div>

        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg"
            >
              <AlertTriangle className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-amber-400">The Catch</h3>
          </div>

          <p className="text-lg text-gray-300">
            AI is incredibly powerful, but it's <span className="text-amber-400 font-semibold">not magic</span>.
            It can only build what you can clearly describe.
          </p>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-gray-400">
              If you ask for a "better app", AI has no idea what you mean. But if you say
              <span className="text-cyan-400"> "I need a frontend form where users select a date,
              the backend checks availability in the database, and returns available time slots via an API"</span>
              — now AI knows exactly what to build!
            </p>
          </div>

          <p className="text-gray-400 text-sm italic">
            That's why understanding software components is your new superpower.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const BeforeAfterExample = () => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">See the Difference</h3>
        <p className="text-gray-400 text-sm">How clear descriptions get better results from AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bad Example */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="font-semibold text-red-400">Vague Request</span>
          </div>
          <Card className="border-red-500/30">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-700 flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                </div>
                <div className="p-3 rounded-xl bg-slate-700/50 text-gray-300 text-sm">
                  "Build me an app to track our cars"
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-900/30 flex-shrink-0">
                  <Bot className="w-4 h-4 text-red-400" />
                </div>
                <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-sm">
                  "I'll need more details. What kind of tracking? What information about the cars? Who will use it? What should happen when...?"
                </div>
              </div>

              <p className="text-gray-500 text-xs text-center">❌ Endless back-and-forth</p>
            </div>
          </Card>
        </div>

        {/* Good Example */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-green-400">Clear Description</span>
          </div>
          <Card className="border-green-500/30">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-700 flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                </div>
                <div className="p-3 rounded-xl bg-slate-700/50 text-gray-300 text-sm">
                  "Build a car status dashboard: <span className="text-purple-400">Frontend</span> shows a grid of car cards with battery %. <span className="text-cyan-400">Backend</span> calculates which cars need charging. <span className="text-emerald-400">Database</span> stores car details and battery history. <span className="text-orange-400">API</span> updates every 5 minutes."
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showAfter ? 1 : 0.3, y: showAfter ? 0 : 10 }}
                className="flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-green-900/30 flex-shrink-0">
                  <Bot className="w-4 h-4 text-green-400" />
                </div>
                <div className="p-3 rounded-xl bg-green-900/20 border border-green-500/30 text-green-300 text-sm">
                  "Got it! I'll create a React dashboard with a card grid, a backend service for battery calculations, a PostgreSQL schema for cars and history, and a scheduled API refresh. Let me start with the frontend..."
                </div>
              </motion.div>

              <p className="text-gray-500 text-xs text-center">✅ AI starts building immediately</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAfter(!showAfter)}
          className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30 transition-shadow flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {showAfter ? 'See the Magic!' : 'Show AI Response'}
        </motion.button>
      </div>
    </motion.div>
  );
};

const BenefitCard = ({ benefit, index }) => {
  const IconComponent = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.15, duration: 0.5 }}
    >
      <Card glowColor={benefit.color} className="h-full">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={`p-3 rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-lg`}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

const WhyThisMatters = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);

  const headingText = "So Why Learn This?";

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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
          >
            <Lightbulb className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-10 bg-amber-400 align-middle"
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
                Understanding software components unlocks{' '}
                <span className="text-amber-400 font-medium">a completely new way of working</span> —
                with both developers AND AI tools.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Old vs New Diagram */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 md:p-8">
                <OldVsNewDiagram />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Catch Card */}
        {showContent && <TheCatchCard />}

        {/* Before/After Example */}
        {showContent && <BeforeAfterExample />}

        {/* Benefit Cards */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Your New Superpowers</h3>
                <p className="text-gray-400">What you can do after this lesson</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefitCards.map((benefit, index) => (
                  <BenefitCard key={benefit.id} benefit={benefit} index={index} />
                ))}
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
              transition={{ delay: 1.4 }}
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

export default WhyThisMatters;
