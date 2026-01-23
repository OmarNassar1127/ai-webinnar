import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Sparkles, Rocket, Star, Quote, Home, Share2,
  Download, CheckCircle2, Zap
} from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useLesson9 } from '../../context/Lesson9Context';
import { useAuth } from '../../context/AuthContext';

// Ultimate confetti particle for final celebration
const ConfettiParticle = ({ index, color }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 3;
  const randomDuration = 4 + Math.random() * 3;
  const randomRotation = Math.random() * 1080 - 540;
  const shapes = ['circle', 'square', 'star'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  return (
    <motion.div
      className={`absolute w-4 h-4 ${color}`}
      style={{
        left: `${randomX}%`,
        top: -30,
        borderRadius: shape === 'circle' ? '50%' : shape === 'star' ? '0%' : '20%',
        clipPath: shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : undefined,
      }}
      initial={{ y: -30, rotate: 0, opacity: 1, scale: 1 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
        rotate: randomRotation,
        opacity: [1, 1, 1, 0],
        scale: [1, 1.2, 1, 0.8],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  );
};

// Sparkle burst effect
const SparkleBurst = ({ delay }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      <Sparkles className="w-6 h-6 text-amber-400" />
    </motion.div>
  );
};

const finalStats = [
  { label: 'Lessons Completed', value: '9', icon: CheckCircle2, color: 'emerald' },
  { label: 'Skills Gained', value: '20+', icon: Zap, color: 'purple' },
  { label: 'Tools Explored', value: '10+', icon: Rocket, color: 'cyan' },
];

export default function FinalCompletion({ onBack }) {
  const { completeSection } = useLesson9();
  const { user, profile } = useAuth();
  const [showContent, setShowContent] = useState(false);

  // Ultimate confetti colors
  const confettiColors = [
    'bg-purple-400', 'bg-pink-400', 'bg-cyan-400', 'bg-emerald-400',
    'bg-amber-400', 'bg-blue-400', 'bg-violet-400', 'bg-rose-400',
    'bg-teal-400', 'bg-orange-400',
  ];

  // Generate more confetti particles for ultimate celebration
  const [confettiParticles] = useState(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      color: confettiColors[i % confettiColors.length],
    }))
  );

  useEffect(() => {
    completeSection(6);
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, [completeSection]);

  const getUserName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'Graduate';
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ultimate confetti */}
      <div className="fixed inset-0 pointer-events-none">
        {confettiParticles.map((particle) => (
          <ConfettiParticle key={particle.id} index={particle.id} color={particle.color} />
        ))}
      </div>

      {/* Sparkle bursts */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 10 }, (_, i) => (
          <SparkleBurst key={i} delay={i * 0.5} />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        {/* Ultimate trophy animation */}
        <motion.div
          initial={{ scale: 0, rotate: -360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 40px rgba(251, 191, 36, 0.4)',
                  '0 0 80px rgba(251, 191, 36, 0.6)',
                  '0 0 40px rgba(251, 191, 36, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-8 rounded-full bg-gradient-to-br from-amber-500/30 to-yellow-500/30 border-4 border-amber-500/50"
            >
              <Trophy className="w-20 h-20 text-amber-400" />
            </motion.div>

            {/* Multiple orbiting elements */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: [i * 90, i * 90 + 360] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.div style={{ position: 'absolute', top: -70 - i * 5 }}>
                  <Star
                    className={`w-5 h-5 ${
                      i === 0 ? 'text-amber-400' : i === 1 ? 'text-purple-400' : i === 2 ? 'text-cyan-400' : 'text-pink-400'
                    }`}
                    fill="currentColor"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ultimate heading */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Congratulations, </span>
              <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {getUserName()}!
              </span>
            </h1>
            <p className="text-xl text-slate-300">
              You've officially graduated from the AI for Operations Academy
            </p>
          </motion.div>
        )}

        {/* Final stats */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-10"
          >
            {finalStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="p-4 text-center">
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      stat.color === 'emerald' ? 'text-emerald-400' :
                      stat.color === 'purple' ? 'text-purple-400' :
                      'text-cyan-400'
                    }`} />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Alan Kay Quote */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-10"
          >
            <Card className="p-8 bg-gradient-to-br from-purple-900/40 via-slate-800/40 to-cyan-900/40 border border-purple-500/30">
              <Quote className="w-8 h-8 text-purple-400 mb-4" />
              <blockquote className="text-xl text-white italic mb-4">
                "The best way to predict the future is to invent it."
              </blockquote>
              <p className="text-slate-400 text-right">— Alan Kay</p>
              <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-slate-300">
                  You now have the tools to invent your own future. AI is not just a technology
                  to learn about — it's a partner to build with. Go create something amazing.
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Final message */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-10"
          >
            <p className="text-lg text-slate-300 mb-2">
              This course was built by AI, for humans who want to harness AI.
            </p>
            <p className="text-slate-400">
              The future belongs to those who can direct AI to build their vision.
            </p>
          </motion.div>
        )}

        {/* Action buttons */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="secondary" size="lg">
              <Share2 className="w-5 h-5 mr-2" />
              Share Achievement
            </Button>
            <Button variant="secondary" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Certificate
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={onBack}
              className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
