import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'vloto-ai-academy-progress';

const LessonContext = createContext(null);

const getInitialState = () => {
  const defaultState = {
    currentSection: 1,
    sectionCompletion: [false, false, false, false, false, false, false, false],
    quizAnswers: [],
    quizScore: null,
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
      };
    }
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
  }

  return defaultState;
};

export function LessonProvider({ children }) {
  const [currentSection, setCurrentSection] = useState(() => getInitialState().currentSection);
  const [sectionCompletion, setSectionCompletion] = useState(() => getInitialState().sectionCompletion);
  const [quizAnswers, setQuizAnswers] = useState(() => getInitialState().quizAnswers);
  const [quizScore, setQuizScore] = useState(() => getInitialState().quizScore);

  // Calculate overall lesson progress percentage from completed sections
  const lessonProgress = useCallback(() => {
    const completedCount = sectionCompletion.filter(Boolean).length;
    return Math.round((completedCount / 8) * 100);
  }, [sectionCompletion]);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    try {
      const progress = {
        currentSection,
        sectionCompletion,
        quizAnswers,
        quizScore,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  }, [currentSection, sectionCompletion, quizAnswers, quizScore]);

  // Navigate to a specific section (1-8)
  const goToSection = useCallback((sectionNum) => {
    if (sectionNum >= 1 && sectionNum <= 8) {
      setCurrentSection(sectionNum);
    }
  }, []);

  // Mark a section as completed
  const completeSection = useCallback((sectionNum) => {
    if (sectionNum >= 1 && sectionNum <= 8) {
      setSectionCompletion((prev) => {
        const updated = [...prev];
        updated[sectionNum - 1] = true;
        return updated;
      });
    }
  }, []);

  // Set an answer for a specific quiz question
  const setQuizAnswer = useCallback((questionIndex, answer) => {
    setQuizAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = answer;
      return updated;
    });
  }, []);

  // Calculate and return the quiz score
  const calculateScore = useCallback((correctAnswers) => {
    let score = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });
    setQuizScore(score);
    return score;
  }, [quizAnswers]);

  // Reset all lesson progress
  const resetLesson = useCallback(() => {
    setCurrentSection(1);
    setSectionCompletion([false, false, false, false, false, false, false, false]);
    setQuizAnswers([]);
    setQuizScore(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error removing progress from localStorage:', error);
    }
  }, []);

  const value = {
    // State
    currentSection,
    sectionCompletion,
    quizAnswers,
    quizScore,
    lessonProgress: lessonProgress(),

    // Functions
    goToSection,
    completeSection,
    setQuizAnswer,
    calculateScore,
    resetLesson,
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLesson() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
}

export default LessonContext;
