import { useAuth } from "../src/providers/AuthUserContext";

export default function Home() {
  const { authUser, logOut } = useAuth();

  console.log(authUser);
  return (
    <div>
      {authUser && (
        <button type="button" onClick={logOut}>
          Sign out
        </button>
      )}
      hi
    </div>
  );
}
