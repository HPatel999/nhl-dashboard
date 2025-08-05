export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-opacity-30 backdrop-blur-md bg-black">
        <h1 className="text-2xl font-bold tracking-tight">NHL Dashboard</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-yellow-300 transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-yellow-300 transition-colors">Teams</a></li>
          <li><a href="#" className="hover:text-yellow-300 transition-colors">Players</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 space-y-10 md:space-y-0 md:space-x-10">
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Welcome to the NHL Analytics Hub</h2>
          <p className="mb-6 text-lg text-gray-300">
            Dive into team stats, player breakdowns, and real-time game data — all visualized in style.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-300 transition-all">
            Get Started
          </button>
        </div>
        <img
          src="https://assets.nhle.com/logos/nhl/svg/MTL_light.svg"
          alt="NHL Logo"
          className="w-80 md:w-96 drop-shadow-2xl"
        />
      </section>
    </div>
  );
}
