import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLesson3 } from '../../context/Lesson3Context';
import {
  quiz3Questions,
  isAnswerCorrect,
  getFeedback,
  calculateQuizScore,
  isQuizPassed,
  totalQuestions
} from '../../data/quiz3Questions';

const optionLabels = ['A', 'B', 'C', 'D'];

const QuestionCard = ({ question, questionIndex, onAnswer, selectedAnswer, showFeedback }) => {
  const isCorrect = selectedAnswer !== null && isAnswerCorrect(questionIndex, selectedAnswer);
  const feedback = selectedAnswer !== null ? getFeedback(questionIndex, selectedAnswer) : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-8"
    >
      {/* Question */}
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = question.correctIndex === index;
          const showCorrect = showFeedback && isCorrectAnswer;
          const showWrong = showFeedback && isSelected && !isCorrectAnswer;

          return (
            <motion.button
              key={index}
              whileHover={!showFeedback ? { scale: 1.01, x: 4 } : {}}
              whileTap={!showFeedback ? { scale: 0.99 } : {}}
              onClick={() => !showFeedback && onAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-start gap-4 ${
                showCorrect
                  ? 'bg-emerald-500/20 border-2 border-emerald-500'
                  : showWrong
                  ? 'bg-red-500/20 border-2 border-red-500'
                  : isSelected
                  ? 'bg-violet-500/20 border-2 border-violet-500'
                  : 'bg-white/5 border-2 border-white/10 hover:border-violet-500/50 hover:bg-white/10'
              } ${showFeedback && !showCorrect && !showWrong ? 'opacity-50' : ''}`}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  showCorrect
                    ? 'bg-emerald-500 text-white'
                    : showWrong
                    ? 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-violet-500 text-white'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                {optionLabels[index]}
              </span>
              <span className={`text-base ${showCorrect ? 'text-emerald-300' : showWrong ? 'text-red-300' : 'text-slate-300'}`}>
                {option}
              </span>
              {showCorrect && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto"
                >
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.span>
              )}
              {showWrong && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto"
                >
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-6 p-4 rounded-xl ${
              isCorrect
                ? 'bg-emerald-500/10 border border-emerald-500/30'
                : 'bg-amber-500/10 border border-amber-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isCorrect ? 'bg-emerald-500/20' : 'bg-amber-500/20'
              }`}>
                {isCorrect ? (
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <p className={`text-sm ${isCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                {feedback}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ScoreDisplay = ({ score, answers, onComplete }) => {
  const passed = isQuizPassed(score);
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {/* Celebration Animation for Passing */}
      {passed && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                rotate: Math.random() * 720 - 360,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
                ease: "linear"
              }}
              className={`absolute w-3 h-3 rounded-sm ${
                ['bg-violet-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]
              }`}
            />
          ))}
        </div>
      )}

      {/* Score Card */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="glass rounded-2xl p-8 mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
            passed
              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
              : 'bg-gradient-to-r from-amber-500 to-orange-500'
          }`}
        >
          {passed ? (
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          ) : (
            <span className="text-3xl font-bold text-white">{score}/{totalQuestions}</span>
          )}
        </motion.div>

        <h2 className="text-3xl font-bold mb-2">
          {passed ? (
            <span className="gradient-text">AI Tools Expert!</span>
          ) : (
            <span className="text-amber-400">Good Effort!</span>
          )}
        </h2>
        <p className="text-slate-400 text-lg mb-6">
          You scored {score} out of {totalQuestions} ({percentage}%)
        </p>

        {/* Score Breakdown */}
        <div className="grid grid-cols-6 gap-2 mb-6">
          {answers.map((answer, index) => {
            const correct = isAnswerCorrect(index, answer);
            return (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`h-12 rounded-lg flex items-center justify-center font-bold ${
                  correct
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {correct ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-sm text-slate-500">
          {passed
            ? "You've mastered Claude Cowork! You're ready to put it to work at Vloto."
            : "Review the lessons about Claude, Cowork features, and Vloto use cases, then try again!"}
        </p>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
      >
        Continue to Completion
        <motion.svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </motion.svg>
      </motion.button>
    </motion.div>
  );
};

const QuizTime = ({ onComplete }) => {
  const { setQuizAnswer } = useLesson3();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    // Save answer to context for Supabase persistence
    setQuizAnswer(currentQuestion, answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const score = quizComplete ? calculateQuizScore(answers) : 0;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 mb-6"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-medium text-slate-300">5-8 min section</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Test Your AI Tools Knowledge!</span>
          </h1>
          <p className="text-xl text-slate-400">
            6 questions about Claude, Cowork, and how it transforms Vloto operations
          </p>
        </motion.div>

        {!quizComplete ? (
          <>
            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-400">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <span className="text-sm font-medium text-violet-400">
                  {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestion}
                question={quiz3Questions[currentQuestion]}
                questionIndex={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
              />
            </AnimatePresence>

            {/* Next Button */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-center mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-lg flex items-center gap-2"
                  >
                    {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <ScoreDisplay score={score} answers={answers} onComplete={onComplete} />
        )}
      </div>
    </div>
  );
};

export default QuizTime;
