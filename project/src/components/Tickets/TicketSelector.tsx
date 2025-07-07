import React, { useState } from 'react';
import { TicketType } from '../../types';
import { formatKenyanCurrency } from '../../utils/kenyanData';
import { MinusIcon, PlusIcon, TicketIcon } from '@heroicons/react/24/outline';

interface TicketSelectorProps {
  ticketTypes: TicketType[];
  onSelectionChange: (selections: { ticketTypeId: string; quantity: number }[]) => void;
  onTotalChange: (total: number) => void;
}

export function TicketSelector({ ticketTypes, onSelectionChange, onTotalChange }: TicketSelectorProps) {
  const [selections, setSelections] = useState<{ [key: string]: number }>({});

  const updateSelection = (ticketTypeId: string, quantity: number) => {
    const newSelections = { ...selections };
    if (quantity === 0) {
      delete newSelections[ticketTypeId];
    } else {
      newSelections[ticketTypeId] = quantity;
    }
    
    setSelections(newSelections);
    
    const selectionArray = Object.entries(newSelections).map(([ticketTypeId, quantity]) => ({
      ticketTypeId,
      quantity,
    }));
    
    const total = selectionArray.reduce((sum, selection) => {
      const ticketType = ticketTypes.find(t => t.id === selection.ticketTypeId);
      return sum + (ticketType?.price || 0) * selection.quantity;
    }, 0);
    
    onSelectionChange(selectionArray);
    onTotalChange(total);
  };

  const getQuantity = (ticketTypeId: string) => selections[ticketTypeId] || 0;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <TicketIcon className="h-5 w-5 mr-2" />
        Select Tickets
      </h3>
      
      {ticketTypes.map((ticketType) => (
        <div key={ticketType.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{ticketType.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{ticketType.description}</p>
              
              {ticketType.benefits.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Includes:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {ticketType.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  {ticketType.price === 0 ? 'FREE' : formatKenyanCurrency(ticketType.price)}
                </span>
                <span className="text-sm text-gray-500">
                  {ticketType.availableQuantity} available
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateSelection(ticketType.id, Math.max(0, getQuantity(ticketType.id) - 1))}
                disabled={getQuantity(ticketType.id) === 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              
              <span className="w-8 text-center font-medium">
                {getQuantity(ticketType.id)}
              </span>
              
              <button
                onClick={() => updateSelection(ticketType.id, Math.min(ticketType.availableQuantity, getQuantity(ticketType.id) + 1))}
                disabled={getQuantity(ticketType.id) >= ticketType.availableQuantity}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            
            {getQuantity(ticketType.id) > 0 && (
              <span className="font-medium text-gray-900">
                {formatKenyanCurrency(ticketType.price * getQuantity(ticketType.id))}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}