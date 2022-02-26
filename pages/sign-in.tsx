import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../src/providers/AuthUserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { signIn } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    signIn(email, password)
      .then((authUser) => {
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
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
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <div>
                <button>Sign In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
