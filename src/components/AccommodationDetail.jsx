import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

const establishmentsAPI = BASE_URL + ESTABLISHMENTS_PATH;

const AccommodationDetail = () => {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();

  const { id } = useParams();

  if (!id) {
    history.push('/');
  }

  if (error) {
    console.log(error);
  }

  const url = establishmentsAPI + '/' + id;
  console.log(url);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        setLoading(true);
        if (loading) {
          console.log('loading');
        }

        const res = await axios.get(url);

        if (res.status === 200) {
          setEstablishments(res.data);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstablishments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className='accommodation-details'>
        <div className='accommodation-details__section'>
          <img src={establishments.image_url} alt={establishments.name} />
        </div>
        <div className='accommodation-details__section'>
          <h2>{establishments.name}</h2>
          <div className='accommodation-details__host'>
            Hosted by {establishments.host}
          </div>
          <div className='accommodation-details__price'>
            {establishments.price} kr / night
          </div>
          <p className='accommodation-details__description'>
            {establishments.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default AccommodationDetail;