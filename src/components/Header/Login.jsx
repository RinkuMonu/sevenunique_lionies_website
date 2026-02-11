import { useState } from "react";
import { X } from "lucide-react";
import api from "../service/axios";
import { useAuth } from "../service/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
  const { setUser } = useAuth();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length === 1 && !/[6-9]/.test(value)) return;
    if (value.length <= 10) setPhone(value);
  };

  const isValidPhone = phone.length === 10;

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      const ress = await api.post("/otp/send", { mobile: phone });
      console.log("otp send res", ress);
      if (ress.data.success) {
        setStep("otp");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.length === 6) {
      setError("please enter 6 digit OTP");
    }
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/verifyotp", {
        mobile: phone,
        otp: Number(otp),
      });
      console.log("res form login",res)

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data);
      }
      setStep("phone");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
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

              {phone.length > 0 && !isValidPhone && (
                <p className="text-xs text-red-500 mb-3">
                  Mobile must start with 6–9 and be 10 digits
                </p>
              )}
              {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

              <button
                disabled={!isValidPhone || loading}
                onClick={sendOtp}
                className={`w-full py-3 rounded-xl text-white font-semibold cursor-pointer
                  ${
                    isValidPhone
                      ? "bg-[#927f68]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
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
              {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

              <button
                onClick={verifyOtp}
                disabled={otp.length !== 6 || loading}
                className="w-full py-3 rounded-xl font-semibold bg-[#5fefdd] cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                }}
                className="block text-sm text-gray-500 mx-auto mt-4 cursor-pointer"
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
