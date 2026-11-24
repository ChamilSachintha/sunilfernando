"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { X, Send, CheckCircle2, Loader2, AlertCircle, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// Zod schemas
const valuationSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(8, "Phone number must be at least 8 digits"),
  company: zod.string().min(2, "Company name must be at least 2 characters"),
  sector: zod.enum(["Tourism & Hospitality", "Commercial & Office", "Residential", "Agricultural", "Industrial", "Other"], {
    errorMap: () => ({ message: "Please select a sector" }),
  }),
  country: zod.enum(["Sri Lanka", "Maldives", "UAE", "Other"], {
    errorMap: () => ({ message: "Please select a country" }),
  }),
  message: zod.string().min(10, "Please provide a description of your valuation needs (min 10 chars)"),
});

const contactSchema = zod.object({
  name: zod.string().optional(),
  email: zod
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: zod
    .string()
    .min(1, "Phone number is required")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Please enter a valid phone number (at least 7 digits)"),
  subject: zod.string().optional(),
  message: zod.string().optional(),
});

const callbackSchema = zod.object({
  name: zod.string().min(2, "Please enter your name"),
  phone: zod
    .string()
    .min(1, "Phone number is required")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Please enter a valid phone number (at least 7 digits)"),
  email: zod
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Please enter a valid email address"
    ),
  service: zod.enum(
    [
      "Valuation & Advisory",
      "Occupier Services",
      "Capital Markets",
      "Research Services",
      "Other",
    ],
    {
      errorMap: () => ({ message: "Please select the service needed" }),
    }
  ),
  market: zod.enum(["Sri Lanka", "Maldives", "UAE", "Other"], {
    errorMap: () => ({ message: "Please select a market" }),
  }),
  propertyType: zod.enum(
    [
      "Commercial & Office",
      "Tourism & Hospitality",
      "Residential",
      "Industrial & Warehousing",
      "Agricultural / Plantation",
      "Land / Mixed-Use Development",
      "Plant & Machinery",
      "Other",
    ],
    {
      errorMap: () => ({ message: "Please select a property type" }),
    }
  ),
  bestTime: zod.enum(
    [
      "Morning (9:00 AM â€“ 12:00 PM)",
      "Afternoon (12:00 PM â€“ 3:00 PM)",
      "Late Afternoon (3:00 PM â€“ 6:00 PM)",
      "Anytime During Business Hours",
    ],
    {
      errorMap: () => ({ message: "Please select the best time to call" }),
    }
  ),
  notes: zod.string().optional(),
});

