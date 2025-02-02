import React, { useEffect, useState } from "react";
import Link from "next/link";

const games = [
  {
    name: "Tic Tac Toe",
    image: "/tictactoe.png", // Default image set to noinfo.png
    slug: "tictactoe",
  },
  {
    name: "Game 2",
    image: "/noinfo.png", // Default image set to noinfo.png
    slug: "game-2",
  },
  {
    name: "Game 3",
    image: "/noinfo.png", // Default image set to noinfo.png
    slug: "game-3",
  },
  {
    name: "Game 4",
    image: "/noinfo.png", // Default image set to noinfo.png
    slug: "game-4",
  },
  // Add more games as needed
];

const GamePage = () => {
  const [isClient, setIsClient] = useState(false);

  // This effect will ensure the code inside it only runs on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Games</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg"
          >
            {/* Game Image */}
            <div className="relative h-48 w-full">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            {/* Game Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{game.name}</h2>
              <Link href={`/games/${game.slug}`} passHref>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                  Play Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
