import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket, Wrench, MessageSquare, Calendar, Book, ExternalLink,
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Zap
} from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useLesson9 } from '../../context/Lesson9Context';

const immediateSteps = [
  {
    id: 1,
    title: 'Build Your Tool',
    description: 'Take your Lesson 6 specification and bring it to life with Claude Code',
    icon: Wrench,
    color: 'purple',
    timeframe: 'This Week',
    tips: [
      'Start with a simple version (MVP)',
      'Test with real users early',
      'Iterate based on feedback',
    ],
  },
  {
    id: 2,
    title: 'Create Your Claude Project',
    description: 'Set up a dedicated Claude project for your operations work',
    icon: MessageSquare,
    color: 'cyan',
    timeframe: 'Today',
    tips: [
      'Add Vloto-specific context',
      'Include your role and responsibilities',
      'Add common tasks and workflows',
    ],
  },
  {
    id: 3,
    title: 'Practice Weekly',
    description: 'Use AI tools in your daily work to build fluency',
    icon: Calendar,
    color: 'emerald',
    timeframe: 'Ongoing',
    tips: [
      'Start each day with one AI-assisted task',
      'Document what works well',
      'Share learnings with colleagues',
    ],
  },
];

const resources = [
  {
    title: 'Claude Code Documentation',
    description: 'Official guides and tutorials',
    url: '#',
    type: 'Documentation',
  },
  {
    title: 'Prompt Engineering Guide',
    description: 'Best practices for AI communication',
    url: '#',
    type: 'Guide',
  },
  {
    title: 'AI Tools Comparison',
    description: 'Overview of available AI assistants',
    url: '#',
    type: 'Resource',
  },
  {
    title: 'Vloto AI Community',
    description: 'Connect with other learners',
    url: '#',
    type: 'Community',
  },
];

const skillLevels = [
  { level: 'Beginner', label: 'AI Curious', description: 'Just starting to explore AI tools', completed: true },
  { level: 'Intermediate', label: 'AI User', description: 'Comfortable with basic AI interactions', completed: true },
  { level: 'Advanced', label: 'AI Director', description: 'Can direct AI to build tools', completed: true },
  { level: 'Expert', label: 'AI Architect', description: 'Designs complex AI-powered workflows', completed: false },
];

export default function WhatsNext({ onComplete }) {
  const { completeSection } = useLesson9();
  const [expandedStep, setExpandedStep] = useState(null);

  const handleContinue = () => {
    completeSection(4);
    onComplete();
  };

  const colorClasses = {
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-400' },
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-400' },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex p-3 rounded-full bg-purple-500/20 border border-purple-500/40 mb-4">
          <Rocket className="w-8 h-8 text-purple-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          What's Next?
        </h1>
        <p className="text-lg text-slate-400">
          Your journey doesn't end here - it's just beginning
        </p>
      </motion.div>

      {/* Immediate Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Immediate Next Steps
        </h2>

        <div className="space-y-4">
          {immediateSteps.map((step, index) => {
            const colors = colorClasses[step.color];
            const isExpanded = expandedStep === step.id;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${isExpanded ? 'ring-2 ring-purple-500/50' : ''}`}
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium">{step.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs ${colors.bg} ${colors.text}`}>
                            {step.timeframe}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">{step.description}</p>
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
                        className="mt-4 pt-4 border-t border-slate-700"
                      >
                        <p className="text-slate-500 text-sm mb-2">Tips for success:</p>
                        <ul className="space-y-2">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-center gap-2 text-slate-300 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Skill Level Progression */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold text-white mb-6">Your AI Skill Level</h2>

        <Card className="p-6">
          <div className="space-y-4">
            {skillLevels.map((skill, index) => (
              <div key={skill.level} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  skill.completed
                    ? 'bg-emerald-500/20 border-2 border-emerald-500'
                    : 'bg-slate-700/50 border-2 border-slate-600'
                }`}>
                  {skill.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <span className="text-slate-500 text-sm">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${skill.completed ? 'text-white' : 'text-slate-500'}`}>
                      {skill.label}
                    </span>
                    {skill.level === 'Advanced' && (
                      <span className="px-2 py-0.5 rounded text-xs bg-purple-500/20 text-purple-400">
                        You are here!
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              <span className="text-purple-400">Next level unlocks:</span> Design and orchestrate complex multi-agent workflows
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Book className="w-5 h-5 text-cyan-400" />
          Helpful Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <Card key={resource.title} className="p-4 hover:bg-slate-700/50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase">{resource.type}</span>
                  <h3 className="text-white font-medium">{resource.title}</h3>
                  <p className="text-sm text-slate-400">{resource.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
        >
          Continue to Final Words
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
