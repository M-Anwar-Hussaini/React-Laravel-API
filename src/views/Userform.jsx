import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Userform() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const naviage = useNavigate();
  const { setNotification } = useStateContext();
  const [user, setUser] = useState({
    id: null,
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });
  useEffect(() => {
    if (id) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/users/${id}`);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setErrors(null);
    if (user.id) {
      try {
        await axiosClient.put(`/users/${user.id}`, user);
        naviage("/users");
        setNotification("User was successfully uppdated");
      } catch (error) {
        setErrors(error.response.data.errors);
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await axiosClient.post("/users", user);
        naviage("/users");
        setNotification("User was successfully created");
      } catch (error) {
        setErrors(error.response.data.errors);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return loading ? (
    <div className="text-center">Loading...</div>
  ) : (
    <>
      <h1>{user.id ? <>Edit user: {user.name}</> : <>New User</>}</h1>
      <div className="card animated fadeInDown">
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
            type="text"
            placeholder="Name"
          />
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) =>
              setUser({ ...user, password_confirmation: e.target.value })
            }
            type="password"
            placeholder="Password Confirmation"
          />
          <button type="submit" className="btn">
            {user.id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}
