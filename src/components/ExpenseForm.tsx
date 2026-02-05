import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

function ExpenseForm() {
  const { people, addExpense } = useExpense();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [splitBetween, setSplitBetween] = useState<string[]>([]);
  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>(
    {}
  );

  /* ---------------- HANDLERS ---------------- */

  const togglePerson = (person: string) => {
    setSplitBetween((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  const handleCustomAmount = (person: string, value: string) => {
    setCustomAmounts((prev) => ({
      ...prev,
      [person]: Number(value),
    }));
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setDate('');
    setPaidBy('');
    setSplitType('equal');
    setSplitBetween([]);
    setCustomAmounts({});
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !description ||
      !amount ||
      !date ||
      !paidBy ||
      splitBetween.length === 0
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (splitType === 'custom') {
      const totalCustom = Object.values(customAmounts).reduce(
        (sum, val) => sum + val,
        0
      );

      if (Math.abs(totalCustom - Number(amount)) > 0.01) {
        alert('Custom amounts must add up to total expense');
        return;
      }
    }

    addExpense({
      id: crypto.randomUUID(),
      description,
      amount: Number(amount),
      paidBy,
      date,
      splitType,
      splitBetween,
      customAmounts: splitType === 'custom' ? customAmounts : undefined,
    });

    resetForm();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <h2 className="text-2xl mb-4">💸 Add Expense</h2>

      <form onSubmit={handleSubmit}>
        {/* Description */}
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Amount + Date */}
        <div className="flex gap-3 mb-3">
          <input
            type="number"
            className="flex-1 p-2 border rounded"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            className="flex-1 p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Paid By */}
        <select
          className="w-full p-2 border rounded mb-3"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          <option value="">Paid by...</option>
          {people.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Split Type */}
        <div className="mb-3">
          <label className="mr-4">
            <input
              type="radio"
              checked={splitType === 'equal'}
              onChange={() => setSplitType('equal')}
            />{' '}
            Equal
          </label>

          <label>
            <input
              type="radio"
              checked={splitType === 'custom'}
              onChange={() => setSplitType('custom')}
            />{' '}
            Custom
          </label>
        </div>

        {/* Split Between */}
        <div className="mb-4">
          <p className="font-medium mb-2">Split Between</p>

          {people.map((p) => (
            <div key={p} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={splitBetween.includes(p)}
                onChange={() => togglePerson(p)}
              />

              <span>{p}</span>

              {splitType === 'custom' && splitBetween.includes(p) && (
                <input
                  type="number"
                  className="ml-auto w-24 p-1 border rounded"
                  placeholder="$"
                  value={customAmounts[p] ?? ''}
                  onChange={(e) =>
                    handleCustomAmount(p, e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
