import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Database,
  MessageCircle,
  ArrowRight,
  X,
  Check,
  Lightbulb,
  ChevronRight,
  Brain
} from 'lucide-react';
import { Card, Button } from '../components/common';

/**
 * WhatIsAI Section (8-10 min)
 * Myth vs Reality cards, visual diagram, and click-through example
 */
const WhatIsAI = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [exampleStep, setExampleStep] = useState(0);

  const headingText = "What is AI Really?";

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
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const mythRealities = [
    {
      myth: "AI is magic / thinks like humans",
      reality: "AI is pattern matching on steroids",
      mythIcon: Sparkles,
      realityIcon: Zap
    },
    {
      myth: "AI knows everything",
      reality: "AI knows patterns from training data",
      mythIcon: Brain,
      realityIcon: Database
    },
    {
      myth: "AI understands context automatically",
      reality: "AI only knows what you tell it",
      mythIcon: Lightbulb,
      realityIcon: MessageCircle
    }
  ];

  const exampleSteps = [
    {
      title: "Step 1: Your Prompt",
      content: '"Write an email"',
      type: "prompt"
    },
    {
      title: "Step 2: AI Thinking",
      content: "Email about what? To whom? What tone? What purpose?",
      type: "thinking"
    },
    {
      title: "Step 3: The Insight",
      content: "Without context, AI has to guess. And guessing = generic results",
      type: "insight"
    }
  ];

  const handleNextStep = () => {
    if (exampleStep < exampleSteps.length) {
      setExampleStep(exampleStep + 1);
    }
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
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-10 bg-purple-400 align-middle"
            />
          </h1>
        </motion.div>

        {/* Myth vs Reality Grid */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-center text-lg font-medium text-gray-400 uppercase tracking-wider">
                Myth vs Reality
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {mythRealities.map((item, index) => {
                  const MythIcon = item.mythIcon;
                  const RealityIcon = item.realityIcon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="contents"
                    >
                      {/* Myth Card */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-500/30 p-6">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full" />
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 rounded-lg bg-red-500/20">
                            <X className="w-5 h-5 text-red-400" />
                          </div>
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                              Myth
                            </span>
                            <p className="text-white font-medium leading-relaxed">
                              {item.myth}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Reality Card */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 p-6">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full" />
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 rounded-lg bg-emerald-500/20">
                            <Check className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                              Reality
                            </span>
                            <p className="text-white font-medium leading-relaxed">
                              {item.reality}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Diagram */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="py-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                {/* Input Box */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="relative"
                >
                  <div className="px-6 py-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-400/50 shadow-lg shadow-blue-500/20">
                    <span className="text-white font-semibold">Your Input</span>
                  </div>
                </motion.div>

                {/* Arrow 1 */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center"
                >
                  <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-6 h-6 text-purple-400" />
                  </motion.div>
                </motion.div>

                {/* Processing Box */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.3)',
                        '0 0 40px rgba(168, 85, 247, 0.5)',
                        '0 0 20px rgba(168, 85, 247, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-6 py-4 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 border border-purple-400/50"
                  >
                    <span className="text-white font-semibold">Pattern Processing</span>
                  </motion.div>
                </motion.div>

                {/* Arrow 2 */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center"
                >
                  <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-purple-500 to-emerald-500" />
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                </motion.div>

                {/* Output Box */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="relative"
                >
                  <div className="px-6 py-4 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 border border-emerald-400/50 shadow-lg shadow-emerald-500/20">
                    <span className="text-white font-semibold">Output</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key Insight */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/40 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
                <div className="relative flex items-start gap-4">
                  <motion.div
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
                  >
                    <Lightbulb className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-amber-300 text-sm uppercase tracking-wider">
                      Key Insight
                    </h3>
                    <p className="text-lg text-white leading-relaxed">
                      AI is like a <span className="font-bold text-amber-300">super-powered autocomplete</span>.
                      It predicts the most likely helpful response based on patterns it learned.
                      The better your input, the better the prediction.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click-Through Example */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-center text-lg font-medium text-gray-400 uppercase tracking-wider">
                See It In Action
              </h2>

              <Card glowColor="purple" className="relative overflow-hidden">
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex justify-center gap-2">
                    {exampleSteps.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          index <= exampleStep ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                        animate={index === exampleStep ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                  </div>

                  {/* Step Content */}
                  <div className="min-h-[200px] flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                      {exampleStep === 0 && (
                        <motion.div
                          key="start"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-center space-y-4"
                        >
                          <p className="text-gray-400">
                            Let's see what happens with a vague prompt
                          </p>
                          <Button
                            variant="primary"
                            onClick={handleNextStep}
                            icon={<ArrowRight className="w-5 h-5" />}
                            iconPosition="right"
                          >
                            Start Example
                          </Button>
                        </motion.div>
                      )}

                      {exampleStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-center space-y-4"
                        >
                          <span className="text-sm text-purple-400 uppercase tracking-wider font-medium">
                            {exampleSteps[0].title}
                          </span>
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="px-8 py-4 rounded-xl bg-slate-700/50 border border-slate-600"
                          >
                            <p className="text-2xl font-mono text-blue-300">
                              {exampleSteps[0].content}
                            </p>
                          </motion.div>
                          <Button
                            variant="secondary"
                            onClick={handleNextStep}
                            icon={<ArrowRight className="w-5 h-5" />}
                            iconPosition="right"
                          >
                            Next
                          </Button>
                        </motion.div>
                      )}

                      {exampleStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-center space-y-4"
                        >
                          <span className="text-sm text-purple-400 uppercase tracking-wider font-medium">
                            {exampleSteps[1].title}
                          </span>
                          <motion.div
                            animate={{
                              boxShadow: [
                                '0 0 0 rgba(168, 85, 247, 0)',
                                '0 0 20px rgba(168, 85, 247, 0.3)',
                                '0 0 0 rgba(168, 85, 247, 0)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-8 py-4 rounded-xl bg-purple-900/30 border border-purple-500/40"
                          >
                            <p className="text-xl text-purple-200 italic">
                              {exampleSteps[1].content}
                            </p>
                          </motion.div>
                          <Button
                            variant="secondary"
                            onClick={handleNextStep}
                            icon={<ArrowRight className="w-5 h-5" />}
                            iconPosition="right"
                          >
                            Reveal Insight
                          </Button>
                        </motion.div>
                      )}

                      {exampleStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-center space-y-4"
                        >
                          <span className="text-sm text-emerald-400 uppercase tracking-wider font-medium">
                            {exampleSteps[2].title}
                          </span>
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="px-8 py-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40"
                          >
                            <p className="text-xl text-emerald-200 font-medium">
                              {exampleSteps[2].content}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && exampleStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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

export default WhatIsAI;
