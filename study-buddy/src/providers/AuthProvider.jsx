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
    const checkSession = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        setError(error.message);
      } finally {
        onAuthReady();
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

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
      console.log("check");
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
      navigate("/Tweeter-2.0-Project/");
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
