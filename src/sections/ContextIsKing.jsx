import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  ArrowRight,
  Plus,
  Check,
  Square,
  CheckSquare,
  User,
  AlertCircle,
  FileText,
  MessageCircle,
  Ruler,
  Headphones,
  Calendar,
  Mail
} from 'lucide-react';
import { Card, Button } from '../components/common';

/**
 * ContextIsKing Section (10 min)
 * The Context Formula, Interactive Context Builder, and Tabbed Examples
 */
const ContextIsKing = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Context builder state
  const [contextOptions, setContextOptions] = useState({
    customerName: false,
    issue: false,
    policy: false,
    tone: false,
    length: false
  });

  const headingText = "CONTEXT";

  // Typewriter effect for heading
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < headingText.length) {
        setDisplayedText(headingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowContent(true), 300);
        setTimeout(() => setShowFormula(true), 800);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const toggleContextOption = (key) => {
    setContextOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const contextOptionsData = [
    { key: 'customerName', label: 'Customer name: "Johan"', icon: User },
    { key: 'issue', label: 'Issue: "Car wasn\'t charged when he picked it up"', icon: AlertCircle },
    { key: 'policy', label: 'Our policy: "We apologize and offer 30 min free"', icon: FileText },
    { key: 'tone', label: 'Tone: "Empathetic but professional"', icon: MessageCircle },
    { key: 'length', label: 'Length: "3-4 sentences"', icon: Ruler }
  ];

  const selectedCount = Object.values(contextOptions).filter(Boolean).length;
  const qualityLevel = selectedCount === 0 ? 'poor' : selectedCount <= 2 ? 'fair' : selectedCount <= 4 ? 'good' : 'excellent';

  const qualityColors = {
    poor: { bg: 'from-red-600 to-red-800', text: 'text-red-400', border: 'border-red-500/50' },
    fair: { bg: 'from-orange-600 to-orange-800', text: 'text-orange-400', border: 'border-orange-500/50' },
    good: { bg: 'from-yellow-600 to-yellow-800', text: 'text-yellow-400', border: 'border-yellow-500/50' },
    excellent: { bg: 'from-emerald-600 to-emerald-800', text: 'text-emerald-400', border: 'border-emerald-500/50' }
  };

  // Build the prompt based on selected options
  const buildPrompt = () => {
    let prompt = 'Write a response to an angry customer';
    const additions = [];

    if (contextOptions.customerName) additions.push('named Johan');
    if (contextOptions.issue) additions.push('whose car wasn\'t charged when he picked it up');
    if (contextOptions.policy) additions.push('. Follow our policy: apologize and offer 30 minutes free');
    if (contextOptions.tone) additions.push('. Use an empathetic but professional tone');
    if (contextOptions.length) additions.push('. Keep it to 3-4 sentences');

    if (additions.length > 0) {
      const firstTwo = additions.slice(0, 2).filter(a => !a.startsWith('.'));
      const rest = additions.filter(a => a.startsWith('.')).map(a => a.slice(2));

      if (firstTwo.length > 0) {
        prompt += ' ' + firstTwo.join(' ');
      }
      if (rest.length > 0) {
        prompt += '. ' + rest.join('. ');
      }
    }

    return prompt + '.';
  };

  const tabbedExamples = [
    {
      title: 'Customer Support',
      icon: Headphones,
      without: {
        prompt: '"Reply to this complaint"',
        result: 'Generic, template-like response that might miss the point'
      },
      with: {
        prompt: '"Reply to Johan\'s complaint about his car not being charged. He\'s frustrated because he was late to a meeting. Acknowledge the inconvenience, apologize sincerely, and offer 30 free minutes. Be empathetic but brief (3-4 sentences)."',
        result: 'Personalized, empathetic response that addresses Johan\'s specific situation and offers a concrete solution'
      }
    },
    {
      title: 'Scheduling',
      icon: Calendar,
      without: {
        prompt: '"Schedule a meeting"',
        result: 'AI doesn\'t know with whom, when, or for what purpose'
      },
      with: {
        prompt: '"Draft an email to schedule a 30-min sync with Sarah from Marketing next week. I\'m free Tue/Wed afternoons. We need to discuss the Q1 campaign results. Keep it casual and friendly."',
        result: 'Professional email with specific time slots, clear purpose, and appropriate tone'
      }
    },
    {
      title: 'Communication',
      icon: Mail,
      without: {
        prompt: '"Write an update email"',
        result: 'Vague, generic update that doesn\'t communicate anything specific'
      },
      with: {
        prompt: '"Write a weekly update email to my manager about the fleet optimization project. Key points: completed driver feedback analysis (20% want more EV options), next step is presenting to leadership Friday. Tone: confident but not boastful. 1 paragraph max."',
        result: 'Concise, informative update with key achievements and next steps'
      }
    }
  ];

  const formulaParts = [
    { text: 'Clear Task', color: 'from-blue-500 to-blue-600' },
    { text: 'Relevant Background', color: 'from-purple-500 to-purple-600' },
    { text: 'Specific Requirements', color: 'from-pink-500 to-pink-600' },
    { text: 'Examples', color: 'from-cyan-500 to-cyan-600' }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-12">
        {/* Crown Icon and Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* Crown Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 shadow-lg shadow-amber-500/30"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>

          {/* Animated CONTEXT text */}
          <h1 className="text-5xl md:text-7xl font-black">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-14 bg-amber-400 align-middle"
            />
          </h1>

          {/* Subtitle */}
          <AnimatePresence>
            {showContent && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-300"
              >
                Your context determines{' '}
                <span className="font-bold text-amber-400">80%</span> of AI output quality
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* The Context Formula */}
        <AnimatePresence>
          {showFormula && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-center text-lg font-medium text-gray-400 uppercase tracking-wider">
                The Context Formula
              </h2>

              <Card glowColor="purple" className="overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-bold text-white"
                  >
                    GREAT OUTPUT =
                  </motion.div>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {formulaParts.map((part, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${part.color} text-white font-semibold text-sm md:text-base`}>
                          {part.text}
                        </span>
                        {index < formulaParts.length - 1 && (
                          <Plus className="w-4 h-4 text-gray-500" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Context Builder */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-center text-lg font-medium text-gray-400 uppercase tracking-wider">
                Interactive Context Builder
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Toggle Options */}
                <Card glowColor="cyan">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Base Task</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                        Required
                      </span>
                    </div>

                    <div className="px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600">
                      <p className="text-blue-300 font-mono text-sm">
                        "Write a response to an angry customer"
                      </p>
                    </div>

                    <div className="pt-2 space-y-3">
                      <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                        Add Context Layers
                      </p>

                      {contextOptionsData.map((option, index) => {
                        const IconComponent = option.icon;
                        const isSelected = contextOptions[option.key];

                        return (
                          <motion.button
                            key={option.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            onClick={() => toggleContextOption(option.key)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                              isSelected
                                ? 'bg-emerald-900/30 border-emerald-500/50'
                                : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
                            }`}
                          >
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                            <IconComponent className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-emerald-400' : 'text-gray-500'}`} />
                            <span className={`text-sm text-left ${isSelected ? 'text-emerald-200' : 'text-gray-300'}`}>
                              {option.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Right: Live Preview */}
                <Card glowColor="green">
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Live Preview</h3>

                      {/* Quality Indicator */}
                      <motion.div
                        key={qualityLevel}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full ${qualityColors[qualityLevel].border} border`}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${qualityColors[qualityLevel].bg}`} />
                        <span className={`text-xs font-semibold uppercase ${qualityColors[qualityLevel].text}`}>
                          {qualityLevel}
                        </span>
                      </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(selectedCount / 5) * 100}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full rounded-full bg-gradient-to-r ${qualityColors[qualityLevel].bg}`}
                      />
                    </div>

                    {/* Preview Box */}
                    <div className="flex-1 p-4 rounded-lg bg-slate-900/80 border border-slate-700 overflow-y-auto">
                      <motion.p
                        key={buildPrompt()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-200 font-mono text-sm leading-relaxed"
                      >
                        "{buildPrompt()}"
                      </motion.p>
                    </div>

                    {/* Hint */}
                    <p className="text-xs text-gray-500 text-center">
                      {selectedCount === 5
                        ? 'Perfect! This prompt gives AI everything it needs.'
                        : `Add ${5 - selectedCount} more context layers to see the difference`
                      }
                    </p>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabbed Examples */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-center text-lg font-medium text-gray-400 uppercase tracking-wider">
                Real-World Examples
              </h2>

              {/* Tab Buttons */}
              <div className="flex justify-center gap-2">
                {tabbedExamples.map((tab, index) => {
                  const IconComponent = tab.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-slate-800/80 text-gray-400 hover:text-white hover:bg-slate-700/80'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.title}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Without Context */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-500/30 p-6">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full" />

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <h4 className="font-semibold text-red-400 uppercase text-sm tracking-wider">
                            Without Context
                          </h4>
                        </div>

                        <div className="px-4 py-3 rounded-lg bg-red-950/50 border border-red-800/50">
                          <p className="text-red-200 font-mono text-sm">
                            {tabbedExamples[activeTab].without.prompt}
                          </p>
                        </div>

                        <div className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">
                            {tabbedExamples[activeTab].without.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* With Context */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 p-6">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full" />

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <h4 className="font-semibold text-emerald-400 uppercase text-sm tracking-wider">
                            With Context
                          </h4>
                        </div>

                        <div className="px-4 py-3 rounded-lg bg-emerald-950/50 border border-emerald-800/50 max-h-32 overflow-y-auto">
                          <p className="text-emerald-200 font-mono text-sm">
                            {tabbedExamples[activeTab].with.prompt}
                          </p>
                        </div>

                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">
                            {tabbedExamples[activeTab].with.result}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
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

export default ContextIsKing;
