import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileSpreadsheet, ArrowRight, Lightbulb, Zap, Copy, Check } from 'lucide-react';
import { Card, Button } from '../../components/common';

const reportExample = {
  title: 'Weekly Fleet Report',
  sections: [
    {
      name: 'Executive Summary',
      content: 'Total fleet utilization this week: 78%. Revenue: $4,350. Top performer: V003 with 42 bookings.',
      icon: '📊'
    },
    {
      name: 'Vehicle Performance',
      content: 'V001: 28 bookings, $364 revenue, 4.8 rating\nV002: 22 bookings, $286 revenue, 4.5 rating\nV003: 42 bookings, $546 revenue, 4.9 rating\nV004: 18 bookings, $234 revenue, 4.2 rating\nV005: 35 bookings, $455 revenue, 4.7 rating',
      icon: '🚗'
    },
    {
      name: 'Alerts & Recommendations',
      content: '• V004 has lowest rating (4.2) - schedule maintenance check\n• V003 showing high demand - consider adding similar vehicle\n• Weekend bookings up 15% from last week',
      icon: '⚠️'
    },
    {
      name: 'Next Week Forecast',
      content: 'Based on trends, expect 10% increase in bookings due to upcoming holiday weekend.',
      icon: '🔮'
    }
  ]
};

const promptTemplates = [
  {
    title: 'Weekly Summary Report',
    prompt: 'Create a weekly summary report from this booking data. Include: total bookings, revenue by vehicle, top performer, any vehicles with below-average ratings, and recommendations.',
    use: 'End of week team updates'
  },
  {
    title: 'Vehicle Health Report',
    prompt: 'Generate a vehicle health report showing: vehicles due for maintenance (based on mileage/days), recent damage reports, battery levels below 30%, and vehicles with ratings dropping over time.',
    use: 'Fleet maintenance planning'
  },
  {
    title: 'Customer Insights Report',
    prompt: 'Create a customer insights report including: most common booking times, popular pickup locations, repeat customer percentage, and feedback themes from reviews.',
    use: 'Marketing and operations decisions'
  }
];

function ReportPreview({ report }) {
  return (
    <Card className="p-6">
      <div className="border-b border-slate-700 pb-4 mb-4">
        <h3 className="text-xl font-bold text-white">{report.title}</h3>
        <p className="text-slate-400 text-sm">Generated: January 21, 2024</p>
      </div>
      <div className="space-y-4">
        {report.sections.map((section, index) => (
          <motion.div
            key={section.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{section.icon}</span>
              <h4 className="font-semibold text-cyan-400">{section.name}</h4>
            </div>
            <div className="pl-7 text-slate-300 text-sm whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

function PromptTemplate({ template, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h4 className="font-semibold text-white">{template.title}</h4>
            <p className="text-slate-500 text-xs">Best for: {template.use}</p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
        <div className="p-3 rounded-lg bg-slate-800/50 text-sm text-slate-300 font-mono">
          {template.prompt}
        </div>
      </Card>
    </motion.div>
  );
}

function ReportGeneration({ onComplete }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Automatic <span className="text-emerald-400">Report Generation</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Instead of spending hours creating reports, describe what you need and AI
          generates professional reports instantly.
        </p>
      </motion.div>

      {/* Report Preview */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Example: AI-Generated Report</h2>
        </div>
        <p className="text-slate-400 mb-6">
          Here's what a report looks like when you ask AI to "Create a weekly fleet report":
        </p>
        <ReportPreview report={reportExample} />
      </motion.div>

      {/* How It Works */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">How Report Generation Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <p className="text-slate-300 text-sm">Share your data (paste or upload spreadsheet)</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <p className="text-slate-300 text-sm">Describe the report you need</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <p className="text-slate-300 text-sm">AI generates formatted report</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Prompt Templates */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Report Templates for Vloto</h2>
        </div>
        <p className="text-slate-400 mb-6">
          Copy these prompts and customize them for your specific data:
        </p>
        <div className="space-y-4">
          {promptTemplates.map((template, index) => (
            <PromptTemplate key={template.title} template={template} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Pro Tip */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Pro Tip: Be Specific About Format
              </h3>
              <p className="text-slate-300">
                Add formatting instructions like "Include a table for vehicle stats",
                "Add bullet points for action items", or "Format numbers with commas
                and 2 decimal places". The more specific you are about the output
                format, the more useful your reports will be.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onComplete}
        >
          Continue to Data Cleaning
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default ReportGeneration;
