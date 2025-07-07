import React, { useState } from 'react';
import { formatKenyanCurrency, formatKenyanPhoneNumber } from '../../utils/kenyanData';
import { CreditCardIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface MpesaPaymentProps {
  amount: number;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

export function MpesaPayment({ amount, onPaymentSuccess, onPaymentError }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');

  const handleMpesaPayment = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your M-Pesa phone number');
      return;
    }

    const formattedPhone = formatKenyanPhoneNumber(phoneNumber);
    
    setIsProcessing(true);
    
    try {
      // Simulate M-Pesa STK push
      toast.success('M-Pesa payment request sent to your phone');
      
      // Simulate payment processing
      setTimeout(() => {
        const transactionId = `MP${Date.now()}`;
        onPaymentSuccess(transactionId);
        setIsProcessing(false);
        toast.success('Payment successful!');
      }, 3000);
      
    } catch (error) {
      setIsProcessing(false);
      onPaymentError('Payment failed. Please try again.');
      toast.error('Payment failed. Please try again.');
    }
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate card payment processing
      setTimeout(() => {
        const transactionId = `CD${Date.now()}`;
        onPaymentSuccess(transactionId);
        setIsProcessing(false);
        toast.success('Payment successful!');
      }, 2000);
      
    } catch (error) {
      setIsProcessing(false);
      onPaymentError('Payment failed. Please try again.');
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
      
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatKenyanCurrency(amount)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod('mpesa')}
            className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              paymentMethod === 'mpesa'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <DevicePhoneMobileIcon className="h-5 w-5" />
            <span className="font-medium">M-Pesa</span>
          </button>
          
          <button
            onClick={() => setPaymentMethod('card')}
            className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              paymentMethod === 'card'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <CreditCardIcon className="h-5 w-5" />
            <span className="font-medium">Card</span>
          </button>
        </div>
      </div>

      {paymentMethod === 'mpesa' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              M-Pesa Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="0712345678 or +254712345678"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              You will receive an M-Pesa prompt on this number
            </p>
          </div>
          
          <button
            onClick={handleMpesaPayment}
            disabled={isProcessing || !phoneNumber}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ${formatKenyanCurrency(amount)} via M-Pesa`
            )}
          </button>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> This is a simulated card payment for demonstration purposes.
            </p>
          </div>
          
          <button
            onClick={handleCardPayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ${formatKenyanCurrency(amount)} via Card`
            )}
          </button>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Secure payment powered by Safaricom M-Pesa and Visa/Mastercard</p>
      </div>
    </div>
  );
}