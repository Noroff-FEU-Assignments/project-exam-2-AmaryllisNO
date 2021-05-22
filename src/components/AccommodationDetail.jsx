import Host from '../assets/icons/Host.svg';
import useAxios from '../utils/useAxios';

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useParams, useHistory, Link } from 'react-router-dom';

import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

const AccommodationDetail = ({ props }) => {
  let { name, image_url, host, price, description } = props;

  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const http = useAxios();
  const { id } = useParams();

  const deleteAccommodation = async (id) => {
    try {
      await http.delete(`${BASE_URL}${ESTABLISHMENTS_PATH}/${id}`);

      alert(`accommodation with an id of ${id} has been deleted`);
      history.push('/accommodations');
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className='accommodation-details__section accommodation-details__section--right'>
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
            <>
              <div className='accommodation-details__button'>
                <Link to={`/edit/${id}`}>
                  <button className='button button--form button--auth'>
                    Edit
                  </button>
                </Link>
              </div>
              <div className='accommodation-details__button'>
                <button
                  className='button button--form button--delete button--auth'
                  onClick={() => {
                    deleteAccommodation(id);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AccommodationDetail;
