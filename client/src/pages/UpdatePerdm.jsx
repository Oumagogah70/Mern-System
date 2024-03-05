import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePerdm() {
  const { perdmId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [perdms, setPerdms] = useState([]);
  const [perdmError, setPerdmError] = useState();

  console.log(perdmId);

  useEffect(() => {
    const fetchPerdm = async () => {
      try {
        const response = await fetch(`/api/perdm/${perdmId}`);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          console.log(data.message);
          setPerdmError(data.message);
          return;
        }
        if (response.ok) {
          setPerdmError(null);
          setPerdms([data]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (perdmId) {
      fetchPerdm();
    }
  }, [perdmId]);

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
    const response = await fetch(`/api/perdm/${perdmId}/updatestatus`, {
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
    navigate("/dashboard?tab=perdm");
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

  return (
    <div className="p-3 max-w-4xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold">Per Diem</h1>
      {perdmError && <div className="text-red-500">{perdmError}</div>}
      <div className="mt-4">
        {perdms.length > 0 &&
          perdms.map((perdm) => (
            <div className="text-xl p-4 space-y-4" key={perdm._id}>
              <p>
                Date created:{" "}
                {perdm.createdAt
                  ? new Date(perdm.createdAt).toLocaleDateString()
                  : ""}
              </p>
              <p>
                Per Diem To:{" "}
                {perdm.sentTo.username.charAt(0).toUpperCase() +
                  perdm.sentTo.username.slice(1)}
              </p>
              <p>
                Perdm By:{" "}
                {perdm.sentBy
                  ? perdm.sentBy.username.charAt(0).toUpperCase() +
                    perdm.sentBy.username.slice(1)
                  : ""}
              </p>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Unit of Measure</th>
                    <th className="border border-gray-300 px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      {perdm.itemName.charAt(0).toUpperCase() + perdm.itemName.slice(1)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {perdm.itemDescription.charAt(0).toUpperCase() + perdm.itemDescription.slice(1)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                     Ksh: {perdm.itemPrice}/=
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {perdm.itemQuantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Ksh: {perdm.totalPrice}/=
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>Total Price: Ksh: {convertToWords(perdm.totalPrice)} Shillings</p>
              <p>Total Days or Unit Cost:{perdm.itemQuantity}</p>
              <p>Status: {perdm.status}</p>
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
                  // onClick={handleDownload}
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        {/* {voucherError && <p>{voucherError}</p>} */}
      </div>
    </div>
  );
}
