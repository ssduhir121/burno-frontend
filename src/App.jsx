
// import { useState, useEffect, useRef } from 'react';
// import { PopupButton } from '@typeform/embed-react';

// export default function App() {
//   const BACKEND_URL = 'http://localhost:5000';
  
//   const typeformIds = {
//     emailForm: 'bzPeiecs',
//     detailsForm: 'IofFwTMn'
//   };
  
//   const [userEmail, setUserEmail] = useState(null);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
//   const [showDetailsForm, setShowDetailsForm] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [statusMessage, setStatusMessage] = useState('');
//   const [showEmailPrompt, setShowEmailPrompt] = useState(false);
//   const [verificationResult, setVerificationResult] = useState(null);
  
//   const pollingRef = useRef(null);
//   const fallbackTimeoutRef = useRef(null);
//   const detailsFormRef = useRef(null);

//   // Check URL parameters for verification result on load AND when URL changes
//   useEffect(() => {
//     console.log('Checking URL parameters...');
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const verified = urlParams.get('verified');
//     const email = urlParams.get('email');
    
//     console.log('URL Parameters:', { verified, email });
    
//     if (verified === 'true' && email) {
//       const decodedEmail = decodeURIComponent(email);
//       console.log('✅ Email verified via URL redirect:', decodedEmail);
      
//       // Clear any previous polling
//       if (pollingRef.current) {
//         clearInterval(pollingRef.current);
//         pollingRef.current = null;
//       }
      
//       // Set email and verification status
//       setUserEmail(decodedEmail);
//       setIsEmailVerified(true);
//       setVerificationResult('success');
//       setStatusMessage('✅ Email verified!');
      
//       // Save to localStorage
//       localStorage.setItem('pending_email', decodedEmail);
//       localStorage.setItem('email_verified', 'true');
      
//       // Clean URL - IMPORTANT: This removes the parameters from the address bar
//       window.history.replaceState({}, document.title, window.location.pathname);
      
//     } else if (verified === 'false') {
//       console.log('❌ Email verification failed');
//       setVerificationResult('failed');
//       setStatusMessage('❌ Verification failed');
      
//       // Clean URL
//       window.history.replaceState({}, document.title, window.location.pathname);
//     }
    
//     // Check existing application status from localStorage
//     const savedEmail = localStorage.getItem('pending_email');
//     const savedVerified = localStorage.getItem('email_verified');
    
//     console.log('LocalStorage check:', { savedEmail, savedVerified });
    
//     if (savedEmail && !userEmail) {
//       setUserEmail(savedEmail);
//       if (savedVerified === 'true') {
//         setIsEmailVerified(true);
//         // Check latest status from backend
//         checkEmailStatus(savedEmail);
//       }
//     }
    
//     // Cleanup polling on unmount
//     return () => {
//       if (pollingRef.current) {
//         clearInterval(pollingRef.current);
//       }
//       if (fallbackTimeoutRef.current) {
//         clearTimeout(fallbackTimeoutRef.current);
//       }
//     };
//   }, []); // Empty dependency array means this runs once on mount

//   // Check email verification status from backend
//   const checkEmailStatus = async (email) => {
//     try {
//       console.log('🔍 Checking email status for:', email);
//       const response = await fetch(`${BACKEND_URL}/api/check-status/${email}`);
      
//       if (!response.ok) {
//         throw new Error(`Backend error: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Email status from backend:', data);
      
//       if (data.email_verified) {
//         setIsEmailVerified(true);
//         localStorage.setItem('email_verified', 'true');
//         setStatusMessage('✅ Email verified!');
        
//         if (data.details_submitted) {
//           setIsDetailsSubmitted(true);
//         }
        
//         // Stop polling if verified
//         if (pollingRef.current) {
//           clearInterval(pollingRef.current);
//           pollingRef.current = null;
//         }
        
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Error checking email status:', error);
//       setStatusMessage('Error checking status');
//       return false;
//     }
//   };

//   // Start polling for verification status
//   const startVerificationPolling = (email) => {
//     if (pollingRef.current) {
//       clearInterval(pollingRef.current);
//     }
    
//     setStatusMessage(`📧 Email captured: ${email}. Waiting for verification...`);
    
