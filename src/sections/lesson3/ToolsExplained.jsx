import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Languages,
  Smartphone,
  BookOpen,
  Code2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Lightbulb,
  Check,
  X,
  Mail,
  Calendar,
  FileSpreadsheet,
  Database,
  Plug,
  Brain,
  Hammer
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 3 Section 3 - Tools Explained Simply
 * Explains MCPs, Plugins, Skills, and AI IDEs with simple analogies
 */

const toolsData = [
  {
    id: 'mcp',
    title: 'MCP',
    fullName: 'Model Context Protocol',
    icon: Languages,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-violet-800/20',
    borderColor: 'border-purple-500/40',
    analogy: 'Universal Translator',
    analogyIcon: Languages,
    simpleExplanation: 'MCPs let AI talk to other software systems. Like a universal translator that lets AI speak "Gmail", "Slack", "Notion", and more.',
    detailedExplanation: 'An MCP is a standardized way for AI to connect to external services. Instead of each AI learning different ways to access different tools, MCPs provide one consistent method.',
    realExample: 'An MCP for Gmail lets your AI read, search, and send emails without needing a custom integration for each email action.',
    withoutTool: [
      'AI can only talk, not access real data',
      'You manually copy info between AI and apps',
      'Can\'t automate across different services'
    ],
    withTool: [
      'AI directly accesses your tools',
      'Information flows automatically',
      'Build workflows across any service'
    ]
  },
  {
    id: 'plugins',
    title: 'Plugins',
    fullName: 'AI Plugins / Extensions',
    icon: Plug,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-blue-800/20',
    borderColor: 'border-cyan-500/40',
    analogy: 'Phone Apps',
    analogyIcon: Smartphone,
    simpleExplanation: 'Plugins add new abilities to AI, just like apps add features to your phone. Want AI to browse the web? There\'s a plugin for that.',
    detailedExplanation: 'Plugins extend what AI can do beyond its core capabilities. They\'re like downloadable upgrades that give the AI new powers.',
    realExample: 'A web browser plugin lets ChatGPT search the internet in real-time. A Wolfram plugin lets it do advanced math calculations.',
    withoutTool: [
      'Limited to built-in capabilities',
      'Can\'t access real-time information',
      'Same features for everyone'
    ],
    withTool: [
      'Expandable with new abilities',
      'Access live data and services',
      'Customize AI to your needs'
    ]
  },
  {
    id: 'skills',
    title: 'Skills',
    fullName: 'Custom Skills / Prompts',
    icon: BookOpen,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-green-800/20',
    borderColor: 'border-emerald-500/40',
    analogy: 'Training Manuals',
    analogyIcon: BookOpen,
    simpleExplanation: 'Skills are specialized knowledge packages. Like giving someone a training manual that makes them an expert in a specific task.',
    detailedExplanation: 'Skills are reusable prompts or instruction sets that teach AI how to handle specific tasks consistently. They capture expertise in a repeatable format.',
    realExample: 'A "Customer Support Tone" skill ensures AI always responds with the right level of professionalism. A "Vloto Report Format" skill standardizes all fleet reports.',
    withoutTool: [
      'Explain requirements every time',
      'Inconsistent outputs',
      'Can\'t share expertise easily'
    ],
    withTool: [
      'Consistent, reliable results',
      'Share best practices across team',
      'Build on previous work'
    ]
  },
  {
    id: 'ai-ide',
    title: 'AI IDE',
    fullName: 'AI Development Environment',
    icon: Code2,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-900/40 to-amber-800/20',
    borderColor: 'border-orange-500/40',
    analogy: 'Personal Programmer',
    analogyIcon: Brain,
    simpleExplanation: 'AI IDEs are environments where AI can build complete software. Like having a personal programmer who writes, tests, and fixes code.',
    detailedExplanation: 'AI IDEs combine AI assistants with development tools, letting non-coders describe what they want and have AI build it—complete applications, not just snippets.',
    realExample: 'Claude Code can build an entire web application from a description. Cursor helps developers write and debug code with AI assistance.',
    withoutTool: [
      'Need developers for any software',
      'Ideas stuck as just ideas',
      'Long wait times for simple tools'
    ],
    withTool: [
      'Build tools yourself with AI',
      'Rapid prototyping and iteration',
      'Turn descriptions into working software'
    ]
  }
];

