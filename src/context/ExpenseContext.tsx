import { createContext, useContext, useState, ReactNode } from 'react';
import { initialPeople, initialExpenses } from '../initialData';
import { Expense } from '../types';

type ExpenseContextType = {
  people: string[];
  expenses: Expense[];
  addPerson: (name: string) => void;
  removePerson: (name: string) => void;
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
};

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<string[]>(initialPeople);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const addPerson = (name: string) => {
    if (!name.trim() || people.includes(name)) return;
    setPeople([...people, name]);
  };

  const removePerson = (name: string) => {
    setPeople(people.filter((p) => p !== name));
    setExpenses(expenses.filter((e) => e.paidBy !== name));
  };
const addExpense = (expense: Expense) => {
  setExpenses(prev => [...prev, expense]);
};

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{ people, expenses, addPerson, removePerson, addExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpense must be used inside ExpenseProvider');
  return ctx;
}