//     pollingRef.current = setInterval(async () => {
//       console.log(`🔍 Polling verification status for: ${email}`);
//       const isVerified = await checkEmailStatus(email);
      
//       if (isVerified) {
//         clearInterval(pollingRef.current);
//         pollingRef.current = null;
//         alert('✅ Email verified! You can now complete the application.');
//       }
//     }, 3000); // Check every 3 seconds
//   };

//   // Manual email submission
//   const handleManualEmailSubmission = async (email, responseId = null) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/send-verification`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           email, 
//           responseId: responseId || `manual_${Date.now()}`,
//           formId: typeformIds.emailForm,
//           formData: {}
//         }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         localStorage.setItem('pending_email', email);
//         setUserEmail(email);
//         setFormSubmitted(true);
//         setShowEmailPrompt(false);
//         setStatusMessage(`✅ Verification email sent to ${email}`);
        
//         // Start polling for verification
//         startVerificationPolling(email);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error sending verification.');
//     }
//   };

//   // Handler for details form submission
//   const handleDetailsFormSubmit = async (responseId) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/save-application`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: userEmail,
//           responseId,
//           formId: typeformIds.detailsForm,
//           formData: {}
//         }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setIsDetailsSubmitted(true);
//         setShowDetailsForm(false);
//         localStorage.removeItem('pending_email');
//         localStorage.removeItem('email_verified');
        
//         // Stop any polling
//         if (pollingRef.current) {
//           clearInterval(pollingRef.current);
//           pollingRef.current = null;
//         }
        
//         alert('🎉 Application submitted successfully!');
//       } else if (data.needsVerification) {
//         alert('Please verify your email first.');
//       }
//     } catch (error) {
//       console.error('Error saving application:', error);
//       alert('Error saving application.');
//     }
//   };

//   // Reset application
//   const resetApplication = () => {
//     setUserEmail(null);
//     setIsEmailVerified(false);
//     setIsDetailsSubmitted(false);
//     setShowDetailsForm(false);
//     setFormSubmitted(false);
//     setStatusMessage('');
//     setShowEmailPrompt(false);
//     setVerificationResult(null);
//     localStorage.removeItem('pending_email');
//     localStorage.removeItem('email_verified');
    
//     // Stop any polling
//     if (pollingRef.current) {
//       clearInterval(pollingRef.current);
//       pollingRef.current = null;
//     }
//     if (fallbackTimeoutRef.current) {
//       clearTimeout(fallbackTimeoutRef.current);
//     }
//   };

//   // Test the verification flow
//   const simulateVerification = () => {
//     const testEmail = userEmail || 'test@example.com';
//     setUserEmail(testEmail);
//     setIsEmailVerified(true);
//     setVerificationResult('success');
//     setStatusMessage('✅ Email verified!');
//     localStorage.setItem('pending_email', testEmail);
//     localStorage.setItem('email_verified', 'true');
//     alert('✅ Email verification simulated! You can now complete the application.');
//   };

//   return (
//     <section className="min-h-screen bg-black text-white relative overflow-hidden flex items-center p-4 md:p-8 font-inter">
//       <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
//         {/* LEFT CONTENT */}
//         <div>
//           <p className="font-normal text-[40px] md:text-[50px] lg:text-[60px] leading-[100%] tracking-[0%] text-white mb-4 lg:mb-6">
//             We're hiring.
//           </p>

//           <h1 className="font-bold text-[60px] md:text-[80px] lg:text-[90px] leading-[110%] tracking-[0%]">
//             <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
//               Looking for a
//               <br />
//                Change?
//             </span>
//           </h1>

//           <div className="mt-8 lg:mt-14">
//             {/* Verification Result Banner */}
//             {verificationResult === 'success' && (
//               <div className="mb-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
//                 <p className="text-green-400 font-bold">✅ Email Verified Successfully!</p>
//                 <p className="text-gray-300 text-sm mt-1">You can now complete your application.</p>
//               </div>
//             )}
            
//             {verificationResult === 'failed' && (
//               <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg">
//                 <p className="text-red-400 font-bold">❌ Email Verification Failed</p>
//                 <p className="text-gray-300 text-sm mt-1">Please try submitting the form again.</p>
//               </div>
//             )}
            
