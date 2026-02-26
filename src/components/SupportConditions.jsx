import { useState } from 'react';
import { FaHeadset, FaChevronDown } from 'react-icons/fa';

const SupportAccordion = ({ isOpenGrid = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  const supportConditions = [
    "Free shipping on orders over ₹999",
    "30-day easy returns & exchanges",
    "24/7 customer support via chat/phone",
    "Secure payments with Razorpay/UPI",
    "Premium members get priority support"
  ];

  return (
    <div className={`relative ${isOpenGrid ? 'md:col-span-1' : ''}`}>
      <button
        onClick={toggleAccordion}
        className="group flex items-center py-4 rounded-2xl justify-between px-5 w-[stretch] border border-gray-300  transition-all duration-300 "
      >
        <div className="flex items-center gap-2">
          <FaHeadset className="text-2xl text-black transition-colors" />
          
        <span className="font-medium text-sm text-black">
          Support
        </span>
        </div>
        <FaChevronDown 
            className={`text-xl  transition-all duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
      </button>

      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out mt-4 border border-gray-200 rounded-2xl backdrop-blur-sm ${
          isOpen 
            ? 'max-h-96 opacity-100 ' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 space-y-4">
          <h4 className="font-bold text-lg text-black border-b border-gray-200 pb-2">
            Support Conditions
          </h4>
          <ul className="space-y-2 text-sm text-orange-900">
            {supportConditions.map((condition, index) => (
              <li key={index} className="flex items-start gap-3 p-3 pl-0 bg-white/60 rounded-xl hover:bg-white transition-colors">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 shrink-0">
                  ✓
                </div>
                <span className='text-black'>{condition}</span>
              </li>
            ))}
          </ul>
          <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
export default SupportAccordion