import Loader from "@/common/Loader";
import { userContext } from "@/context/userContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const profileDataStructure = {
  _id: "",
  name: "",
  email: "",
  username: "",
  isAdmin: "",
  pic: "",
};

const Profile = () => {
  const { id: profileId } = useParams();

  const [loading, setLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState("");
  const [profile, setProfile] = useState(profileDataStructure);

  const {
    userAuth: { username },
  } = useContext(userContext);

  let { name, username: profileUser, pic, email } = profile;

  console.log(profile);
  console.log(name);
  console.log(profileUser);
  console.log(pic);

  const fetchUserProfile = async () => {
    const data = await axios.post(
      import.meta.env.VITE_SERVER_DOMAIN + "/user/get-profile",
      {
        username: profileId,
      }
    );

    const {
      data: { profile: userProfile },
    } = data;

    console.log("Line 46", data);

    console.log("Line 48", userProfile);

    if (userProfile != null) {
      setProfile(userProfile);
    }
    if (profileId != null) {
      setProfileLoaded(profileId);
    }

    setLoading(false);
  };

  useEffect(() => {
    resetState();
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  const resetState = () => {
    setProfile(profileDataStructure);
    setLoading(true);
    setProfileLoaded("");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-center h-[100vh]">
          <div className="border-2 border-lightGrey/20 relative flex flex-col items-center rounded-[20px] w-[600px] max-w-[90%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3 shadow-xl">
            <div className="mt-2 mb-2 w-full flex flex-col justify-center items-center">
                <img src={pic} className="w-24 h-24 rounded-full"/>
            </div>
            <div className="mt-2 mb-8 w-full flex flex-col justify-center items-center">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                {profileUser}
              </h4>
              <p className="mt-2 px-2 text-base text-gray-600">
                As we live, our hearts turn colder. Cause pain is what we go...
              </p>
            </div>
            <div className="flex justify-around gap-4 px-2 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {name}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
