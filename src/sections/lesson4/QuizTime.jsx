import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { Card, Button } from '../../components/common';
import { useLesson4 } from '../../context/Lesson4Context';
import {
  quiz4Questions,
  isAnswerCorrect,
  getFeedback,
  calculateQuizScore,
  isQuizPassed,
  totalQuestions
} from '../../data/quiz4Questions';

function QuestionCard({ question, questionNumber, selectedAnswer, onSelect, showFeedback }) {
  const isCorrect = selectedAnswer !== null && isAnswerCorrect(questionNumber - 1, selectedAnswer);
  const feedback = showFeedback ? getFeedback(questionNumber - 1, isCorrect) : null;

  return (
    <Card className="p-6 md:p-8">
      {/* Question */}
      <div className="mb-6">
        <div className="text-sm text-purple-400 mb-2">Question {questionNumber} of {totalQuestions}</div>
        <h2 className="text-xl md:text-2xl font-bold text-white">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.correctIndex;
          const showCorrect = showFeedback && isCorrectAnswer;
          const showWrong = showFeedback && isSelected && !isCorrectAnswer;

          return (
            <motion.button
              key={index}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                showCorrect
                  ? 'bg-emerald-500/20 border-2 border-emerald-500'
                  : showWrong
                  ? 'bg-red-500/20 border-2 border-red-500'
                  : isSelected
                  ? 'bg-violet-500/20 border-2 border-violet-500'
                  : 'bg-slate-800/50 border-2 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => !showFeedback && onSelect(index)}
              disabled={showFeedback}
              whileHover={!showFeedback ? { scale: 1.01 } : {}}
              whileTap={!showFeedback ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  showCorrect
                    ? 'bg-emerald-500 text-white'
                    : showWrong
                    ? 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-violet-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {showCorrect ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : showWrong ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className={`flex-1 ${
                  showCorrect ? 'text-emerald-300' : showWrong ? 'text-red-300' : 'text-slate-200'
                }`}>
                  {option}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-xl ${
              isCorrect
                ? 'bg-emerald-900/30 border border-emerald-500/30'
                : 'bg-amber-900/30 border border-amber-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              )}
              <p className={isCorrect ? 'text-emerald-300' : 'text-amber-300'}>
                {feedback}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function ScoreDisplay({ score, answers, onContinue }) {
  const passed = isQuizPassed(score);
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Perfect score! You've mastered AI building concepts!";
    if (percentage >= 80) return "Excellent work! You understand how to build with AI!";
    if (percentage >= 60) return "Good job! You've got a solid grasp of the key concepts.";
    return "Keep learning! Review the observations and try again.";
  };

  return (
    <Card className="p-8 text-center relative overflow-hidden">
      {/* Confetti Animation for Passing */}
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

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="mb-6"
      >
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
          passed ? 'bg-emerald-500/20' : 'bg-amber-500/20'
        }`}>
          {passed ? (
            <Trophy className="w-10 h-10 text-emerald-400" />
          ) : (
            <HelpCircle className="w-10 h-10 text-amber-400" />
          )}
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold text-white mb-2">
        {passed ? 'Quiz Complete!' : 'Quiz Finished'}
      </h2>

      <p className="text-slate-400 mb-6">{getMessage()}</p>

      {/* Score Display */}
      <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{score}</div>
          <div className="text-sm text-slate-400">Correct</div>
        </div>
        <div className="w-px h-12 bg-slate-700" />
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{totalQuestions}</div>
          <div className="text-sm text-slate-400">Total</div>
        </div>
        <div className="w-px h-12 bg-slate-700" />
        <div className="text-center">
          <div className={`text-3xl font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {percentage}%
          </div>
          <div className="text-sm text-slate-400">Score</div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-5 gap-2 mb-6">
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
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </motion.div>
          );
        })}
      </div>

      <Button variant="primary" size="lg" onClick={onContinue}>
        {passed ? 'Continue' : 'Review & Continue'}
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </Card>
  );
}

function QuizTime({ onComplete }) {
  const { setQuizAnswer } = useLesson4();
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

    if (currentQuestion < quiz4Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const score = calculateQuizScore(answers);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4"
        >
          <HelpCircle className="w-8 h-8 text-purple-400" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-2">Quiz Time</h1>
        <p className="text-slate-400">
          Let's see what you learned about AI building!
        </p>
      </motion.div>

      {/* Progress Bar */}
      {!quizComplete && (
        <div className="mb-8">
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

      {/* Quiz Content */}
      <AnimatePresence mode="wait">
        {quizComplete ? (
          <motion.div
            key="score"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScoreDisplay score={score} answers={answers} onContinue={onComplete} />
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <QuestionCard
              question={quiz4Questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              selectedAnswer={selectedAnswer}
              onSelect={handleSelectAnswer}
              showFeedback={showFeedback}
            />

            {/* Next Button */}
            {showFeedback && (
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button variant="primary" onClick={handleNext}>
                  {currentQuestion < quiz4Questions.length - 1 ? 'Next Question' : 'See Results'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default QuizTime;
