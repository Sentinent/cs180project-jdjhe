import map from "../imgs/New_York_Counties.svg"
function Home() {
    return (
        <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
            <div className="container">
                <div className="d-sm-flex align-items-center justify-content-between">
                    <div>
                        <h1>New York City Parking Violations<span className="text-info"> Database </span></h1>
                        <p className="lead my-4">
                            This is a dataset hosted by the City of New York. 
                            The city has an open data platform found here and 
                            they update their information according the amount 
                            of data that is brought in. Explore New York City 
                            using Kaggle and all of the data sources available 
                            through the City of New York organization page!
                        </p>
                        <a href="/search">
                            <button
                                className="btn btn-primary btn-lg"
                                data-bs-toggle="modal"
                            >
                                Start Searching
                            </button>
                        </a>
                    </div>
                    <img
                        className="img-fluid w-50 d-none d-sm-block"
                        src={map}
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
};

export default Home;