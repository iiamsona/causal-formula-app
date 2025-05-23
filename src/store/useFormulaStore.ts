import { create } from 'zustand'

type Token = { id: string; label: string };

interface FormulaState {
  tokens: Token[];
  input: string;
  setInput: (val: string) => void;
  addToken: (token: Token) => void;
  removeLastToken: () => void;
  removeToken: (id: string) => void; 
}

export const useFormulaStore = create<FormulaState>((set) => ({
  tokens: [],
  input: '',
  setInput: (val) => set({ input: val }),
  addToken: (token) =>
    set((state) => ({
      tokens: [...state.tokens, token],
      input: '',
    })),
  removeLastToken: () =>
    set((state) => ({
      tokens: state.tokens.slice(0, -1),
    })),
  removeToken: (id: string) => {
    set((state) => ({
      tokens: state.tokens.filter((token) => token.id !== id),
    }));
  },
}));
