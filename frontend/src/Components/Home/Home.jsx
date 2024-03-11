import React, { Fragment, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import me from "../../Assets/logo.png";
import Project from "../Projects/Project";
import Skills from "../Skills/Services";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Header, { HeaderPhone } from "../Header/Header";
import Cretification from "../Cretification/Cretification";

const Home = ({ ratio }) => {
  const isMobile = window.innerWidth <= 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const projectCount = useRef(null);

  const animationProjectsCount = () => {
    animate(0, 500, {
      duration: 1,
      onUpdate: (v) => (projectCount.current.textContent = v.toFixed()),
    });
  };

  const animations = {
    h1: {
      initial: {
        x: "-100%",
        opacity: 0,
      },
      whileInView: {
        x: 0,
        opacity: 1,
      },
    },
    button: {
      initial: {
        y: "-100%",
        opacity: 0,
      },
      whileInView: {
        y: 0,
        opacity: 1,
      },
    },
  };
  const chevronRef = useRef(null); // Ref for the BsChevronDown component
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false); // Track scroll position

  // Intersection Observer setup and scroll event listener
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      chevronRef.current.style.opacity = entry.isIntersecting ? 1 : 0;
    });

    if (chevronRef.current) {
      observer.observe(chevronRef.current);
    }

    const handleScroll = () => {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset;
      const clientHeight = window.innerHeight;
      const threshold = isMobile ? 0.9 : 0.8;
      setIsScrolledToEnd(scrollTop + clientHeight >= scrollHeight*threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [chevronRef,isMobile]);
  return (
    <Fragment>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {isMobile && <HeaderPhone menuOpen={menuOpen} setMenuOpen={setMenuOpen}showMenuIcon />}
      <div id="home">
        <section>
          <div>
            <motion.h1 {...animations.h1}>
              Hi, I Am <br /> Pankaj Kholiya
            </motion.h1>

            <Typewriter
              options={{
                strings: [
                  "A Developer",
                  "Software Engineer",
                  "A Creator",
                  "Code Tinkerer",
                ],
                autoStart: true,
                loop: true,
                cursor: "",
                wrapperClassName: "typewriterpara",
              }}
            />

            <div>
              <a href="mailto:ifeelpankaj@gmail.com">Hire Me</a>
              <a href="#work">
                Projects <BsArrowUpRight />
              </a>
            </div>

            <aside>
              <article>
                <p>
                  +
                  {ratio < 2 && (
                    <motion.span
                      ref={projectCount}
                      whileInView={animationProjectsCount}
                    >
                      500
                    </motion.span>
                  )}
                </p>
                <span>Projects Done</span>
              </article>

              <article data-special>
                <p>Contact</p>
                <span>ifeelpankaj@gmail.com</span>
              </article>
            </aside>
          </div>
        </section>
        <section>
          <img src={me} alt="Pankaj" />
        </section>
        <BsChevronDown ref={chevronRef} style={{ opacity: isScrolledToEnd ? 0 : 1 }} /> 
      </div>
      <div>
        <Project />
      </div>
      <div>
        <Skills />
      </div>
      <div>
        <Cretification />
      </div>
      <div>
        <Contact />
      </div>
      <div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
