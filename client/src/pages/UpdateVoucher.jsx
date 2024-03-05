import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function UpdateVoucher() {
  const { voucherId } = useParams();
  const [vouchers, setVouchers] = useState([]);
  const [status, setStatus] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [voucherError, setVoucherError] = useState();
  const navigate = useNavigate()
  console.log(voucherId)

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await fetch(`/api/voucher/${voucherId}`);
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
          console.log(data.message);
          setVoucherError(data.message);
          return;
        }
        if (response.ok) {
          setVoucherError(null);
          setVouchers([data]); // Wrap the fetched voucher object in an array
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (voucherId) {
      fetchVoucher();
    }
  }, [voucherId]);

  const handleDownload = () => {
    const pdf = new jsPDF();
    const element = document.getElementById("content");
    html2canvas(element, {
      scale: 2,
      ignoreElements: (element) => element.tagName === "BUTTON",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

      pdf.save("voucher.pdf");
    });
  };
  function convertToWords(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

    function convertGroup(num) {
        const [hundreds, tensUnits] = [Math.floor(num / 100), num % 100];
        const words = [];
        if (hundreds > 0) {
            words.push(ones[hundreds] + ' Hundred');
        }
        if (tensUnits > 0) {
            if (tensUnits < 10) {
                words.push(ones[tensUnits]);
            } else if (tensUnits < 20) {
                words.push(teens[tensUnits - 10]);
            } else {
                const [tensDigit, onesDigit] = [Math.floor(tensUnits / 10), tensUnits % 10];
                words.push(tens[tensDigit]);
                if (onesDigit > 0) {
                    words.push(ones[onesDigit]);
                }
            }
        }
        return words.join(' ');
    }

    if (num === 0) return 'Zero';

    const numStr = num.toString();
    const groups = [];
    for (let i = numStr.length; i > 0; i -= 3) {
        groups.push(numStr.substring(Math.max(0, i - 3), i));
    }

    let result = '';
    for (let i = groups.length - 1; i >= 0; i--) {
        const group = parseInt(groups[i]);
        if (group > 0) {
            result += convertGroup(group) + ' ' + thousands[i] + ' ';
        }
    }

    return result.trim();
}
  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await fetch(`/api/voucher/${voucherId}/updatevouchers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      setStatus(newStatus);
      setButtonsDisabled(true);
      alert(`${newStatus} successfully`);
      //Redirect to dashboard
      navigate("/dashboard?tab=voucher");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <div className="p-3 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Voucher Details
      </h1>
      {voucherError && <div className="text-red-500">{voucherError}</div>}

      <div className="mt-4">
        {vouchers.length > 0 &&
          vouchers.map((voucher) => (
            <div className="text-xl p-4 space-y-4" key={voucher._id}>
              <p>
                Date created:{" "}
                {voucher.createdAt
                  ? new Date(voucher.createdAt).toLocaleDateString()
                  : ""}
              </p>
              <p>
                Voucher To:{" "}
                {voucher.sentTo.username.charAt(0).toUpperCase() +
                  voucher.sentTo.username.slice(1)}
              </p>
              <p>
                Voucher By:{" "}
                {voucher.sentBy
                  ? voucher.sentBy.username.charAt(0).toUpperCase() +
                    voucher.sentBy.username.slice(1)
                  : ""}
              </p>

              <p>Items:</p>

              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {voucher.items &&
                    voucher.items.map((item) => (
                      <tr key={item._id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.description.charAt(0).toUpperCase() +
                            item.description.slice(1)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Ksh: {item.price}/=
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Ksh: {item.quantity * item.price}/=
                        </td>
                        
                      </tr>
                    ))}
                </tbody>
              </table>
              <p>Total Price: Ksh: {convertToWords(voucher.totalPrice)} Shillings Only</p>
              <p>Total Quantity: {voucher.totalQuantity}</p>
              <p>Status: {voucher.status}</p>
              <div className="space-x-4 flex-1">
                <button
                  onClick={() => handleStatusUpdate("approved")}
                  disabled={status !== "" || buttonsDisabled}
                  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Approved
                </button>
                <button
                  onClick={() => handleStatusUpdate("declined")}
                  disabled={status !== "" || buttonsDisabled}
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Decline
                </button>
                <button
                  onClick={handleDownload}
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        {voucherError && <p>{voucherError}</p>}
      </div>
    </div>
  );
}
