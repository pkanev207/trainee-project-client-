import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    count === 0 && navigate("/auth/login");

    return () => clearInterval(interval);
  }, [count, navigate]);

  return <div>Loading...</div>;
};

export default LoadingToRedirect;
