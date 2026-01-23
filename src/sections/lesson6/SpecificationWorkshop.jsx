import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Save, Download, CheckCircle2, Monitor, Server, Database, AlertTriangle, Target, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, Button } from '../../components/common';

const SPEC_STORAGE_KEY = 'vloto-ai-academy-tool-specification';

const specSections = [
  {
    id: 'overview',
    title: 'Tool Overview',
    icon: Target,
    color: 'purple',
    fields: [
      { id: 'name', label: 'Tool Name', type: 'text', placeholder: 'e.g., Fleet Health Dashboard' },
      { id: 'purpose', label: 'One-Sentence Purpose', type: 'text', placeholder: 'A tool that helps operations staff...' },
      { id: 'users', label: 'Who will use this?', type: 'text', placeholder: 'e.g., Operations team, fleet managers' }
    ]
  },
  {
    id: 'problem',
    title: 'Problem Statement',
    icon: AlertTriangle,
    color: 'amber',
    fields: [
      { id: 'currentWay', label: 'How do you do this task today?', type: 'textarea', placeholder: 'Describe the current process step by step...' },
      { id: 'painPoints', label: 'What\'s painful about the current way?', type: 'textarea', placeholder: 'List specific frustrations, time wasted, errors...' },
      { id: 'frequency', label: 'How often is this done?', type: 'text', placeholder: 'e.g., Daily, 3 times per week' }
    ]
  },
  {
    id: 'frontend',
    title: 'What Users See (Frontend)',
    icon: Monitor,
    color: 'purple',
    fields: [
      { id: 'mainScreen', label: 'Main Screen Description', type: 'textarea', placeholder: 'Describe what the user sees when they open the tool...' },
      { id: 'interactions', label: 'Key Interactions', type: 'textarea', placeholder: 'List buttons, forms, filters the user can interact with...' },
      { id: 'dataDisplay', label: 'How is data displayed?', type: 'textarea', placeholder: 'Tables, charts, cards, lists? Describe each...' }
    ]
  },
  {
    id: 'backend',
    title: 'What the System Does (Backend)',
    icon: Server,
    color: 'cyan',
    fields: [
      { id: 'calculations', label: 'Calculations & Logic', type: 'textarea', placeholder: 'What math or logic does the system perform?...' },
      { id: 'automations', label: 'Automated Actions', type: 'textarea', placeholder: 'What should happen automatically? Alerts, updates...' },
      { id: 'rules', label: 'Business Rules', type: 'textarea', placeholder: 'List any rules like "alert when X > Y" or "only show Z to admin"...' }
    ]
  },
  {
    id: 'database',
    title: 'What\'s Remembered (Database)',
    icon: Database,
    color: 'emerald',
    fields: [
      { id: 'dataStored', label: 'What data needs to be stored?', type: 'textarea', placeholder: 'List all the information that needs to be saved...' },
      { id: 'dataSource', label: 'Where does the data come from?', type: 'textarea', placeholder: 'Manual entry, spreadsheet import, API...' },
      { id: 'dataHistory', label: 'Do you need historical data?', type: 'textarea', placeholder: 'Should you be able to see past records? How far back?...' }
    ]
  },
  {
    id: 'edgeCases',
    title: 'Edge Cases & Errors',
    icon: AlertTriangle,
    color: 'red',
    fields: [
      { id: 'whatIf', label: 'What if things go wrong?', type: 'textarea', placeholder: 'What happens if data is missing, invalid, or duplicate?...' },
      { id: 'permissions', label: 'Who can do what?', type: 'textarea', placeholder: 'Should some users have more access than others?...' },
      { id: 'limits', label: 'Any limits or constraints?', type: 'textarea', placeholder: 'Max number of records, file sizes, time ranges...' }
    ]
  },
  {
    id: 'success',
    title: 'Success Criteria',
    icon: CheckCircle2,
    color: 'green',
    fields: [
      { id: 'mustHave', label: 'Must Have Features', type: 'textarea', placeholder: 'List features the tool MUST have to be useful...' },
      { id: 'niceToHave', label: 'Nice to Have Features', type: 'textarea', placeholder: 'List features that would be great but not essential...' },
      { id: 'successMeasure', label: 'How will you know it\'s successful?', type: 'textarea', placeholder: 'Time saved, errors reduced, tasks completed faster...' }
    ]
  }
];

