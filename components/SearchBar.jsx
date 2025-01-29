import React, { useState } from "react";
import { searchPostsAndUpcoming } from "../services"; // Service function to fetch search results
import { FaSearch } from "react-icons/fa"; // Magnifying glass icon
import Image from "next/image"; // Optimized image component

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [posts, setPosts] = useState([]); // Posts search results
  const [upcomings, setUpcomings] = useState([]); // Upcoming events search results
  const [members, setMembers] = useState([]); // Members search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for detailed view

  // Format date for display
  const formatDateTime = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await searchPostsAndUpcoming(searchTerm);
      setPosts(data.posts);
      setUpcomings(data.upcomings);
      setMembers(data.members);
      setIsSearchModalOpen(true);
    } catch (error) {
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open event details modal
  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  // Close modals
  const closeSearchModal = () => setIsSearchModalOpen(false);
  const closeEventModal = () => setSelectedEvent(null);

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 bg-transparent text-white"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          <FaSearch />
        </button>
      </form>

      {/* Search Results Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-30 p-6 rounded-3xl w-3/4 max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="font-semibold text-xl text-white mb-4">
              Search Results
            </h2>

            {loading && <p className="text-white text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Posts Results */}
            {posts.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-white mb-4">Posts</h3>
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="p-2 bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 transition duration-500 rounded-xl"
                    >
                      <a
                        href={`/post/${post.slug}`}
                        className="text-blue-300 hover:underline"
                      >
                        {post.title}
                      </a>
                      <p className="text-white text-sm">{post.excerpt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upcoming Events Results */}
            {upcomings.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-white mb-4">
                  Upcoming Events
                </h3>
                <ul className="space-y-4">
                  {upcomings.map((upcoming) => (
                    <li
                      key={upcoming.id}
                      className="p-2 bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 transition duration-500 rounded-xl cursor-pointer"
                      onClick={() => openEventModal(upcoming)}
                    >
                      <div className="text-blue-300">{upcoming.name}</div>
                      <p className="text-white text-sm">
                        {upcoming.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Members Results */}
            {members.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-white mb-4">
                  Members
                </h3>
                <ul className="space-y-2">
                  {members.map((member) => (
                    <li
                      key={member.id}
                      className="bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 transition duration-500 rounded-xl p-3"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={member.photo.url}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="text-blue-300 font-medium">
                            <a href={`/members/${member.slug}`}>
                              {member.name}
                            </a>
                          </h4>
                          <p className="text-white text-sm">{member.bio}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {posts.length === 0 &&
              upcomings.length === 0 &&
              members.length === 0 &&
              searchTerm &&
              !loading &&
              !error && (
                <p className="text-gray-500 text-center">No results found.</p>
              )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={closeSearchModal}
                className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-30 p-6 rounded-3xl w-3/4 max-w-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {selectedEvent.name}
            </h2>
            <p className="text-white mb-2">
              <strong>Date & Time:</strong> {formatDateTime(selectedEvent.date)}
            </p>
            <p className="text-white mb-2">
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p className="text-white mb-2">
              <strong>Venue:</strong> {selectedEvent.venue || "Not specified"}
            </p>
            <p className="text-white mb-2">
              <strong>Requirements:</strong>{" "}
              {selectedEvent.requirement || "Not specified"}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeEventModal}
                className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
