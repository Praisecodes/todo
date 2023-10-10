import { create } from "zustand";

export const userStore = create(() => ({
  firstName: "Joseph",
  lastName: "Chikwado",
}));

export const todoStore = create((set) => ({
  todos: [],
  addTodo: () => set((state: any) => ({})),
  removeTodo: () => set((state: any) => ({}))
}));
