"use client";
import Image from "next/image";
import ProfPhoto from "../assets/prof.JPG";
import { Star, Close, CheckCircle } from "@mui/icons-material";
import { useUserContext } from "../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { y: -10, transition: { duration: 0.3, ease: "easeOut" } },
};

// Modal animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
};

// Button animation variants
const buttonVariants = {
  hover: { scale: 1.05, backgroundColor: "#2563eb", color: "#ffffff" },
  tap: { scale: 0.95 },
};

// Sample therapist data
const therapists = [
  {
    name: "Jane Doe",
    bio: "Jane is a licensed therapist with over 10 years of experience specializing in cognitive behavioral therapy (CBT) and mindfulness techniques.",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    specialties: ["CBT", "Mindfulness", "Stress Management"],
    image: ProfPhoto,
  },
  {
    name: "John Smith",
    bio: "John brings 12 years of expertise in family therapy and trauma recovery, with a compassionate and client-centered approach.",
    email: "john.smith@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    specialties: ["Family Therapy", "Trauma Recovery", "Anxiety"],
    image: ProfPhoto,
  },
];

// Mock email sending function (replace with real API in production)
const sendAppointmentEmail = async (therapistEmail, appointmentDetails) => {
  console.log(`Sending email to ${therapistEmail} with details:`, appointmentDetails);
  // Simulate API call
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};

export default function ProfList() {
  const { user } = useUserContext();
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [notification, setNotification] = useState(null);

  // Booking form state
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const appointmentDetails = {
      user: user.username,
      therapist: selectedTherapist.name,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
    };

    try {
      const success = await sendAppointmentEmail(selectedTherapist.email, appointmentDetails);
      if (success) {
        setNotification("Appointment booked successfully! Check your email for confirmation.");
        setShowBooking(false);
        setFormData({ date: "", time: "", notes: "" });
        setTimeout(() => setNotification(null), 3000); // Clear notification after 3s
      }
    } catch (error) {
      setNotification("Failed to book appointment. Please try again.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 md:px-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Hey <span className="text-blue-600">{user.username}</span>,
        </h1>
        <p className="mt-2 text-lg text-gray-600 font-medium">
          Connect with world-class therapists
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {therapists.map((therapist, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-6 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                <Image
                  src={therapist.image}
                  alt={therapist.name}
                  className="rounded-full object-cover w-full h-full ring-4 ring-white shadow-md"
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{therapist.name}</h3>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">{therapist.bio}</p>
              <div className="flex mt-3 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400" style={{ fontSize: "20px" }} />
                ))}
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSelectedTherapist(therapist)}
                className="mt-6 px-6 py-2 bg-white z-10 border border-gray-200 text-gray-700 rounded-full font-medium shadow-sm"
              >
                View Profile
              </motion.button>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent opacity-50" />
          </motion.div>
        ))}
      </div>

      {/* Therapist Profile Modal */}
      <AnimatePresence>
        {selectedTherapist && !showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTherapist(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTherapist(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <Close style={{ fontSize: "24px" }} />
              </button>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={selectedTherapist.image}
                    alt={selectedTherapist.name}
                    className="rounded-full object-cover w-full h-full ring-4 ring-gray-100"
                  />
                  <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedTherapist.name}</h2>
                <p className="mt-2 text-gray-600 text-center">{selectedTherapist.bio}</p>
                <div className="mt-6 w-full space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium">Email:</span>
                    <a href={`mailto:${selectedTherapist.email}`} className="text-blue-600 hover:underline">
                      {selectedTherapist.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium">Phone:</span>
                    <span className="text-gray-900">{selectedTherapist.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium">Location:</span>
                    <span className="text-gray-900">{selectedTherapist.location}</span>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedTherapist.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setShowBooking(true)}
                  className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md"
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedTherapist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBooking(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <Close style={{ fontSize: "24px" }} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Book Appointment with {selectedTherapist.name}
              </h2>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-black">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-black">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Any specific concerns or requests..."
                  />
                </div>
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md"
                >
                  Confirm Booking
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle style={{ fontSize: "24px" }} />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}