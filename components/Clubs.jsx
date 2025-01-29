import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import { getClubs } from "../services"; // Import the function to fetch clubs

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  // Fetch clubs on component mount
  useEffect(() => {
    const fetchClubs = async () => {
      const clubsData = await getClubs();
      setClubs(clubsData);
      setLoading(false);
    };

    fetchClubs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleViewClub = (slug) => {
    router.push(`/clubs/${slug}`); // Navigate to the club's slug page
  };

  return (
    <div className="relative px-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Our Clubs</h2>
      <div className="flex overflow-x-scroll no-scrollbar space-x-6 py-4">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="relative flex-none w-64 h-40 rounded-xl overflow-hidden bg-black bg-opacity-50 flex items-center justify-center"
            style={{
              backgroundImage: `url(${club.featuredImage.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

            {/* Club info */}
            <div className="relative text-center text-white px-4">
              <h3 className="text-lg font-semibold">{club.name}</h3>
              <p className="text-sm mt-2 line-clamp-2">{club.description}</p>
              <button
                onClick={() => handleViewClub(club.slug)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Club
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
