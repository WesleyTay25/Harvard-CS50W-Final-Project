import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#189c47] text-white p-4 px-10 flex justify-between items-center shadow-lg">
      <div className="text-2xl text font-bold text-black">
        <Link to="/">StreamSphere</Link>
      </div>
      <div className="space-x-4">
        <Link to="/login" className="hover:text-indigo-400 transition text-black">Login</Link>
        <Link to="/register" className="hover:text-indigo-400 transition text-black">Register</Link>
      </div>
    </nav>
  );
}