//             {/* Application Flow Buttons */}
//             {!isEmailVerified && !isDetailsSubmitted && (
//               <div>
//                 <PopupButton
//                   id={typeformIds.emailForm}
//                   className="border border-pink-500 px-6 py-4 md:px-8 md:py-5 text-xl md:text-2xl lg:text-3xl font-bold hover:bg-pink-500 hover:text-black transition cursor-pointer w-full sm:w-auto text-center"
//                   autoClose={100}
//                   hideHeaders={true}
//                   hideFooters={true}
//                   onSubmit={({ responseId }) => {
//                     console.log('✅ Email form submitted with response ID:', responseId);
//                     setFormSubmitted(true);
//                     setStatusMessage('🔄 Form submitted! Check your email for verification link.');
                    
//                     // Show message about verification
//                     alert('📧 Check your email for the verification link! Click it to verify your email.');
                    
//                     // Don't poll - wait for user to click verification link
//                   }}
//                 >
//                   Apply Now!
//                 </PopupButton>
                
//                 <p className="text-xs text-gray-400 mt-2">
//                   Complete the form and check your email for verification link
//                 </p>
                
//                 {/* Debug/test buttons */}
//                 <div className="mt-4 space-x-2">
//                   <button
//                     onClick={simulateVerification}
//                     className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
//                   >
//                     Test: Simulate Verification
//                   </button>
//                   <button
//                     onClick={() => {
//                       const testUrl = `${window.location.origin}/?verified=true&email=${encodeURIComponent('test@example.com')}`;
//                       console.log('Test URL:', testUrl);
//                       window.location.href = testUrl;
//                     }}
//                     className="text-xs bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
//                   >
//                     Test: URL Redirect
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Manual Email Prompt */}
//             {showEmailPrompt && (
//               <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-yellow-600">
//                 <p className="text-yellow-400 mb-3">Please enter your email:</p>
//                 <div className="flex gap-2">
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     className="flex-grow px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         const email = e.target.value;
//                         if (email.includes('@')) {
//                           handleManualEmailSubmission(email);
//                         }
//                       }
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       const input = document.querySelector('input[type="email"]');
//                       if (input && input.value.includes('@')) {
//                         handleManualEmailSubmission(input.value);
//                       } else {
//                         alert('Please enter a valid email address');
//                       }
//                     }}
//                     className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Details Form Button - UPDATED */}
//             {isEmailVerified && !isDetailsSubmitted && !showDetailsForm && (
//               <div className="space-y-4">
//                 {/* Use PopupButton directly - no custom modal */}
//                 <PopupButton
//                   id={typeformIds.detailsForm}
//                   className="border border-green-500 px-6 py-4 md:px-8 md:py-5 text-xl md:text-2xl lg:text-3xl font-bold hover:bg-green-500 hover:text-black transition cursor-pointer w-full sm:w-auto text-center"
//                   autoClose={100}
//                   hideHeaders={true}
//                   hideFooters={true}
//                   hidden={{ email: userEmail }}
//                   onSubmit={({ responseId }) => {
//                     console.log('Details form submitted with response ID:', responseId);
//                     handleDetailsFormSubmit(responseId);
//                   }}
//                   onClose={() => {
//                     console.log('Details form closed');
//                   }}
//                   ref={detailsFormRef}
//                 >
//                   Complete Application
//                 </PopupButton>
                
//                 <p className="text-sm text-gray-400">
//                   ✅ Your email is verified. Click above to fill the application details.
//                 </p>
//               </div>
//             )}
            
//             {/* Completed State */}
//             {isDetailsSubmitted && (
//               <div className="border border-green-500 px-6 py-4 md:px-8 md:py-5 text-center rounded">
//                 <p className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">
//                   ✅ Application Submitted!
//                 </p>
//                 <p className="text-gray-300 mt-2 text-sm">
//                   Thank you for your application. We'll be in touch soon.
//                 </p>
//               </div>
//             )}
            
//             {/* Application Status */}
//             {(userEmail || formSubmitted || statusMessage) && (
//               <div className="mt-6 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                   <div>
//                     {userEmail ? (
//                       <>
//                         <p className="text-gray-300 text-sm md:text-base">
//                           <span className="font-medium">Email:</span> {userEmail}
//                         </p>
                        
