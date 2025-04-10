import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100">
        <div className="text-3xl py-4 font-bold text-center text-gray-700">
          Meet Your Alumni!
        </div>
        <DotLottieReact
          src="https://lottie.host/e1321fb2-4d67-4657-bfa5-cc42121fa12b/G8Ti5BU6dt.lottie"
          loop
          autoplay
          className="w-64 h-64 mx-auto"
        />
        <div className="text-center font-bold text-gray-800">
          A platform to network and meet your alumni
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start mt-8 px-6">
        {/* Map Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16119.456477488344!2d77.5601143033587!3d12.913552025759525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156310100001%3A0x71be53da4480fbbe!2sDayananda%20Sagar%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1744278997903!5m2!1sen!2sin"
          width="300"
          height="300"
          style={{ border: "1px solid black", margin: "5px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto my-8 px-6">
          {[
            { title: "Explore Alumni\nConnect with Alumni", emoji: "🎓" },
            { title: "Get Career Advice\nDiscover job openings", emoji: "💡" },
            { title: "Post Jobs & Internships\nUpdate Jobs as they appear", emoji: "💼" }
          ].map((item, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6 text-center">
              <div className="text-4xl mb-2">{item.emoji}</div>
              {item.title.split("\n").map((line, j) => (
                <p key={j} className="text-lg font-semibold">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
