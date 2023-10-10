import { create } from "zustand";

export const userStore = create(() => ({
  firstName: "Joseph",
  lastName: "Chikwado",
}));

export const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (newTodo:any) => set((state: any) => ({todos: [...state.todos, newTodo]})),
  removeTodo: () => set((state: any) => ({}))
}));