//                         <div className="flex items-center gap-2 mt-2">
//                           <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isEmailVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//                           <span className={`text-xs md:text-sm ${isEmailVerified ? 'text-green-400' : 'text-yellow-400'}`}>
//                             {isEmailVerified ? '✅ Email Verified' : '⏳ Waiting for verification'}
//                           </span>
//                         </div>
                        
//                         {!isEmailVerified && (
//                           <p className="text-blue-300 text-xs mt-2">
//                             📧 Check your email for verification link
//                           </p>
//                         )}
//                       </>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500 animate-pulse"></div>
//                         <span className="text-blue-400 text-sm md:text-base">
//                           {statusMessage || 'Ready to apply'}
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <button
//                     onClick={resetApplication}
//                     className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded transition sm:self-start"
//                   >
//                     Start New
//                   </button>
//                 </div>
                
//                 {/* Debug info */}
//                 <div className="mt-3 pt-3 border-t border-gray-700">
//                   <p className="text-xs text-gray-500">
//                     Debug: {verificationResult ? `Verification: ${verificationResult}` : 'No verification result'}
//                   </p>
//                   <button
//                     onClick={() => console.log({ userEmail, isEmailVerified, verificationResult })}
//                     className="text-xs text-gray-600 mt-1"
//                   >
//                     Log State
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             <p className="text-sm text-gray-500 mt-6">www.sk.com</p>
//           </div>
//         </div>

//         {/* RIGHT CODE CARD */}
//         <div className="lg:block">
//           <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full lg:w-[300px] xl:w-[350px] h-[250px] md:h-[300px] lg:h-[350px] lg:transform lg:-rotate-[20deg] lg:origin-bottom-right lg:translate-x-8 lg:-translate-y-30 mt-8 lg:mt-0">
//             <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm border border-white/30 p-4 md:p-6 rounded-xl">
//               <div className="flex gap-2 mb-4 border-b border-white/30 pb-3">
//                 <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
//                 <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
//                 <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
//               </div>
              
//               <div className="text-xs md:text-sm font-mono leading-relaxed p-2 md:p-4">
//                 <div className={`mb-2 md:mb-3 ${formSubmitted ? 'text-green-300' : 'text-gray-400'}`}>
//                   <span className="text-green-400">1.</span>{' '}
//                   <span className={formSubmitted ? 'font-bold' : ''}>
//                     {formSubmitted ? '✓ Submit Form' : 'Click Apply Now!'}
//                   </span>
//                 </div>
                
//                 <div className="mb-2 md:mb-3 ml-4">
//                   <span className="text-green-400">↓</span>
//                 </div>
                
//                 <div className={`mb-2 md:mb-3 ${userEmail ? 'text-green-300' : 'text-gray-400'}`}>
//                   <span className="text-green-400">2.</span>{' '}
//                   <span className={userEmail ? 'font-bold' : ''}>
//                     {userEmail ? `✓ Email Captured` : 'Enter Email in Form'}
//                   </span>
//                 </div>
                
//                 <div className="mb-2 md:mb-3 ml-4">
//                   <span className="text-green-400">↓</span>
//                 </div>
                
//                 <div className={`mb-2 md:mb-3 ${isEmailVerified ? 'text-green-300' : 'text-gray-400'}`}>
//                   <span className="text-green-400">3.</span>{' '}
//                   <span className={isEmailVerified ? 'font-bold' : ''}>
//                     {isEmailVerified ? '✓ Verify Email' : 'Check Email & Click Link'}
//                   </span>
//                 </div>
                
//                 <div className="mb-2 md:mb-3 ml-4">
//                   <span className="text-green-400">↓</span>
//                 </div>
                
//                 <div className={`mt-3 md:mt-4 pt-2 border-t ${isDetailsSubmitted ? 'border-green-700' : 'border-gray-700'}`}>
//                   <span className={isDetailsSubmitted ? 'text-green-400 font-bold' : 'text-gray-500'}>
//                     {isDetailsSubmitted ? '✓ APPLICATION COMPLETE' : 'Complete Application'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* REMOVED: Custom Details Form Popup - Using Typeform's built-in popup instead */}

