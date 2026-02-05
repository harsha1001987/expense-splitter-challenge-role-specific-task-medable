import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

function ExpenseList() {
  const { expenses, deleteExpense } = useExpense();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        📝 Expense History
      </h2>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-400 py-8 italic">
          No expenses added yet. Add your first expense to get started!
        </p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => {
            const isOpen = expandedId === expense.id;

            return (
              <div
                key={expense.id}
                className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* HEADER */}
                <div
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleExpand(expense.id)}
                >
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1 text-lg truncate">
                      {expense.description}
                    </h4>
                    <div className="flex gap-4 text-gray-600 text-sm">
                      <span>{formatDate(expense.date)}</span>
                      <span>Paid by {expense.paidBy}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold text-gray-700">
                      ${expense.amount.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                {/* DROPDOWN */}
                {isOpen && (
                  <div className="border-t bg-white px-4 py-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Split Details ({expense.splitType})
                    </p>

                    {/* Equal split */}
                    {expense.splitType === 'equal' &&
                      expense.splitBetween.map((person) => (
                        <div
                          key={person}
                          className="flex justify-between text-sm py-1"
                        >
                          <span>{person}</span>
                          <span className="text-red-600">
                            owes $
                            {(
                              expense.amount /
                              expense.splitBetween.length
                            ).toFixed(2)}
                          </span>
                        </div>
                      ))}

                    {/* Custom split */}
                    {expense.splitType === 'custom' &&
                      expense.customAmounts &&
                      Object.entries(expense.customAmounts).map(
                        ([person, amount]) => (
                          <div
                            key={person}
                            className="flex justify-between text-sm py-1"
                          >
                            <span>{person}</span>
                            <span className="text-red-600">
                              owes ${amount.toFixed(2)}
                            </span>
                          </div>
                        )
                      )}

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="mt-3 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete Expense
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 text-center p-4 bg-gray-50 rounded-lg text-gray-700">
        <p>
          Total Expenses: <strong>{expenses.length}</strong>
        </p>
      </div>
    </div>
  );
}

export default ExpenseList;
