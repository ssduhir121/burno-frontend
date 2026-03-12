// components/modals/ContactSupportModal.jsx
import React, { useState } from 'react';
import { X, Send, MessageSquare, Mail, Phone, HelpCircle, AlertCircle, CheckCircle, Paperclip, Loader } from 'lucide-react';

const ContactSupportModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'consultant',
    subject: '',
    message: '',
    priority: 'normal'
  });
  
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    // Validate attachments (optional)
    if (attachments.length > 0) {
      const totalSize = attachments.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > 10 * 1024 * 1024) { // 10MB total limit
        newErrors.attachments = 'Total attachment size cannot exceed 10MB';
      }
      
      // Check individual file types
      const invalidFiles = attachments.filter(file => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        return !allowedTypes.includes(file.type);
      });
      
      if (invalidFiles.length > 0) {
        newErrors.attachments = 'Only images and PDF files are allowed';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setSubmitError('');
    setErrors({});
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('role', formData.role);
      submitData.append('subject', formData.subject);
      submitData.append('message', formData.message);
      submitData.append('priority', formData.priority);
      
      // Append attachments
      attachments.forEach(file => {
        submitData.append('attachments', file);
      });

      // Submit to backend
      const response = await fetch('http://localhost:5000/api/support/submit', {
        method: 'POST',
        body: submitData
        // Note: Don't set Content-Type header when using FormData
        // The browser will set it automatically with the correct boundary
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit support request');
      }

      console.log('Support request submitted:', data);
      setSubmittedData(data.data);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting support request:', error);
      setSubmitError(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear submit error when user makes changes
    if (submitError) setSubmitError('');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
    
    // Clear attachment error if any
    if (errors.attachments) {
      setErrors(prev => ({ ...prev, attachments: undefined }));
    }
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    onClose();
    // Reset form after modal closes
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        role: 'consultant',
        subject: '',
        message: '',
        priority: 'normal'
      });
      setAttachments([]);
      setIsSubmitted(false);
      setErrors({});
      setSubmitError('');
      setSubmittedData(null);
    }, 300);
  };

  const supportOptions = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "Available 24/7",
      action: "Start Chat",
      href: "#",
      onClick: () => {
        alert('Live chat coming soon! Please use the contact form for now.');
      }
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      description: "support@webconsultanthub.com",
      availability: "Reply within 24h",
      action: "Send Email",
      href: "mailto:support@webconsultanthub.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9am-6pm EST",
      action: "Call Now",
      href: "tel:+15551234567"
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Help Center",
      description: "Browse knowledge base",
      availability: "Self-service",
      action: "View Articles",
      href: "/help",
      onClick: (e) => {
        e.preventDefault();
        alert('Help center coming soon! Please use the contact form for now.');
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white  border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
                <p className="text-sm text-gray-600">We're here to help 24/7</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              // Success Message
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Thank you for reaching out. Our support team will get back to you within 24 hours. You'll receive a confirmation email shortly.
                </p>
                {submittedData && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-8 max-w-md mx-auto">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Ticket ID:</span> {submittedData.ticketId}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Please save this ticket ID for future reference
                    </p>
                  </div>
                )}
                <button
                  onClick={handleClose}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                {/* Quick Support Options */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {supportOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.onClick}
                      className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition border border-gray-200 group w-full"
                    >
                      <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition">
                        <div className="text-blue-600">
                          {option.icon}
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{option.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{option.availability}</p>
                      <span className="text-xs text-blue-600 font-medium">{option.action} →</span>
                    </button>
                  ))}
                </div> */}

                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                )}

                {/* Contact Form */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Or send us a message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Role Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          I am a *
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          <option value="consultant">Consultant</option>
                          <option value="client">Client</option>
                          <option value="both">Both</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Priority Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          <option value="low">Low - General inquiry</option>
                          <option value="normal">Normal - Need assistance</option>
                          <option value="high">High - Urgent issue</option>
                          <option value="critical">Critical - Platform down</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Brief summary of your question"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Please describe your question or issue in detail..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        {formData.message.length}/500 characters minimum
                      </p>
                    </div>

                    {/* File Attachments */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attachments (Optional)
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Paperclip className="w-8 h-8 text-gray-500 mb-2" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              Images or PDF (Max 10MB total)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      
                      {/* Attachment List */}
                      {attachments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                              <div className="flex items-center">
                                <Paperclip className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700">{file.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.attachments && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.attachments}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 mr-3 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By submitting this form, you agree to our privacy policy and terms of service.
                      We typically respond within 24 hours during business days.
                    </p>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportModal;