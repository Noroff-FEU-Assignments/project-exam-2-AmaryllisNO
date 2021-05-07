import Host from '../assets/icons/Host.svg';
import useAxios from '../utils/useAxios';

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useParams, useHistory, Link } from 'react-router-dom';

const AccommodationDetail = ({ props }) => {
  let { name, image_url, host, price, description } = props;

  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const http = useAxios();
  const { id } = useParams();

  return (
    <>
      <div className='accommodation-details'>
        <div className='accommodation-details__section'>
          <img
            className='accommodation-details__image'
            src={image_url}
            alt={name}
          />
        </div>
        <div className='accommodation-details__section'>
          <h2 className='accommodation-details__title'>{name}</h2>
          <div className='accommodation-details__host'>
            <small>
              Hosted by <b>{host}</b>
            </small>
            <img
              className='accommodation-details__hostimage'
              src={Host}
              alt='host'
            />
          </div>
          <div className='accommodation-details__price'>
            <b className='accommodation-details__pricevalue'>{price} kr</b> /
            night
          </div>
          <p className='accommodation-details__description'>{description}</p>
          {auth ? (
            <Link to={`/edit/${id}`}>
              <button class='button button--form'>Edit Accommodation</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AccommodationDetail;
