import classes from "./hero.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "../ui/modal/modal";
import Aos from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [showModal, setShowModal] = useState();

  function buttonHandler() {
    window.location.href = "#projects";
  }

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    if (!showModal) document.body.style.overflow = "unset";
  }, [showModal]);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <section className={classes.greetings}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.columnLeft}>
            {/*             <br />
            <br />

            <h3 data-aos="fade-left">Hi, my name is Emanuel Villalba.</h3> */}
            <h1 data-aos="fade-right">
              Hi, my name is Emanuel Villalba. I&apos;m a React Frontend
              Developer with experience in e-commerce, ERP, API.
            </h1>
            <p data-aos="fade-left" data-aos-delay="150">
              I&apos;m fluent in English{" "}
              <span>
                <Image
                  src="/portfolio/images/usa.png"
                  alt="usa-flag"
                  width={16}
                  height={16}
                />
              </span>
              , Spanish{" "}
              <span>
                <Image
                  src="/portfolio/images/germany.png"
                  alt="usa-flag"
                  width={16}
                  height={16}
                />
              </span>
              , and Javascript{" "}
              <span>
                <Image
                  src="/portfolio/images/js.png"
                  alt="usa-flag"
                  width={16}
                  height={16}
                />
              </span>
              . I am learning frontend technologies for about 2 years. I am
              looking for a job as React, React-native or Next.js developer. I
              am a self-learner and took my entire knowledge from tutorials,
              documentations, and developer articles. I developed few projects
              as a utilization of my current knowledge
            </p>
            <div className={classes.socialMedia}>
              <a
                href="https://github.com/emavi98"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github" data-aos="flip-up"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/emanuel-villalba-01b3a7106/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fab fa-linkedin"
                  data-aos="flip-up"
                  data-aos-delay="50"
                ></i>
              </a>{" "}
              {/* <a
                href="https://twitter.com/devrbitter"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fab fa-twitter"
                  data-aos="flip-up"
                  data-aos-delay="100"
                ></i>
              </a>{" "}
              <a
                href="https://codepen.io/rbitterdev"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fab fa-codepen"
                  data-aos="flip-up"
                  data-aos-delay="150"
                ></i>
              </a> */}
            </div>
            <div className={classes.ctaButtons}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-filled"
                data-aos="fade-up"
                onClick={buttonHandler}
              >
                My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-outlined"
                data-aos="fade-down"
                onClick={showModalHandler}
              >
                Let&apos;s Talk
              </motion.button>
            </div>
          </div>

          <div className={`${classes.columnRight} ${classes.profilePic}`}>
            <Image
              src="/portfolio/images/emanuel.png"
              width={320}
              height={380}
              alt="profile-pic"
              data-aos="fade-left"
            />
          </div>
        </div>

        <div className="iconScrollContainer">
          <a href="#projects">
            <div
              className="iconScroll"
              data-aos="fade-down"
              data-aos-offset="50"
            ></div>
          </a>
        </div>
      </div>
      <AnimatePresence>
        {showModal && <Modal contact onClose={closeModalHandler} />}
      </AnimatePresence>
    </section>
  );
};
export default Hero;
