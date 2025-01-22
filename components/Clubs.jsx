import React, { useState, useEffect } from "react";
import { getClubs } from "../services"; // Import the function to fetch clubs

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-4">Our Clubs</h2>
      <div className="flex overflow-x-scroll no-scrollbar space-x-6 py-4">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="flex-none w-64 bg-black bg-opacity-30 rounded-xl p-4"
          >
            {/* Club image */}
            <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
              <img
                src={club.featuredImage.url}
                alt={club.name}
                className="object-cover w-100 h-100"
              />
            </div>

            {/* Club info */}
            <div>
              <h3 className="text-lg font-semibold text-white">{club.name}</h3>
              <p className="text-sm text-white mt-2">{club.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
