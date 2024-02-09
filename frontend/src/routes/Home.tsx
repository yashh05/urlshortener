import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full bg-[url(/home-background.jpg)] bg-no-repeat pt-48">
      <div className=" w-4/5 m-auto text-center">
        <h1 className=" text-white text-4xl font-poppins font-extrabold tracking-wide">
          "Streamline Your Links!"
        </h1>
        <button
          className=" px-[1em] py-[0.5em] border-2 mt-12 border-white-400 m-auto text-white  rounded-md"
          onClick={() => navigate("/dashboard")}
        >
          <h1 className=" transition-all hover:scale-110"> GET STARTED</h1>
        </button>
      </div>
    </div>
  );
};

export default Home;
