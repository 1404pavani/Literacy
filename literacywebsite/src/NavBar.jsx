import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./navBar.css";

export default function Navbar() {

  <li><a class="active" href="#home"></a></li>

  return (
    <nav className="nav">
      <ul>
        <li> <CustomLink to="/">Home</CustomLink> </li>
        <li> <CustomLink to="/Reading">Reading</CustomLink> </li>
        <li> <CustomLink to="/Writing">Writing</CustomLink> </li>
        <li> <CustomLink to="/Analytics">Analytics</CustomLink> </li>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} style={{ textDecoration: 'none'}} {...props}>
        {children}
      </Link>
    </li>
  )
}