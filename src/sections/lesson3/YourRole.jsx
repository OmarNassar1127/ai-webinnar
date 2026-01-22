import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  User,
  Brain,
  MessageSquare,
  Eye,
  Heart,
  Sparkles,
  ArrowRight,
  Code,
  FileText,
  Zap,
  Users,
  Lightbulb,
  Target,
  Award
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 3 Section 6 - Your Role in This Future
 * Shows the new skill stack, superpowers, and Human-AI partnership
 */

const superpowersData = [
  {
    id: 'domain',
    title: 'Domain Knowledge',
    icon: Brain,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-violet-800/20',
    borderColor: 'border-purple-500/40',
    description: 'You understand Vloto\'s operations in a way no AI ever will.',
    examples: [
      'Knowing which problems are actually worth solving',
      'Understanding what customers really need (not just what they say)',
      'Recognizing when something "looks right" but won\'t work in practice',
      'Predicting how changes will affect your team\'s workflow'
    ],
    aiCant: 'AI can\'t understand your business context without you explaining it.'
  },
  {
    id: 'communication',
    title: 'Clear Communication',
    icon: MessageSquare,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-blue-800/20',
    borderColor: 'border-cyan-500/40',
    description: 'The better you describe, the better AI performs.',
    examples: [
      'Translating vague business needs into specific requirements',
      'Breaking complex problems into manageable pieces',
      'Asking the right follow-up questions',
      'Knowing when to provide more context vs. simplify'
    ],
    aiCant: 'AI can only be as good as the instructions it receives.'
  },
  {
    id: 'judgment',
    title: 'Quality Judgment',
    icon: Eye,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-green-800/20',
    borderColor: 'border-emerald-500/40',
    description: 'You can tell if AI\'s output is actually useful.',
    examples: [
      'Spotting when something is technically correct but practically wrong',
      'Knowing which details matter and which don\'t',
      'Evaluating solutions against real-world constraints',
      'Deciding when "good enough" is actually good enough'
    ],
    aiCant: 'AI doesn\'t know if its answer actually solves your problem.'
  },
  {
    id: 'human',
    title: 'Human Touch',
    icon: Heart,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-900/40 to-rose-800/20',
    borderColor: 'border-pink-500/40',
    description: 'Some things simply require a human.',
    examples: [
      'Building trust with partners and customers',
      'Handling sensitive conversations with empathy',
      'Making ethical decisions that affect people',
      'Bringing creativity and intuition to problems'
    ],
    aiCant: 'AI can\'t form genuine relationships or understand emotional nuance.'
  }
];

