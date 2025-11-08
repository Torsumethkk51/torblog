import { Link } from "react-router";

export default function TopNav() {
  return (
    <header>
      <h1>TorBlog</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/create-post"}>Create Post</Link>
      </nav>
    </header>
  );
}