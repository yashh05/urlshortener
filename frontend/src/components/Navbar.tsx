import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" w-2/3 flex justify-between px-5 py-2 font-poppins m-auto items-center text-[#1F2544] shadow-lg rounded-md border absolute top-5 left-2/4 -translate-x-2/4 bg-white">
      <div className=" flex items-center gap-2 cursor-pointer">
        <img
          src="./logo.png"
          alt=""
          className=" inline-block max-w-[2vw] animate-logo-smooth"
        />
        <h3 className=" inline-block font-roboto text-xl font-semibold underline-component">
          URL SHORTENER
        </h3>
      </div>
      <div className="flex gap-8 items-center">
        <Link to="/signup">
          <button className=" px-[1em] py-[0.5em] border-2 border-slate-400  rounded-md">
            <h1 className=" transition-all hover:scale-110"> Sign Up</h1>
          </button>
        </Link>
        <Link to="/signin">
          <button className="px-[1em] py-[0.5em] border-2 border-slate-400  rounded-md">
            <h1 className=" transition-all hover:scale-110">Log In</h1>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
