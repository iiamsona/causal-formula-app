import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormulaInput } from './components/FormulaInput';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const queryClient = new QueryClient();

interface FormulaState {
  formula: string;
  setFormula: (value: string) => void;
}

export const useFormulaStore = create<FormulaState>()(
  devtools((set) => ({
    formula: '',
    setFormula: (value) => set({ formula: value }),
  }))
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Formula Input</h1>
        <FormulaInput />
      </div>
    </QueryClientProvider>
  );
};

export default App;
