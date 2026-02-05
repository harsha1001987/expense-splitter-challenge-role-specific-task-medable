import { Balance, SimplifiedDebt } from '../types';

export function simplifyDebts(balances: Balance): SimplifiedDebt[] {
  const debtors: { person: string; amount: number }[] = [];
  const creditors: { person: string; amount: number }[] = [];

  Object.entries(balances).forEach(([person, amount]) => {
    if (amount < -0.01) {
      debtors.push({ person, amount: -amount });
    } else if (amount > 0.01) {
      creditors.push({ person, amount });
    }
  });

  const result: SimplifiedDebt[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const settleAmount = Math.min(debtor.amount, creditor.amount);

    result.push({
      from: debtor.person,
      to: creditor.person,
      amount: Number(settleAmount.toFixed(2))
    });

    debtor.amount -= settleAmount;
    creditor.amount -= settleAmount;

    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return result;
}
