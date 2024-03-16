import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa'; // Importing required icons

function Footer() {
  return (
    <footer className="section-p1">
      <div className="col">
        <img src="/images/omilogo.png" alt="" className="logo w-[120px]" />
        <h4>Contact</h4>
        <p><strong>Address:</strong> 342 Wallinton road Singapore</p>
        <p><strong>Phone:</strong> +212-30242325, 2942342421</p>
        <p><strong>Hours:</strong> 10:00-18:00, Mon-Sat</p>
        <div className="follow">
          <h4>Follow us on</h4>
          <div className="icons">
            <FaFacebook className="fa-brands inline" />
            <FaInstagram className="fa-brands inline" />
            <FaTwitter className="fa-brands inline" />
            <FaPinterest className="fa-brands inline" />
            <FaYoutube className="fa-brands inline" />
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="#">About us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact us</a>
      </div>

      <div className="col">
        <h4>My Accounts</h4>
        <a href="#">Sign in</a>
        <a href="#">View cart</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track my order</a>
        <a href="#">Help</a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Play Store</p>
        <div className="row">
          <img src="../images/pay/play.jpg" alt="" />
          <img src="../images/pay/app.jpg" alt="" />
        </div>
        <p>Secure Payment Gateway</p>
        <img src="../images/pay/pay.png" alt="" />
      </div>

      <div className="copyright">
        <p>&copy; 2023, By Gaurav Sharma</p>
      </div>
    </footer>
  );
}

export default Footer;
