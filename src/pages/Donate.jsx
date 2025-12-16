import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PhonePayQR from '../assets/PhonePayQR.jpeg'; // यहाँ अपनी PhonePay QR image का path डालें

const Donate = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [donationAmount, setDonationAmount] = useState("0");
  const [coverFees, setCoverFees] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paypalError, setPaypalError] = useState(false);
  const [showPhonePayQR, setShowPhonePayQR] = useState(false);

  // Auto scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Check if PayPal client ID is configured
  useEffect(() => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    if (!clientId || clientId.trim() === "") {
      console.error("PayPal Client ID is not configured in environment variables");
      setPaypalError(true);
    } else {
      console.log("PayPal Client ID loaded successfully");
      setPaypalError(false);
    }
  }, []);

  // const handleContactClick = () => {
  //   navigate('/contact');
  // };

  // Environment variables से data लें
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: import.meta.env.VITE_PAYPAL_CURRENCY || "USD",
    intent: import.meta.env.VITE_PAYPAL_INTENT || "capture",
  };

  const presetAmounts = [25, 50, 100, 250, 500];

  const calculateTotalAmount = () => {
    let amount = parseFloat(donationAmount) || 0;
    if (coverFees && amount > 0) {
      amount = (amount + 0.30) / (1 - 0.029);
    }
    return Math.round(amount * 100) / 100;
  };

  const getFeeAmount = () => {
    if (!coverFees || donationAmount === "0") return 0;
    const baseAmount = parseFloat(donationAmount) || 0;
    const totalAmount = calculateTotalAmount();
    return Math.round((totalAmount - baseAmount) * 100) / 100;
  };

  const createOrder = (data, actions) => {
    const totalAmount = calculateTotalAmount().toFixed(2);
    
    if (totalAmount <= 0) {
      alert("Please enter a valid donation amount");
      return Promise.reject("Invalid amount");
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount,
            breakdown: {
              item_total: {
                value: totalAmount,
                currency_code: import.meta.env.VITE_PAYPAL_CURRENCY || "USD"
              }
            }
          },
          items: [
            {
              name: `Donation to All World Gayatri Pariwar${isMonthly ? ' (Monthly)' : ''}`,
              description: "Supporting spiritual education and community service",
              quantity: "1",
              unit_amount: {
                value: totalAmount,
                currency_code: import.meta.env.VITE_PAYPAL_CURRENCY || "USD"
              }
            }
          ],
          description: `Donation to All World Gayatri Pariwar Bal Sanskar Shala DFW${isMonthly ? ' - Monthly' : ''}`,
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const totalAmount = calculateTotalAmount().toFixed(2);
      alert(`Thank you for your $${totalAmount} donation${isMonthly ? ' (Monthly)' : ''}, ${details.payer.name.given_name}!`);
      console.log('Donation completed:', details);
      
      // Reset form
      setDonationAmount("0");
      setCoverFees(false);
      setIsMonthly(false);
      setShowPayPal(false);
      
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const onError = (err) => {
    console.error("PayPal Checkout onError", err);
    alert("There was an error processing your donation. Please try again.");
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDonationAmount(value);
    }
  };

  const handlePresetAmount = (amount) => {
    setDonationAmount(amount.toString());
  };

  const handlePhonePayQRClick = () => {
    setShowPhonePayQR(true);
  };

  const totalAmount = calculateTotalAmount();
  const feeAmount = getFeeAmount();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* PhonePay QR Code Popup */}
      {showPhonePayQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Scan PhonePay QR Code</h3>
              <button
                onClick={() => setShowPhonePayQR(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-2">
                Scan this QR code with PhonePay app to donate
              </p>
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-800 mb-1">${totalAmount.toFixed(2)}</div>
                <div className="text-gray-500">Suggested Donation Amount</div>
              </div>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="border-4 border-green-500 p-4 rounded-lg bg-white">
                {/* PhonePay QR Code Image */}
                <img 
                  src={PhonePayQR}
                  alt="PhonePay QR Code"
                  className="w-64 h-64"
                />
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600 mb-4 space-y-2">
              <p className="font-medium">How to pay:</p>
              <p>1. Open PhonePay app on your phone</p>
              <p>2. Tap 'Scan QR Code'</p>
              <p>3. Point camera at this QR code</p>
              <p>4. Enter amount: <span className="font-bold">${totalAmount.toFixed(2)}</span></p>
              <p>5. Complete payment</p>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setShowPhonePayQR(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            All World Gayatri Pariwar
          </h1>
          <h2 className="text-lg text-white opacity-90">
            Bal Sanskar Shala San Antonio, Texas
          </h2>
        </div>

        {/* Donation Amount */}
        <div className="p-6 border-b">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              ${donationAmount === "0" ? "0" : totalAmount.toFixed(2)}
            </div>
            <div className="text-gray-600">{import.meta.env.VITE_PAYPAL_CURRENCY || "USD"}</div>
          </div>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handlePresetAmount(amount)}
                className={`p-3 rounded-lg border-2 text-center font-semibold transition-all ${
                  donationAmount === amount.toString()
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-gray-200 text-gray-700 hover:border-orange-300'
                }`}
              >
                ${amount}
              </button>
            ))}
            <button
              onClick={() => setDonationAmount("")}
              className={`p-3 rounded-lg border-2 text-center font-semibold transition-all ${
                !presetAmounts.includes(parseFloat(donationAmount)) && donationAmount !== "0"
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-200 text-gray-700 hover:border-orange-300'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Custom Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                value={donationAmount}
                onChange={handleCustomAmount}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="p-6 border-b space-y-4">
          {/* Cover Fees Option */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={coverFees}
              onChange={(e) => setCoverFees(e.target.checked)}
              className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              disabled={donationAmount === "0" || !donationAmount}
            />
            <div className="flex-1">
              <div className="font-medium text-gray-800">
                Add ${feeAmount.toFixed(2)} {import.meta.env.VITE_PAYPAL_CURRENCY || "USD"} to help cover the fees.
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Your donation will be increased to cover processing fees, so we receive the full amount.
              </div>
            </div>
          </label>
        </div>

        {/* PayPal Button */}
        <div className="p-6">
          {paypalError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">Configuration Error</p>
              <p className="text-red-500 text-sm mt-1">
                Please check your .env.local file. VITE_PAYPAL_CLIENT_ID is required.
              </p>
            </div>
          )}

          {!showPayPal ? (
            <div className="space-y-4">
              {/* PayPal Button */}
              <button
                onClick={() => setShowPayPal(true)}
                disabled={donationAmount === "0" || !donationAmount || parseFloat(donationAmount) <= 0 || paypalError}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                  donationAmount === "0" || !donationAmount || parseFloat(donationAmount) <= 0 || paypalError
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                }`}
              >
                {paypalError ? "PayPal Not Configured" : "Donate with PayPal"}
              </button>
              
              {/* OR Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <div className="px-4 text-gray-500">OR</div>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              {/* PhonePay QR Code Button */}
              <button
                onClick={handlePhonePayQRClick}
                className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span>Pay with PhonePay QR</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {!paypalError ? (
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    style={{ 
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      label: "donate",
                      height: 45
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700">PayPal is not configured. Please check environment variables.</p>
                </div>
              )}
              <button
                onClick={() => setShowPayPal(false)}
                className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Security Note */}
          <div className="text-center mt-4">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <span>🔒</span>
              <span>Secure donation powered by PayPal & PhonePay</span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Your donation supports spiritual education and community service programs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;