import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
  const [synced, setSynced] = useState(false);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { baseURL } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || !synced) {
        return;
      }
      try {
        const token = await getToken();
        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.imageUrl,
        };

        axios.post(baseURL + "/users", userData, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSynced(true);
      } catch (error) {
        toast.error(error.message);
      }
    };
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced]);
  return null;
};

export default UserSyncHandler;
