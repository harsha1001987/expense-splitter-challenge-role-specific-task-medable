import BalanceView from './components/BalanceView';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import PeopleManager from './components/PeopleManager';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <header className="bg-white/10 backdrop-blur-md p-6 text-center border-b border-white/20">
          <h1 className="text-white text-4xl font-bold drop-shadow-lg">💰 Expense Splitter</h1>
        </header>

        <main className="p-8">
          <div className="max-w-7xl mx-auto flex gap-8" style={{ minWidth: '1000px' }}>
            <div style={{ width: '50%', minWidth: '500px' }}>
              <PeopleManager />
              <ExpenseForm />
            </div>

            <div style={{ width: '50%', minWidth: '500px' }}>
              <BalanceView />
              <ExpenseList />
            </div>
          </div>
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;
