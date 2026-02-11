import { createContext, useContext, useEffect, useState } from "react";
import api from "./axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pareantcategory, setPareantcategory] = useState([]);

  useEffect(() => {
    const handleForceLogout = () => {
      setLoginOpen(true);
    };

    window.addEventListener("force-logout", handleForceLogout);

    return () => {
      window.removeEventListener("force-logout", handleForceLogout);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        console.log("res form auth profile", res);

        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);
  useEffect(() => {
    const parentCate = async () => {
      try {
        const ress = await api.get("/category");
        if (ress.data.success) {
          setPareantcategory(ress?.data?.categories);
        }
      } catch (err) {
        setPareantcategory(null);
      }
    };

    parentCate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        loginOpen,
        setLoginOpen,
        pareantcategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
