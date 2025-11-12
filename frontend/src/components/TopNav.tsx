import { Link } from "react-router";

export default function TopNav() {
  return (
    <header>
      <h1>TorBlog</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/create-post"}>Create Post</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/sign-up"}>Sign Up</Link>
      </nav>
    </header>
  );
}