import { createContext, useEffect, useState } from "react";
import { getUsers } from "./Api";

/*
  Global context used to share user data across the app
*/
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Stores the logged-in user data
  const [user, setUser] = useState(null);

  // Indicates if the user data is still loading
  const [isLoading, setIsLoading] = useState(true);

  // Stores any error that occurs during the fetch
  const [error, setError] = useState(null);

  /*
    Fetch user data once when the provider mounts
  */
  useEffect(() => {
    getUsers()
      .then(users => {
        setUser(users[0]);
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
        setError("Unable to load user data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /*
    Provide user state, loading state and error state
    to all child components
  */
  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
