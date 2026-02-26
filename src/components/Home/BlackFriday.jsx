import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 57
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else if (days > 0) {
          seconds = 59;
          minutes = 59;
          hours = 23;
          days--;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link to="/" className="px-8 py-4 h-60 flex items-center justify-center gap-8 text-white  relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("../images/31.webp")`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="flex items-center gap-6 z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border-r pr-3">
            <span className="text-2xl md:text-5xl font-bold  px-4 py-2 ">02</span>
            <span className="text-xs uppercase tracking-widest">Days</span>
          </div>
         
          <div className="flex items-center gap-1 border-r pr-3">
            <span className="text-2xl md:text-5xl font-bold  px-4 py-2 ">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-xs uppercase tracking-widest">Hours</span>
          </div>
         
          <div className="flex items-center gap-1 border-r pr-3">
            <span className="text-2xl md:text-5xl font-bold  px-4 py-2 ">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-xs uppercase tracking-west">Mins</span>
          </div>
         
          <div className="flex items-center gap-1 border-r pr-3">
            <span className="text-2xl md:text-5xl font-bold  px-4 py-2 ">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-xs uppercase tracking-widest">Secs</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 z-10 mx-8 flex-1">
        <div className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-yellow-200 via-white to-yellow-100 bg-clip-text text-transparent drop-shadow-xl">
          BLACK FRIDAY
        </div>
      </div>

      <div className="max-w-md z-10 text-right">
        <p className="text-lg md:text-xl font-semibold leading-tight mb-2">
          Don't miss an additional 10% off your order when you spend ₹500 or more
        </p>
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-linear-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl -z-10" />
      <div className="absolute right-4 bottom-4 w-20 h-20 bg-linear-to-l from-yellow-400/20 to-orange-400/20 rounded-full blur-xl -z-10" />
    </Link>
  );
}
