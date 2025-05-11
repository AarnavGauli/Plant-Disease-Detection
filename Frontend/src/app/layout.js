import "./globals.css";
import './styles/index.css'; 
import Navbar from "./components/Navbar"; // Import Navbar

export const metadata = {
  title: "Plant Disease Detection",
  description: "AI-powered plant disease diagnosis platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-green-100 to-white text-gray-900 font-sans antialiased">
        {/* Place Navbar here */}
        <Navbar/>
        <main className="min-h-screen flex flex-col overflow-y-auto">
          <div className="w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-200 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
