import { create } from "zustand";

export const userStore = create(() => ({
  firstName: "Joseph",
  lastName: "Chikwado",
}));

export const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (newTodo: any) => set((state: any) => ({ todos: [newTodo, ...state.todos] })),
  updateTodo: (todos: any) => set((state: any) => ({ todos: [...state.todos, ...todos] })),
  removeTodo: () => set((state: any) => ({})),
  clearTodo: () => set((state: any) => ({ todos: [] })),
}));
