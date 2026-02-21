import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";
import axios from "axios";

export const GifContext = createContext();

function GifProvider({ children }) {
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        setLoading(true);

        const API_KEY = "GvQpo8X25YBMeAkT6uVlsHiBAyGXQYcu";
        const GIF_ID = "FUx8YWh8ZYQfZxQaLA";
        const tags = [
          "you-can-do-it",
          "work-hard",
          "you-got-this",
          "rooting-for-you",
          "learn",
          "study",
        ];

        const randomTag = tags[Math.floor(Math.random() * tags.length)];

        const response = await axios
          .get
          // `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=pudgypenguins-${randomTag}&rating=g`,
          ();
        setGif(response.data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGif();
  }, []);

  return (
    <>
      <GifContext.Provider
        value={{
          gif,
          loading,
        }}
      >
        {children}
      </GifContext.Provider>
    </>
  );
}

export default GifProvider;
