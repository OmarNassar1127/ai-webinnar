import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, MessageSquare, ArrowRight, Lightbulb, Zap, Clock, PenLine, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '../../components/common';

const sampleData = [
  { id: 'V001', date: '2024-01-15', bookings: 12, revenue: 156, avgRating: 4.8 },
  { id: 'V002', date: '2024-01-15', bookings: 8, revenue: 104, avgRating: 4.5 },
  { id: 'V003', date: '2024-01-15', bookings: 15, revenue: 195, avgRating: 4.9 },
  { id: 'V004', date: '2024-01-15', bookings: 6, revenue: 78, avgRating: 4.2 },
  { id: 'V005', date: '2024-01-15', bookings: 10, revenue: 130, avgRating: 4.7 },
];

const sampleQuestions = [
  {
    question: 'Which vehicle had the most bookings?',
    answer: 'Vehicle V003 had the most bookings with 15 bookings on January 15th, 2024.',
    insight: 'This vehicle is in high demand - consider adding similar vehicles to your fleet.'
  },
  {
    question: 'What is the total revenue?',
    answer: 'Total revenue for January 15th was $663 (156 + 104 + 195 + 78 + 130).',
    insight: 'Average revenue per vehicle is $132.60.'
  },
  {
    question: 'Which vehicles have ratings below 4.5?',
    answer: 'Vehicle V004 has a rating of 4.2, which is below 4.5.',
    insight: 'V004 may need attention - check for maintenance issues or customer complaints.'
  },
  {
    question: 'What is the correlation between bookings and rating?',
    answer: 'There appears to be a positive correlation - vehicles with higher ratings tend to have more bookings. V003 (4.9 rating) has 15 bookings, while V004 (4.2 rating) has only 6.',
    insight: 'Customer ratings directly impact booking numbers. Improving ratings could increase bookings.'
  }
];

function DataTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Vehicle ID</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
            <th className="px-4 py-3 text-right text-slate-400 font-medium">Bookings</th>
            <th className="px-4 py-3 text-right text-slate-400 font-medium">Revenue ($)</th>
            <th className="px-4 py-3 text-right text-slate-400 font-medium">Avg Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-slate-800 hover:bg-slate-800/30"
            >
              <td className="px-4 py-3 text-cyan-400 font-mono">{row.id}</td>
              <td className="px-4 py-3 text-slate-300">{row.date}</td>
              <td className="px-4 py-3 text-right text-white">{row.bookings}</td>
              <td className="px-4 py-3 text-right text-emerald-400">${row.revenue}</td>
              <td className="px-4 py-3 text-right text-amber-400">{row.avgRating}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuestionCard({ question, isExpanded, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Card
        className={`p-4 cursor-pointer transition-all ${
          isExpanded ? 'bg-cyan-900/20 border-cyan-500/30' : 'hover:border-slate-600'
        }`}
        onClick={onClick}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${isExpanded ? 'bg-cyan-500/20' : 'bg-slate-700/50'}`}>
            <MessageSquare className={`w-4 h-4 ${isExpanded ? 'text-cyan-400' : 'text-slate-400'}`} />
          </div>
          <div className="flex-1">
            <p className={`font-medium ${isExpanded ? 'text-cyan-300' : 'text-white'}`}>
              "{question.question}"
            </p>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-3"
                >
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-slate-300 text-sm">{question.answer}</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-amber-300">{question.insight}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function SpreadsheetAnalysis({ onComplete }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [userQuestions, setUserQuestions] = useState(['', '', '']);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          AI for <span className="text-cyan-400">Spreadsheet Analysis</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Instead of writing formulas or pivot tables, you can ask AI questions
          about your data in plain English and get instant answers.
        </p>
      </motion.div>

      {/* Old Way vs New Way */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-5 bg-gradient-to-br from-red-900/20 to-rose-900/20 border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-red-300">The Old Way</h3>
          </div>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Write complex VLOOKUP and SUMIF formulas</li>
            <li>• Create pivot tables from scratch</li>
            <li>• Manually calculate averages and trends</li>
            <li>• Google how to do each thing</li>
            <li>• Hope you didn't make a formula error</li>
          </ul>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-emerald-300">With AI</h3>
          </div>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Ask questions in plain English</li>
            <li>• Get instant calculations and comparisons</li>
            <li>• Discover patterns you didn't know existed</li>
            <li>• AI explains its reasoning</li>
            <li>• Focus on insights, not formulas</li>
          </ul>
        </Card>
      </motion.div>

      {/* Sample Data Table */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Table className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Sample Vloto Data</h2>
        </div>
        <Card className="p-4">
          <DataTable data={sampleData} />
        </Card>
      </motion.div>

      {/* Interactive Questions */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Ask Questions, Get Answers</h2>
        </div>
        <p className="text-slate-400 mb-6">
          Click on any question to see how AI would analyze this data:
        </p>
        <div className="space-y-3">
          {sampleQuestions.map((q, index) => (
            <QuestionCard
              key={index}
              question={q}
              isExpanded={expandedQuestion === index}
              onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
            />
          ))}
        </div>
      </motion.div>

      {/* Practice Exercise */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <PenLine className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Your Turn: Write 3 Questions</h2>
        </div>
        <Card className="p-6">
          <p className="text-slate-300 mb-4">
            Looking at the sample data above, write 3 questions you'd want AI to answer:
          </p>
          {userQuestions.map((q, idx) => (
            <div key={idx} className="mb-3">
              <label className="text-slate-400 text-sm mb-1 block">Question {idx + 1}:</label>
              <input
                type="text"
                value={q}
                onChange={(e) => {
                  const updated = [...userQuestions];
                  updated[idx] = e.target.value;
                  setUserQuestions(updated);
                }}
                placeholder={idx === 0 ? "e.g., What's the average revenue per booking?" : "Type your question..."}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          ))}
          {userQuestions.filter(q => q.trim().length > 5).length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                <p className="text-emerald-300 text-sm">
                  Great questions! Notice how natural language queries let you focus on
                  what you want to know, not how to calculate it.
                </p>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-500/30">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-purple-400 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                The Power of Natural Language
              </h3>
              <p className="text-slate-300">
                You don't need to know Excel formulas or SQL queries. Just describe what
                you want to know in plain English, and AI will figure out how to find
                the answer. This is the same skill you've been learning throughout this
                course - <strong className="text-white">clear description = clear results</strong>.
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
          Continue to Report Generation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default SpreadsheetAnalysis;
