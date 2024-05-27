import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditButton from "../../components/Buttons/EditButton";

export default function Perfil() {
  const { id } = useParams();

  const [userData, setUserData] = useState("");
  const userDataFromStorage = localStorage.getItem("user");
  const parsedUserData = JSON.parse(userDataFromStorage);
  useEffect(() => {
    if (userDataFromStorage) {
      setUserData(parsedUserData.user);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center p-5">
        <div
          className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          style={{ width: "25rem" }}
        >
          <div className="flex justify-center" style={{ height: "25rem" }}>
            {" "}
            <img
              className="rounded-t-lg object-cover w-auto"
              src={userData.image}
              alt=""
            />
          </div>
          <div className="p-5">
            <div className="flex justify-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                Email: {userData.email}
              </h5>
            </div>
            <div className="flex justify-center">
              <p className="mb-3 font-normal text-white">
                Name: {userData.name}
              </p>
            </div>
            <div className="flex justify-center text-white">
              <EditButton link="/users/update/" id={userData.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
