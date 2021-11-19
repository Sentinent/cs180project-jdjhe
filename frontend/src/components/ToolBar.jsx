import logo from "../imgs/jdjhe-logos_white_65.png"

function ToolBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
      <div className="container">
        <img src={logo} className="img-fluid" alt="" />
        <a href="/" className="navbar-brand">NY Parking Violations</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/search" className="nav-link">Search</a>
            </li>
            <li className="nav-item">
              <a href="/analytics" className="nav-link">Analytics</a>
            </li>
            <li className="nav-item">
              <a href="/custom" className="nav-link">Custom Analytics</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link">About Us</a>
            </li>
            <li className="nav-item">
              <a href="/violations" className="nav-link">Violations</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ToolBar;
