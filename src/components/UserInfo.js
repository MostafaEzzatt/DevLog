import auth from "../firebase.config";

const UserInfo = () => {
  return (
    <div className="w-72 px-3 py-5 bg-blue-600 rounded-sm text-white ">
      <h1 className="text-3xl font-medium">
        Hello, {auth.currentUser.displayName}
      </h1>
      <p className="text-gray-100">We Hope You The Best</p>
    </div>
  );
};

export default UserInfo;
