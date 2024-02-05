import { Link } from "react-router-dom";
import logo2 from "../assets/img/logo-2.png";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 sm:fixed w-full bottom-0">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <Link to={"/"}>
          <img alt="" className="w-auto h-7" src={logo2} />
        </Link>
        <a href="https://pulpol.com.ar/" target="_blank">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © Copyright {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </a>
        <div className="flex -mx-2">
          <a
            aria-label="Linkedin"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            href="https://www.linkedin.com/in/pablo--duarte/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            aria-label="Github"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            href="https://github.com/PulpoI/gastos-en-comun"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
