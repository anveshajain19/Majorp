import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Headerimg from "../public/images/Saly-10.gif";
import CodeImg from "../public/images/code.png";
import Footerr from "../public/images/footer.png"
import ArrowRightImg from "../public/images/arrow-right.png";
import CodeEditorImg from "../public/images/code_editor.gif";
import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Typed from "typed.js"; // Import Typed.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const leftVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 1.2 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const rightVariants = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 1.2 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

export default function Home() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const [username, setUsername] = useState("");
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [roomname, setRoomname] = useState("");
  const router = useRouter();

  // Create a ref for the typed.js element
  const typedElement = useRef(null);

  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
    if (cookieUsername["username"]) {
      setUsername(cookieUsername["username"]);
    }
  }, [cookie, cookieUsername]);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Collaborate, share ideas, and create next-level applications with ease.",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: false,
    });

    return () => {
      typed.destroy(); // Cleanup on unmount
    };
  }, []);

  // Circular scroll for the cards
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const startScroll = () => {
      scrollAmount += 1;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0; // Reset scroll to create circular effect
      }
      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    const scrollInterval = setInterval(startScroll, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <div className="w-full min-h-screen text-white">
        <Head>
          <title>Code Together</title>
        </Head>

        <div className="px-1 mx-auto max-w-6xl lg:-my-20 -my-10">
          <div className="flex flex-col-reverse md:flex-row lg:items-end items-center">
            {/* Text */}
            <motion.div
              className="pt-20 pb-0 px-3 xl:px-0 md:pl-4 text-center md:pb-12 md:w-1/2 md:text-left"
              variants={leftVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
            <br/>
              <h1
                id="header-text"
                className="relative z-10 text-4xl font-bold md:text-5xl font-display"
              >
                Unlock the power of team-driven development.
              </h1>
              <p className="pt-8 text-lg leading-relaxed text-white md:max-w-md md:text-xl">
                <span ref={typedElement}></span>
              </p>
              <div className="flex my-[25px] justify-center md:justify-start">
                <Link href="/createroom">
                  <a>
                    <h1 className="text-3xl">Get Started</h1>
                  </a>
                </Link>

                <Link href="/createroom">
                  <button className="text-4xl mx-4 text-primary animate-pulse">
                    <BsArrowUpRightCircle />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              className="flex items-end md:w-1/2 mt-[10vh]"
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <br/>
              <Image src={Headerimg} />
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center mt-28 md:mt-52 mb-5 text-center">
          <h3 className="text-4xl md:text-5xl font-medium">
            What is{" "}
            <span className="font-semibold italic">Code Together?</span>
          </h3>
        </div>

        {/* Cards with circular scroll */}
        <div className="overflow-x-scroll scrollbar-hide" ref={scrollRef}>
          <div className="xl:px-44 md:px-10 sm:px-28 p-10 md:pt-20 grid grid-flow-col auto-cols-max gap-7">
            {/* Card 1 */}
            <div className="rounded overflow-hidden px-4">
              <Image src={CodeImg} />
              <div className="py-4">
                <div className="font-bold text-2xl mb-2">Collaborate Coding</div>
                
                <div id="explore-text" className="mt-5">
                  <Link href="/createroom">
                    <a className="cursor-pointer flex">
                      <span className="text-xl mr-2">Explore now</span>
                      <Image src={ArrowRightImg} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded overflow-hidden px-4">
              <Image src={CodeImg} />
              <div className="py-4">
                <div className="font-bold text-2xl mb-2">Seamless Communication</div>
                
                <div id="explore-text" className="mt-5">
                  <Link href="/createroom">
                    <a className="cursor-pointer flex">
                      <span className="text-xl mr-2">Explore now</span>
                      <Image src={ArrowRightImg} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded overflow-hidden px-4">
              <Image src={CodeImg} />
              <div className="py-4">
                <div className="font-bold text-2xl mb-2">Code Assist &#38; Draft</div>
                
                <div id="explore-text" className="mt-5">
                  <Link href="/createroom">
                    <a className="cursor-pointer flex">
                      <span className="text-xl mr-2">Explore now</span>
                      <Image src={ArrowRightImg} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Add duplicate cards to create smooth circular scrolling */}
            {/* Duplicate of Card 1 */}
            <div className="rounded overflow-hidden px-4">
              <Image src={CodeImg} />
              <div className="py-4">
                <div className="font-bold text-2xl mb-2">Collaborate Coding</div>
                <div id="explore-text" className="mt-5">
                  <Link href="/createroom">
                    <a className="cursor-pointer flex">
                      <span className="text-xl mr-2">Explore now</span>
                      <Image src={ArrowRightImg} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Duplicate of Card 2 */}
            <div className="rounded overflow-hidden px-4">
              <Image src={CodeImg} />
              <div className="py-4">
                <div className="font-bold text-2xl mb-2">Seamless Communication</div>
                <div id="explore-text" className="mt-5">
                  <Link href="/createroom">
                    <a className="cursor-pointer flex">
                      <span className="text-xl mr-2">Explore now</span>
                      <Image src={ArrowRightImg} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Duplicate of Card 3 */}
            <div className="rounded overflow-hidden px-4">
              <Image src={CodeImg} />
              <div className="py-4">
                <div className="font-bold text-2xl mb-2">Code Assist &#38; Draft</div>
                <div id="explore-text" className="mt-5">
                  <Link href="/createroom">
                    <a className="cursor-pointer flex">
                      <span className="text-xl mr-2">Explore now</span>
                      <Image src={ArrowRightImg} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Image */}
        <div className="mb-2 flex justify-center">
          <Image src={CodeEditorImg} priority="true" />
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 py-10 text-white">
          <div className="container mx-auto px-4">
            {/* Contact Us Section */}
            <div className="flex flex-col items-center text-center mb-10">
              <h2
                id="header-text"
                className="relative z-10 text-4xl font-bold md:text-5xl font-display"
              >Contact Us</h2>
              < br/>
              <p className="text-2xl mb-2">
              Collaborate, share ideas, and create next-level applications with ease. →
              </p>
              <br/>
              <button className="bg-purple-500 hover:bg-blue-600 text-black px-6 py-2 rounded-full">
                Get in Touch →
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Footer Content */}
            <div className="mb-2 flex justify-center">
              <div className="max-w-xs max-h-xs"> {/* Adjust maximum width and height */}
                <Image src={Footerr} priority="true" />
              </div>
            </div>

            {/* Bottom Divider */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Footer Bottom Section */}
            <div className="flex flex-col items-center">
              <span className="text-gray-400">Major Project Group 7</span>
              <span className="text-gray-400">{new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
