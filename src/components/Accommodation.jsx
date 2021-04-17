import { Link } from 'react-router-dom';

const Accommodation = ({ establishment }) => {
  return (
    <>
      <Link to={`detail/${establishment.id}`}>
        <div className='mt-10'>
          <h2 className='text-2xl uppercase m-3 text-left'>
            {establishment.name}
          </h2>
          <img src={establishment.image_url} alt={establishment.name} />
          <div>{establishment.base_damage}</div>
          <div>{establishment.damage_type}</div>
        </div>
      </Link>
    </>
  );
};

export default Accommodation;
