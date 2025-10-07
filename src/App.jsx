import { useState } from 'react'
import './styles/App.css'
import { initialPeople, initialExpenses } from './initialData'
import PeopleManager from './components/PeopleManager'
import ExpenseForm from './components/ExpenseForm'
import BalanceView from './components/BalanceView'
import ExpenseList from './components/ExpenseList'

function App() {
  const [people, setPeople] = useState(initialPeople)
  const [expenses, setExpenses] = useState(initialExpenses)

  const addPerson = (name) => {
    // TODO: Implement validation and adding
    if (!name || name.trim() === '') {
      alert('Please enter a valid name')
      return
    }

    // Check for duplicates (case-insensitive)
    if (people.some(p => p.toLowerCase() === name.toLowerCase())) {
      alert('This person already exists')
      return
    }

    setPeople([...people, name.trim()])
  }

  const removePerson = (index) => {
    // BUG: This has an off-by-one error
    setPeople(people.filter((_, i) => i !== index + 1))
  }

  const addExpense = (expense) => {
    // TODO: Add new expense with unique ID
    const newExpense = {
      ...expense,
      id: Math.max(0, ...expenses.map(e => e.id)) + 1
    }
    setExpenses([...expenses, newExpense])
  }

  const removeExpense = (id) => {
    // TODO: Implement expense removal
    setExpenses(expenses.filter(e => e.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Expense Splitter</h1>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="left-column">
            <PeopleManager
              people={people}
              expenses={expenses}
              onAddPerson={addPerson}
              onRemovePerson={removePerson}
            />
            <ExpenseForm
              people={people}
              onAddExpense={addExpense}
            />
          </div>

          <div className="right-column">
            <BalanceView
              people={people}
              expenses={expenses}
            />
            <ExpenseList
              expenses={expenses}
              onRemoveExpense={removeExpense}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
