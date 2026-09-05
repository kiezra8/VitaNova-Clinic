import React, { useState } from 'react';
import {
  CreditCard,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amountUGX: number;
  purpose: string;
  onPaymentSuccess: (transactionId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  title,
  amountUGX,
  purpose,
  onPaymentSuccess
}) => {
  const [provider, setProvider] = useState<'MTN' | 'Airtel'>('MTN');
  const [phoneNumber, setPhoneNumber] = useState<string>('0772458912');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [ussdPromptVisible, setUssdPromptVisible] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // 1. Simulate sending USSD push prompt to Uganda phone
      setUssdPromptVisible(true);

      const response = await fetch('/api/payments/momo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: provider === 'MTN' ? 'MTN Mobile Money' : 'Airtel Money',
          phoneNumber,
          amountUGX,
          purpose
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTimeout(() => {
          setIsProcessing(false);
          setUssdPromptVisible(false);
          setPaymentDone(true);
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          onPaymentSuccess(data.transactionId);
        }, 2200);
      } else {
        setIsProcessing(false);
        setUssdPromptVisible(false);
        setErrorMsg(data.error || 'Payment transaction failed. Please check phone number.');
      }
    } catch (err: any) {
      setIsProcessing(false);
      setUssdPromptVisible(false);
      setErrorMsg('Failed to communicate with payment gateway. Please check internet connection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Uganda Mobile Money Checkout</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentDone ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Payment Confirmed!</h4>
              <p className="text-xs text-slate-300">
                UGX {amountUGX.toLocaleString()} has been received for <strong className="text-white">{purpose}</strong>.
              </p>
              <p className="text-[11px] text-teal-400 pt-2 font-mono">
                SMS confirmation sent to {phoneNumber}.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-4">
            {/* Amount Summary */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Total to Pay</span>
                <h4 className="text-xl font-extrabold text-white">UGX {amountUGX.toLocaleString()}</h4>
                <p className="text-[11px] text-slate-400">{purpose}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300">
                Instant
              </span>
            </div>

            {/* Provider Selector: MTN MoMo vs Airtel Money */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select Provider</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProvider('MTN')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    provider === 'MTN'
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/60 ring-1 ring-yellow-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span>MTN MoMo (*165#)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProvider('Airtel')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    provider === 'Airtel'
                      ? 'bg-red-500/20 text-red-300 border-red-500/60 ring-1 ring-red-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>Airtel Money (*185#)</span>
                </button>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ugandan Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="0772123456 or +2567..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                A USSD push prompt will appear on this handset to approve with PIN.
              </span>
            </div>

            {/* USSD Prompt Simulation Banner */}
            {ussdPromptVisible && (
              <div className="p-3.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-xs text-yellow-300 space-y-1 animate-pulse">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-yellow-400" />
                  <strong className="text-white">USSD PIN Prompt Sent!</strong>
                </div>
                <p className="text-[11px] text-yellow-200/90">
                  Please check your phone screen ({phoneNumber}) and enter your mobile money PIN to authorize UGX {amountUGX.toLocaleString()}.
                </p>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Waiting for USSD PIN Approval...</span>
                  </>
                ) : (
                  <span>Pay UGX {amountUGX.toLocaleString()} via {provider} MoMo</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
