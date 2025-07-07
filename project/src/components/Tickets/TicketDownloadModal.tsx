import React, { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { Ticket, Event } from '../../types';
import { formatKenyanCurrency } from '../../utils/kenyanData';
import { toast } from 'react-hot-toast';
import { 
  XMarkIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  ShareIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';

interface TicketDownloadModalProps {
  ticket: Ticket & { event: Event };
  isOpen: boolean;
  onClose: () => void;
}

export function TicketDownloadModal({ ticket, isOpen, onClose }: TicketDownloadModalProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const ticketType = ticket.event.ticketTypes.find(t => t.id === ticket.ticketTypeId);

  const handleDownload = async () => {
    try {
      // Create a canvas to generate the ticket as an image
      const element = ticketRef.current;
      if (!element) return;

      // For demo purposes, we'll create a simple download
      const ticketData = {
        eventTitle: ticket.event.title,
        ticketNumber: ticket.ticketNumber,
        eventDate: ticket.event.date,
        eventTime: ticket.event.time,
        location: ticket.event.location,
        ticketType: ticketType?.name,
        price: ticket.price,
        qrCode: ticket.qrCode
      };

      const dataStr = JSON.stringify(ticketData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${ticket.ticketNumber}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Ticket downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download ticket');
    }
  };

  const handlePrint = () => {
    const printContent = ticketRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket - ${ticket.ticketNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .ticket { max-width: 600px; margin: 0 auto; border: 2px solid #ddd; border-radius: 8px; padding: 20px; }
            .header { text-align: center; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px; }
            .qr-code { text-align: center; margin: 20px 0; }
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .detail-item { margin-bottom: 10px; }
            .label { font-weight: bold; color: #666; }
            .value { color: #333; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: `Ticket for ${ticket.event.title}`,
      text: `I'm attending ${ticket.event.title} on ${format(new Date(ticket.event.date), 'MMM dd, yyyy')}`,
      url: window.location.origin + `/events/${ticket.event.id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success('Event link copied to clipboard!');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Event Ticket
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Ticket Design */}
            <div ref={ticketRef} className="ticket bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg p-6 mb-6">
              {/* Header */}
              <div className="header text-center border-b border-blue-200 pb-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">EventHub Kenya</h1>
                <h2 className="text-xl font-semibold text-blue-600">{ticket.event.title}</h2>
              </div>

              {/* QR Code Section */}
              <div className="qr-code text-center mb-6">
                <div className="inline-block bg-white p-4 rounded-lg border border-gray-200">
                  <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded">
                    <QrCodeIcon className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Scan at venue</p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="details grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="detail-item">
                  <div className="label text-sm font-medium text-gray-600">Ticket Number</div>
                  <div className="value text-lg font-mono text-gray-900">#{ticket.ticketNumber}</div>
                </div>

                <div className="detail-item">
                  <div className="label text-sm font-medium text-gray-600">Ticket Type</div>
                  <div className="value text-lg text-gray-900">{ticketType?.name || 'General'}</div>
                </div>

                <div className="detail-item">
                  <div className="label text-sm font-medium text-gray-600">Date</div>
                  <div className="value text-lg text-gray-900">
                    {format(new Date(ticket.event.date), 'EEEE, MMMM dd, yyyy')}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="label text-sm font-medium text-gray-600">Time</div>
                  <div className="value text-lg text-gray-900">{ticket.event.time}</div>
                </div>

                <div className="detail-item md:col-span-2">
                  <div className="label text-sm font-medium text-gray-600">Venue</div>
                  <div className="value text-lg text-gray-900">{ticket.event.location}</div>
                  <div className="value text-sm text-gray-600">{ticket.event.county}</div>
                </div>

                <div className="detail-item">
                  <div className="label text-sm font-medium text-gray-600">Price Paid</div>
                  <div className="value text-lg font-bold text-green-600">
                    {ticket.price === 0 ? 'FREE' : formatKenyanCurrency(ticket.price)}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="label text-sm font-medium text-gray-600">Status</div>
                  <div className="value text-lg text-gray-900 capitalize">{ticket.status}</div>
                </div>
              </div>

              {/* Benefits */}
              {ticketType?.benefits && ticketType.benefits.length > 0 && (
                <div className="benefits border-t border-blue-200 pt-4">
                  <div className="label text-sm font-medium text-gray-600 mb-2">Ticket Includes:</div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {ticketType.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer */}
              <div className="footer text-center border-t border-blue-200 pt-4 mt-4">
                <p className="text-xs text-gray-600">
                  Purchased on {format(new Date(ticket.purchaseDate), 'MMM dd, yyyy')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Present this ticket at the venue entrance
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Download Ticket
              </button>
              
              <button
                onClick={handlePrint}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <PrinterIcon className="h-5 w-5 mr-2" />
                Print Ticket
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Share Event
              </button>
            </div>

            {/* Important Notes */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Present this ticket (digital or printed) at the venue entrance</li>
                <li>• Arrive at least 30 minutes before the event start time</li>
                <li>• This ticket is non-transferable and non-refundable</li>
                <li>• Keep your ticket safe - lost tickets cannot be replaced</li>
              </ul>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}