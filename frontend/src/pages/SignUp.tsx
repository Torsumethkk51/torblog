import { Link } from "react-router";
import AppLayout from "../Layout";

export default function Login() {
  return (
    <AppLayout>
      <main>
        <h1>Create an account</h1>
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
            <div>
              <input type="text" />
              <label>Re-Password</label>
            </div>
            <button type="submit">Login</button>
            <p>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </section>
      </main>
    </AppLayout>
  )
}