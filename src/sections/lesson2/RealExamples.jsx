import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 2 Real Examples Section
 * Placeholder - will be completed in US-005
 */
const RealExamples = ({ onComplete }) => {
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30"
          >
            <Smartphone className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Real World Examples
          </h1>

          <p className="text-lg text-gray-300">
            See how Vloto, Instagram, and Google use these components
          </p>
        </motion.div>

        <Card className="p-6">
          <p className="text-gray-400 text-center">
            Interactive app examples with tabs will be added here
          </p>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onComplete}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RealExamples;
