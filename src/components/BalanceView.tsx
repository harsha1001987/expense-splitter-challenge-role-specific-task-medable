import { useExpense } from '../context/ExpenseContext';
import { simplifyDebts } from '../utils/simplifyDebts';

function BalanceView() {
  const { people, expenses } = useExpense();

  /* ---------------- TOTAL SPENDING ---------------- */
  const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0);

  /* ---------------- BALANCE CALCULATION ---------------- */
  const balances: Record<string, number> = {};
  people.forEach((p) => (balances[p] = 0));

  expenses.forEach((expense) => {
    balances[expense.paidBy] += expense.amount;

    if (expense.splitType === 'equal') {
      const share = expense.amount / expense.splitBetween.length;
      expense.splitBetween.forEach((p) => {
        balances[p] -= share;
      });
    }

    if (expense.splitType === 'custom' && expense.customAmounts) {
      Object.entries(expense.customAmounts).forEach(([p, amt]) => {
        balances[p] -= amt;
      });
    }
  });

  /* ---------------- DEBT SIMPLIFICATION ---------------- */
  const settlements = simplifyDebts(balances);

  const allSettled = people.every(
    (p) => Math.abs(balances[p]) < 0.01
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">💰 Balances</h2>

      {/* Total Spending */}
      <div className="bg-indigo-500 text-white rounded-lg px-4 py-3 mb-6 flex justify-between">
        <span>Total Group Spending</span>
        <strong>${totalSpending.toFixed(2)}</strong>
      </div>

      {/* Individual Balances */}
      <h3 className="text-gray-700 font-medium mb-3">
        Individual Balances
      </h3>

      <div className="space-y-2 mb-6">
        {people.map((person) => {
          const balance = balances[person];
          const isOwed = balance > 0.01;
          const isOwing = balance < -0.01;

          return (
            <div
              key={person}
              className={`flex justify-between items-center px-4 py-3 rounded-lg border
                ${
                  isOwed
                    ? 'bg-green-50 border-green-200'
                    : isOwing
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
            >
              <span className="font-medium text-gray-800">
                {person}
              </span>

              {isOwed && (
                <span className="text-green-700 font-semibold">
                  +${balance.toFixed(2)}
                </span>
              )}

              {isOwing && (
                <span className="text-red-700 font-semibold">
                  -${Math.abs(balance).toFixed(2)}
                </span>
              )}

              {!isOwed && !isOwing && (
                <span className="text-gray-600">$0.00</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Suggested Settlements */}
      {settlements.length > 0 && (
        <>
          <h3 className="text-gray-700 font-medium mb-1">
            🔄 Suggested Settlements
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Minimum transactions to settle all debts
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
            {settlements.map((s, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-4 py-3 border-b last:border-b-0"
              >
                <span className="text-gray-800">
                  <strong className="text-red-600">{s.from}</strong>
                  <span className="mx-2 text-gray-500">→</span>
                  <strong className="text-green-600">{s.to}</strong>
                </span>
                <span className="font-semibold">
                  ${s.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* All settled */}
      {allSettled && (
        <div className="mt-6 text-center py-4 bg-green-100 rounded-lg text-green-900 font-medium">
          ✅ All balances are settled!
        </div>
      )}
    </div>
  );
}

export default BalanceView;
