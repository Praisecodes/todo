import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const userStore = create((set) => ({
  fullName: "",
  changeFullName: (name: string) => set(() => ({ fullName: name })),
}));

export const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (newTodo: any) => set((state: any) => ({ todos: [newTodo, ...state.todos] })),
  updateTodo: (todos: any) => set((state: any) => ({ todos: [...state.todos, ...todos] })),
  removeTodo: (index: number) => set((state: any) => {
    const todoArr = [...state.todos];

    todoArr.splice(index, 1);

    // try {
    //   await AsyncStorage.setItem("todos", JSON.stringify(todoArr));
    // } catch (error) {
    //   console.error(error);
    //   return;
    // }

    return ({
      todos: [...todoArr]
    })
  }),
  clearTodo: () => set(() => ({ todos: [] })),
  updateTodoStatus: (newStatus: boolean, index: number) => set((state: any) => {
    state.todos[index].done = newStatus;
  }),
}));
