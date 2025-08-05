import React, { useEffect } from "react";
import "./LandingPage.css";
import Logo from "../../components/Logo";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { assets } from "../../assets/assets";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Handle generate invoice button click
  const handleGenerateInvoiceClick = () => {
    if (isSignedIn) {
      navigate("/generate");
    }
    // If not signed in, the SignInButton will handle showing the login modal
  };

  // Scroll animation logic
  // Scroll animation logic with staggered delay
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay");
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });

  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((el, index) => {
    // Apply increasing delay to cards only
    if (el.classList.contains("step-card")) {
      el.setAttribute("data-delay", `${index * 200}`);
    } else {
      el.setAttribute("data-delay", "0");
    }
    observer.observe(el);
  });

  return () => {
    elements.forEach((el) => observer.unobserve(el));
  };
}, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Smart Billing Made Simple. Get Paid Faster.
          </h1>
          <p className="hero-subtitle">
            Stop wrestling with spreadsheets. QuickInvoice helps you create and
            send beautiful invoices in minutes, so you get paid faster.
          </p>
          <div className="cta-buttons">
            {isSignedIn ? (
              <button 
                onClick={handleGenerateInvoiceClick} 
                className="btn btn-white btn-main"
              >
                Generate Your First Invoice
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-white btn-main">
                  Generate Your First Invoice
                </button>
              </SignInButton>
            )}
            <a href="#how-it-works" className="btn btn-white btn-main">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            Get Started in 4 Simple Steps
          </h2>
          <div className="steps-grid">
            {[
              {
                title: "Enter Details",
                desc: `Quickly fill in your client's information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.`,
                step: 1,
              },
              {
                title: "Choose Template",
                desc: `Browse our gallery of professionally designed templates. Pick one that matches your brand and style.`,
                step: 2,
              },
              {
                title: "Preview Invoice",
                desc: `See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.`,
                step: 3,
              },
              {
                title: "Download & Save",
                desc: `Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.`,
                step: 4,
              },
            ].map((item) => (
              <div key={item.step} className="step-card animate-on-scroll">
                <div className={`step-icon step-${item.step}`}>{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-description">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            Why Choose QuickInvoice?
          </h2>

          {[
            {
              title: "Easy to Fill Invoice Details",
              img: assets.landing1,
              description:
                "Create professional invoices with our intuitive interface. Our smart form guides you through every step, ensuring you never miss important details.",
              points: [
                "Curated list of templates from gallery",
                "Add your logo and invoice details",
                "Tailor fields to your specific needs",
              ],
            },
            {
              title: "Beautiful Dashboard",
              img: assets.landing2,
              description:
                "Manage all your invoices from one centralized, elegant dashboard. Track payments, view history, and stay organized effortlessly.",
              points: [
                "View all previous invoices at a glance",
                "Saved invoices with visual thumbnails",
                "Reuse templates and invoice data",
                "Track invoice status and payments",
              ],
            },
            {
              title: "Live Preview with Smart Actions",
              img: assets.landing3,
              description:
                "See your invoice exactly as your clients will, with real-time preview and powerful action buttons for seamless workflow management.",
              points: [
                "Real-time live preview as you type",
                "Switch between multiple invoice drafts",
                "One-click save, download, and delete actions",
              ],
            },
            {
              title: "Send Invoices Instantly",
              img: assets.landing4,
              description:
                "Skip the hassle of email clients and file attachments. Send professional invoices directly from our platform in seconds.",
              points: [
                "Send invoices without leaving the app",
                "One-click delivery to client emails",
                "Send unlimited invoices with no restrictions",
              ],
            },
          ].map((feature, index) => (
            <div key={index} className="feature-row animate-on-scroll">
              <div className="feature-image">
                <img src={feature.img} alt={feature.title} />
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feature-list">
                  {feature.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2 className="cta-title">Ready to Streamline Your Invoicing?</h2>
            <p className="cta-subtitle">
              Join thousands of freelancers and small businesses who trust
              QuickInvoice. Start creating professional invoices today – it's
              fast, easy, and effective!
            </p>
            <a href="#" className="btn btn-primary">
              Start Generating Invoices Now
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-logo">QuickInvoice</div>
          <p>&copy; 2025 QuickInvoice. All Rights Reserved.</p>
          <p>Crafted with ❤️ for freelancers and small businesses.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;