# 💰 Expense Splitter Challenge

## Time Limit: 2 hours

Welcome to the Expense Splitter coding challenge! Your task is to complete and fix a React application that helps groups of people track and split expenses.

## 🚀 Getting Started

### Setup
1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Run tests:
   ```bash
   pnpm test
   ```

## 📋 Requirements

### Core Features (70 points)

#### People Management (15 points)
- [ ] Add new people to the group (validate no duplicates, case-insensitive)
- [ ] Remove people from the group (only if they have no expenses)
- [ ] Maintain minimum of 2 people in the group
- [ ] Display clear error messages for invalid operations

#### Expense Management (20 points)
- [ ] Add expenses with description, amount, payer, and date
- [ ] Support equal split between selected participants
- [ ] Support custom split amounts (bonus)
- [ ] Delete expenses with confirmation
- [ ] Display expenses sorted by date (newest first)

#### Balance Calculation (20 points)
- [ ] Calculate correct individual balances
- [ ] Show who owes money and who is owed
- [ ] Implement debt simplification algorithm
- [ ] Display total group spending

#### Bug Fixes (15 points)
- [ ] Fix the off-by-one error in person removal
- [ ] Fix form state not clearing after submission
- [ ] Fix balance calculation (adds when it should subtract)
- [ ] Fix failing test for decimal handling
- [ ] Fix responsive layout issues on mobile

### Code Quality (20 points)
- [ ] Proper React patterns (hooks, state management)
- [ ] Clean component structure and separation of concerns
- [ ] No console errors or warnings
- [ ] All provided tests passing
- [ ] Proper error handling and validation

### UI/UX (10 points)
- [ ] Mobile responsive design (fix the CSS bugs!)
- [ ] Clear and helpful error messages
- [ ] Intuitive user interface
- [ ] Visual feedback for user actions
- [ ] Loading states where appropriate

## 🐛 Known Bugs to Fix

The starter code contains several intentional bugs:

1. **App.jsx (Line 31)**: Off-by-one error in `removePerson` function
2. **ExpenseForm.jsx**: Form state not clearing after submission
3. **calculations.js**: Balance calculation incorrectly adds instead of subtracts
4. **calculations.test.js**: Failing test for decimal amount handling
5. **App.css**: Flexbox layout breaks on mobile devices
6. **App.css**: Text overflow issues in various components

## 🧪 Testing

Run the test suite to check your implementation:
```bash
pnpm test
```

One test is intentionally failing - you need to fix it! The test expects proper decimal handling for splitting $100 among 3 people.

### Test Coverage Areas:
- Balance calculations for equal splits
- Balance calculations for custom splits
- Decimal amount handling (33.33 vs 33.34)
- Debt simplification algorithm
- Edge cases (person pays but isn't in split)

## 🎯 Bonus Features (if time allows)

If you finish early, consider implementing:
- [ ] Settle up functionality (mark debts as paid)
- [ ] Expense categories with icons
- [ ] Edit existing expenses
- [ ] Export expenses to JSON
- [ ] Percentage-based splits
- [ ] Dark mode toggle
- [ ] Expense search/filter
- [ ] Currency selection
- [ ] Expense receipt image upload

## 📝 Submission Guidelines

1. Ensure all core tests pass
2. Fix all identified bugs
3. Commit your changes with clear messages
4. Include brief notes about your approach in your final commit
5. List any assumptions you made
6. Note any incomplete features or known issues

## 💡 Tips

- Start by running the app and tests to understand the current state
- Fix the bugs first - they're blocking correct functionality
- Read the test files to understand expected behavior
- The debt simplification algorithm should minimize transactions
- Pay attention to decimal rounding (splitting $100 by 3)
- Don't forget about responsive design

## 🏗 Project Structure

```
src/
├── components/
│   ├── PeopleManager.jsx    # Add/remove people
│   ├── ExpenseForm.jsx      # Add new expenses
│   ├── BalanceView.jsx      # Show balances and settlements
│   └── ExpenseList.jsx      # List and manage expenses
├── utils/
│   ├── calculations.js      # Balance and debt calculations
│   └── calculations.test.js # Tests (some need fixing!)
├── styles/
│   └── App.css             # Styles with responsive bugs
├── App.jsx                 # Main app with state management
├── initialData.js          # Sample data
└── main.jsx               # App entry point
```

## 🎓 What We're Looking For

- Problem-solving approach
- React best practices
- Code organization
- Attention to detail
- Ability to work with existing code
- Testing mindset
- UI/UX considerations

Good luck! 🍀
