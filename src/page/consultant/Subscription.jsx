// // src/page/consultant/Subscription.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import {
//   CreditCard,
//   CheckCircle,
//   Shield,
//   Calendar,
//   Euro,
//   Lock,
//   ArrowRight,
//   AlertCircle,
//   Loader,
//   Star
// } from 'lucide-react';

// const ConsultantSubscription = () => {
//   const navigate = useNavigate();
//   const { user, BACKEND_URL } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [cardDetails, setCardDetails] = useState({
//     number: '',
//     expiry: '',
//     cvc: '',
//     name: ''
//   });

//   const handleCardInputChange = (e) => {
//     const { name, value } = e.target;
//     let formattedValue = value;

//     // Format card number with spaces
//     if (name === 'number') {
//       formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
//     }
//     // Format expiry with slash
//     if (name === 'expiry') {
//       formattedValue = value
//         .replace(/\//g, '')
//         .replace(/(\d{2})(\d{0,2})/, '$1/$2')
//         .substring(0, 5);
//     }

//     setCardDetails(prev => ({
//       ...prev,
//       [name]: formattedValue
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Simulate payment processing
//     setTimeout(() => {
//       setSuccess(true);
//       setTimeout(() => {
//         navigate('/consultant/dashboard');
//       }, 2000);
//     }, 2000);

