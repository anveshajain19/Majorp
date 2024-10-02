import Link from "next/link";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../public/images/logo_CT.svg";

export default function Navbar() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [authToken, setAuthToken] = useState("");
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const router = useRouter();

  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  }, [cookie]);

  const handleLogout = () => {
    removeCookie("token");
    removeCookieUsername("username");
    setAuthToken("");
    router.push("/");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-bgBlack text-white p-4 shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Link href="/" passHref>
            <a className="flex items-center space-x-3">
              <Image src={Logo} alt="Company Logo" width={40} height={40} />
              <span className="text-lg font-semibold">CODESPHERE</span>
            </a>
          </Link>

          {/* Mobile menu button */}
          <button
            className="block md:hidden p-2 focus:outline-none"
            onClick={handleToggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Links */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:items-center`}
          >
            <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
              <li>
                <Link href="/" passHref>
                  <a className="hover:text-gray-300 transition-colors duration-300">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/updates" passHref>
                  <a className="hover:text-gray-300 transition-colors duration-300">
                    Updates
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <a className="hover:text-gray-300 transition-colors duration-300">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <a className="hover:text-gray-300 transition-colors duration-300">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth buttons */}
          <div className="mt-4 md:mt-0 md:flex md:items-center">
            {authToken ? (
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all duration-300"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <>
                <Link href="/register" passHref>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded mr-4 transition-all duration-300">
                    Sign Up
                  </button>
                </Link>
                <Link href="/login" passHref>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition-all duration-300">
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
