const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-light mt-5">
            <footer className="py-5">
                <div className="container">

                    <div className="row g-5 py-5">

                        <div className="col-lg-5">
                            <h1 className="fw-bold mb-4">CineVault</h1>

                            <p className="text-secondary fs-5 lh-lg mb-4">
                                Your destination for discovering movies,
                                exploring stories, and finding your next
                                favorite film.
                            </p>

                            <p className="text-secondary mb-0">
                                
                            </p>
                        </div>

                        <div className="col-lg-3">
                            <h5 className="fw-bold mb-4">Explore</h5>

                            <p className="text-secondary mb-3">
                                Popular Movies
                            </p>

                            <p className="text-secondary mb-3">
                                Latest Movies
                            </p>

                            <p className="text-secondary mb-3">
                                Search Movies
                            </p>

                            <p className="text-secondary mb-3">
                                Movie Details
                            </p>
                        </div>

                        <div className="col-lg-4">
                            <h5 className="fw-bold mb-4">About CineVault</h5>

                            <p className="text-secondary fs-6 lh-lg">
                                CineVault is a movie discovery platform
                                designed to make exploring movies simple,
                                enjoyable, and visually engaging.
                            </p>
                        </div>

                    </div>

                    <hr className="border-secondary my-5" />

                    <div className="row py-4 align-items-center">
                        <div className="col-md-8">
                            <p className="text-secondary mb-md-0">
                                © {new Date().getFullYear()} CineVault
                                — Built by Harsh Trivedi
                            </p>
                        </div>

                        <div className="col-md-4 text-md-end">
                            <p className="text-secondary mb-0">
                                React.js • Movie Discovery
                            </p>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    )
}

export default Footer
