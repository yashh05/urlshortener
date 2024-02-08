const Navbar = () => {
  return (
    <nav className=" w-5/6 flex justify-between px-5 py-2 font-poppins m-auto items-center text-[#1F2544] shadow-lg rounded-lg border bg-white mt-8">
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
        <button className=" px-[1em] py-[0.5em] border-2 border-slate-400  rounded-md">
          <h1 className=" transition-all hover:scale-110"> Logout</h1>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
