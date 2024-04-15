import React, { useRef } from "react";
import "../Hero/Hero.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@mui/material";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/news");
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="lefthalf">
          <TypeAnimation
            sequence={["Welcome to StockX", 1000]}
            wrapper="h1"
            speed={50}
            repeat={Infinity}
          />
          <p> Stock Market simplified</p>
          <button className="continue-application" onClick={handleClick}>
            <div>
              <div className="pencil"></div>
              <div className="folder">
                <div className="top">
                  <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                  </svg>
                </div>
                <div className="paper"></div>
              </div>
            </div>
            Get Started
          </button>
        </div>
        <div className="righthalf">
          <img src="../heroimg/stocks_bg1.png" className="heroimg" />
        </div>
      </div>

      <h2>Features</h2>
      <div className="secondcontainer">
        <div className={`contentbox  ${inView ? "fade-in" : ""}`} ref={ref}>
          <h3>Stocks in News</h3>
          <hr></hr>
          <p>
            See all the relevant financial news on the homepage itself, the
            stocks associated with them, and the predicted stock price based
            upon the analysis.
          </p>
        </div>

        <div className={`contentbox  ${inView ? "fade-in" : ""}`} ref={ref}>
          <h3>Email Notifications</h3>
          <hr></hr>
          <p>
            The user is also notified when the price of a particular company’s
            stocks are expected to fall or rise based on the current world
            news,via email.
          </p>
        </div>

        <div className={`contentbox  ${inView ? "fade-in" : ""}`} ref={ref}>
          <h3>Annual Financial Report Analysis</h3>
          <hr></hr>
          <p>
            Check the accuracy of a Financial Report by our sentiment-analysis
            tool to note the fall/rise of the stock price associated with a
            particular company.
          </p>
        </div>

        <div className={`contentbox  ${inView ? "fade-in" : ""}`} ref={ref}>
          <h3>News in Stocks</h3>
          <hr></hr>
          <p>
            See all the stocks that might get affected due to a single day's
            news. Add tracker to get notifiedd about the rise/fall of the stocks
            via mail.
          </p>
        </div>
      </div>
      <h2 className="thirdcontainerheading">Technology Used</h2>
      <div className="thirdcontainer">
        <h4>React</h4>
        <h4>MongoDb</h4>
        <h4>Node.js</h4>
        <h4>Express.js</h4>
        <h4>NLP API</h4>
      </div>
      <hr></hr>
      <div>
        <footer class=" text-center text-lg-start">
          <div class="text-center p-3">
            © 2024 Copyright:
            <a class="text-body" href="https://mdbootstrap.com/">
              StockX.com
            </a>
            <p>Connect with me:</p>
            <Button>
              {" "}
              <a
                href="https://github.com/Nandini-0703"
                style={{ color: "white" }}
              >
                Github
              </a>
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Hero;
