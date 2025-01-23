import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getUpcoming } from "../services";

// Modal component to display detailed event information
const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  const formatDateTime = (dateTime) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateTime).toLocaleString("en-UK", options);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-black bg-opacity-75 hover:bg-opacity-100 transition duration-500 p-6 rounded-3xl w-3/4 max-w-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">{event.name}</h2>
        <p className="text-white mb-2">
          <strong>Date & Time:</strong> {formatDateTime(event.date)}
        </p>
        <p className="text-white mb-2">
          <strong>Description:</strong> {event.description}
        </p>
        <p className="text-white mb-2">
          <strong>Venue:</strong> {event.venue || "Not specified"}
        </p>
        <p className="text-white mb-2">
          <strong>Requirements:</strong> {event.requirement || "Not specified"}
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Upcoming component that displays a list of upcoming events
const Upcoming = () => {
  const [upcomings, setUpcomings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dots, setDots] = useState(""); // State for animated dots

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const data = await getUpcoming();
        setUpcomings(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  // useEffect to animate the dots in "Loading..."
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const closeModal = () => setSelectedEvent(null);

  const formatDateTime = (dateTime) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateTime).toLocaleString("en-UK", options);
  };

  return (
    <div className="relative bg-black blur-3xl bg-opacity-30 hover:bg-opacity-50 hover:-translate-y-1 transition duration-500 p-8 mb-8 rounded-3xl shadow-lg">
      <h1 className="text-white text-xl mb-8 font-semibold border-b pb-4">
        Upcoming Events
      </h1>
      {loading ? (
        <div className="text-center text-white text-lg">
          Loading{dots} {/* Animated dots */}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          Error loading upcoming events: {error}
        </div>
      ) : upcomings.length > 0 ? (
        <ul className="space-y-4">
          {upcomings.map((upcoming) => (
            <li
              key={upcoming.id}
              className="bg-black bg-opacity-30 hover:bg-opacity-50 hover:-translate-y-1 p-4 rounded-2xl transition duration-500 cursor-pointer"
              onClick={() => setSelectedEvent(upcoming)}
            >
              <p className="text-xl font-semibold text-white">
                {upcoming.name}
              </p>
              <p className="text-white text-sm">
                <strong>Date:</strong> {formatDateTime(upcoming.date)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-white">No upcoming events found.</div>
      )}
      <Modal
        isOpen={!!selectedEvent}
        onClose={closeModal}
        event={selectedEvent}
      />
    </div>
  );
};

export default Upcoming;