type ValuationInput = zod.infer<typeof valuationSchema>;
type ContactInput = zod.infer<typeof contactSchema>;
type CallbackInput = zod.infer<typeof callbackSchema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestValuationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValuationInput>({
    resolver: zodResolver(valuationSchema),
  });

  const onSubmit = async (data: ValuationInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_VALUATION_TEMPLATE_ID ||
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.warn(
          "EmailJS is not fully configured. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment variables."
        );
        setIsSuccess(true);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          from_name: data.name,
          email: data.email,
          from_email: data.email,
          phone: data.phone,
          phone_number: data.phone,
          company: data.company,
          property_type: data.sector,
          sector: data.sector,
          location: data.country,
          country: data.country,
          message: data.message,
          subject: `Valuation Request - ${data.company} (${data.sector})`,
          form_type: "Valuation Request",
          time: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        },
        publicKey
      );

      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to submit valuation inquiry via EmailJS:", err);
      setErrorMessage(
        "Failed to send your request. Please try again or reach out to us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    setErrorMessage(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sfa-navy/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl rounded-sm"
          >
            {/* Header */}
            <div className="bg-sfa-navy p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold tracking-wider font-sans uppercase">Request a Valuation</h3>
                <p className="text-xs text-sfa-cyan mt-1 font-sans">Submit details for a professional RICS-compliant report</p>
              </div>
              <button onClick={handleClose} className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-sfa-cyan mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold text-sfa-navy">Submission Received!</h4>
                  <p className="text-sfa-grey max-w-sm mt-2 text-sm leading-relaxed">
                    Thank you. Your message has been sent. One of our valuation consultant will contact you soon.
                  </p>
                  <button
                    onClick={handleClose}
                    className="cursor-pointer mt-6 px-6 py-2 bg-sfa-navy text-white text-xs font-bold tracking-widest uppercase hover:bg-sfa-blue transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Your Name</label>
                      <input
                        {...register("name")}
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Company</label>
                      <input
                        {...register("company")}
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="Acme Corp"
                      />
                      {errors.company && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.company.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Email Address</label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Phone Number</label>
                      <input
                        {...register("phone")}
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="+94 77 123 4567"
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Asset Sector</label>
                      <select
                        {...register("sector")}
                        className="cursor-pointer w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy bg-white"
                      >
                        <option value="">Select Sector</option>
                        <option value="Tourism & Hospitality">Tourism & Hospitality</option>
                        <option value="Commercial & Office">Commercial & Office</option>
                        <option value="Residential">Residential</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.sector && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.sector.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Target Market</label>
                      <select
                        {...register("country")}
                        className="cursor-pointer w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy bg-white"
                      >
                        <option value="">Select Country</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Maldives">Maldives</option>
                        <option value="UAE">UAE</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.country && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.country.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Requirements Description</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                      placeholder="Describe the asset, required valuation standard, and any timeline constraints..."
                    />
                    {errors.message && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.message.message}</p>}
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-sfa-navy hover:bg-sfa-blue text-white text-xs font-bold tracking-widest uppercase transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.warn(
          "EmailJS is not fully configured. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment variables."
        );
        setIsSuccess(true);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name?.trim() || "Website Visitor",
          from_name: data.name?.trim() || "Website Visitor",
          email: data.email,
          from_email: data.email,
          phone: data.phone,
          phone_number: data.phone,
          subject: data.subject?.trim() || "Call Back Request",
          message: data.message?.trim() || "(No message provided)",
          form_type: "Call Back Request / General Contact",
          time: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        },
        publicKey
      );

      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to submit contact inquiry via EmailJS:", err);
      setErrorMessage(
        "Failed to send your message. Please try again or reach out to us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    setErrorMessage(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sfa-navy/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl rounded-sm"
          >
            {/* Header */}
            <div className="bg-sfa-blue p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold tracking-wider font-sans uppercase">Contact Us</h3>
                <p className="text-xs text-white/80 mt-1 font-sans">Reach out to our offices in Sri Lanka, Maldives, or UAE</p>
              </div>
              <button onClick={handleClose} className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-sfa-blue mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold text-sfa-navy">Message Sent!</h4>
                  <p className="text-sfa-grey max-w-sm mt-2 text-sm leading-relaxed">
                    Thank you. Your message has been sent. One of our valuation consultant will contact you soon.
                  </p>
                  <button
                    onClick={handleClose}
                    className="cursor-pointer mt-6 px-6 py-2 bg-sfa-navy text-white text-xs font-bold tracking-widest uppercase hover:bg-sfa-blue transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Your Name</label>
                    <input
                      {...register("name")}
                      className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="jane@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="+94 77 987 6543"
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Subject</label>
                    <input
                      {...register("subject")}
                      className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                      placeholder="General Inquiry / Partner Proposal"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Message</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-sfa-navy hover:bg-sfa-blue text-white text-xs font-bold tracking-widest uppercase transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const RequestCallbackModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CallbackInput>({
    resolver: zodResolver(callbackSchema),
  });

  const onSubmit = async (data: CallbackInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.warn(
          "EmailJS is not fully configured. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment variables."
        );
        setIsSuccess(true);
        return;
      }

      const formattedDetails = [
        `Service Needed: ${data.service}`,
        `Market: ${data.market}`,
        `Property Type: ${data.propertyType}`,
        `Best Time to Call: ${data.bestTime}`,
        data.notes?.trim() ? `Notes: ${data.notes.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          from_name: data.name,
          email: data.email || "Not provided",
          from_email: data.email || "Not provided",
          phone: data.phone,
          phone_number: data.phone,
          service: data.service,
          market: data.market,
          country: data.market,
          property_type: data.propertyType,
          best_time_to_call: data.bestTime,
          subject: `Call Back Request â€” ${data.service} (${data.market})`,
          message: formattedDetails,
          form_type: "Call Back Request",
          time: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        },
        publicKey
      );

      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to submit call back request via EmailJS:", err);
      setErrorMessage(
        "Failed to submit your call-back request. Please try again or reach out to us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    setErrorMessage(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sfa-navy/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl rounded-sm max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1e4e72] p-6 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-xl font-bold tracking-wider font-sans uppercase">Request a Call Back</h3>
                <p className="text-xs text-[#00bdf1] mt-1 font-sans">
                  Share a few details and an advisor will call you at your preferred time
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="w-16 h-16 text-sfa-cyan mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold text-sfa-navy">Call Back Scheduled!</h4>
                  <p className="text-sfa-grey max-w-sm mt-2 text-sm leading-relaxed">
                    Thank you. We have received your call-back request and a specialist advisor will contact you during your preferred time window.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="cursor-pointer mt-6 px-6 py-2 bg-sfa-navy text-white text-xs font-bold tracking-widest uppercase hover:bg-sfa-blue transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("name")}
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="+94 77 123 4567"
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Service Needed <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("service")}
                        defaultValue=""
                        className="cursor-pointer w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy bg-white"
                      >
                        <option value="">Select Service</option>
                        <option value="Valuation & Advisory">Valuation &amp; Advisory</option>
                        <option value="Occupier Services">Occupier Services</option>
                        <option value="Capital Markets">Capital Markets</option>
                        <option value="Research Services">Research Services</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.service.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Market <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("market")}
                        defaultValue=""
                        className="cursor-pointer w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy bg-white"
                      >
                        <option value="">Select Market</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Maldives">Maldives</option>
                        <option value="UAE">UAE</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.market && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.market.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Property Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("propertyType")}
                        defaultValue=""
                        className="cursor-pointer w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy bg-white"
                      >
                        <option value="">Select Property Type</option>
                        <option value="Commercial & Office">Commercial &amp; Office</option>
                        <option value="Tourism & Hospitality">Tourism &amp; Hospitality</option>
                        <option value="Residential">Residential</option>
                        <option value="Industrial & Warehousing">Industrial &amp; Warehousing</option>
                        <option value="Agricultural / Plantation">Agricultural / Plantation</option>
                        <option value="Land / Mixed-Use Development">Land / Mixed-Use Development</option>
                        <option value="Plant & Machinery">Plant &amp; Machinery</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.propertyType && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.propertyType.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                        Best Time to Call <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("bestTime")}
                        defaultValue=""
                        className="cursor-pointer w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy bg-white"
                      >
                        <option value="">Select Preferred Time</option>
                        <option value="Morning (9:00 AM â€“ 12:00 PM)">Morning (9:00 AM â€“ 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM â€“ 3:00 PM)">Afternoon (12:00 PM â€“ 3:00 PM)</option>
                        <option value="Late Afternoon (3:00 PM â€“ 6:00 PM)">Late Afternoon (3:00 PM â€“ 6:00 PM)</option>
                        <option value="Anytime During Business Hours">Anytime During Business Hours</option>
                      </select>
                      {errors.bestTime && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.bestTime.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">
                      Brief Notes (Optional)
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={2}
                      className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                      placeholder="Any quick context on your property or timeline..."
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-[#1e4e72] hover:bg-sfa-navy text-white text-xs font-bold tracking-widest uppercase transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4" />
                        Request Call Back
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