const SkillStackComparison = () => {
  const [showNewWay, setShowNewWay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNewWay(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-lg font-semibold text-slate-400 text-center">
        The New Skill Stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Way */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/50 p-6"
        >
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-700/60 border border-slate-600/50">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Old Way</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-700/60">
                <Code className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-300">Learn to Code</h3>
            </div>

            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-2xl">📚</span>
                <span className="text-slate-400">Study programming languages</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-2xl">⏰</span>
                <span className="text-slate-400">Months or years of practice</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-2xl">🔧</span>
                <span className="text-slate-400">Debug obscure errors</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-2xl">😰</span>
                <span className="text-slate-400">Feel frustrated and stuck</span>
              </motion.div>
            </div>

            <div className="text-center pt-2">
              <span className="text-sm text-slate-500">Barrier: Very High</span>
            </div>
          </div>
        </motion.div>

        {/* New Way */}
        <AnimatePresence>
          {showNewWay && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border border-purple-500/40 p-6"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40">
                <span className="text-xs text-purple-300 uppercase tracking-wider">New Way</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FileText className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Describe Clearly</h3>
                </div>

                <div className="space-y-3">
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-purple-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-2xl">💬</span>
                    <span className="text-gray-300">Explain what you need in plain English</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-cyan-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-2xl">⚡</span>
                    <span className="text-gray-300">Get results in minutes or hours</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-emerald-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-2xl">🔄</span>
                    <span className="text-gray-300">Iterate with feedback, not frustration</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-pink-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-2xl">🎯</span>
                    <span className="text-gray-300">Focus on WHAT, not HOW</span>
                  </motion.div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-sm text-emerald-400">Barrier: Skills You Already Have</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Arrow between */}
      <div className="hidden md:flex justify-center -mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex items-center gap-2 text-slate-500"
        >
          <span className="text-sm">The skills that matter have changed</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SuperpowerCard = ({ superpower, index, isExpanded, onToggle }) => {
  const Icon = superpower.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
    >
      <Card
        glowColor={superpower.color}
        className="cursor-pointer h-full"
        onClick={onToggle}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: isExpanded ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className={`p-3 rounded-xl bg-gradient-to-br ${superpower.gradient} shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{superpower.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{superpower.description}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </motion.div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Examples */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                    How This Helps
                  </p>
                  <div className="space-y-2">
                    {superpower.examples.map((example, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          superpower.color === 'purple' ? 'text-purple-400' :
                          superpower.color === 'cyan' ? 'text-cyan-400' :
                          superpower.color === 'emerald' ? 'text-emerald-400' :
                          'text-pink-400'
                        }`} />
                        {example}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Can't */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${superpower.bgGradient} border ${superpower.borderColor}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <p className="text-sm text-amber-400 uppercase tracking-wider">Why This Matters</p>
                  </div>
                  <p className="text-gray-300 italic">{superpower.aiCant}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <p className="text-center text-gray-500 text-sm">
              Click to learn more
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const HumanAIPartnership = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="space-y-6"
    >
      <h2 className="text-lg font-semibold text-slate-400 text-center">
        The Human-AI Partnership
      </h2>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800/80 via-purple-900/30 to-slate-800/80 border border-purple-500/30 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-purple-500/5" />

        <div className="relative">
          {/* Partnership Visual */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            {/* Human */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="text-center space-y-3"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30"
              >
                <User className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <p className="text-lg font-bold text-white">You</p>
                <p className="text-sm text-gray-400">The Director</p>
              </div>
            </motion.div>

            {/* Connection */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="hidden md:flex items-center">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500"
                />
                <Users className="w-8 h-8 text-purple-400 mx-2" />
                <motion.div
                  animate={{ x: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                />
              </div>
              <span className="text-xs text-purple-400 uppercase tracking-wider">Working Together</span>
            </motion.div>

            {/* AI */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="text-center space-y-3"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <p className="text-lg font-bold text-white">AI</p>
                <p className="text-sm text-gray-400">The Executor</p>
              </div>
            </motion.div>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* You Bring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30"
            >
              <p className="text-sm text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> You Bring
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Vision and goals
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Business context
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Quality standards
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Final decisions
                </li>
              </ul>
            </motion.div>

            {/* AI Brings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/30"
            >
              <p className="text-sm text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> AI Brings
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Speed and efficiency
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Technical execution
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Tireless iteration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Broad capabilities
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const KeyInsightBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-cyan-900/30 to-emerald-900/40 border border-purple-500/40 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-emerald-500/5" />

        <div className="relative space-y-4 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 uppercase tracking-wider">
            Your New Title
          </h3>

          <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
            You&apos;re not learning to <span className="text-slate-400 line-through">code</span>.
            <br />
            You&apos;re becoming an <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">AI Director</span>.
          </p>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Directors don&apos;t operate cameras—they tell the story.
            You don&apos;t write code—you describe solutions and guide AI to build them.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {['Set the vision', 'Guide the process', 'Judge the results', 'Own the outcome'].map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 text-sm text-gray-300"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function YourRole({ onComplete }) {
  const [showContent, setShowContent] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-600 to-cyan-600 shadow-lg shadow-emerald-500/30"
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Your Role in{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              This Future
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The AI revolution isn&apos;t about replacing you—it&apos;s about
            unlocking capabilities you didn&apos;t know you had.
          </p>
        </motion.div>

        {/* Skill Stack Comparison */}
        <AnimatePresence>
          {showContent && <SkillStackComparison />}
        </AnimatePresence>

        {/* Your Superpowers */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
                Your Superpowers (Things AI Can&apos;t Replace)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {superpowersData.map((superpower, index) => (
                  <SuperpowerCard
                    key={superpower.id}
                    superpower={superpower}
                    index={index}
                    isExpanded={expandedCard === superpower.id}
                    onToggle={() => handleToggle(superpower.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Human-AI Partnership */}
        <AnimatePresence>
          {showContent && <HumanAIPartnership />}
        </AnimatePresence>

        {/* Key Insight Box */}
        <AnimatePresence>
          {showContent && <KeyInsightBox />}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="flex justify-center pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onComplete}
                icon={<ChevronRight className="w-5 h-5" />}
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
}

export default YourRole;
