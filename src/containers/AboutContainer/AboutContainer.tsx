import './AboutContainer.scss';
import { Skillbar } from 'components/Skillbar';
import mediaLinks from 'assets/data/mediaLinks';

const skills = [
  {
    label: 'Javascript',
    value: 8.6,
  },
  {
    label: 'React.js',
    value: 8.3,
  },
  {
    label: 'CSS',
    value: 7.4,
  },
  {
    label: 'Flutter',
    value: 5.5,
  },
];

const AboutContainer = () => (
  <div className="about-container mt-6">
    <div className="col-12 title">
      <h1 className="mt-0 mb-2">ABOUT</h1>
      <h1 className="mt-0 mb-4">ME</h1>
    </div>
    <div className="col-12 info">
      <span className="mb-2">
        <b>Name:</b> Henrique Alberone Ramos
      </span>
      <span className="mb-2">
        <b>Birthdate:</b> August 21st, 1999
      </span>
      <span className="mb-2">
        <b>Works as:</b> Front-end Developer
      </span>
      <span className="mb-2">
        <b>Lives in:</b> Belo Horizonte, Brazil
      </span>
      <div className="row mt-3 mb-4">
        {Object.entries(mediaLinks).map(
          ([key, link], index) => index < 5 && (
              <a
                key={key}
                href={link}
                className="icon-link mr-4 mt-3 link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {key.substring(0, 1).toUpperCase() + key.substring(1)}
              </a>
            )
        )}
      </div>
    </div>
    <div className="col-12 skills">
      {skills.map(({ label, value }) => (
        <Skillbar
          label={label}
          key={label}
          classList="mb-3"
          value={value}
        />
      ))}
    </div>
    <div className="col-12 text">
      <h4 className="mt-0 mb-3">Bio:</h4>
      <p className="mt-0">
        Software Engineer who spends his spare time trying to learn
        something new about Web, Mobile Development and UI/UX design. Likes
        video editing, muddling through Illustrator and loses his sanity
        while playing Dota 2. Also writes about his programming
        misadventures on{' '}
        <a
          href={mediaLinks.devTo}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Dev.to
        </a>
        .
      </p>
    </div>
  </div>
);

export default AboutContainer;
