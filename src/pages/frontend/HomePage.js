import React, { useState, useEffect, useLayoutEffect } from 'react';
import '../../css/home.css';
// Import all images

import homeImg from '../../Assets/homeImg.png';
import chocolateCake from '../../Assets/chocolateCake.png';
import blueberryCake from '../../Assets/blueberryCake.png';
import brownie from '../../Assets/brownie.png';
import cheesecake from '../../Assets/cheesecake.png';
import strawberryCake from '../../Assets/strawberryCake.png';
import guavaCake from '../../Assets/guavaCake.png';
import customImg from '../../Assets/custom3.jpeg';
import Navbar from '../../components/frontend/Navbar';
import { getAllItem, getItemByCategory } from '../../services/item';
import ItemRowHome from './ItemRowHome';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('Cakes');
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [item, setItem] = useState([])

  // Load Bootstrap JS
  useEffect(() => {
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css';
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.integrity = 'sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9';
    bootstrapCSS.crossOrigin = 'anonymous';
    document.head.appendChild(bootstrapCSS);

    // Load FontAwesome
    const fontAwesome = document.createElement('script');
    fontAwesome.src = 'https://kit.fontawesome.com/43f02603ff.js';
    fontAwesome.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesome);

    // Load Bootstrap JS
    const bootstrapJS = document.createElement('script');
    bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js';
    bootstrapJS.integrity = 'sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm';
    bootstrapJS.crossOrigin = 'anonymous';
    document.body.appendChild(bootstrapJS);

    // Cleanup function
    return () => {
      document.head.removeChild(bootstrapCSS);
      document.head.removeChild(fontAwesome);
      document.body.removeChild(bootstrapJS);
    };
  }, []);

  useLayoutEffect(()=>{
    const authToken = localStorage.getItem("authToken")
    if(authToken){
        setLoggedIn(true)
    }
    getAllItem().then(
      (response)=>{
        if(response.data.length>0){
          setItem(response.data)
        }
      }
    )
  },[])

  const updateCategory = (category) => {
    setActiveCategory(category);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img 
              src={homeImg} 
              className="d-block mx-lg-auto img-fluid" 
              alt="Home" 
              width="700" 
              height="500" 
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Cakes and Bakes</h1>
            <p className="lead">Savour the flavours of our cafe from the comfort of your own home.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                {isLoggedIn &&  <a href="/login" className="btn log-in-btn btn-lg px-4 me-md-2">Log Out</a>}
              {!isLoggedIn && (
                <>
                    <a href="/login" className="btn log-in-btn btn-lg px-4 me-md-2">Log in</a>
                    <a href="/signup" className="btn sign-up-btn btn-lg px-4">Sign up</a>
                </>
              )}
              
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="menu-section">
        <div className="container-fluid menu-section-container">
          <h3 className="fw-bold mb-4" id="Our-Menu">Our Menu</h3>
          <div className="container menu-bar">
            <div className="row mt-5">
              <div className="col-lg-1"></div>
              <div className="col-lg-2">
                <button 
                  className={`menu-btn ${activeCategory === 'Cakes' ? 'menu-btn-default' : ''}`}
                  onClick={() => updateCategory('Cakes')}
                >
                  Cakes
                </button>
              </div>
              <div className="col-lg-2">
                <button 
                  className={`menu-btn ${activeCategory === 'Pastry' ? 'menu-btn-default' : ''}`}
                  onClick={() => updateCategory('Pastry')}
                >
                  Pastry
                </button>
              </div>
              <div className="col-lg-2">
                <button 
                  className={`menu-btn ${activeCategory === 'Cookies' ? 'menu-btn-default' : ''}`}
                  onClick={() => updateCategory('Cookies')}
                >
                  Cookies
                </button>
              </div>
              <div className="col-lg-2">
                <button 
                  className={`menu-btn ${activeCategory === 'Cupcakes' ? 'menu-btn-default' : ''}`}
                  onClick={() => updateCategory('Cupcakes')}
                >
                  Cupcakes
                </button>
              </div>
              <div className="col-lg-2">
                <button 
                  className={`menu-btn ${activeCategory === 'Doughnut' ? 'menu-btn-default' : ''}`}
                  onClick={() => updateCategory('Doughnut')}
                >
                  Doughnut
                </button>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
          
          <div className="container mt-5">
            <div id="Menu-carousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner" id="carousel-container">
                <div className="carousel-item active">
                  <div className="row gx-4 mb-4">
                    {/* Row 1 */}
                    <ItemRowHome items={item} category={activeCategory} />

                  </div>
                </div>
              </div>
              
              <div className="carousel-btn">
                <button className="carousel-control-prev custom-icon carousel-btn" type="button" id="prev-btn">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next custom-icon carousel-btn" type="button" id="next-btn">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customize Cake Section */}
      <div className="container col-xxl-8 px-4 py-5 custom-page">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img 
              src={customImg} 
              className="d-block mx-lg-auto img-fluid" 
              alt="Customize" 
              width="700" 
              height="500" 
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Customize Your Cake</h1>
            <p className="lead">
              Design the perfect cake for your special occasion! Choose flavors, size and message. 
              Personalize and create a cake that's as unique as your celebration!
            </p>
            <br />
            <a href="/customCake" className="btn log-in-btn btn-lg px-4 me-md-2">Customize Now</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container-full">
        <footer className="text-center text-lg-start" style={{backgroundColor: '#E6DCD2'}}>
          <div className="container-full p-4 pb-0">
            <section>
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Coffee Cottage</h6>
                  <p>Savour the flavours of our cafe from the comfort of your own home.</p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                  <p><a href="#">Home</a></p>
                  <p><a href="#">Menu</a></p>
                  <p><a href="#">Contact Us</a></p>
                  <p><a href="#">FAQ</a></p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                  <p>Bhaktapur, Nepal</p>
                  <p>CoffeCottage@gmail.com</p>
                  <p>9860779890</p>
                  <p>9860779890</p>
                </div>
              </div>
            </section>
            <hr className="my-3" />
            <section className="p-3 pt-0">
              <div className="row d-flex align-items-center">
                <div className="col-md-7 col-lg-8 text-center text-md-start">
                  <div className="p-3">© 2023 Copyright:
                    <a href="#">CoffeCottage.com</a>
                  </div>
                </div>
                <div className="col-md-5 col-lg-4 text-center text-md-end">
                  <a href="https://facebook.com" className="btn btn-outline-light m-1" style={{backgroundColor: '#4D2B15', color: 'white'}}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" className="btn btn-outline-light m-1" style={{backgroundColor: '#4D2B15', color: 'white'}}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://google.com" className="btn btn-outline-light m-1" style={{backgroundColor: '#4D2B15', color: 'white'}}>
                    <i className="fab fa-google"></i>
                  </a>
                  <a href="https://instagram.com" className="btn btn-outline-light m-1" style={{backgroundColor: '#4D2B15', color: 'white'}}>
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;