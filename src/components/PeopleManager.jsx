import { useState } from 'react'

function PeopleManager({ people, expenses, onAddPerson, onRemovePerson }) {
  const [newPersonName, setNewPersonName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPerson(newPersonName)
    setNewPersonName('')
  }

  const canRemovePerson = (personName) => {
    // Check if the person has any expenses (as payer or participant)
    return !expenses.some(expense =>
      expense.paidBy === personName ||
      expense.splitBetween.includes(personName)
    )
  }

  const handleRemove = (index, personName) => {
    if (people.length <= 2) {
      alert('You must have at least 2 people in the group')
      return
    }

    if (!canRemovePerson(personName)) {
      alert(`Cannot remove ${personName} - they have expenses associated with them`)
      return
    }

    onRemovePerson(index)
  }

  return (
    <div className="people-manager card">
      <h2>👥 Manage People</h2>

      <form onSubmit={handleSubmit} className="add-person-form">
        <input
          type="text"
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          placeholder="Enter person's name"
          className="input"
        />
        <button type="submit" className="btn btn-primary">
          Add Person
        </button>
      </form>

      <div className="people-list">
        <h3>Current Members ({people.length})</h3>
        {people.length === 0 ? (
          <p className="empty-state">No people added yet</p>
        ) : (
          <ul className="people-items">
            {people.map((person, index) => (
              <li key={index} className="person-item">
                <span className="person-name">{person}</span>
                <button
                  onClick={() => handleRemove(index, person)}
                  className={`btn btn-delete ${!canRemovePerson(person) ? 'disabled' : ''}`}
                  title={!canRemovePerson(person) ? 'Person has expenses' : 'Remove person'}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {people.length < 2 && (
        <p className="warning">⚠️ Add at least 2 people to start tracking expenses</p>
      )}
    </div>
  )
}

export default PeopleManager