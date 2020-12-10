import { Icosahedron } from 'components/Icosahedron';
import './HomeContainer.scss';

const HomeContainer = () => (
  <div className="home-container">
    <div className="row">
      <div className="col-sm-12 col-6 justify-content-center mt-4 title">
        <h1 className="reveal-text mt-0 mb-3">WORK IT</h1>
        <h1 className="reveal-text mt-0 mb-3">HRDR</h1>
        <h1 className="reveal-text mt-0 mb-3">MAKE IT </h1>
        <h1 className="reveal-text mt-0 mb-3">BTTR.</h1>
      </div>
      <div className="col-6 justify-content-center figure-container">
        <div className="figure">
          <Icosahedron />
        </div>
      </div>
    </div>
    <div className="row position-absolute scroll-down">
      <div className="col-12  scroll-indicator mb-4 caption">
        <span className="mb-4">Coding since 2017.</span>
        <span className="mb-3">Scroll Down</span>
        <div className="mouse-wheel" />
      </div>
    </div>
  </div>
);

export default HomeContainer;
