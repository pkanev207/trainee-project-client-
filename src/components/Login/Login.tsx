import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { useLoginUserMutation } from "../../features/auth/auth-api";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/auth-slice";
// import { changePageNumber } from "../../features/books/books-slice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
      isLoading,
    },
  ] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // SyntheticEvent ?? React.FormEvent<HTMLFormElement>
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      try {
        const res = await loginUser({ email, password }).unwrap();
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Please fill all input fields");
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User login successful!");
      // dispatch(changePageNumber({ pageNumber: 1 }));
      dispatch(
        setUser({ name: loginData?.name ?? "", token: loginData?.token ?? "" })
      );
      navigate("/");
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any).data.message);
    }
  }, [isLoginError, loginError]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading" data-testid="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>please login to add books</p>
      </section>

      <section className="form" role="main">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              data-testid="input"
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
              data-testid="input"
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
              data-testid="btn-submit"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
