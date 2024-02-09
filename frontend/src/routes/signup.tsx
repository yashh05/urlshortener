import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    other: "",
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      const response = await fetch(BACKEND_URL + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name !== "" ? name : undefined,
          email: email !== "" ? email : undefined,
          password: password !== "" ? password : undefined,
        }),
      });

      if (response.ok) {
        console.log(response);
        navigate("/dashboard");
      } else {
        const finalResponse = await response.json();

        if (finalResponse.type === "ZodError") {
          const newErrors = {
            nameError:
              finalResponse.error.find((error: any) => error.path === "name")
                ?.patherror || "",
            emailError:
              finalResponse.error.find((error: any) => error.path === "email")
                ?.patherror || "",
            passwordError:
              finalResponse.error.find(
                (error: any) => error.path === "password"
              )?.patherror || "",
          };

          setError((prevError) => ({
            ...prevError,
            other: "",
            ...newErrors,
          }));
        } else {
          setError({
            other: finalResponse.error,
            nameError: "",
            emailError: "",
            passwordError: "",
          });
        }
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      setError({
        other: "signup failed, try again",
        nameError: "",
        emailError: "",
        passwordError: "",
      });
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full pt-24">
      <div className="flex flex-col gap-5 bg-white  justify-center items-center w-1/3 m-auto shadow-md border-2 rounded-md p-3 font-poppins ">
        <img src="/logo.png" alt="" className="w-9 animate-logo-smooth" />
        <h1 className=" text-dark-grey text-2xl font-bold"> WELCOME</h1>
        {error.other !== "" && (
          <p className="text-red-600 text-xs">{error.other}</p>
        )}
        <h5>
          Already have an account?{" "}
          <Link to="/signin">
            <span className="text-black underline cursor-pointer">Signin</span>
          </Link>
        </h5>
        <form className=" flex flex-col w-full gap-3" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none "
            onChange={handleChange}
          />
          {error.nameError !== "" && (
            <p className="text-red-600 text-xs -mt-1">{error.nameError}</p>
          )}
          <input
            type="text"
            placeholder="email address"
            name="email"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
            onChange={handleChange}
          />
          {error.emailError !== "" && (
            <p className="text-red-600 text-xs -mt-1">{error.emailError}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
            onChange={handleChange}
          />
          {error.passwordError !== "" && (
            <p className="text-red-600 text-xs -mt-1">{error.passwordError}</p>
          )}
          <button
            type="submit"
            className=" bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold tracking-wide text-white py-2 rounded-md"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