function SpecSection({ section, data, onChange, isExpanded, onToggle }) {
  const IconComponent = section.icon;
  const colorClasses = {
    purple: 'text-purple-400 bg-purple-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/20',
    red: 'text-red-400 bg-red-500/20',
    green: 'text-emerald-400 bg-emerald-500/20'
  };

  const filledFields = section.fields.filter(f => data[f.id]?.trim()).length;
  const totalFields = section.fields.length;
  const isComplete = filledFields === totalFields;

  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${colorClasses[section.color]}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">{section.title}</h3>
            <p className="text-slate-400 text-sm">
              {filledFields}/{totalFields} fields completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isComplete && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-slate-400"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-slate-700/50"
        >
          <div className="p-5 space-y-5">
            {section.fields.map(field => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={data[field.id] || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={data[field.id] || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </Card>
  );
}

function SpecificationWorkshop({ onComplete }) {
  const [specData, setSpecData] = useState(() => {
    try {
      const saved = localStorage.getItem(SPEC_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [expandedSection, setExpandedSection] = useState('overview');
  const [saved, setSaved] = useState(false);

  // Auto-save on change
  useEffect(() => {
    try {
      localStorage.setItem(SPEC_STORAGE_KEY, JSON.stringify(specData));
    } catch (error) {
      console.error('Error saving specification:', error);
    }
  }, [specData]);

  const handleFieldChange = (sectionId, fieldId, value) => {
    setSpecData(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [fieldId]: value
      }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(SPEC_STORAGE_KEY, JSON.stringify(specData));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving specification:', error);
    }
  };

  const handleExport = () => {
    const exportText = specSections.map(section => {
      const sectionData = specData[section.id] || {};
      const fields = section.fields.map(f =>
        `${f.label}:\n${sectionData[f.id] || '(Not filled)'}`
      ).join('\n\n');
      return `## ${section.title}\n\n${fields}`;
    }).join('\n\n---\n\n');

    const blob = new Blob([`# Tool Specification\n\n${exportText}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tool-specification.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getProgress = () => {
    let filled = 0;
    let total = 0;
    specSections.forEach(section => {
      section.fields.forEach(field => {
        total++;
        if (specData[section.id]?.[field.id]?.trim()) {
          filled++;
        }
      });
    });
    return Math.round((filled / total) * 100);
  };

  const progress = getProgress();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Specification <span className="text-emerald-400">Workshop</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Fill out each section to create a complete specification for your tool.
          This document is what you'll give to AI to build your tool.
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Specification Progress</span>
            </div>
            <span className="text-slate-400">{progress}% complete</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex justify-end gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="secondary"
          onClick={handleSave}
          icon={<Save className="w-4 h-4" />}
        >
          {saved ? 'Saved!' : 'Save Progress'}
        </Button>
        <Button
          variant="secondary"
          onClick={handleExport}
          icon={<Download className="w-4 h-4" />}
        >
          Export
        </Button>
      </motion.div>

      {/* Spec Sections */}
      <motion.div
        className="space-y-4 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {specSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <SpecSection
              section={section}
              data={specData[section.id] || {}}
              onChange={(fieldId, value) => handleFieldChange(section.id, fieldId, value)}
              isExpanded={expandedSection === section.id}
              onToggle={() => setExpandedSection(
                expandedSection === section.id ? null : section.id
              )}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Tip Box */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Pro Tip: Be Specific
              </h3>
              <p className="text-slate-300">
                The more specific you are, the better AI can build your tool. Instead of
                "show vehicle info", say "show vehicle ID, make, model, battery level as a
                percentage, and last check-in date/time". Details matter!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onComplete}
        >
          Continue to Review & Refine
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-slate-500 text-sm mt-3">
          You can always come back and edit your specification
        </p>
      </motion.div>
    </div>
  );
}

export default SpecificationWorkshop;
