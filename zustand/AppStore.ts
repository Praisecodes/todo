import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const updateTheStorage = async (arr: any[]) => {
  try {
    await AsyncStorage.setItem("todos", JSON.stringify(arr))
  } catch (error) {
    throw error;
  }
}

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

    try {
      updateTheStorage(todoArr);
    } catch (error) {
      console.error(error);
      return;
    }

    return ({
      todos: [...todoArr]
    })
  }),
  clearTodo: () => set(() => ({ todos: [] })),
  updateTodoStatus: (newStatus: boolean, index: number) => set((state: any) => {
    let todoArr = [...state.todos];

    todoArr[index].done = newStatus;
    return ({
      todos: [...todoArr]
    })
  }),
}));

export const useCategoryStore = create((set) => ({
  category: "upcoming",
  toggleCategory: (category:string) => set((state: any) => ({ category: category })),
}))
