import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock, CheckCircle, FileText, Code, GitCommit, ArrowRight, Terminal } from 'lucide-react';
import { Button, Card } from '../../components/common';

const demoSteps = [
  {
    id: 1,
    title: 'Reading PRD',
    description: 'Ralph loads prd.json and finds first failing story',
    duration: 2,
    output: '> Reading prd.json...\n> Found US-002: "Add filtering by rating"\n> Status: passes: false',
  },
  {
    id: 2,
    title: 'Analyzing Requirements',
    description: 'Understanding acceptance criteria',
    duration: 3,
    output: '> Acceptance criteria:\n  - Filter dropdown with rating options\n  - List updates when filter changes\n  - Filter persists on refresh\n  - Typecheck passes',
  },
  {
    id: 3,
    title: 'Writing Code',
    description: 'Implementing the filter component',
    duration: 5,
    output: '> Creating FilterDropdown.jsx\n> Adding state management\n> Connecting to FeedbackList\n> Adding localStorage persistence',
  },
  {
    id: 4,
    title: 'Running Tests',
    description: 'Verifying typecheck and quality',
    duration: 3,
    output: '> npm run typecheck\n> ✓ No type errors\n> npm run lint\n> ✓ 0 warnings, 0 errors',
  },
  {
    id: 5,
    title: 'Committing',
    description: 'Creating commit with story ID',
    duration: 2,
    output: '> git add .\n> git commit -m "feat: [US-002] - Add filtering by rating"\n> Commit: abc123f',
  },
  {
    id: 6,
    title: 'Updating PRD',
    description: 'Marking story as complete',
    duration: 2,
    output: '> Updating prd.json\n> US-002: passes: true\n> Moving to next story...',
  },
];

const liveStats = {
  storiesCompleted: 34,
  totalStories: 42,
  currentStory: 'US-035',
  elapsedTime: '2h 47m',
  commits: 34,
};

const DemoPlayer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const step = demoSteps[currentStep];
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (currentStep < demoSteps.length - 1) {
            setCurrentStep(currentStep + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + (100 / (step.duration * 10));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const handlePlayPause = () => {
    if (!isPlaying && currentStep === demoSteps.length - 1 && progress >= 100) {
      // Reset if completed
      setCurrentStep(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const currentDemoStep = demoSteps[currentStep];

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-6">
        {demoSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index < currentStep
                  ? 'bg-emerald-500 text-white'
                  : index === currentStep
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                step.id
              )}
            </div>
            {index < demoSteps.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 mx-1 ${
                index < currentStep ? 'bg-emerald-500' : 'bg-slate-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Current step display */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h4 className="text-white font-medium">{currentDemoStep.title}</h4>
        </div>
        <p className="text-sm text-slate-400 mb-4">{currentDemoStep.description}</p>

        {/* Progress bar */}
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Terminal output */}
        <pre className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/50 font-mono text-sm text-emerald-400 overflow-x-auto">
          {currentDemoStep.output}
        </pre>
      </div>

      {/* Controls */}
      <div className="flex justify-center">
        <Button
          variant="secondary"
          onClick={handlePlayPause}
          className="flex items-center gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause Demo
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {currentStep === demoSteps.length - 1 && progress >= 100 ? 'Replay Demo' : 'Play Demo'}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

const LiveStats = () => {
  const progressPercent = Math.round((liveStats.storiesCompleted / liveStats.totalStories) * 100);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Live Session Stats
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 rounded-xl bg-slate-800/50">
          <p className="text-2xl font-bold text-white">{liveStats.storiesCompleted}/{liveStats.totalStories}</p>
          <p className="text-xs text-slate-400">Stories Complete</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/50">
          <p className="text-2xl font-bold text-cyan-400">{liveStats.currentStory}</p>
          <p className="text-xs text-slate-400">Current Story</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/50">
          <p className="text-2xl font-bold text-emerald-400">{liveStats.elapsedTime}</p>
          <p className="text-xs text-slate-400">Elapsed Time</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/50">
          <p className="text-2xl font-bold text-purple-400">{liveStats.commits}</p>
          <p className="text-xs text-slate-400">Commits Made</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Overall Progress</span>
          <span className="text-sm text-white font-medium">{progressPercent}%</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </Card>
  );
};

export default function SeeingItInAction({ onComplete }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex p-4 rounded-full bg-cyan-500/20 border border-cyan-500/40 mb-6"
        >
          <Play className="w-10 h-10 text-cyan-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Seeing It <span className="text-cyan-400">In Action</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Watch Ralph work through a user story — from reading the PRD to committing the solution.
        </p>
      </motion.div>

      {/* Demo Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          Demo: One Story Cycle
        </h2>
        <DemoPlayer />
      </motion.div>

      {/* Live Stats Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Example Session (This Course!)
        </h2>
        <LiveStats />

        <p className="text-sm text-slate-400 mt-4 text-center">
          Fun fact: This entire course was built by Ralph using the same pattern you're learning!
        </p>
      </motion.div>

      {/* What you'd see */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-purple-400" />
          What You See in Git
        </h2>

        <Card className="p-4 bg-slate-900/80">
          <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
{`$ git log --oneline

abc123f feat: [US-002] - Add filtering by rating
def456a feat: [US-001] - Create feedback list component
789abc0 chore: Initialize project structure
...

$ git show abc123f --stat

 src/components/FilterDropdown.jsx | 45 +++++++++++++++
 src/components/FeedbackList.jsx   | 12 ++--
 src/hooks/useFilter.js            | 23 ++++++++
 3 files changed, 75 insertions(+), 5 deletions(-)`}
          </pre>
        </Card>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-12"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/40 via-slate-800/40 to-purple-900/40 border border-cyan-500/30">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <span className="text-cyan-300 font-medium">Key Insight</span>
          </div>
          <p className="text-lg text-white">
            Ralph creates a clean git history with <span className="text-emerald-400">meaningful commits</span>. Each story = one commit. Easy to review, easy to revert if needed.
          </p>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="text-center"
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          When Should You Use This?
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
