import React, { useContext } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
} from "@clerk/clerk-react";
import { AppContext, initialInvoiceData } from "../context/AppContext";

const Menubar = () => {
  const { openSignIn } = useClerk();
  const openLogin = () => {
    openSignIn({});
  };

  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    setInvoiceData(initialInvoiceData);
    setSelectedTemplate("template1");
    setInvoiceTitle("New Invoice");
    navigate("/generate");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo />
          <span className="fw-bold fs-4 ms-2" style={{ color: "#0D6EFD" }}>
            QuickInvoice
          </span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav align-items-center gap-lg-3 text-center">
            <Link className="nav-link fw-medium" to="/">
              Home
            </Link>

            <SignedIn>
              <Link className="nav-link fw-medium" to="/dashboard">
                Dashboard
              </Link>
              <button
                className="btn btn-primary rounded-pill px-4 py-1 fw-medium"
                onClick={handleGenerateClick}
              >
                + Generate
              </button>
              <div className="ms-lg-3 mt-2 mt-lg-0">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <button
                className="btn btn-primary rounded-pill px-4 py-1 fw-medium"
                onClick={openLogin}
              >
                Login / SignUp
              </button>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
