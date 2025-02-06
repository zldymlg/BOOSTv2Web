import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="container mt-5 border-top pt-4">
      <div className="row">
        {/* Contact Section */}
        <div className="col-md-4">
          <div className="mb-3">
            <img
              src="/src/assets/BOOSTWORD.png"
              alt="Logo"
              style={{ width: "30%" }}
            />
          </div>
          <p>
            <strong>Email:</strong> hello@skillbridge.com
          </p>
          <p>
            <strong>Phone:</strong> +91 98183 23 2309
          </p>
          <p>
            <strong>Address:</strong> Somewhere in the World
          </p>
        </div>

        {/* Navigation Section */}
        <div className="col-md-4">
          <div>
            <h6>Home</h6>
            <ul className="list-unstyled">
              <li>Benefits</li>
              <li>Our Courses</li>
              <li>Our Testimonials</li>
              <li>Our FAQ</li>
            </ul>
          </div>
          <div>
            <h6>About Us</h6>
            <ul className="list-unstyled">
              <li>Company</li>
              <li>Achievements</li>
              <li>Our Goals</li>
            </ul>
          </div>
        </div>

        {/* Social Profiles Section */}
        <div className="col-md-4 text-center">
          <h6>Social Profiles</h6>
          <div className="d-flex justify-content-center">
            <a
              href="#"
              className="me-3"
              aria-label="Facebook"
              style={{ fontSize: "1.5rem", color: "#64703E" }}
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="me-3"
              aria-label="Twitter"
              style={{ fontSize: "1.5rem", color: "#64703E" }}
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              style={{ fontSize: "1.5rem", color: "#64703E" }}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4">
        <p className="mb-0">© 2025 BOOST. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
