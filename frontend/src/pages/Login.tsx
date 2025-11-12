import { Link } from "react-router";
import AppLayout from "../Layout";

export default function Login() {
  return (
    <AppLayout>
      <main>
        <h1>Login</h1>
        <section>
          <form >
            <div>
              <input type="text" />
              <label>Email</label>
            </div>
            <div>
              <input type="text" />
              <label>Password</label>
            </div>
            <button type="submit">Login</button>
            <p>
              Doesn't have an account yet? <Link to={"/sign-up"}>Sign Up</Link>
            </p>
          </form>
        </section>
      </main>
    </AppLayout>
  )
}