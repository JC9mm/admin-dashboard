import { useEffect, useState } from "react";
import { refreshToken } from "../lib/auth";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      let token = localStorage.getItem("access_token");

      let res = await fetch("https://api.jorgecastillo.net/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        token = await refreshToken();
        if (!token) return;

        res = await fetch("https://api.jorgecastillo.net/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    };

    loadProfile();
  }, []);

  return profile;
};