//       {/* Decorative elements */}
//       <div className="absolute top-10 right-10 hidden lg:flex flex-col items-center gap-2 ">
//         <span className="text-white text-6xl">★</span>
//         <span className="w-8 h-8 border border-white rotate-45"></span>
//         <span className="w-8 h-8 bg-white rounded-full mt-4"></span>
//       </div>
      
//       {/* Mobile decorative elements */}
//       <div className="absolute bottom-10 left-10 flex lg:hidden flex-col items-center gap-2 ">
//         <span className="text-white text-4xl">★</span>
//         <span className="w-6 h-6 border border-white rotate-45"></span>
//       </div>
//     </section>
//   );
// }




import { useState, useEffect, useRef } from 'react';
import { PopupButton } from '@typeform/embed-react';

export default function App() {
  // const BACKEND_URL = 'http://localhost:5000';
    const BACKEND_URL = 'https://blissful-optimism-production.up.railway.app';


  const typeformIds = {
    emailForm: 'bzPeiecs',
    detailsForm: 'IofFwTMn'
  };
  
  const [userEmail, setUserEmail] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const pollingRef = useRef(null);

  // Check URL parameters for verification result on load
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const verified = urlParams.get('verified');
      const email = urlParams.get('email');
      
      if (verified === 'true' && email) {
        const decodedEmail = decodeURIComponent(email);
        
        // Set email and verification status
        setUserEmail(decodedEmail);
        setIsEmailVerified(true);
        setVerificationResult('success');
        setStatusMessage('✅ Email verified successfully!');
        
        // Save to localStorage
        localStorage.setItem('pending_email', decodedEmail);
        localStorage.setItem('email_verified', 'true');
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Check if details were already submitted
        await checkEmailStatus(decodedEmail);
        
      } else if (verified === 'false') {
        setVerificationResult('failed');
        setStatusMessage('❌ Verification link expired or invalid. Please submit the form again.');
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      
      // Check existing application status from localStorage
      const savedEmail = localStorage.getItem('pending_email');
      const savedVerified = localStorage.getItem('email_verified');
      
      if (savedEmail && !userEmail) {
        setUserEmail(savedEmail);
        if (savedVerified === 'true') {
          setIsEmailVerified(true);
          await checkEmailStatus(savedEmail);
        }
      }
    };
    
    checkVerificationStatus();
    
    // Cleanup polling on unmount
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // Check email verification status from backend
  const checkEmailStatus = async (email) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/check-status/${email}`);
      
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.email_verified) {
        setIsEmailVerified(true);
        localStorage.setItem('email_verified', 'true');
        
        if (data.details_submitted) {
          setIsDetailsSubmitted(true);
          setStatusMessage('✅ Your application has been submitted successfully!');
        } else {
          setStatusMessage('✅ Email verified! Click "Complete Application" to continue.');
        }
        
        // Stop polling if verified
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking email status:', error);
      setStatusMessage('⚠️ Unable to verify status. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Start polling for verification status
  const startVerificationPolling = (email) => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
    
    setStatusMessage(`📧 Verification email sent! Please check your inbox (and spam folder) for the verification link.`);
    
    pollingRef.current = setInterval(async () => {
      const isVerified = await checkEmailStatus(email);
      
      if (isVerified) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    }, 5000); // Check every 5 seconds
  };

  // Handler for details form submission
  const handleDetailsFormSubmit = async (responseId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/save-application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          responseId,
          formId: typeformIds.detailsForm,
          formData: {}
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsDetailsSubmitted(true);
        localStorage.removeItem('pending_email');
        localStorage.removeItem('email_verified');
        
        // Stop any polling
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
        
        setStatusMessage('🎉 Application submitted successfully! We\'ll be in touch soon.');
      } else if (data.needsVerification) {
        setStatusMessage('⚠️ Please verify your email first.');
      }
    } catch (error) {
      console.error('Error saving application:', error);
      setStatusMessage('❌ Error submitting application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset application
  const resetApplication = () => {
    setUserEmail(null);
    setIsEmailVerified(false);
    setIsDetailsSubmitted(false);
    setStatusMessage('');
    setVerificationResult(null);
    localStorage.removeItem('pending_email');
    localStorage.removeItem('email_verified');
    
    // Stop any polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden flex items-center p-4 md:p-8 font-inter">
      <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="font-normal text-[40px] md:text-[50px] lg:text-[60px] leading-[100%] tracking-[0%] text-white mb-4 lg:mb-6">
            We're hiring.
          </p>

          <h1 className="font-bold text-[60px] md:text-[80px] lg:text-[90px] leading-[110%] tracking-[0%]">
            <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Looking for a
              <br />
               Change?
            </span>
          </h1>

          <div className="mt-8 lg:mt-14">
            {/* Verification Result Banner */}
            {verificationResult === 'success' && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg animate-pulse">
                <p className="text-green-400 font-bold flex items-center gap-2">
                  <span>✅</span> Email Verified Successfully!
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  You can now complete your application by clicking the button below.
                </p>
              </div>
            )}
            
            {verificationResult === 'failed' && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-400 font-bold flex items-center gap-2">
                  <span>❌</span> Email Verification Failed
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  The verification link has expired or is invalid. Please submit the form again to get a new verification email.
                </p>
              </div>
            )}
            
            {/* Loading State */}
            {isLoading && (
              <div className="mb-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                <p className="text-blue-400 font-bold flex items-center gap-2">
                  <span className="animate-spin">⟳</span> Processing...
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Please wait while we process your request.
                </p>
              </div>
            )}
            
            {/* Application Flow Buttons */}
            {!isEmailVerified && !isDetailsSubmitted && (
              <div className="space-y-4">
                <div className="relative group">
                  <PopupButton
                    id={typeformIds.emailForm}
                    className="border border-pink-500 px-6 py-4 md:px-8 md:py-5 text-xl md:text-2xl lg:text-3xl font-bold hover:bg-pink-500 hover:text-black transition-all duration-300 cursor-pointer w-full text-center transform hover:scale-[1.02] active:scale-[0.98]"
                    autoClose={100}
                    hideHeaders={true}
                    hideFooters={true}
                    onSubmit={({ responseId }) => {
                      setStatusMessage('📧 Form submitted! Please check your email for the verification link.');
                      
                      // Start polling for verification
                      if (userEmail) {
                        startVerificationPolling(userEmail);
                      }
                    }}
                  >
                    Apply Now!
                  </PopupButton>
                  <div className="absolute inset-0 border-2 border-pink-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="text-gray-400 text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    Complete the short form to begin
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Check your email for verification link
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Complete the final application form
                  </p>
                </div>
              </div>
            )}
            
            {/* Details Form Button */}
            {isEmailVerified && !isDetailsSubmitted && (
              <div className="space-y-6">
                <div className="relative group">
                  <PopupButton
                    id={typeformIds.detailsForm}
                    className="border border-green-500 px-6 py-4 md:px-8 md:py-5 text-xl md:text-2xl lg:text-3xl font-bold hover:bg-green-500 hover:text-black transition-all duration-300 cursor-pointer w-full text-center transform hover:scale-[1.02] active:scale-[0.98]"
                    autoClose={100}
                    hideHeaders={true}
                    hideFooters={true}
                    hidden={{ email: userEmail }}
                    onSubmit={({ responseId }) => {
                      handleDetailsFormSubmit(responseId);
                    }}
                  >
                    Complete Application
                  </PopupButton>
                  <div className="absolute inset-0 border-2 border-green-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                  <p className="text-green-400 font-medium mb-2">✅ Email Verified</p>
                  <p className="text-gray-300 text-sm">
                    Your email <span className="font-semibold text-white">{userEmail}</span> has been verified.
                    Click above to complete the application details.
                  </p>
                </div>
              </div>
            )}
            
            {/* Completed State */}
            {isDetailsSubmitted && (
              <div className="space-y-6">
                <div className="border border-green-500 px-6 py-4 md:px-8 md:py-5 text-center rounded-lg bg-green-900/10">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-3">
                    🎉 Application Submitted!
                  </p>
                  <p className="text-gray-300">
                    Thank you for your application. We'll review it and get back to you soon.
                  </p>
                </div>
                
                <div className="text-gray-400 text-sm space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Form submitted
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Email verified
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Application completed
                  </p>
                </div>
              </div>
            )}
            
            {/* Application Status */}
            {(userEmail || statusMessage) && !isDetailsSubmitted && (
              <div className="mt-8 bg-gray-900/30 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
                <div className="flex flex-col gap-4">
                  <div className="space-y-3">
                    {userEmail && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${isEmailVerified ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                          <span className="text-gray-300">
                            <span className="font-medium">Email:</span> {userEmail}
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${isEmailVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                          {isEmailVerified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    )}
                    
                    {statusMessage && (
                      <div className={`p-3 rounded-lg ${statusMessage.includes('❌') ? 'bg-red-900/30' : statusMessage.includes('✅') ? 'bg-green-900/30' : 'bg-blue-900/30'}`}>
                        <p className="text-sm">{statusMessage}</p>
                      </div>
                    )}
                    
                    {!isEmailVerified && userEmail && (
                      <div className="p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                        <p className="text-yellow-300 text-sm font-medium mb-1">📧 Check your inbox</p>
                        <p className="text-gray-400 text-xs">
                          If you don't see the verification email, please check your spam folder.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={resetApplication}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-medium text-gray-300 hover:text-white self-start"
                  >
                    Start New Application
                  </button>
                </div>
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-8">www.sk.com</p>
          </div>
        </div>

        {/* RIGHT CODE CARD */}
        <div className="lg:block">
          <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full lg:w-[300px] xl:w-[350px] h-[250px] md:h-[300px] lg:h-[350px] lg:transform lg:-rotate-[20deg] lg:origin-bottom-right lg:translate-x-8 lg:-translate-y-30 mt-8 lg:mt-0">
            <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm border border-white/30 p-4 md:p-6 rounded-xl">
              <div className="flex gap-2 mb-4 border-b border-white/30 pb-3">
                <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
              </div>
              
              <div className="text-xs md:text-sm font-mono leading-relaxed p-2 md:p-4">
                <div className={`mb-2 md:mb-3 ${userEmail ? 'text-green-300' : 'text-gray-400'}`}>
                  <span className="text-green-400">1.</span>{' '}
                  <span className={userEmail ? 'font-bold' : ''}>
                    {userEmail ? '✓ Submit Application Form' : 'Submit Application Form'}
                  </span>
                </div>
                
                <div className="mb-2 md:mb-3 ml-4">
                  <span className="text-green-400">↓</span>
                </div>
                
                <div className={`mb-2 md:mb-3 ${isEmailVerified ? 'text-green-300' : 'text-gray-400'}`}>
                  <span className="text-green-400">2.</span>{' '}
                  <span className={isEmailVerified ? 'font-bold' : ''}>
                    {isEmailVerified ? '✓ Verify Email via Link' : 'Verify Email via Link'}
                  </span>
                </div>
                
                <div className="mb-2 md:mb-3 ml-4">
                  <span className="text-green-400">↓</span>
                </div>
                
                <div className={`mb-2 md:mb-3 ${isDetailsSubmitted ? 'text-green-300' : 'text-gray-400'}`}>
                  <span className="text-green-400">3.</span>{' '}
                  <span className={isDetailsSubmitted ? 'font-bold' : ''}>
                    {isDetailsSubmitted ? '✓ Complete Details Form' : 'Complete Details Form'}
                  </span>
                </div>
                
                <div className="mb-2 md:mb-3 ml-4">
                  <span className="text-green-400">↓</span>
                </div>
                
                <div className={`mt-3 md:mt-4 pt-2 border-t ${isDetailsSubmitted ? 'border-green-700' : 'border-gray-700'}`}>
                  <span className={isDetailsSubmitted ? 'text-green-400 font-bold' : 'text-gray-500'}>
                    {isDetailsSubmitted ? '✓ APPLICATION COMPLETE' : 'Application Complete'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 hidden lg:flex flex-col items-center gap-2 ">
        <span className="text-white text-6xl">★</span>
        <span className="w-8 h-8 border border-white rotate-45"></span>
        <span className="w-8 h-8 bg-white rounded-full mt-4"></span>
      </div>
      
      {/* Mobile decorative elements */}
      <div className="absolute bottom-10 left-10 flex lg:hidden flex-col items-center gap-2 ">
        <span className="text-white text-4xl">★</span>
        <span className="w-6 h-6 border border-white rotate-45"></span>
      </div>
    </section>
  );
}