import React, { useMemo } from 'react';
import { CiWallet } from 'react-icons/ci';

const TRANSACTIONS = [
    { id: 'tx-1', type: 'credit', amount: 50, source: 'Nike Purchase', date: 'Feb 23' },
    { id: 'tx-2', type: 'credit', amount: 75, source: 'Adidas Order', date: 'Feb 22' },
    { id: 'tx-3', type: 'debit', amount: 200, source: 'Coins Withdrawal', date: 'Feb 20' },
];

const MyCoins = () => {
    const wallet = useMemo(() => {
        const totalEarned = TRANSACTIONS
            .filter((t) => t.type === 'credit')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalSpent = TRANSACTIONS
            .filter((t) => t.type === 'debit')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = totalEarned - totalSpent;
        return {
            totalCoins: Math.max(balance, 0),
            balance: Math.max(balance, 0),
        };
    }, []);

    return (
        <div className="bg-white p-4 sm:p-6">
            <div className="mb-6 rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-900">TOTAL AVAILABLE COINS</h2>
                </div>
                <div className="flex items-center gap-2">
                    <CiWallet className="text-3xl" />
                    <div className="mb-1 text-3xl font-bold text-gray-900">{wallet.totalCoins} MYCOINS</div>
                </div>
                <div className="text-sm text-gray-600">Your total Mycoins is worth ₹{wallet.balance}.00</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                    You can pay up to 100% of any order value through sale & promotion events of Coins.
                    Use them on the Payments page.
                </p>
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-sm font-semibold text-gray-900">COINS TRANSACTIONS</h3>
                <div className="overflow-x-auto rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="min-w-[520px]">
                        <div className="mb-2 grid grid-cols-5 text-xs text-gray-700">
                            <span>DATE</span>
                            <span className="col-span-2">DESCRIPTION</span>
                            <span className="text-right">CREDIT/DEBIT</span>
                            <span className="text-right">TYPE</span>
                        </div>
                        {TRANSACTIONS.map((t) => (
                            <div key={t.id} className="grid grid-cols-5 items-center py-2 text-xs text-gray-700">
                                <div>{t.date}</div>
                                <div className="col-span-2 font-medium">{t.source}</div>
                                <div className={`text-right font-semibold ${t.type === 'credit' ? 'text-emerald-700' : 'text-red-600'}`}>
                                    {t.type === 'credit' ? `+${t.amount}` : `-${t.amount}`}
                                </div>
                                <div className="text-right uppercase">{t.type}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCoins;
