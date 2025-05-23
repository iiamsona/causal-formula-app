import { create } from 'zustand'

type Token = { id: string; label: string }

interface FormulaState {
  tokens: Token[]
  input: string
  setInput: (val: string) => void
  addToken: (token: Token) => void
  removeLastToken: () => void
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
}))
