import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart, MessageSquare, Star, Send, ArrowRight,
  ThumbsUp, Lightbulb, Frown, Smile, Meh
} from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useLesson9 } from '../../context/Lesson9Context';

const feedbackQuestions = [
  {
    id: 'overall',
    question: 'How would you rate your overall experience?',
    type: 'rating',
  },
  {
    id: 'useful',
    question: 'How useful was this course for your work?',
    type: 'emoji',
    options: [
      { value: 1, icon: Frown, label: 'Not useful' },
      { value: 2, icon: Meh, label: 'Somewhat useful' },
      { value: 3, icon: Smile, label: 'Very useful' },
    ],
  },
  {
    id: 'favorite',
    question: 'What was your favorite lesson?',
    type: 'select',
    options: [
      'Lesson 1: AI Thinking Foundations',
      'Lesson 2: How Software Works',
      'Lesson 3: The AI Tools Landscape',
      'Lesson 4: AI in Action',
      'Lesson 5: Your First Build',
      'Lesson 6: Building for Operations',
      'Lesson 7: Data & AI',
      'Lesson 8: The Magic Lesson',
    ],
  },
  {
    id: 'comments',
    question: 'Any other feedback or suggestions?',
    type: 'text',
  },
];

export default function ThankYouClose({ onComplete }) {
  const { completeSection } = useLesson9();
  const [feedback, setFeedback] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (questionId, value) => {
    setFeedback((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitFeedback = () => {
    // In a real app, this would send feedback to Supabase
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
  };

  const handleContinue = () => {
    completeSection(5);
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="inline-flex p-4 rounded-full bg-pink-500/20 border border-pink-500/40 mb-4"
        >
          <Heart className="w-10 h-10 text-pink-400" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Thank You!
        </h1>
        <p className="text-lg text-slate-400">
          We appreciate you taking this journey with us
        </p>
      </motion.div>

      {/* Personal Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <Card className="p-6 bg-gradient-to-br from-purple-900/30 via-slate-800/30 to-pink-900/30 border border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">A Note from the Team</h3>
              <p className="text-slate-300 mb-4">
                Building this course with AI was itself an incredible journey. We used the very tools
                we taught you about - Claude Code, autonomous agents, and the Ralph pattern - to create
                these lessons.
              </p>
              <p className="text-slate-400">
                We believe AI will transform how operations teams work. You're now part of that
                transformation. Go build something amazing!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Feedback Survey */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Help Us Improve
        </h2>

        {!submitted ? (
          <Card className="p-6">
            <div className="space-y-6">
              {feedbackQuestions.map((q) => (
                <div key={q.id}>
                  <label className="block text-white mb-3">{q.question}</label>

                  {q.type === 'rating' && (
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleFeedbackChange(q.id, star)}
                          className={`p-2 rounded-lg transition-colors ${
                            feedback[q.id] >= star
                              ? 'text-amber-400'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                        >
                          <Star className="w-6 h-6" fill={feedback[q.id] >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === 'emoji' && (
                    <div className="flex gap-3">
                      {q.options.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleFeedbackChange(q.id, option.value)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${
                              feedback[q.id] === option.value
                                ? 'bg-purple-500/20 border border-purple-500/40'
                                : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50'
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${
                              feedback[q.id] === option.value ? 'text-purple-400' : 'text-slate-400'
                            }`} />
                            <span className="text-xs text-slate-400">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'select' && (
                    <select
                      value={feedback[q.id] || ''}
                      onChange={(e) => handleFeedbackChange(q.id, e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select a lesson...</option>
                      {q.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {q.type === 'text' && (
                    <textarea
                      value={feedback[q.id] || ''}
                      onChange={(e) => handleFeedbackChange(q.id, e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 min-h-[100px]"
                    />
                  )}
                </div>
              ))}

              <Button
                variant="primary"
                onClick={handleSubmitFeedback}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <ThumbsUp className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            </motion.div>
            <h3 className="text-white font-medium mb-2">Thank you for your feedback!</h3>
            <p className="text-slate-400">Your input helps us make this course better for everyone.</p>
          </Card>
        )}
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Finish Course
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
