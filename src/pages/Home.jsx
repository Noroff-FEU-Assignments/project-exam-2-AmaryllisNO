import BigHeading from '../components/BigHeading';
import LinkButton from '../components/LinkButton';
import Accommodation from '../components/Accommodation';

import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        setLoading(true);
        if (loading) {
          console.log('loading');
        }

        const res = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`);

        if (res.status === 200) {
          console.log('call successful');
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
  }, []);

  let featuredEstablishments = establishments.filter(
    (establishment) => establishment.featured
  );

  return (
    <div className='wrapper'>
      <div className='desktop-container'>
        <BigHeading title='Seek Housing In Bergen' />
        <LinkButton></LinkButton>

        <div className='accommodation-container'>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            featuredEstablishments.map((establishment) => {
              return (
                <div key={establishment.id} className='accommodation'>
                  <Accommodation
                    establishment={establishment}
                    {...establishment}
                  ></Accommodation>
                </div>
              );
            })
          )}

          {error ? (
            <div className='error'>
              An error occured trying to load the establishments :( ...
              {error.toString()}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
