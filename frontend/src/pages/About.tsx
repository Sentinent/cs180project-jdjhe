
function About() {
  return (
    <>
    <section className="p-5 bg-primary bg-gradient">
      <div className="container-fluid content-justify-center">
        <h2 className="text-center text-white">Our Team</h2>
        <p className="lead text-center text-white mb-5">
          {/* text */}
        </p>

        <div className="container-fluid row g-1 content-justify-center">
          <div className="col m-3 d-flex align-items-stretch">
            <div className="card bg-light">
              <div className="card-body text-center">
                <img
                src="https://avatars.githubusercontent.com/u/72101786?v=4"
                className="img-thumbnail rounded-circle mb-3"
                alt=""
                />
                <h3 className="card-title mb-3">Ethan Bayer</h3>
                <p className="card-text">
                  I am a Undergraduate at the University of California Riverside, 
                  pursuing a Bachelor's Degree of Science for Computer Science.
                </p>
                <a href="https://github.com/EthanBayer"><i className="bi bi-github text-dark mx-1"></i></a>
              </div>
            </div>
          </div>

          <div className="col m-3 d-flex align-items-stretch">
            <div className="card bg-light">
              <div className="card-body text-center">
                <img
                src="https://avatars.githubusercontent.com/u/14145932?v=4"
                className="img-thumbnail rounded-circle mb-3"
                alt=""
                />
                <h3 className="card-title mb-3">Sentinent</h3>
                <p className="card-text">
                  {/* text */}
                </p>
                <a href="https://github.com/Sentinent"><i className="bi bi-github text-dark mx-1"></i></a>
              </div>
            </div>
          </div>

          <div className="col m-3 d-flex align-items-stretch">
            <div className="card bg-light">
              <div className="card-body text-center">
                <img
                src="https://avatars.githubusercontent.com/u/59817704?v=4"
                className="img-thumbnail rounded-circle mb-3"
                alt=""
                />
                <h3 className="card-title mb-3">Diane Shan</h3>
                <p className="card-text">
                  {/* text */}
                </p>
                <a href="https://github.com/dianeshan"><i className="bi bi-github text-dark mx-1"></i></a>
              </div>
            </div>
          </div>

          <div className="col m-3 d-flex align-items-stretch">
            <div className="card bg-light">
              <div className="card-body text-center">
                <img
                src="https://avatars.githubusercontent.com/u/8054560?v=4"
                className="img-thumbnail rounded-circle mb-3"
                alt=""
                />
                <h3 className="card-title mb-3">Pjsrcool</h3>
                <p className="card-text">
                  {/* text */}
                </p>
                <a href="https://github.com/Pjsrcool"><i className="bi bi-github text-dark mx-1"></i></a>
              </div>
            </div>
          </div>
          
          <div className="col m-3 d-flex align-items-stretch">
            <div className="card bg-light">
              <div className="card-body text-center">
                <img
                src="https://avatars.githubusercontent.com/u/61136521?v=4"
                className="img-thumbnail rounded-circle mb-3"
                alt=""
                />
                <h3 className="card-title mb-3">htan029</h3>
                <p className="card-text">
                  {/* text */}
                </p>
                <a href="https://github.com/htan029"><i className="bi bi-github text-dark mx-1"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

export default About;
