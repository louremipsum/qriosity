import { useAuth0 } from "@auth0/auth0-react";
import Shell from "../components/Shell";

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <Shell>
      <div>{user?.name}</div>
    </Shell>
  );
};

export default Profile;
