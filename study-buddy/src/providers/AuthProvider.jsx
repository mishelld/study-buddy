import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";

export const AuthContext = createContext();

function AuthProvider({ onAuthReady, children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveUser();

    async function fetchActiveUser() {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } finally {
        onAuthReady();
      }
    }
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      setUser(data.user);
      navigate("/tasks");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
        return;
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          handleLogout,
          handleLogin,
          error,
          loading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthProvider;
