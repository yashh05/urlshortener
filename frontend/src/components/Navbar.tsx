import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Navbar = ({
  setShowDialog,
  name,
}: {
  setShowDialog: any;
  name: string;
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch(BACKEND_URL + "/user/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    navigate("/");
  };

  return (
    <nav className=" w-11/12 flex justify-between px-5 py-2 font-poppins m-auto items-center text-white shadow-lg rounded-lg bg-greyish">
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
        <p className=" text-xl">Hello, {name}</p>
        <button
          className=" px-[1em] py-[0.5em] border-2 border-slate-400  rounded-md"
          onClick={handleLogout}
        >
          <h1 className=" transition-all hover:scale-110"> Logout</h1>
        </button>
        <button
          className=" px-[1em] py-[0.5em] bg-slate-900 text-white  rounded-md"
          onClick={() => setShowDialog(true)}
        >
          <h1 className=" transition-all hover:scale-110"> Add Url</h1>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
