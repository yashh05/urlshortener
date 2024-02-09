import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import UrlContainer from "../components/UrlContainer";
import AddUrlDialog from "../components/AddUrlDialog";

const Dashboard = () => {
  const [allUrls, setAllURls] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
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
        setAllURls(fetchedUrls.urls);
      }
    };

    fetchAllUrls();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(BACKEND_URL + "/user/getUser", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/signin");
      } else {
        const fetchedUser = await response.json();
        setUser(fetchedUser.responseUser);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className=" pt-12">
      <Navbar setShowDialog={setOpenDialog} name={user.name} />
      <UrlContainer allUrls={allUrls} />
      <AddUrlDialog showDialog={openDialog} setShowDialog={setOpenDialog} />
    </div>
  );
};

export default Dashboard;
