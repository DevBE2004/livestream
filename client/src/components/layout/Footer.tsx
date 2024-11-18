const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Stay Connected</h2>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-400 transition">Facebook</a>
            <a href="#" className="hover:text-blue-400 transition">Twitter</a>
            <a href="#" className="hover:text-blue-400 transition">Instagram</a>
            <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
          </div>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;