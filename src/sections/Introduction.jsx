import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, MessageSquare, Target, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, Button } from '../components/common';

/**
 * Introduction Section (2-3 min)
 * Animated welcome with learning objectives and instructor note
 */
const Introduction = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showObjectives, setShowObjectives] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const welcomeText = "Today you'll learn the foundations of working with AI";

  // Typewriter effect for welcome message
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < welcomeText.length) {
        setDisplayedText(welcomeText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowObjectives(true), 500);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  // Show instructor note after objectives
  useEffect(() => {
    if (showObjectives) {
      const timer = setTimeout(() => setShowNote(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [showObjectives]);

  // Show button after note
  useEffect(() => {
    if (showNote) {
      const timer = setTimeout(() => setShowButton(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showNote]);

  const learningObjectives = [
    {
      icon: Brain,
      text: "Understand what AI actually is (no magic involved)",
      color: "purple"
    },
    {
      icon: MessageSquare,
      text: "Learn why your input determines the output quality",
      color: "cyan"
    },
    {
      icon: Target,
      text: "Master the mental model for effective AI communication",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full space-y-12">
        {/* Animated Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          {/* Sparkle Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          {/* Welcome Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Mastery
            </span>
          </motion.h1>

          {/* Typewriter Text */}
          <div className="h-12 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-gray-300">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 inline-block w-0.5 h-6 bg-purple-400 align-middle"
              />
            </p>
          </div>
        </motion.div>

        {/* Learning Objectives */}
        <AnimatePresence>
          {showObjectives && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-center text-lg font-medium text-gray-400 uppercase tracking-wider">
                What You'll Learn
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {learningObjectives.map((objective, index) => {
                  const IconComponent = objective.icon;
                  const colorClasses = {
                    purple: 'from-purple-600 to-purple-800 shadow-purple-500/20',
                    cyan: 'from-cyan-600 to-cyan-800 shadow-cyan-500/20',
                    green: 'from-emerald-600 to-emerald-800 shadow-emerald-500/20'
                  };

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Card
                        glowColor={objective.color}
                        className="h-full"
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[objective.color]} shadow-lg`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-gray-200 font-medium leading-relaxed">
                            {objective.text}
                          </p>
                          <motion.div
                            className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: index * 0.2 + 0.5 }}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructor Note */}
        <AnimatePresence>
          {showNote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/40 p-6">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-xl" />

                <div className="relative flex items-start gap-4">
                  <motion.div
                    initial={{ rotate: -15 }}
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
                  >
                    <Lightbulb className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-amber-300 text-sm uppercase tracking-wider">
                      Instructor Note
                    </h3>
                    <p className="text-lg text-white leading-relaxed">
                      By the end, you'll already be better at using ChatGPT and Claude than{' '}
                      <span className="font-bold text-amber-300">90% of people</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Let's Begin Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                Let's Begin
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Introduction;
