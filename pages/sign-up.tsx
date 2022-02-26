import { useState } from "react";
import { useRouter } from "next/router";

// import { useAuth } from '../context/AuthUserContext';

import { useAuth } from "../src/providers/AuthUserContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  //Optional error handling
  const [error, setError] = useState(null);

  const { createUser } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    if (passwordOne === passwordTwo)
      createUser(email, passwordOne)
        .then((authUser) => {
          console.log(authUser);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);

          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <div className="text-center" style={{ padding: "40px 0px" }}>
      <div>
        <div>
          <form
            style={{ maxWidth: "400px", margin: "auto" }}
            onSubmit={onSubmit}
          >
            {error && <div color="danger">{error}</div>}
            <div>
              <label htmlFor="signUpEmail">Email</label>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="signUpPassword">Password</label>
              <div>
                <input
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="signUpPassword2">Confirm Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <div>
                <button>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
