import { motion } from 'framer-motion';
import { Trophy, Home, ArrowRight } from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 2 Completion Section
 * Placeholder - will be completed in US-011
 */
const Completion = ({ onComplete, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/30"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Lesson 2 Complete!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300"
          >
            You now understand how software works
          </motion.p>
        </motion.div>

        <Card className="p-6">
          <p className="text-gray-400 text-center">
            Recap cards and celebration animation will be added here
          </p>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={onBack}
            icon={<Home className="w-5 h-5" />}
            iconPosition="left"
          >
            Back to Dashboard
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onComplete}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Next Lesson
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Completion;
