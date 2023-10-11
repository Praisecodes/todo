import { create } from "zustand";

export const userStore = create((set) => ({
  fullName: "",
  changeFullName: (name: string) => set((state: any) => ({ fullName: name })),
}));

export const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (newTodo: any) => set((state: any) => ({ todos: [newTodo, ...state.todos] })),
  updateTodo: (todos: any) => set((state: any) => ({ todos: [...state.todos, ...todos] })),
  removeTodo: (index: number) => set((state: any) => { state.todos.splice(index, 1) }),
  clearTodo: () => set((state: any) => ({ todos: [] })),
}));
