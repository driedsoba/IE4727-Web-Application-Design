const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg mb-2">
          Copyright &copy; {currentYear} JavaJam Coffee House
        </p>
        <a
          href="mailto:junle@liw.com"
          className="text-amber-200 hover:text-amber-100 transition-colors underline"
        >
          junle@liw.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
