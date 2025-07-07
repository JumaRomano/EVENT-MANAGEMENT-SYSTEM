import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Event } from '../../types';
import { TicketSelector } from '../Tickets/TicketSelector';
import { MpesaPayment } from '../Payment/MpesaPayment';
import { formatKenyanCurrency } from '../../utils/kenyanData';
import { toast } from 'react-hot-toast';

interface EventBookingModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export function EventBookingModal({ event, isOpen, onClose, onBookingSuccess }: EventBookingModalProps) {
  const [step, setStep] = useState<'tickets' | 'payment' | 'confirmation'>('tickets');
  const [ticketSelections, setTicketSelections] = useState<{ ticketTypeId: string; quantity: number }[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleTicketSelectionChange = (selections: { ticketTypeId: string; quantity: number }[]) => {
    setTicketSelections(selections);
  };

  const handleTotalChange = (total: number) => {
    setTotalAmount(total);
  };

  const handleProceedToPayment = () => {
    if (ticketSelections.length === 0) {
      toast.error('Please select at least one ticket');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setStep('confirmation');
    // In a real app, this would create actual tickets
    // For demo, we'll just show success
    setTimeout(() => {
      onBookingSuccess();
      onClose();
      resetModal();
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    toast.error(error);
  };

  const resetModal = () => {
    setStep('tickets');
    setTicketSelections([]);
    setTotalAmount(0);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  const totalTickets = ticketSelections.reduce((sum, selection) => sum + selection.quantity, 0);

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {step === 'tickets' && 'Book Event'}
              {step === 'payment' && 'Payment'}
              {step === 'confirmation' && 'Booking Confirmed'}
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Event Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(event.date).toLocaleDateString('en-KE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} at {event.time}
              </p>
              <p className="text-sm text-gray-600">{event.location}, {event.county}</p>
            </div>

            {step === 'tickets' && (
              <div className="space-y-6">
                <TicketSelector
                  ticketTypes={event.ticketTypes}
                  onSelectionChange={handleTicketSelectionChange}
                  onTotalChange={handleTotalChange}
                />
                
                {ticketSelections.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-gray-900">
                        Total: {totalTickets} ticket{totalTickets !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatKenyanCurrency(totalAmount)}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleProceedToPayment}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      {totalAmount === 0 ? 'Get Free Tickets' : 'Proceed to Payment'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                  {ticketSelections.map((selection) => {
                    const ticketType = event.ticketTypes.find(t => t.id === selection.ticketTypeId);
                    return (
                      <div key={selection.ticketTypeId} className="flex justify-between text-sm">
                        <span>{ticketType?.name} × {selection.quantity}</span>
                        <span>{formatKenyanCurrency((ticketType?.price || 0) * selection.quantity)}</span>
                      </div>
                    );
                  })}
                </div>
                
                {totalAmount > 0 ? (
                  <MpesaPayment
                    amount={totalAmount}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                  />
                ) : (
                  <div className="text-center">
                    <button
                      onClick={() => handlePaymentSuccess('FREE')}
                      className="bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                      Confirm Free Booking
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 'confirmation' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-4">
                  Your tickets have been booked successfully. You will receive a confirmation email shortly.
                </p>
                <p className="text-sm text-gray-500">
                  Check your dashboard to view your tickets and QR codes.
                </p>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}