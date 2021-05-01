import { Link } from 'react-router-dom';

const Accommodation = ({ establishment }) => {
  return (
    <>
      <Link to={`detail/${establishment.id}`}>
        <img
          className='accommodation__image accommodation__image--smaller'
          src={establishment.image_url}
          alt={establishment.name}
        />
        <div className='accommodation__inner accommodation__inner--smaller'>
          <h3 className='accommodation__title'>{establishment.name}</h3>
          <small className='accommodation__price'>
            {establishment.price} kr/night
          </small>
        </div>
      </Link>
    </>
  );
};

export default Accommodation;
