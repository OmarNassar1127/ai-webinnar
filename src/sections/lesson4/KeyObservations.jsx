import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, MessageSquare, AlertCircle, FileText, Code, Zap, ChevronDown, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, Button } from '../../components/common';

const observations = [
  {
    id: 1,
    icon: MessageSquare,
    title: "It's a Conversation",
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    summary: 'Building with AI is like talking to a smart colleague',
    details: [
      'You describe what you want in plain English',
      'The AI asks questions when it needs clarity',
      'You provide feedback and the AI adjusts',
      'No coding knowledge required on your part'
    ],
    example: 'Instead of writing code, you said "I need a feedback form" and the AI understood exactly what to build.'
  },
  {
    id: 2,
    icon: AlertCircle,
    title: 'Mistakes are Normal',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    summary: "The first attempt isn't always perfect - and that's okay",
    details: [
      'Even experienced developers iterate multiple times',
      'The AI learns from your corrections',
      'Each fix makes the tool better',
      'Mistakes help clarify what you actually want'
    ],
    example: 'We asked for "modern styling" and got something close but not quite right. A quick clarification fixed it instantly.'
  },
  {
    id: 3,
    icon: FileText,
    title: 'Clear Description = Better Results',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    summary: 'The more specific you are, the better the AI delivers',
    details: [
      'Vague requests lead to generic solutions',
      'Specific details get specific results',
      'Mention who will use it and how',
      'Include examples when possible'
    ],
    example: '"A form" vs "A form where customers enter their name, email, and feedback message with a submit button" - big difference!'
  },
  {
    id: 4,
    icon: Code,
    title: "Don't Need to Understand Code",
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500',
    summary: 'You direct the AI - it handles the technical details',
    details: [
      'The AI writes all the code for you',
      'You focus on what the tool should do',
      'Technical decisions are made for you',
      'You can ask the AI to explain anything'
    ],
    example: 'The AI automatically chose the right way to store data and connect components. You just had to describe what you wanted.'
  },
  {
    id: 5,
    icon: Zap,
    title: 'Speed is Incredible',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    summary: 'What used to take weeks can now take hours',
    details: [
      'Traditional development: weeks to months',
      'AI-assisted building: hours to days',
      'Changes are instant - no waiting',
      'You can try multiple approaches quickly'
    ],
    example: 'Our feedback tool was built in under an hour. A developer building this from scratch might take 2-3 days.'
  }
];

function ObservationCard({ observation, isExpanded, onClick }) {
  return (
    <motion.div
      layout
      className="w-full"
    >
      <Card
        className={`p-6 cursor-pointer transition-all duration-300 ${
          isExpanded ? `border-${observation.color}-500/50` : ''
        }`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${observation.gradient} bg-opacity-20`}>
              <observation.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{observation.title}</h3>
              <p className="text-slate-400 text-sm">{observation.summary}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-6 pt-6 border-t border-slate-700"
            >
              {/* Details */}
              <div className="space-y-3 mb-6">
                {observation.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-2 h-2 mt-2 rounded-full bg-${observation.color}-400`} />
                    <span className="text-slate-300">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Example */}
              <div className={`p-4 rounded-xl bg-${observation.color}-900/20 border border-${observation.color}-500/30`}>
                <div className="text-sm font-medium text-slate-400 mb-2">Example from the demo:</div>
                <p className="text-slate-200">{observation.example}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function KeyObservations({ onComplete }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4"
        >
          <Eye className="w-8 h-8 text-purple-400" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          5 Key Observations
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          What did we learn from watching the AI build? Click each card to explore.
        </p>
      </motion.div>

      {/* Observation Cards */}
      <div className="space-y-4 mb-10">
        {observations.map((observation, index) => (
          <motion.div
            key={observation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ObservationCard
              observation={observation}
              isExpanded={expandedCard === observation.id}
              onClick={() => toggleCard(observation.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Honest Truth Box */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                The Honest Truth
              </h3>
              <p className="text-slate-300">
                AI building isn't magic - it's <strong className="text-white">collaboration</strong>.
                The AI is incredibly capable, but it needs your guidance. You bring the domain
                knowledge, the understanding of what your team needs, and the judgment of what's
                "good enough." The AI brings the technical skills to make it happen.
                Together, you can build things neither could do alone.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default KeyObservations;
