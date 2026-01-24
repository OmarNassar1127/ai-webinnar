import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Table, FileSpreadsheet, BarChart3, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, Button } from '../../components/common';

const learningObjectives = [
  {
    icon: Table,
    title: 'Analyze Spreadsheets',
    description: 'Ask questions about your data and get instant answers',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: FileSpreadsheet,
    title: 'Generate Reports',
    description: 'Create formatted reports automatically from raw data',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: BarChart3,
    title: 'Find Insights',
    description: 'Discover patterns and trends hidden in your numbers',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500'
  }
];

function Introduction({ onComplete }) {
  const [showObjectives, setShowObjectives] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowObjectives(true), 800);
    const timer2 = setTimeout(() => setShowNote(true), 1600);
    const timer3 = setTimeout(() => setShowButton(true), 2200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Welcome Animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-6"
          animate={{
            boxShadow: [
              '0 0 20px rgba(6, 182, 212, 0.3)',
              '0 0 40px rgba(6, 182, 212, 0.5)',
              '0 0 20px rgba(6, 182, 212, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Database className="w-10 h-10 text-cyan-400" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-white">AI Meets Your</span>{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Spreadsheets
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-slate-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your data holds valuable insights. Learn how AI can help you analyze,
          clean, and generate reports from your spreadsheets faster than ever before.
        </motion.p>
      </motion.div>

      {/* Learning Objectives */}
      {showObjectives && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold text-slate-300 mb-6 text-center">
            What you'll learn in this lesson:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningObjectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card
                  className="h-full p-6 text-center hover:scale-105 transition-transform duration-300"
                  glowColor={objective.color}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${objective.gradient} bg-opacity-20 mb-4`}>
                    <objective.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {objective.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {objective.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instructor Note */}
      {showNote && (
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Lightbulb className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-2">
                  Good News for Data People
                </h3>
                <p className="text-slate-300">
                  If you work with spreadsheets regularly, you're about to become
                  significantly more productive. AI doesn't just help with coding -
                  it's incredibly powerful for data analysis and reporting tasks too.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Begin Button */}
      {showButton && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onComplete}
            icon={<Database className="w-5 h-5" />}
          >
            Let's Explore Data & AI
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default Introduction;
