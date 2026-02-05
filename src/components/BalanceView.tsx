import { useExpense } from '../context/ExpenseContext';
import { simplifyDebts } from '../utils/simplifyDebts';

function BalanceView() {
  const { people, expenses } = useExpense();

  /* ---------------- TOTAL SPENDING ---------------- */
  const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0);

  /* ---------------- BALANCE CALCULATION ---------------- */
  const balances: Record<string, number> = {};

  people.forEach((p) => {
    balances[p] = 0;
  });

  expenses.forEach((expense) => {
    // credit payer
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
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        💰 Balances
      </h2>

      {/* Total Spending */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg mb-6">
        <span>Total Group Spending:</span>
        <strong className="text-2xl">
          ${totalSpending.toFixed(2)}
        </strong>
      </div>

      {/* Individual Balances */}
      <div className="mb-6">
        <h3 className="text-gray-600 my-2 text-lg">Individual Balances</h3>

        {people.map((person) => {
          const balance = balances[person];
          const isOwed = balance > 0.01;
          const isOwing = balance < -0.01;

          return (
            <div
              key={person}
              className="flex justify-between items-center px-3 py-3 mb-2 rounded-md bg-gray-100 border"
            >
              <span className="font-medium">{person}</span>

              <span className="flex gap-2">
                {isOwed && (
                  <>
                    <span className="text-green-700">gets back</span>
                    <strong className="text-green-700">
                      ${balance.toFixed(2)}
                    </strong>
                  </>
                )}

                {isOwing && (
                  <>
                    <span className="text-red-700">owes</span>
                    <strong className="text-red-700">
                      ${Math.abs(balance).toFixed(2)}
                    </strong>
                  </>
                )}

                {!isOwed && !isOwing && (
                  <>
                    <span className="text-gray-600">settled up</span>
                    <strong>$0.00</strong>
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Suggested Settlements */}
      {settlements.length > 0 && (
        <div className="mt-6">
          <h3 className="text-gray-600 text-lg mb-2">
            🔄 Suggested Settlements
          </h3>

          <div className="bg-yellow-50 border rounded-lg p-4">
            {settlements.map((s, idx) => (
              <div
                key={idx}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <span>
                  <strong>{s.from}</strong> pays <strong>{s.to}</strong>
                </span>
                <strong>${s.amount.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All settled */}
      {allSettled && (
        <div className="mt-6 text-center py-6 bg-green-100 rounded-lg text-green-900 font-medium">
          ✅ All balances are settled!
        </div>
      )}
    </div>
  );
}

export default BalanceView;
