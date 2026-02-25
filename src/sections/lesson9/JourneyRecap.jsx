import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Code, Network, Play, Wrench, Target, Database, Eye, Trophy,
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useLesson9 } from '../../context/Lesson9Context';

const journeyLessons = [
  {
    id: 1,
    title: 'AI Thinking Foundations',
    icon: Brain,
    color: 'purple',
    keyLearning: 'How AI processes information and why your input matters',
    skills: ['Pattern recognition', 'Prompt structure', 'AI collaboration'],
  },
  {
    id: 2,
    title: 'How Software Works',
    icon: Code,
    color: 'cyan',
    keyLearning: 'The restaurant analogy - Frontend, Backend, Database, API',
    skills: ['Software components', 'Technical vocabulary', 'System thinking'],
  },
  {
    id: 3,
    title: 'Claude & Cowork',
    icon: Network,
    color: 'emerald',
    keyLearning: 'Claude Cowork, MCP connections, 50+ Vloto use cases',
    skills: ['Cowork prompting', 'Operations automation', 'AI-powered workflows'],
  },
  {
    id: 4,
    title: 'AI in Action',
    icon: Play,
    color: 'pink',
    keyLearning: 'Watching AI build - iteration, feedback, refinement',
    skills: ['Observation', 'Iteration mindset', 'Quality assessment'],
  },
  {
    id: 5,
    title: 'Your First Build',
    icon: Wrench,
    color: 'amber',
    keyLearning: 'The WHAT Framework for describing tools',
    skills: ['Requirements writing', 'Clear communication', 'Planning'],
  },
  {
    id: 6,
    title: 'Building for Operations',
    icon: Target,
    color: 'blue',
    keyLearning: 'Creating specifications for real Vloto tools',
    skills: ['Specification writing', 'Problem analysis', 'Solution design'],
  },
  {
    id: 7,
    title: 'Data & AI',
    icon: Database,
    color: 'violet',
    keyLearning: 'AI for spreadsheets, reports, cleaning, and insights',
    skills: ['Data analysis', 'Report automation', 'Insight extraction'],
  },
  {
    id: 8,
    title: 'The Magic Lesson',
    icon: Eye,
    color: 'emerald',
    keyLearning: 'Autonomous AI development with Ralph and PRDs',
    skills: ['Autonomous systems', 'PRD writing', 'AI direction'],
  },
];

const beforeAfterSkills = {
  before: [
    'Confused by AI terminology',
    'Intimidated by technical concepts',
    'Dependent on developers for tools',
    'Struggled to describe what you need',
    'Limited by manual processes',
  ],
  after: [
    'Fluent in AI concepts',
    'Comfortable with software architecture',
    'Can direct AI to build tools',
    'Expert at clear requirements',
    'Empowered to automate workflows',
  ],
};

export default function JourneyRecap({ onComplete }) {
  const { completeSection } = useLesson9();
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [showSkillsComparison, setShowSkillsComparison] = useState(false);

  const handleContinue = () => {
    completeSection(2);
    onComplete();
  };

  const colorClasses = {
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-400' },
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-400' },
    pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/40', text: 'text-pink-400' },
    amber: { bg: 'bg-amber-500/20', border: 'border-amber-500/40', text: 'text-amber-400' },
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400' },
    violet: { bg: 'bg-violet-500/20', border: 'border-violet-500/40', text: 'text-violet-400' },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Your Learning Journey
        </h1>
        <p className="text-lg text-slate-400">
          Look back at everything you've accomplished
        </p>
      </motion.div>

      {/* Journey Timeline */}
      <div className="space-y-4 mb-12">
        {journeyLessons.map((lesson, index) => {
          const colors = colorClasses[lesson.color];
          const isExpanded = expandedLesson === lesson.id;
          const Icon = lesson.icon;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all ${isExpanded ? 'ring-2 ring-purple-500/50' : ''}`}
                onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-sm">Lesson {lesson.id}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h3 className="text-white font-medium">{lesson.title}</h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-700"
                    >
                      <p className="text-slate-300 mb-3">{lesson.keyLearning}</p>
                      <div className="flex flex-wrap gap-2">
                        {lesson.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Skills Before/After */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setShowSkillsComparison(!showSkillsComparison)}
        >
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Your Transformation
          </h2>
          {showSkillsComparison ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>

        {showSkillsComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Before */}
            <Card className="p-6 bg-slate-800/50 border-red-500/30">
              <h3 className="text-lg font-medium text-red-400 mb-4">Before This Course</h3>
              <ul className="space-y-3">
                {beforeAfterSkills.before.map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-slate-400"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </Card>

            {/* After */}
            <Card className="p-6 bg-slate-800/50 border-emerald-500/30">
              <h3 className="text-lg font-medium text-emerald-400 mb-4">After This Course</h3>
              <ul className="space-y-3">
                {beforeAfterSkills.after.map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex justify-center"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
        >
          View Your Tool Showcase
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
