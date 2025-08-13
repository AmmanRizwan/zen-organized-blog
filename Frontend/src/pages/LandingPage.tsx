import { Link } from "react-router-dom";
// If you use a UI library, adjust the import below:
// import { Button } from "../components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="container mx-auto py-8 px-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Zen Organized Blog</h1>
        <nav className="flex items-center gap-4">
          <Link to="/login" className="hover:text-blue-600 font-medium">Login</Link>
          <Link to="/signup">
            <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition">Sign Up</button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Write. Organize. Inspire.</h2>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-700">
          A modern, minimal, and distraction-free blogging platform for creators who value clarity, focus, and beautiful presentation. Share your thoughts, grow your audience, and join a thriving community of writers.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/signup">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Get Started Free</button>
          </Link>
          <Link to="/login">
            <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">Log In</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-4">
        <h3 className="text-3xl font-bold mb-10 text-center">Why Zen Organized Blog?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-3">Distraction-Free Writing</h4>
            <p>Our clean, minimal interface lets you focus on your words, not the noise.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-3">Smart Organization</h4>
            <p>Tag, categorize, and manage your posts with ease. Find everything, fast.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-3">Beautiful by Default</h4>
            <p>Your writing always looks great with our modern, responsive design.</p>
          </div>
        </div>
      </section>

      {/* Community/Stats Section */}
      <section className="bg-blue-50 py-20 px-4">
        <h3 className="text-3xl font-bold mb-10 text-center">Join a Growing Community</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="text-center">
            <p className="text-4xl font-bold">2,000+</p>
            <p className="text-lg">Active Writers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">15,000+</p>
            <p className="text-lg">Articles Published</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">100,000+</p>
            <p className="text-lg">Monthly Readers</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto py-20 px-4 text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to start your writing journey?</h3>
        <p className="text-xl max-w-2xl mx-auto mb-10">
          Create your free account and experience the difference a well-designed platform makes for your writing process.
        </p>
        <Link to="/signup">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Create Your Account</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 border-t mt-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-4">Zen Organized Blog</h4>
            <p>A modern blogging platform for organized thoughts and ideas.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p>contact@zenorganizedblog.com</p>
          </div>
        </div>
        <div className="text-center mt-10">
          <p>&copy; {new Date().getFullYear()} Zen Organized Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
