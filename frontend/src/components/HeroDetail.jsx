import PropTypes from "prop-types";

const HeroDetail = ({ hero }) => {
  // This component contains the data we need for each hero - name, image, fullName
  // Receives the data from HeroList passes as a single hero object prop
  // Separating this into its own component is best for reusability and readability

  return (
    <div className="hero-card">
      <div className="hero-name">
        {hero.name}
        <img
          className="hero-image"
          src={hero.images.md}
          alt={`Profile picture of ${hero}`}></img>
        <p className="hero-fullname">{hero.biography.fullName}</p>
      </div>
    </div>
  );
};

HeroDetail.propTypes = {
  // need "Proptypes.shape" because our prop is a nested object,
  // and the data we need is also nested
  // This ensures we get the correct data types that we are expecting
  hero: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.shape({
      md: PropTypes.string.isRequired,
    }).isRequired,
    biography: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default HeroDetail;
