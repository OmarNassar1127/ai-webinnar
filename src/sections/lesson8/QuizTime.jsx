import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useLesson8 } from '../../context/Lesson8Context';
import {
  quiz8Questions,
  isAnswerCorrect,
  getFeedback,
  calculateQuizScore,
  isQuizPassed,
  totalQuestions
} from '../../data/quiz8Questions';

const QuestionCard = ({ question, questionIndex, selectedAnswer, onSelectAnswer, showFeedback }) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <HelpCircle className="w-5 h-5 text-purple-400" />
        </div>
        <span className="text-sm text-slate-400">Question {questionIndex + 1} of {totalQuestions}</span>
      </div>

      <h3 className="text-xl text-white font-medium mb-6">{question.question}</h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctIndex === index;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              onClick={() => !showFeedback && onSelectAnswer(index)}
              disabled={showFeedback}
              whileHover={!showFeedback ? { scale: 1.01 } : {}}
              whileTap={!showFeedback ? { scale: 0.99 } : {}}
              className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                showCorrect
                  ? 'bg-emerald-500/20 border-2 border-emerald-500'
                  : showIncorrect
                  ? 'bg-red-500/20 border-2 border-red-500'
                  : isSelected
                  ? 'bg-violet-500/20 border-2 border-violet-500'
                  : 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-slate-600'
              } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                showCorrect
                  ? 'bg-emerald-500 text-white'
                  : showIncorrect
                  ? 'bg-red-500 text-white'
                  : isSelected
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}>
                {optionLabels[index]}
              </span>
              <span className={`flex-1 ${
                showCorrect ? 'text-emerald-300' : showIncorrect ? 'text-red-300' : 'text-slate-300'
              }`}>
                {option}
              </span>
              {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
              {showIncorrect && <XCircle className="w-5 h-5 text-red-400" />}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-6 p-4 rounded-xl ${
              isAnswerCorrect(questionIndex, selectedAnswer)
                ? 'bg-emerald-500/10 border border-emerald-500/30'
                : 'bg-amber-500/10 border border-amber-500/30'
            }`}
          >
            <p className={`text-sm ${
              isAnswerCorrect(questionIndex, selectedAnswer) ? 'text-emerald-300' : 'text-amber-300'
            }`}>
              {getFeedback(questionIndex, selectedAnswer)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

// Confetti particle component
const ConfettiParticle = ({ delay, color }) => (
  <motion.div
    className={`absolute w-2 h-2 rounded-full ${color}`}
    initial={{
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
      scale: 0
    }}
    animate={{
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      scale: [0, 1, 0],
      rotate: Math.random() * 360
    }}
    transition={{
      duration: 2,
      delay: delay,
      ease: 'easeOut'
    }}
  />
);

const ScoreDisplay = ({ score, onRetry, onContinue }) => {
  const passed = isQuizPassed(score);
  const percentage = Math.round((score / totalQuestions) * 100);
  const confettiColors = ['bg-purple-400', 'bg-cyan-400', 'bg-emerald-400', 'bg-pink-400', 'bg-amber-400'];

  return (
    <div className="relative">
      {/* Confetti for passing */}
      {passed && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiParticle
              key={i}
              delay={i * 0.02}
              color={confettiColors[i % confettiColors.length]}
            />
          ))}
        </div>
      )}

      <Card className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className={`inline-flex p-4 rounded-full mb-6 ${
            passed ? 'bg-emerald-500/20' : 'bg-amber-500/20'
          }`}
        >
          {passed ? (
            <Trophy className="w-12 h-12 text-emerald-400" />
          ) : (
            <RotateCcw className="w-12 h-12 text-amber-400" />
          )}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mb-2"
        >
          {passed ? 'Congratulations!' : 'Almost There!'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 mb-6"
        >
          {passed
            ? "You've mastered the Ralph autonomous AI pattern!"
            : "You need 4 or more correct answers to pass. Give it another try!"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className={`text-5xl font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {score}
          </div>
          <div className="text-left">
            <div className="text-slate-400 text-sm">out of</div>
            <div className="text-white font-bold">{totalQuestions}</div>
          </div>
          <div className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
            passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {percentage}%
          </div>
        </motion.div>

        {/* Score breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-5 gap-2 mb-8"
        >
          {quiz8Questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full ${
                index < score ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {!passed && (
            <Button variant="secondary" onClick={onRetry}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button
            variant="primary"
            onClick={onContinue}
            className={passed ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : ''}
          >
            {passed ? 'Complete Lesson' : 'Continue Anyway'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </Card>
    </div>
  );
};

export default function QuizTime({ onComplete }) {
  const { setQuizAnswer } = useLesson8();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setQuizAnswer(currentQuestion, answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quiz8Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizComplete(false);
  };

  const score = calculateQuizScore(answers);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex p-3 rounded-full bg-purple-500/20 border border-purple-500/40 mb-4"
        >
          <HelpCircle className="w-8 h-8 text-purple-400" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Quiz Time
        </h1>
        <p className="text-slate-400">
          Test your understanding of Ralph and autonomous AI development
        </p>
      </motion.div>

      {/* Progress bar */}
      {!quizComplete && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Progress</span>
            <span>{currentQuestion + 1} of {totalQuestions}</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Question or Score */}
      <AnimatePresence mode="wait">
        {quizComplete ? (
          <motion.div
            key="score"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ScoreDisplay score={score} onRetry={handleRetry} onContinue={onComplete} />
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={quiz8Questions[currentQuestion]}
              questionIndex={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              showFeedback={showFeedback}
            />

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-end"
              >
                <Button variant="primary" onClick={handleNext}>
                  {currentQuestion < quiz8Questions.length - 1 ? 'Next Question' : 'See Results'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
