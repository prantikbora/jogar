import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Industry Constants: Never use "magic numbers" in logic.
export const GRAMS_IN_KG = 1000;
export const GRAMS_IN_TEMA = 250;

interface AppState {
  // --- Data ---
  name: string;
  currentStockGrams: number; 
  dailyConsumptionTema: number; 
  lastDeductionDate: string | null;
  hasCompletedOnboarding: boolean;

  // --- Actions ---
  addStockKg: (kg: number) => void;
  manualDeductTema: (tema: number) => void;
  processAutoDeduction: () => void;
  completeOnboarding: (name: string, dailyTema: number, initialKg: number) => void;
  resetApp: () => void;

  // --- Debug Tools ---
  debug_SimulateDaysPassed: (days: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      name: '',
      currentStockGrams: 0,
      dailyConsumptionTema: 0,
      lastDeductionDate: null,
      hasCompletedOnboarding: false,

      // Sets up the user and their initial stock in KG
      completeOnboarding: (name, dailyTema, initialKg) => {
        set({ 
          name, 
          dailyConsumptionTema: dailyTema, 
          currentStockGrams: initialKg * GRAMS_IN_KG,
          hasCompletedOnboarding: true,
          lastDeductionDate: new Date().toISOString().split('T')[0]
        });
      },

      // Logic: User interacts in KG, system stores in Grams
      addStockKg: (kg) => {
        set((state) => ({
          currentStockGrams: state.currentStockGrams + (kg * GRAMS_IN_KG)
        }));
      },

      // Logic: User interacts in Tema, system stores in Grams
      manualDeductTema: (tema) => {
        set((state) => ({
          currentStockGrams: Math.max(0, state.currentStockGrams - (tema * GRAMS_IN_TEMA))
        }));
      },

      // Logic: Calculates time gap since last open and deducts accordingly
      processAutoDeduction: () => {
        const { lastDeductionDate, dailyConsumptionTema, currentStockGrams } = get();
        if (!lastDeductionDate || dailyConsumptionTema <= 0) return;

        const today = new Date();
        const last = new Date(lastDeductionDate);
        
        // Convert time difference to whole days
        const diffTime = Math.abs(today.getTime() - last.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          const totalDeduction = diffDays * dailyConsumptionTema * GRAMS_IN_TEMA;
          set({
            currentStockGrams: Math.max(0, currentStockGrams - totalDeduction),
            lastDeductionDate: today.toISOString().split('T')[0]
          });
        }
      },

      // Simulation tool to prove auto-deduction works
      debug_SimulateDaysPassed: (days) => {
        const { lastDeductionDate } = get();
        const baseDate = lastDeductionDate ? new Date(lastDeductionDate) : new Date();
        
        // Rewind the clock
        baseDate.setDate(baseDate.getDate() - days);
        
        set({ lastDeductionDate: baseDate.toISOString().split('T')[0] });
        
        // Immediately trigger the catch-up logic
        get().processAutoDeduction();
      },

      resetApp: () => set({ 
        hasCompletedOnboarding: false, 
        currentStockGrams: 0, 
        name: '',
        dailyConsumptionTema: 0,
        lastDeductionDate: null
      }),
    }),
    {
      name: 'jugar-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);