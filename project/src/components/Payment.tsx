import React, { useState } from 'react';
import { X, CreditCard, IndianRupee } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface PaymentProps {
  onClose: () => void;
}

export const Payment: React.FC<PaymentProps> = ({ onClose }) => {
  const { user, updateUser } = useUser();
  const [amount, setAmount] = useState(1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ virtualCoins: user.virtualCoins + amount });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-primary-light rounded-xl shadow-2xl p-8 w-full max-w-md relative border border-gray-800">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-secondary">Add Funds</h2>
          <p className="text-gray-400">Top up your virtual balance to continue trading</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="amount">
              Amount (in ₹)
            </label>
            <div className="relative">
              <IndianRupee className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-secondary focus:ring-2 focus:ring-accent focus:border-accent"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="card-details">
              Card Details
            </label>
            <div className="p-3 border border-gray-700 rounded-lg bg-gray-800">
              {/* Placeholder for a real card element */}
              <div className="flex items-center">
                <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                <input
                  type="text"
                  className="flex-1 border-none focus:ring-0 bg-transparent text-secondary"
                  placeholder="Card Number"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>Pay ₹{amount}</span>
          </button>
        </form>
      </div>
    </div>
  );
};