import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'vloto-ai-academy-progress';
const DEBOUNCE_MS = 500;

const LessonContext = createContext(null);

const getDefaultState = () => ({
  currentSection: 1,
  sectionCompletion: [false, false, false, false, false, false, false, false],
  quizAnswers: [],
  quizScore: null,
});

const getLocalState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...getDefaultState(), ...parsed };
    }
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
  }
  return getDefaultState();
};

export function LessonProvider({ children }) {
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState(1);
  const [sectionCompletion, setSectionCompletion] = useState([false, false, false, false, false, false, false, false]);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const saveTimeoutRef = useRef(null);
  const initializedRef = useRef(false);

  // Fetch progress from Supabase or localStorage
  const fetchProgress = useCallback(async () => {
    setLoading(true);

    if (user) {
      try {
        // Fetch lesson progress (use maybeSingle to avoid error when no row exists)
        const { data: progressData } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', 1)
          .maybeSingle();

        // Fetch quiz results
        const { data: quizData } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', 1)
          .maybeSingle();

        if (progressData) {
          setCurrentSection(progressData.current_section || 1);
          const completion = Array(8).fill(false);
          (progressData.completed_sections || []).forEach(s => {
            if (s >= 1 && s <= 8) completion[s - 1] = true;
          });
          setSectionCompletion(completion);
        } else {
          const defaultState = getDefaultState();
          setCurrentSection(defaultState.currentSection);
          setSectionCompletion(defaultState.sectionCompletion);
        }

        if (quizData) {
          setQuizAnswers(quizData.answers || []);
          setQuizScore(quizData.score);
        } else {
          setQuizAnswers([]);
          setQuizScore(null);
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
        const localState = getLocalState();
        setCurrentSection(localState.currentSection);
        setSectionCompletion(localState.sectionCompletion);
        setQuizAnswers(localState.quizAnswers);
        setQuizScore(localState.quizScore);
      }
    } else {
      const localState = getLocalState();
      setCurrentSection(localState.currentSection);
      setSectionCompletion(localState.sectionCompletion);
      setQuizAnswers(localState.quizAnswers);
      setQuizScore(localState.quizScore);
    }

    setLoading(false);
    initializedRef.current = true;
  }, [user]);

  // Initialize on mount and user change
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Save progress (debounced)
  const saveProgress = useCallback((data) => {
    if (!initializedRef.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Save to localStorage immediately for offline support
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    // Debounce Supabase save
    if (user) {
      saveTimeoutRef.current = setTimeout(async () => {
        setSaving(true);
        try {
          const completedSections = data.sectionCompletion
            .map((completed, index) => completed ? index + 1 : null)
            .filter(Boolean);

          await supabase.from('lesson_progress').upsert({
            user_id: user.id,
            lesson_id: 1,
            current_section: data.currentSection,
            completed_sections: completedSections,
            is_completed: completedSections.length === 8,
            completed_at: completedSections.length === 8 ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,lesson_id' });
        } catch (err) {
          console.error('Error saving progress to Supabase:', err);
        } finally {
          setSaving(false);
        }
      }, DEBOUNCE_MS);
    }
  }, [user]);

  // Auto-save when state changes (after initialization)
  useEffect(() => {
    if (initializedRef.current) {
      saveProgress({
        currentSection,
        sectionCompletion,
        quizAnswers,
        quizScore,
      });
    }
  }, [currentSection, sectionCompletion, saveProgress]);

  // Calculate overall lesson progress percentage
  const lessonProgress = useCallback(() => {
    const completedCount = sectionCompletion.filter(Boolean).length;
    return Math.round((completedCount / 8) * 100);
  }, [sectionCompletion]);

  // Navigate to a specific section
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

  // Calculate and save quiz score
  const calculateScore = useCallback(async (correctAnswers) => {
    let score = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });
    setQuizScore(score);

    // Save quiz results
    if (user) {
      try {
        await supabase.from('quiz_results').upsert({
          user_id: user.id,
          lesson_id: 1,
          score,
          total_questions: quizAnswers.length,
          answers: quizAnswers,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' });
      } catch (err) {
        console.error('Error saving quiz results:', err);
      }
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const current = saved ? JSON.parse(saved) : {};
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...current,
          quizAnswers,
          quizScore: score
        }));
      } catch (err) {
        console.error('Error saving quiz to localStorage:', err);
      }
    }

    return score;
  }, [quizAnswers, user]);

  // Reset all lesson progress
  const resetLesson = useCallback(async () => {
    setCurrentSection(1);
    setSectionCompletion([false, false, false, false, false, false, false, false]);
    setQuizAnswers([]);
    setQuizScore(null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error removing progress from localStorage:', error);
    }

    if (user) {
      try {
        await supabase.from('lesson_progress').delete()
          .eq('user_id', user.id).eq('lesson_id', 1);
        await supabase.from('quiz_results').delete()
          .eq('user_id', user.id).eq('lesson_id', 1);
      } catch (err) {
        console.error('Error resetting progress in Supabase:', err);
      }
    }
  }, [user]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const value = {
    currentSection,
    sectionCompletion,
    quizAnswers,
    quizScore,
    lessonProgress: lessonProgress(),
    loading,
    saving,
    goToSection,
    completeSection,
    setQuizAnswer,
    calculateScore,
    resetLesson,
    refetch: fetchProgress,
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
