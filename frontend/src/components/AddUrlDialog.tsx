import { useState } from "react";
import { BACKEND_URL } from "../config";

const AddUrlDialog = ({
  showDialog,
  setShowDialog,
}: {
  showDialog: boolean;
  setShowDialog: any;
}) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState({
    other: "",
    urlError: "",
  });

  const handleNewUrl = async () => {
    const response = await fetch(BACKEND_URL + "/url/addUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        url: url !== "" ? url : undefined,
      }),
    });
    if (response.ok) {
      console.log(response);
      window.location.reload();
    } else {
      const finalResponse = await response.json();

      if (finalResponse.type === "ZodError") {
        const newErrors = {
          urlError:
            finalResponse.error.find((error: any) => error.path === "url")
              ?.patherror || "",
        };

        setError((prevError) => ({
          ...prevError,
          other: "",
          ...newErrors,
        }));
      } else {
        setError({
          other: finalResponse.error,
          urlError: "",
        });
      }
    }
  };

  return (
    <div
      onClick={() => setShowDialog(false)}
      className={`${
        showDialog ? "fixed" : "hidden"
      }  inset-0 flex items-center justify-center bg-[#7E7F7E] bg-opacity-50`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded justify-center items-center gap-5 p-10 w-1/3 bg-white text-black"
      >
        <h1 className="text-center mb-5 text-xl font-semibold uppercase font-poppins ">
          Add URL
        </h1>
        {error.other !== "" ? (
          <p className="text-red-700">{error.other}</p>
        ) : null}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            className="p-2 outline-none border-2 border-slate-400 rounded w-full"
            placeholder="https://github.com"
            onChange={(e) => setUrl(e.target.value)}
          />

          {error.urlError !== "" ? (
            <p className="text-red-700">{error.urlError}</p>
          ) : null}

          <button
            className=" bg-slate-800 rounded w-fit py-2 px-5  mt-5 text-white font-semibold text-lg self-end "
            onClick={handleNewUrl}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUrlDialog;
