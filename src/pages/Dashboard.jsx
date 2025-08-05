import React, { useContext, useEffect, useState } from "react";
import { AppContext, initialInvoiceData } from "../context/AppContext";
import { getAllInvoices } from "../service/InvoiceService";
import { Plus } from "lucide-react";
import { formatDate } from "../util/formatInvoiceData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const { baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
    useContext(AppContext);
  const { getToken } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = await getToken();
        console.log(token);
        const response = await getAllInvoices(baseURL, token);
        setInvoices(response.data);
      } catch (error) {
        toast.error("Failed to load invoices", error);
      }
    };
    fetchInvoices();
  }, [baseURL]);

  const handleViewClick = (invoice) => {
    setInvoiceData(invoice);
    setSelectedTemplate(invoice.template || "template1");
    setInvoiceTitle(invoice.title || "New Invoice");
    navigate("/preview");
  };

  const handleCreateNew = () => {
    //reset to initial state
    setInvoiceTitle("New Invoice");
    setSelectedTemplate("template1");
    setInvoiceData(initialInvoiceData);
    navigate("/generate");
  };

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {/* Create New Invoice Card */}
        <div className="col">
          <div
            onClick={handleCreateNew}
            className="card h-100 flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer"
            style={{ minHeight: "270px" }}
          >
            <Plus size={48} />
            <p className="mt-3 fw-medium">Create New Invoice</p>
          </div>
        </div>

        {/* Render the existing invoices */}
        {invoices.map((invoice, index) => (
          <div className="col" key={index}>
            <div
              className="card h-100 shadwow-sm cursor-pointer"
              style={{ minHeight: "270px" }}
              onClick={() => handleViewClick(invoice)}
            >
              {invoice.thumbnailUrl && (
                <img
                  src={invoice.thumbnailUrl}
                  alt="Invoice Thumbnail"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h6 className="card-title mb-1">{invoice.title}</h6>
                <small className="text-muted">
                  Last updated: {formatDate(invoice.createdAt)}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
