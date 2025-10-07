import { useState } from 'react'

function ExpenseList({ expenses, onRemoveExpense }) {
  const [expandedExpense, setExpandedExpense] = useState(null)

  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onRemoveExpense(id)
      setExpandedExpense(null)
    }
  }

  const toggleExpanded = (id) => {
    setExpandedExpense(expandedExpense === id ? null : id)
  }

  const calculateSplitAmount = (expense, person) => {
    if (expense.splitType === 'equal') {
      return (expense.amount / expense.splitBetween.length).toFixed(2)
    } else if (expense.splitType === 'custom' && expense.customAmounts) {
      return parseFloat(expense.customAmounts[person] || 0).toFixed(2)
    }
    return '0.00'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="expense-list card">
      <h2>📝 Expense History</h2>

      {sortedExpenses.length === 0 ? (
        <p className="empty-state">No expenses added yet. Add your first expense to get started!</p>
      ) : (
        <div className="expenses">
          {sortedExpenses.map(expense => {
            const isExpanded = expandedExpense === expense.id
            const splitAmount = expense.amount / expense.splitBetween.length

            return (
              <div key={expense.id} className="expense-item">
                <div
                  className="expense-header"
                  onClick={() => toggleExpanded(expense.id)}
                >
                  <div className="expense-info">
                    <h4 className="expense-description">{expense.description}</h4>
                    <div className="expense-meta">
                      <span className="expense-date">{formatDate(expense.date)}</span>
                      <span className="expense-payer">Paid by {expense.paidBy}</span>
                    </div>
                  </div>
                  <div className="expense-actions">
                    <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                    <button
                      className="btn btn-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleExpanded(expense.id)
                      }}
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? '▼' : '▶'}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="expense-details">
                    <div className="split-details">
                      <h5>Split Details ({expense.splitType})</h5>
                      <ul className="split-list">
                        {expense.splitBetween.map(person => {
                          const amount = calculateSplitAmount(expense, person)
                          const owes = person !== expense.paidBy

                          return (
                            <li key={person} className="split-item">
                              <span className="split-person">{person}</span>
                              <span className="split-info">
                                {owes ? (
                                  <>
                                    <span className="owes-label">owes</span>
                                    <span className="split-amount negative">
                                      ${amount}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="paid-label">paid</span>
                                    <span className="split-amount positive">
                                      ${expense.amount.toFixed(2)}
                                    </span>
                                    {expense.splitBetween.length > 1 && (
                                      <span className="gets-back">
                                        (gets back ${(expense.amount - parseFloat(amount)).toFixed(2)})
                                      </span>
                                    )}
                                  </>
                                )}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <div className="expense-actions-bottom">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="btn btn-danger"
                      >
                        🗑️ Delete Expense
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="expense-summary">
        <p>Total Expenses: <strong>{expenses.length}</strong></p>
      </div>
    </div>
  )
}

export default ExpenseList