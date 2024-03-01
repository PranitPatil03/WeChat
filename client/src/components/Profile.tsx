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
  createdAt: "",
};

const Profile = () => {
  const { id: profileId } = useParams();

  const [loading, setLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState("");
  const [profile, setProfile] = useState(profileDataStructure);

  const {
    userAuth: { username },
  } = useContext(userContext);

  let { name, username: profileUser, pic } = profile;

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
      data: { user },
    } = data;

    console.log(user);

    if (user != null) {
      setProfile(user);
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
          <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                {profileUser}
              </h4>
              <p className="mt-2 px-2 text-base text-gray-600">
                As we live, our hearts turn colder. Cause pain is what we go
                through as we become older. We get insulted by others, lose
                trust for those others. We get back stabbed by friends. It
                becomes harder for us to give others a hand. We get our heart
                broken by people we love, even that we give them all...
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 px-2 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Education</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  Stanford University
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Languages</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  English, Spanish, Italian
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  Product Design
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Work History</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  English, Spanish, Italian
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Organization</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  Simmmple Web LLC
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Birthday</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  20 July 1986
                </p>
              </div>
            </div>
          </div>
          <p className="font-normal text-navy-700 mt-20 mx-auto w-max">
            Profile Card component from{" "}
            <a
              href="https://horizon-ui.com?ref=tailwindcomponents.com"
              target="_blank"
              className="text-brand-500 font-bold"
            >
              Horizon UI Tailwind React
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default Profile;
