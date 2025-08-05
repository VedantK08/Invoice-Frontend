import React, { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import { templateComponents } from "../util/InvoiceTemplate.js";

const InvoicePreview = forwardRef(({ invoiceData, templates }, ref) => {
  const formattedData = formatInvoiceData(invoiceData);

  const SelectedTemplate =
    templateComponents[templates] || templateComponents["template1"];

  return (
    <div
      ref={ref}
      className="invoice-preview container px-2 py-2 overflow-x-auto"
    >
      <SelectedTemplate data={formattedData} />
    </div>
  );
});

export default InvoicePreview;
