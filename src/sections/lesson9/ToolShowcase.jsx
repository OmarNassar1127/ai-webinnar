import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench, FileText, Award, Download, Share2, ArrowRight,
  CheckCircle2, Sparkles, ExternalLink
} from 'lucide-react';
import { Button, Card } from '../../components/common';
import { useLesson9 } from '../../context/Lesson9Context';
import { useAuth } from '../../context/AuthContext';

const SPEC_STORAGE_KEY = 'vloto-ai-academy-lesson6-spec';

export default function ToolShowcase({ onComplete }) {
  const { completeSection } = useLesson9();
  const { user, profile } = useAuth();
  const [savedSpec, setSavedSpec] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    // Load saved specification from Lesson 6
    try {
      const saved = localStorage.getItem(SPEC_STORAGE_KEY);
      if (saved) {
        setSavedSpec(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading specification:', err);
    }
  }, []);

  const handleContinue = () => {
    completeSection(3);
    onComplete();
  };

  const getUserName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'Learner';
  };

  const getCompletionDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Your Tool Showcase
        </h1>
        <p className="text-lg text-slate-400">
          The specification you created is your blueprint for building real tools
        </p>
      </motion.div>

      {/* Tool Specification Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40">
              <Wrench className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Your Tool Specification</h2>
              <p className="text-slate-400 text-sm">Created in Lesson 6</p>
            </div>
          </div>

          {savedSpec ? (
            <div className="space-y-4">
              {/* Tool Name */}
              {savedSpec.overview?.toolName && (
                <div className="p-4 rounded-xl bg-slate-800/50">
                  <span className="text-slate-500 text-sm">Tool Name</span>
                  <p className="text-white font-medium">{savedSpec.overview.toolName}</p>
                </div>
              )}

              {/* Problem Statement */}
              {savedSpec.problem?.currentProblem && (
                <div className="p-4 rounded-xl bg-slate-800/50">
                  <span className="text-slate-500 text-sm">Problem Solved</span>
                  <p className="text-slate-300">{savedSpec.problem.currentProblem}</p>
                </div>
              )}

              {/* Key Components */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Frontend', key: 'frontend', hasData: savedSpec.frontend },
                  { label: 'Backend', key: 'backend', hasData: savedSpec.backend },
                  { label: 'Database', key: 'database', hasData: savedSpec.database },
                  { label: 'Edge Cases', key: 'edgeCases', hasData: savedSpec.edgeCases },
                ].map((component) => (
                  <div
                    key={component.key}
                    className={`p-3 rounded-lg text-center ${
                      component.hasData && Object.values(component.hasData).some(v => v)
                        ? 'bg-emerald-500/20 border border-emerald-500/30'
                        : 'bg-slate-800/50 border border-slate-700'
                    }`}
                  >
                    <span className={`text-sm ${
                      component.hasData && Object.values(component.hasData).some(v => v)
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                    }`}>
                      {component.label}
                    </span>
                    {component.hasData && Object.values(component.hasData).some(v => v) && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mt-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="secondary" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Spec
                </Button>
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">
                No specification found. You can always go back to Lesson 6 to create one!
              </p>
              <Button variant="secondary" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to Lesson 6
              </Button>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Completion Certificate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setShowCertificate(!showCertificate)}
        >
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Your Completion Certificate
          </h2>
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>

        {showCertificate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-purple-900/30 via-slate-800 to-amber-900/30 border-2 border-amber-500/30">
              <div className="text-center">
                {/* Certificate Header */}
                <div className="mb-6">
                  <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <p className="text-amber-400 text-sm uppercase tracking-widest">Certificate of Completion</p>
                </div>

                {/* Certificate Body */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  AI for Operations Academy
                </h3>
                <p className="text-slate-400 mb-6">This certifies that</p>

                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                  {getUserName()}
                </p>

                <p className="text-slate-300 mb-4">
                  has successfully completed all 9 lessons of the AI for Operations training program
                </p>

                <p className="text-slate-500 text-sm mb-6">
                  Completed on {getCompletionDate()}
                </p>

                {/* Skills Earned */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {['AI Thinking', 'Software Architecture', 'Tool Building', 'Data Analysis', 'AI Direction'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Share Button */}
                <Button variant="secondary" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Certificate
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {!showCertificate && (
          <Card
            className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
            onClick={() => setShowCertificate(true)}
          >
            <div className="flex items-center justify-center gap-3 text-slate-400">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Click to reveal your certificate</span>
            </div>
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
        >
          What's Next?
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
