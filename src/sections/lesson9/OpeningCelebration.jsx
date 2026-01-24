import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Sparkles, Star, Trophy, ArrowRight } from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useLesson9 } from '../../context/Lesson9Context';

export default function OpeningCelebration({ onComplete }) {
  const { completeSection } = useLesson9();
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => setShowButton(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleContinue = () => {
    completeSection(1);
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Grand Celebration Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
        className="text-center mb-8"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(168, 85, 247, 0.3)',
                '0 0 60px rgba(168, 85, 247, 0.5)',
                '0 0 30px rgba(168, 85, 247, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-6 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-500/50"
          >
            <PartyPopper className="w-16 h-16 text-purple-400" />
          </motion.div>

          {/* Orbiting stars */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div style={{ position: 'absolute', top: -50 - i * 10 }}>
                <Star className={`w-4 h-4 ${
                  i === 0 ? 'text-purple-400' : i === 1 ? 'text-pink-400' : 'text-cyan-400'
                }`} fill="currentColor" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main heading */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">You Made It to the </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Finish Line!
            </span>
          </h1>
          <p className="text-xl text-slate-400">
            This is your moment to celebrate an incredible learning journey
          </p>
        </motion.div>
      )}

      {/* Achievement card */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 text-center bg-gradient-to-br from-purple-900/30 via-slate-800/30 to-pink-900/30 border border-purple-500/30">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex p-4 rounded-full bg-amber-500/20 border border-amber-500/40 mb-6"
            >
              <Trophy className="w-10 h-10 text-amber-400" />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-3">
              9 Lessons Complete
            </h2>
            <p className="text-slate-300 mb-6">
              You've transformed from AI beginner to an AI-empowered operations professional.
              That's no small achievement!
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {['AI Thinking', 'Software Concepts', 'AI Tools', 'Building Skills', 'Data Analysis'].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  {skill}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Continue button */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Let's Review Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
