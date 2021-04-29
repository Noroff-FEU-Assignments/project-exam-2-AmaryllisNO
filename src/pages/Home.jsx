import BigHeading from '../components/BigHeading';
import LinkButton from '../components/LinkButton';
import Accommodation from '../components/Accommodation';

import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

import { useEffect, useState } from 'react';
import axios from 'axios';

const establishmentsUrl = `${BASE_URL}${ESTABLISHMENTS_PATH}`;

const Home = () => {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchEstablishments = async () => {
      try {
        setLoading(true);
        if (loading) {
          console.log('loading');
        }

        const res = await axios.get(establishmentsUrl, {
          cancelToken: source.token,
        });

        if (res.status === 200) {
          console.log('call successful');
          setEstablishments(res.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('fetch aborted');
        } else {
          console.log(error);
          setError(error);
          throw error;
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEstablishments();
    return () => {
      source.cancel();
    };
  }, [establishmentsUrl]);

  let featuredEstablishments = establishments.filter(
    (establishment) => establishment.featured
  );

  return (
    <div className='wrapper'>
      <div className='desktop-container'>
        <BigHeading title='Seek Housing In Bergen' />
        <LinkButton />

        <div className='accommodation-container accommodation-container--home'>
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

          {error ? <div className='error'>{error.toString()}</div> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Home;
