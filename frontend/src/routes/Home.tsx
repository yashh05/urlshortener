import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [allUrls, setAllURls] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUrls = async () => {
      const response = await fetch(BACKEND_URL + "/url/getAllUrl", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/signin");
      } else {
        const fetchedUrls = await response.json();
        setAllURls(fetchedUrls);
      }
    };

    fetchAllUrls();
  }, []);
  return (
    <div>
      <Navbar />
      {JSON.stringify(allUrls)}
    </div>
  );
};

export default Home;
