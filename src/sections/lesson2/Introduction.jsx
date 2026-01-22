import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import { Button } from '../../components/common';

/**
 * Lesson 2 Introduction Section
 * Placeholder - will be completed in US-003
 */
const Introduction = ({ onComplete }) => {
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
          >
            <Code className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            How Software Works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300"
          >
            Understanding the building blocks of every app
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
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
            Let's Begin
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Introduction;
