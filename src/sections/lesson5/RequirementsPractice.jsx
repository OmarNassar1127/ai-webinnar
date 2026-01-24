import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, Button } from '../../components/common';

const scenarios = [
  {
    id: 1,
    title: 'Customer Complaint Tracker',
    description: 'A tool to track and manage customer complaints from intake to resolution.',
    goodAnswer: {
      what: 'A tool that tracks customer complaints from when they come in until they are resolved, helping the team see which issues need attention and ensuring nothing falls through the cracks.',
      how: 'Support staff enter complaints through a form with customer name, contact info, complaint type (dropdown), and description. Each complaint gets a status (New, In Progress, Resolved). Dashboard shows all complaints sorted by age, with filters by status and type.',
      actions: 'When a complaint is submitted, it gets timestamped and assigned "New" status. Staff can update status and add notes. When marked "Resolved", system calculates resolution time. Daily summary email sent to manager with unresolved count.',
      things: 'Customer contact details, complaint descriptions and categories, status history with timestamps, staff notes for each complaint, resolution times, and 90 days of historical data.'
    }
  },
  {
    id: 2,
    title: 'Car Checklist App',
    description: 'A tool for drivers to complete vehicle inspection checklists before shifts.',
    goodAnswer: {
      what: 'A mobile-friendly checklist tool that ensures drivers complete vehicle safety inspections before each shift, documenting any issues and preventing unsafe cars from going out.',
      how: 'Drivers select their assigned car and see a checklist of items (tires, lights, fluids, cleanliness, etc.). They tap each item to mark it OK or flag an issue with a photo and note. Once complete, they submit the checklist.',
      actions: 'When checklist is submitted, system validates all items are checked. If any issues flagged, it notifies the maintenance team with details and photos. Car status is updated to "needs attention" and prevented from dispatch until cleared.',
      things: 'Car inventory with IDs and status, checklist templates by vehicle type, completed checklists with timestamps and driver info, issue reports with photos, maintenance team contact list.'
    }
  },
  {
    id: 3,
    title: 'Your Custom Tool',
    description: 'Think of a tool that would help your team. Use the WHAT framework to describe it.',
    isCustom: true
  }
];

function ScenarioCard({ scenario, isActive, onClick, userAnswers, setUserAnswers, showComparison, setShowComparison }) {
  const handleInputChange = (field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [scenario.id]: {
        ...prev[scenario.id],
        [field]: value
      }
    }));
  };

  const currentAnswers = userAnswers[scenario.id] || {};

  return (
    <motion.div layout className="mb-4">
      <Card
        className={`transition-all ${isActive ? 'border-purple-500/50' : ''}`}
      >
        {/* Header - Always visible */}
        <button
          className="w-full p-6 text-left"
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{scenario.title}</h3>
              <p className="text-slate-400 text-sm">{scenario.description}</p>
            </div>
            <motion.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6"
            >
              <div className="space-y-4 pt-4 border-t border-slate-700">
                {/* W - What */}
                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    W - What does this tool do?
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                    rows={2}
                    placeholder="Describe the main purpose..."
                    value={currentAnswers.what || ''}
                    onChange={(e) => handleInputChange('what', e.target.value)}
                  />
                </div>

                {/* H - How */}
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    H - How do users interact with it?
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    rows={2}
                    placeholder="Describe the user interface..."
                    value={currentAnswers.how || ''}
                    onChange={(e) => handleInputChange('how', e.target.value)}
                  />
                </div>

                {/* A - Actions */}
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    A - What actions happen behind the scenes?
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                    rows={2}
                    placeholder="Describe the backend logic..."
                    value={currentAnswers.actions || ''}
                    onChange={(e) => handleInputChange('actions', e.target.value)}
                  />
                </div>

                {/* T - Things */}
                <div>
                  <label className="block text-sm font-medium text-orange-400 mb-2">
                    T - What things need to be remembered?
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
                    rows={2}
                    placeholder="Describe what data to store..."
                    value={currentAnswers.things || ''}
                    onChange={(e) => handleInputChange('things', e.target.value)}
                  />
                </div>

                {/* Compare Button (for scenarios with good answers) */}
                {scenario.goodAnswer && (
                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      onClick={() => setShowComparison(showComparison === scenario.id ? null : scenario.id)}
                    >
                      {showComparison === scenario.id ? 'Hide' : 'Show'} Example Answer
                    </Button>

                    {showComparison === scenario.id && (
                      <motion.div
                        className="mt-4 p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span className="font-semibold text-emerald-300">Example Answer</span>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-purple-400 font-medium">W:</span>
                            <span className="text-slate-300 ml-2">{scenario.goodAnswer.what}</span>
                          </div>
                          <div>
                            <span className="text-cyan-400 font-medium">H:</span>
                            <span className="text-slate-300 ml-2">{scenario.goodAnswer.how}</span>
                          </div>
                          <div>
                            <span className="text-emerald-400 font-medium">A:</span>
                            <span className="text-slate-300 ml-2">{scenario.goodAnswer.actions}</span>
                          </div>
                          <div>
                            <span className="text-orange-400 font-medium">T:</span>
                            <span className="text-slate-300 ml-2">{scenario.goodAnswer.things}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function RequirementsPractice({ onComplete }) {
  const [activeScenario, setActiveScenario] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [showComparison, setShowComparison] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-4"
        >
          <FileText className="w-8 h-8 text-cyan-400" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Requirements Practice
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Practice using the WHAT framework on real scenarios. The more you practice,
          the better you'll get at describing tools clearly.
        </p>
      </motion.div>

      {/* Scenarios */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isActive={activeScenario === scenario.id}
            onClick={() => setActiveScenario(activeScenario === scenario.id ? null : scenario.id)}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            showComparison={showComparison}
            setShowComparison={setShowComparison}
          />
        ))}
      </motion.div>

      {/* Pro Tip */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">Pro Tip</h3>
              <p className="text-slate-300">
                Don't worry about getting it perfect on the first try. The best descriptions come from
                iterating - start with a rough version and refine it. AI can help you improve your
                descriptions too. Just ask: "Can you help me make this description more specific?"
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
        transition={{ delay: 0.4 }}
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          Learn Common Mistakes
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default RequirementsPractice;
