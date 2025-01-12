import React, { useState } from "react";
import { searchPostsAndUpcoming } from "../services"; // Import the service function to search posts, upcomings, and authors
import { FaSearch } from "react-icons/fa"; // Import the magnifying glass icon for the search button
import Image from "next/image"; // Import Image component for optimized image handling

const SearchBar = () => {
  // State for handling search input, results, loading, and modal visibility
  const [searchTerm, setSearchTerm] = useState(""); // Search term entered by the user
  const [posts, setPosts] = useState([]); // Store search results for posts
  const [upcomings, setUpcomings] = useState([]); // Store search results for upcoming events
  const [authors, setAuthors] = useState([]); // Store search results for authors
  const [loading, setLoading] = useState(false); // Handle loading state during fetch
  const [error, setError] = useState(null); // Handle errors that may occur during fetch
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Control modal visibility when search results are ready
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event for detailed view

  // Format the event date to a more readable format
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

  // Handle search logic when the form is submitted
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setLoading(true); // Show loading state
    setError(null); // Reset error state before fetching

    try {
      // Call the service function to fetch posts, upcomings, and authors based on the search term
      const data = await searchPostsAndUpcoming(searchTerm);
      setPosts(data.posts); // Set posts search results
      setUpcomings(data.upcomings); // Set upcomings search results
      setAuthors(data.authors); // Set authors search results
      setIsSearchModalOpen(true); // Open the search modal once the search results are ready
    } catch (err) {
      setError("Failed to fetch search results. Please try again."); // Set error message if fetching fails
    } finally {
      setLoading(false); // Hide loading state after fetch completion
    }
  };

  // Handle opening the modal for a specific upcoming event
  const openEventModal = (event) => {
    setSelectedEvent(event); // Set the selected event for detailed view
  };

  // Handle closing the search results modal
  const closeSearchModal = () => {
    setIsSearchModalOpen(false); // Set modal visibility to false
  };

  // Handle closing the upcoming event details modal
  const closeEventModal = () => {
    setSelectedEvent(null); // Reset selected event
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state as user types
          className="w-full p-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 bg-transparent text-white"
        />

        {/* Magnifying glass icon for the search button */}
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
          <div
            className="bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-500 p-6 rounded-3xl w-3/4 max-w-2xl max-h-[80vh] overflow-y-auto"
            style={{
              paddingRight: "15px", // Adjust padding for scrollbar inside modal
              scrollbarWidth: "thin", // Firefox scrollbar style
              scrollbarColor: "#4a90e2 rgba(255, 255, 255, 0.1)", // Firefox scrollbar color
            }}
          >
            <h2 className="font-semibold text-xl text-white mb-4">
              Search Results
            </h2>

            {/* Display loading message if search is in progress */}
            {loading && <p className="text-white text-center">Loading...</p>}
            {/* Display error message if fetching fails */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Render posts search results */}
            {posts.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-500">
                <h3 className="font-semibold text-lg text-white mb-4">Posts</h3>
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="p-2 bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 transition duration-500 rounded-xl"
                    >
                      <a
                        href={`/post/${post.slug}`} // Link to individual post page
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

            {/* Render upcomings search results */}
            {upcomings.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-4 text-white">
                  Upcoming Events
                </h3>
                <ul className="space-y-4">
                  {upcomings.map((upcoming) => (
                    <li
                      key={upcoming.id}
                      className="p-2 bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 transition duration-500 rounded-xl cursor-pointer"
                      onClick={() => openEventModal(upcoming)} // Open modal for event details
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

            {/* Render authors search results */}
            {authors.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-white mb-4">
                  Authors
                </h3>
                <ul className="space-y-2">
                  {authors.map((author) => (
                    <li
                      key={author.id}
                      className="bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 transition duration-500 rounded-xl p-3"
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          src={author.photo.url} // Author's photo
                          alt={author.name} // Author's name as alt text
                          width={40} // Set width for image
                          height={40} // Set height for image
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="text-blue-300 font-medium">
                            {author.name}
                          </h4>
                          <p className="text-white text-sm">{author.bio}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Handle no results case */}
            {posts.length === 0 &&
              upcomings.length === 0 &&
              authors.length === 0 &&
              searchTerm &&
              !loading &&
              !error && (
                <p className="text-gray-500 text-center">No results found.</p>
              )}

            {/* Close search modal button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeSearchModal} // Close the search modal when clicked
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
          <div className="bg-black bg-opacity-75 hover:bg-opacity-100 transition duration-500 p-6 rounded-3xl w-3/4 max-w-lg shadow-lg">
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
                onClick={closeEventModal} // Close the event modal when clicked
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
