import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import logo from "../../assets/logo.jpg";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>

        <ul className="home-links">
          {/* <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout> */}
          {/* <ShowOnLogin> */}
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
          {/* </ShowOnLogin> */}
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          {/* <h2>Inventory {"&"} Stock Management Solution</h2> */}
          <h2>Diyalo Force</h2>
          <p>Dashboard Management System</p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Get In</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText
              num="18 years"
              text="Leader in education consultation"
            />
            <NumberText num="#1" text="Future Fit Your Life" />
            <NumberText num="30+" text="Universities" />
          </div>
        </div>

        <div className="hero-image">
          <img src={logo} alt="Inventory" style={{ height: "450px" }} />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
