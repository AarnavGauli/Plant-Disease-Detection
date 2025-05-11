import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center py-10 px-4 sm:px-8 lg:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          AI-Powered Plant Disease Detection
        </h2>
        <p className="mt-4 text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
          Identify plant diseases instantly with our advanced AI technology. Protect your crops and increase yields with early detection.
        </p>

        <div className="flex gap-6 sm:gap-10 justify-center mb-16">
          <Link
            href="/get-started"
            className="bg-green-500 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition"
          >
            Get Started
          </Link>
          <Link
            href="/learn-more"
            className="border border-green-500 text-green-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-green-100 transition"
          >
            Learn More
          </Link>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 px-4 sm:px-8 lg:px-16">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-700">How it Works</h3>
            <p className="mt-3 text-lg text-gray-600">
              Our plant disease detection system is simple to use and provides accurate results in seconds.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-700">Key Features</h3>
            <ul className="mt-3 text-lg text-gray-600 list-disc list-inside">
              <li>Multi-Species Detection</li>
              <li>Global Disease Database</li>
              <li>Smart Recommendations</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
