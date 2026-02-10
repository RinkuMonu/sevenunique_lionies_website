import { useState } from "react";
import { X } from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhone(value);
  };

  const isValidPhone = phone.length === 10;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="
            bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative
            transform animate-popup
          "
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500"
          >
            <X size={18} />
          </button>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-1 text-center">
            Welcome to Lionies
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Login using your mobile number
          </p>

          {/* Phone Step */}
          {step === "phone" && (
            <>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={10}
                className="w-full border rounded-xl px-4 py-3 mb-2 outline-none"
              />

              {!isValidPhone && phone.length > 0 && (
                <p className="text-xs text-red-500 mb-3">
                  Enter a valid 10-digit mobile number
                </p>
              )}

              <button
                disabled={!isValidPhone}
                onClick={() => setStep("otp")}
                className={`w-full py-3 rounded-xl text-white font-semibold transition
                  ${
                    isValidPhone
                      ? "bg-[#927f68] hover:opacity-90"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Send OTP
              </button>
            </>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                className="w-full border rounded-xl px-4 py-3 mb-4 outline-none text-center tracking-widest"
              />

              <button
                className="w-full py-3 rounded-xl font-semibold bg-[#5fefdd] text-black"
              >
                Verify & Login
              </button>

              <button
                onClick={() => setStep("phone")}
                className="block text-sm text-gray-500 mx-auto mt-4"
              >
                Change number
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
