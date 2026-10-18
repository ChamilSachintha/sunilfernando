"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { X, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
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
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(8, "Phone number must be at least 8 digits"),
  subject: zod.string().min(4, "Subject must be at least 4 characters"),
  message: zod.string().min(10, "Message must be at least 10 characters"),
});

type ValuationInput = zod.infer<typeof valuationSchema>;
type ContactInput = zod.infer<typeof contactSchema>;

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
                    Thank you. A Sunil Fernando & Associates representative will contact you shortly to discuss your valuation requirements.
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
          name: data.name,
          from_name: data.name,
          email: data.email,
          from_email: data.email,
          phone: data.phone,
          phone_number: data.phone,
          subject: data.subject,
          message: data.message,
          form_type: "Call Back Request / General Contact",
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
                    Thank you. Your message has been sent. Our team will get back to you as soon as possible.
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
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Email Address</label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                        placeholder="jane@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Phone Number</label>
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
                    {errors.subject && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-sfa-navy mb-1">Message</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full px-3 py-2 border border-sfa-grey/30 text-sm focus:outline-none focus:border-sfa-cyan text-sfa-navy"
                      placeholder="How can we help you?"
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
