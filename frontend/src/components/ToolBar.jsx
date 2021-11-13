import { logo } from "../imgs/jdjhe-logos_black.png"

function ToolBar() {
  return (
    <div>
      { /* Navbar */ }
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
        <div className="container">
          {/* <img src="../imgs/jdjhe-logos_black.png" className="img-fluid" alt="logo"/> */}
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
                <a href="/search" className="nav-link">Search</a>
              </li>
              <li className="nav-item">
                <a href="/analytics" className="nav-link">Analytics</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">Custom analytic</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">About us</a>
              </li>
            </ul>
          </div>
          <a href="/" className="navbar-brand">NY Parking Violations</a>
        </div>
      </nav>
    </div>
  );
}

export default ToolBar;
