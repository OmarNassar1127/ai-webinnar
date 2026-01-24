import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Code, CheckCircle, XCircle, ArrowRight, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { Button, Card } from '../../components/common';

const examplePRD = {
  project: "Customer Feedback Dashboard",
  branchName: "feature/feedback-dashboard",
  description: "Build a dashboard to view and manage customer feedback",
  userStories: [
    {
      id: "US-001",
      title: "Create feedback list component",
      acceptanceCriteria: [
        "Shows list of all feedback entries",
        "Each entry shows customer name, date, rating, comment",
        "Sorted by date (newest first)",
        "Typecheck passes"
      ],
      passes: true
    },
    {
      id: "US-002",
      title: "Add filtering by rating",
      acceptanceCriteria: [
        "Filter dropdown with options: All, 5 stars, 4 stars, etc.",
        "List updates when filter changes",
        "Filter persists on page refresh",
        "Typecheck passes"
      ],
      passes: false
    },
    {
      id: "US-003",
      title: "Add search functionality",
      acceptanceCriteria: [
        "Search box filters by customer name or comment text",
        "Search is case-insensitive",
        "Debounced input (300ms)",
        "Typecheck passes"
      ],
      passes: false
    }
  ]
};

const prdSections = [
  {
    key: 'project',
    title: 'Project Name',
    description: 'Clear, descriptive name for the project',
    example: examplePRD.project,
  },
  {
    key: 'branchName',
    title: 'Branch Name',
    description: 'Git branch where Ralph will commit',
    example: examplePRD.branchName,
  },
  {
    key: 'description',
    title: 'Description',
    description: 'Brief overview of what the project does',
    example: examplePRD.description,
  },
  {
    key: 'userStories',
    title: 'User Stories',
    description: 'List of tasks with acceptance criteria and pass/fail status',
    example: 'Array of story objects',
  },
];

const storyFields = [
  { key: 'id', title: 'ID', description: 'Unique identifier (US-001, US-002...)' },
  { key: 'title', title: 'Title', description: 'What this story accomplishes' },
  { key: 'acceptanceCriteria', title: 'Acceptance Criteria', description: 'List of requirements that must pass' },
  { key: 'passes', title: 'Passes', description: 'true when implemented, false when pending' },
];

const CodeBlock = ({ code, language = 'json' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/50 overflow-x-auto text-sm">
        <code className="text-slate-300 font-mono">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-slate-800/80 border border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </div>
  );
};

const StoryCard = ({ story, index }) => {
  const [expanded, setExpanded] = useState(index === 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={`p-4 cursor-pointer transition-all ${
          story.passes ? 'border-emerald-500/30' : 'border-amber-500/30'
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {story.passes ? (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-400" />
            )}
            <div>
              <span className="text-xs text-slate-500">{story.id}</span>
              <h4 className="text-white font-medium">{story.title}</h4>
            </div>
          </div>
          {expanded ? (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-slate-700/50"
            >
              <p className="text-sm text-slate-400 mb-2">Acceptance Criteria:</p>
              <ul className="space-y-1">
                {story.acceptanceCriteria.map((criteria, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-slate-500 mt-0.5">•</span>
                    <span className="text-slate-300">{criteria}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-slate-500">Status:</span>
                <span className={`text-xs font-medium ${story.passes ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {story.passes ? 'passes: true' : 'passes: false'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default function ThePRD({ onComplete }) {
  const [activeSection, setActiveSection] = useState(null);

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
          className="inline-flex p-4 rounded-full bg-purple-500/20 border border-purple-500/40 mb-6"
        >
          <FileText className="w-10 h-10 text-purple-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The <span className="text-purple-400">PRD</span> Structure
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          The Product Requirements Document is your contract with Ralph. It defines exactly what to build and how to know when it's done.
        </p>
      </motion.div>

      {/* PRD Structure Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Code className="w-5 h-5 text-cyan-400" />
          PRD Structure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {prdSections.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveSection(activeSection === section.key ? null : section.key)}
              className="cursor-pointer"
            >
              <Card className={`p-4 transition-all ${activeSection === section.key ? 'border-purple-500/50' : ''}`}>
                <h4 className="text-white font-medium mb-1">{section.title}</h4>
                <p className="text-sm text-slate-400">{section.description}</p>
                {activeSection === section.key && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 pt-2 border-t border-slate-700/50"
                  >
                    <code className="text-xs text-purple-400">{section.example}</code>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* User Story Fields */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6">User Story Fields</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {storyFields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              <code className="text-cyan-400 text-sm">{field.key}</code>
              <p className="text-xs text-slate-400 mt-1">{field.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Example PRD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Example: Feedback Dashboard</h2>

        <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-slate-500">Project:</span>
              <span className="text-white font-medium">{examplePRD.project}</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-slate-500">Branch:</span>
              <code className="text-cyan-400 text-sm">{examplePRD.branchName}</code>
            </div>
            <p className="text-sm text-slate-400">{examplePRD.description}</p>
          </div>

          <div className="space-y-3">
            {examplePRD.userStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-cyan-500/20">
            <p className="text-sm text-cyan-300">
              <strong>Ralph's View:</strong> US-001 passes, so Ralph skips it. US-002 is next (passes: false) — that's what Ralph works on.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Raw JSON Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-4">The Raw JSON</h2>
        <CodeBlock code={JSON.stringify(examplePRD, null, 2)} />
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mb-12"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-800/40 to-cyan-900/40 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FileText className="w-6 h-6 text-purple-400" />
            </motion.div>
            <span className="text-purple-300 font-medium">Key Insight</span>
          </div>
          <p className="text-lg text-white">
            The PRD is your <span className="text-cyan-400">specification</span>. The clearer your acceptance criteria, the better Ralph performs. Think of it as writing very precise instructions for a capable assistant.
          </p>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          See It In Action
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
