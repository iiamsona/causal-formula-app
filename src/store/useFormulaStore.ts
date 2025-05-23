import { create } from 'zustand'

type Tag = { id: string; label: string }

interface FormulaState {
  tags: Tag[]
  input: string
  setInput: (val: string) => void
  addTag: (tag: Tag) => void
  removeLastTag: () => void
  removeTag: (id: string) => void
}

export const useFormulaStore = create<FormulaState>((set) => ({
  tags: [],
  input: '',
  setInput: (val) => set({ input: val }),
  
  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag],
      input: '',
    })),
  
  removeLastTag: () =>
    set((state) => ({
      tags: state.tags.slice(0, -1),
    })),
  
  removeTag: (id: string) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    })),
}))