const ToolboxVisual = () => {
  const [activeToolId, setActiveToolId] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
        Your AI Toolbox
      </h2>

      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700/50 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Toolbox Header */}
        <motion.div
          className="relative flex items-center justify-center mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="flex items-center gap-4 bg-gradient-to-r from-slate-700/60 to-slate-800/60 rounded-xl px-6 py-4 border border-slate-600/50">
            <Wrench className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">AI Toolbox</span>
            <Hammer className="w-8 h-8 text-cyan-400" />
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolsData.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = activeToolId === tool.id;

            return (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveToolId(isActive ? null : tool.id)}
                className={`
                  relative flex flex-col items-center gap-3 p-6 rounded-xl
                  transition-all duration-300 cursor-pointer
                  ${isActive
                    ? `bg-gradient-to-br ${tool.bgGradient} border-2 ${tool.borderColor} shadow-lg`
                    : 'bg-slate-700/40 border border-slate-600/50 hover:border-slate-500/50'
                  }
                `}
              >
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg`}
                  animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <span className={`font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {tool.title}
                </span>
                <span className="text-xs text-gray-500">{tool.analogy}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Quick Preview */}
        <AnimatePresence mode="wait">
          {activeToolId && (
            <motion.div
              key={activeToolId}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              {(() => {
                const tool = toolsData.find(t => t.id === activeToolId);
                const AnalogyIcon = tool.analogyIcon;
                return (
                  <div className={`p-6 rounded-xl bg-gradient-to-r ${tool.bgGradient} border ${tool.borderColor}`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${tool.gradient}`}>
                        <AnalogyIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                          Think of it as...
                        </p>
                        <p className="text-white text-lg font-medium">
                          {tool.simpleExplanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-gray-500 text-sm mt-6">
          Click a tool to learn more
        </p>
      </div>
    </motion.div>
  );
};

const ToolCard = ({ tool, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = tool.icon;
  const AnalogyIcon = tool.analogyIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.15 }}
    >
      <Card
        glowColor={tool.color}
        className="cursor-pointer h-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: isExpanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                <p className="text-sm text-gray-500">{tool.fullName}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          {/* Analogy Badge */}
          <div className="flex items-center gap-2">
            <AnalogyIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Like a: </span>
            <span className={`text-sm font-medium bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent`}>
              {tool.analogy}
            </span>
          </div>

          <p className="text-gray-300">{tool.simpleExplanation}</p>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Detailed Explanation */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">How it works</p>
                  <p className="text-gray-300">{tool.detailedExplanation}</p>
                </div>

                {/* Real Example */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${tool.bgGradient} border ${tool.borderColor}`}>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Real Example</p>
                  <p className="text-white italic">{tool.realExample}</p>
                </div>

                {/* With/Without Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Without */}
                  <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30">
                    <p className="text-sm text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <X className="w-4 h-4" /> Without {tool.title}
                    </p>
                    <div className="space-y-2">
                      {tool.withoutTool.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* With */}
                  <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30">
                    <p className="text-sm text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4" /> With {tool.title}
                    </p>
                    <div className="space-y-2">
                      {tool.withTool.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <p className="text-center text-gray-500 text-sm pt-2">
              Click to learn more
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const ComparisonTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="space-y-6"
    >
      <h2 className="text-lg font-semibold text-slate-400 text-center">
        Quick Comparison
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800/60">
              <th className="p-4 text-left text-white font-semibold border-b border-slate-700">Tool</th>
              <th className="p-4 text-left text-white font-semibold border-b border-slate-700">What It Does</th>
              <th className="p-4 text-left text-white font-semibold border-b border-slate-700">Think Of It As</th>
              <th className="p-4 text-left text-white font-semibold border-b border-slate-700">Best For</th>
            </tr>
          </thead>
          <tbody>
            {toolsData.map((tool, index) => {
              const Icon = tool.icon;
              const bestFor = {
                mcp: 'Connecting AI to your apps',
                plugins: 'Adding new capabilities',
                skills: 'Consistent, repeatable tasks',
                'ai-ide': 'Building complete tools'
              };

              return (
                <motion.tr
                  key={tool.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className={index % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/10'}
                >
                  <td className="p-4 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${tool.gradient}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium">{tool.title}</span>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-700/50 text-gray-300">
                    {tool.fullName}
                  </td>
                  <td className="p-4 border-b border-slate-700/50">
                    <span className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${tool.bgGradient} ${tool.borderColor} border text-white`}>
                      {tool.analogy}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-700/50 text-gray-300">
                    {bestFor[tool.id]}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

function ToolsExplained({ onComplete }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 shadow-lg shadow-purple-500/30"
          >
            <Wrench className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Tools{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Explained Simply
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            MCPs, Plugins, Skills, AI IDEs—sounds complex, but each one is just a tool in your AI toolbox.
            Let&apos;s break them down with simple analogies.
          </p>
        </motion.div>

        {/* Toolbox Visual */}
        <AnimatePresence>
          {showContent && <ToolboxVisual />}
        </AnimatePresence>

        {/* Tool Cards */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
                Deep Dive Into Each Tool
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolsData.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Table */}
        <AnimatePresence>
          {showContent && (
            <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
              <ComparisonTable />
            </div>
          )}
        </AnimatePresence>

        {/* Key Insight Box */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-emerald-900/30 to-cyan-900/40 border border-purple-500/40 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-emerald-500/5 to-cyan-500/5" />

                <div className="relative space-y-4 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 shadow-lg shadow-purple-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-cyan-400 uppercase tracking-wider">
                    Key Insight
                  </h3>

                  <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                    You don&apos;t need to understand <span className="text-purple-400">how</span> these tools work—
                    you just need to know <span className="text-cyan-400">what</span> they can do for you.
                  </p>

                  <p className="text-gray-400 text-lg">
                    Think of yourself as the director. These tools are your crew—each with a specialty.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
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
}

export default ToolsExplained;