//     // Uncomment this when your backend is ready
//     /*
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/create-subscription`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: user.email,
//           paymentMethodId: 'pm_card_visa' // You'll get this from Stripe Elements
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess(true);
//         setTimeout(() => {
//           navigate('/consultant/dashboard');
//         }, 2000);
//       } else {
//         setError(data.error || 'Payment failed');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//     */
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
//           <p className="text-gray-600 mb-4">Your consultant subscription is now active.</p>
//           <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
//           <Loader className="w-6 h-6 animate-spin mx-auto mt-4 text-blue-600" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Complete Your Subscription</h1>
//           <p className="text-gray-600">Pay €99/year to activate your consultant profile</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Left Column - Pricing Card */}
//           <div className="md:col-span-1">
//             <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white sticky top-24">
//               <h3 className="text-xl font-bold mb-4">Consultant Plan</h3>
              
//               <div className="mb-6">
//                 <span className="text-4xl font-bold">€99</span>
//                 <span className="text-blue-200 ml-2">/year</span>
//               </div>

//               <ul className="space-y-3 mb-6">
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
//                   <span className="text-sm">Professional profile visibility</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
//                   <span className="text-sm">Admin-validated matches</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
//                   <span className="text-sm">Unlimited project applications</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
//                   <span className="text-sm">30-day money-back guarantee</span>
//                 </li>
//               </ul>

//               <div className="border-t border-blue-500 pt-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <span>Subtotal</span>
//                   <span>€99</span>
//                 </div>
//                 <div className="flex items-center justify-between font-bold">
//                   <span>Total</span>
//                   <span>€99/year</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Payment Form */}
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>

//               {error && (
//                 <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
//                   <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//                   <span className="text-sm">{error}</span>
//                 </div>
//               )}

//               {/* Payment Method Selection */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Payment Method
//                 </label>
//                 <div className="grid grid-cols-3 gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod('card')}
//                     className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
//                       paymentMethod === 'card'
//                         ? 'border-blue-600 bg-blue-50 text-blue-600'
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     <CreditCard className="w-5 h-5" />
//                     <span className="text-sm font-medium">Card</span>
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod('paypal')}
//                     className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
//                       paymentMethod === 'paypal'
//                         ? 'border-blue-600 bg-blue-50 text-blue-600'
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     <span className="text-sm font-medium">PayPal</span>
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod('sepa')}
//                     className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
//                       paymentMethod === 'sepa'
//                         ? 'border-blue-600 bg-blue-50 text-blue-600'
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     <span className="text-sm font-medium">SEPA</span>
//                   </button>
//                 </div>
//               </div>

//               {paymentMethod === 'card' && (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Card Number */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Card Number
//                     </label>
//                     <div className="relative">
//                       <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="number"
//                         value={cardDetails.number}
//                         onChange={handleCardInputChange}
//                         maxLength="19"
//                         placeholder="1234 5678 9012 3456"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Expiry and CVC */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Expiry Date
//                       </label>
//                       <input
//                         type="text"
//                         name="expiry"
//                         value={cardDetails.expiry}
//                         onChange={handleCardInputChange}
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         CVC
//                       </label>
//                       <input
//                         type="text"
//                         name="cvc"
//                         value={cardDetails.cvc}
//                         onChange={handleCardInputChange}
//                         maxLength="4"
//                         placeholder="123"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Cardholder Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Cardholder Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={cardDetails.name}
//                       onChange={handleCardInputChange}
//                       placeholder="John Doe"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       required
//                     />
//                   </div>

//                   {/* Billing Address */}
//                   <div className="pt-4 border-t border-gray-200">
//                     <h3 className="font-medium text-gray-900 mb-4">Billing Address</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="col-span-2">
//                         <input
//                           type="text"
//                           placeholder="Address Line"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <input
//                           type="text"
//                           placeholder="City"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <input
//                           type="text"
//                           placeholder="Postal Code"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         />
//                       </div>
//                       <div className="col-span-2">
//                         <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
//                           <option value="">Select Country</option>
//                           <option value="DE">Germany</option>
//                           <option value="AT">Austria</option>
//                           <option value="CH">Switzerland</option>
//                           <option value="FR">France</option>
//                           <option value="UK">United Kingdom</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-blue-600 text-white py-4 px-4 rounded-xl hover:bg-blue-700 transition font-medium text-lg flex items-center justify-center disabled:opacity-50"
//                   >
//                     {loading ? (
//                       <>
//                         <Loader className="animate-spin mr-2 w-5 h-5" />
//                         Processing Payment...
//                       </>
//                     ) : (
//                       <>
//                         Pay €99 & Activate Account
//                         <ArrowRight className="ml-2 w-5 h-5" />
//                       </>
//                     )}
//                   </button>

//                   {/* Security Note */}
//                   <div className="flex items-center justify-center text-sm text-gray-500">
//                     <Lock className="w-4 h-4 mr-2" />
//                     <span>Secure payment powered by Stripe</span>
//                   </div>
//                 </form>
//               )}

//               {paymentMethod === 'paypal' && (
//                 <div className="text-center py-8">
//                   <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment.</p>
//                   <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
//                   >
//                     Continue with PayPal
//                   </button>
//                 </div>
//               )}

//               {paymentMethod === 'sepa' && (
//                 <div className="text-center py-8">
//                   <p className="text-gray-600 mb-4">SEPA Direct Debit payments are processed securely via Stripe.</p>
//                   <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
//                   >
//                     Continue with SEPA
//                   </button>
//                 </div>
//               )}

//               {/* Trust Badges */}
//               <div className="mt-8 flex items-center justify-center space-x-6">
//                 <img src="https://stripe.com/img/v3/home/twitter.png" alt="Stripe" className="h-8 opacity-50" />
//                 <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-8 opacity-50" />
//                 <Shield className="w-8 h-8 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Money Back Guarantee */}
//         <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
//           <div className="flex items-start">
//             <div className="bg-blue-100 p-2 rounded-lg mr-4">
//               <Star className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-1">30-Day Money-Back Guarantee</h3>
//               <p className="text-sm text-gray-600">
//                 If you're not satisfied with the platform within the first 30 days, 
//                 we'll refund your subscription in full. No questions asked.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsultantSubscription;



// src/page/consultant/Subscription.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  CreditCard,
  CheckCircle,
  Shield,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader,
  Star
} from 'lucide-react';

const ConsultantSubscription = () => {
  const navigate = useNavigate();
  const { user, BACKEND_URL, updateProfileCompletion } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: 'DE'
  });

useEffect(() => {
  console.log('📄 Subscription page loaded');
  console.log('📍 Current URL:', window.location.pathname);
  console.log('👤 User:', user);
  console.log('🔑 Auth token:', localStorage.getItem('auth_token'));
  console.log('📦 LocalStorage:', {
    subscription_complete: localStorage.getItem('subscription_complete'),
    profile_setup_complete: localStorage.getItem('profile_setup_complete'),
    consultant_signup_data: localStorage.getItem('consultant_signup_data')
  });
}, []);

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/consultant/login');
      return;
    }

    // Check if user has completed previous steps
    checkProfileCompletion();
  }, [user]);

const checkProfileCompletion = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/get-consultant-signup-data?email=${user.email}`);
    const data = await response.json();
    
    if (data.success && data.data) {
      const profile = data.data;
      console.log('Profile data from backend:', profile);
      
      // Check for the correct field names (jobTitle instead of expertise)
      if (!profile.fullName || !profile.jobTitle || !profile.yearsOfExperience) {
        console.log('Profile incomplete, redirecting to setup');
        navigate('/consultant/profile-setup?step=basic');
      } else {
        console.log('Profile complete, staying on subscription page');
      }
    }
  } catch (error) {
    console.error('Error checking profile:', error);
  }
};

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry with slash
    if (name === 'expiry') {
      formattedValue = value
        .replace(/\//g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };


// In src/page/consultant/Subscription.jsx - Update handleSubmit

// In Subscription.jsx - Update the handleSubmit function

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  // Basic validation
  if (paymentMethod === 'card') {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
      setError('Please fill in all card details');
      setLoading(false);
      return;
    }
    
    const cardNumber = cardDetails.number.replace(/\s/g, '');
    if (cardNumber.length < 15 || cardNumber.length > 16) {
      setError('Please enter a valid card number');
      setLoading(false);
      return;
    }
  }

  try {
    // Call the real backend endpoint to create subscription
    const response = await fetch(`${BACKEND_URL}/api/create-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        paymentMethodId: 'mock_payment_method' // For mock payment
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Subscription created successfully:', data);
      
      // Save to localStorage as backup
      localStorage.setItem('subscription_complete', 'true');
      localStorage.setItem('profile_setup_complete', 'availability');
      
      // IMPORTANT: Update the user data in localStorage with payment completed
      const storedUser = localStorage.getItem('user_data');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.profileCompletion = {
          ...userData.profileCompletion,
          payment: true
        };
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
      
      // Update profile completion in context
      updateProfileCompletion('payment', true);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/consultant/dashboard');
      }, 2000);
    } else {
      setError(data.error || 'Payment failed');
    }
  } catch (err) {
    console.error('Subscription error:', err);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const handlePayPalSubmit = () => {
    setLoading(true);
    setError('');
    
    // Mock PayPal payment
    setTimeout(() => {
      console.log('✅ Mock PayPal payment successful for:', user.email);
      updateProfileCompletion('payment', true);
      setSuccess(true);
      setTimeout(() => {
        navigate('/consultant/dashboard');
      }, 2000);
    }, 2000);
  };

  const handleSEPASubmit = () => {
    setLoading(true);
    setError('');
    
    // Mock SEPA payment
    setTimeout(() => {
      console.log('✅ Mock SEPA payment successful for:', user.email);
      updateProfileCompletion('payment', true);
      setSuccess(true);
      setTimeout(() => {
        navigate('/consultant/dashboard');
      }, 2000);
    }, 2000);
  };

  if (!user) {
    return null; // Will redirect from useEffect
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your consultant subscription is now active.</p>
          <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
          <div className="flex justify-center mt-4">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Subscription</h1>
          <p className="text-gray-600">Pay €99/year to activate your consultant profile</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Pricing Card */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-4">Consultant Plan</h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">€99</span>
                <span className="text-blue-200 ml-2">/year</span>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Professional profile visibility</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Admin-validated matches</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Unlimited project applications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">30-day money-back guarantee</span>
                </li>
              </ul>

              <div className="border-t border-blue-500 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span>Subtotal</span>
                  <span>€99</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>€99/year</span>
                </div>
              </div>

              {/* Mock Payment Notice */}
              <div className="mt-4 p-3 bg-blue-500 bg-opacity-30 rounded-lg">
                <p className="text-xs text-blue-100">
                  🔧 Mock payment mode - No real charges
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm font-medium">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-sm font-medium">PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sepa')}
                    className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                      paymentMethod === 'sepa'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-sm font-medium">SEPA</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardInputChange}
                        maxLength="19"
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Test card: 4242 4242 4242 4242
                    </p>
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleCardInputChange}
                        maxLength="4"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Billing Address */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">Billing Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <input
                          type="text"
                          name="addressLine1"
                          value={cardDetails.addressLine1}
                          onChange={handleCardInputChange}
                          placeholder="Address Line 1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          name="addressLine2"
                          value={cardDetails.addressLine2}
                          onChange={handleCardInputChange}
                          placeholder="Address Line 2 (Optional)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="city"
                          value={cardDetails.city}
                          onChange={handleCardInputChange}
                          placeholder="City"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="postalCode"
                          value={cardDetails.postalCode}
                          onChange={handleCardInputChange}
                          placeholder="Postal Code"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-2">
                        <select
                          name="country"
                          value={cardDetails.country}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          <option value="DE">Germany</option>
                          <option value="AT">Austria</option>
                          <option value="CH">Switzerland</option>
                          <option value="FR">France</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-4 px-4 rounded-xl hover:bg-blue-700 transition font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        Pay €99 & Activate Account (Mock)
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Security Note */}
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Lock className="w-4 h-4 mr-2" />
                    <span>Mock payment - No real charges</span>
                  </div>
                </form>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Mock PayPal payment - No real charges</p>
                  <button
                    onClick={handlePayPalSubmit}
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Complete Mock Payment'
                    )}
                  </button>
                </div>
              )}

              {paymentMethod === 'sepa' && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Mock SEPA payment - No real charges</p>
                  <button
                    onClick={handleSEPASubmit}
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Complete Mock Payment'
                    )}
                  </button>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-8 flex items-center justify-center space-x-6">
                <Shield className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">Mock Payment Mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-lg mr-4">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">30-Day Money-Back Guarantee</h3>
              <p className="text-sm text-gray-600">
                If you're not satisfied with the platform within the first 30 days, 
                we'll refund your subscription in full. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Mock Payment Notice */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            🔧 Currently in development mode. No actual payment will be processed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsultantSubscription;