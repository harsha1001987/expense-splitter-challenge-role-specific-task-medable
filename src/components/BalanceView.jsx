import { calculateBalances, simplifyDebts } from '../utils/calculations'

function BalanceView({ people, expenses }) {
  const balances = calculateBalances(expenses, people)
  const simplifiedDebts = simplifyDebts(balances)

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const getBalanceClass = (balance) => {
    if (balance > 0.01) return 'balance-positive'
    if (balance < -0.01) return 'balance-negative'
    return 'balance-neutral'
  }

  const formatCurrency = (amount) => {
    return Math.abs(amount).toFixed(2)
  }

  return (
    <div className="balance-view card">
      <h2>💰 Balances</h2>

      <div className="total-spent">
        <span>Total Group Spending:</span>
        <strong className="amount">${totalSpent.toFixed(2)}</strong>
      </div>

      <div className="balances-grid">
        <h3>Individual Balances</h3>
        {people.map(person => {
          const balance = balances[person] || 0
          return (
            <div key={person} className={`balance-item ${getBalanceClass(balance)}`}>
              <span className="person-name">{person}</span>
              <span className="balance-amount">
                {balance > 0.01 ? (
                  <>
                    <span className="label">is owed</span>
                    <strong className="amount positive">+${formatCurrency(balance)}</strong>
                  </>
                ) : balance < -0.01 ? (
                  <>
                    <span className="label">owes</span>
                    <strong className="amount negative">-${formatCurrency(balance)}</strong>
                  </>
                ) : (
                  <>
                    <span className="label">settled up</span>
                    <strong className="amount neutral">$0.00</strong>
                  </>
                )}
              </span>
            </div>
          )
        })}
      </div>

      {simplifiedDebts.length > 0 && (
        <div className="simplified-debts">
          <h3>💸 Suggested Settlements</h3>
          <p className="subtitle">Minimum transactions to settle all debts:</p>
          <ul className="debt-list">
            {simplifiedDebts.map((debt, index) => (
              <li key={index} className="debt-item">
                <span className="debt-from">{debt.from}</span>
                <span className="debt-arrow">→</span>
                <span className="debt-to">{debt.to}</span>
                <strong className="debt-amount">${debt.amount.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      {simplifiedDebts.length === 0 && (
        <div className="all-settled">
          <p>✅ All balances are settled!</p>
        </div>
      )}
    </div>
  )
}

export default BalanceView