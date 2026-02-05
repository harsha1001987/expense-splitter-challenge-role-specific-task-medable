import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

function PeopleManager() {
  const { people, addPerson, removePerson } = useExpense();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addPerson(name.trim());
    setName('');
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        👥 Manage People
      </h2>

      <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter person's name"
          className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Add Person
        </button>
      </form>

      <h3 className="text-gray-600 my-2 text-lg">
        Current Members ({people.length})
      </h3>

      {people.length === 0 ? (
        <p className="text-center text-gray-400 py-6 italic">No people added yet</p>
      ) : (
        <ul>
          {people.map((person) => (
            <li
              key={person}
              className="flex justify-between items-center p-2 mb-1 bg-gray-50 rounded"
            >
              <span className="font-medium">{person}</span>
              <button
                onClick={() => removePerson(person)}
                className="text-red-500 hover:bg-red-100 px-2 py-1 rounded"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}

      {people.length < 2 && (
        <p className="bg-red-100 text-red-900 px-3 py-3 rounded-md mt-4">
          ⚠️ Add at least 2 people to start tracking expenses
        </p>
      )}
    </div>
  );
}

export default PeopleManager;
