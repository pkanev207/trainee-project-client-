import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { useRegisterUserMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repass: "",
  });
  const { name, email, password, repass } = formData;
  const [registerUser, { data, isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repass) {
      return toast.error("Passwords do not match!");
    }

    if (name && email && password) {
      await registerUser({ name, email, password });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User register successful!");
      dispatch(setUser({ name: data.name, token: data.token }));
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    }
  }, [isError, error]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="repass"
              name="repass"
              value={repass}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
