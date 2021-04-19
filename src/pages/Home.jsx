import Heading from '../components/Heading';
import LinkButton from '../components/LinkButton';
import Accommodation from '../components/Accommodation';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        setLoading(true);
        if (loading) {
          console.log('loading');
        }

        const res = await axios.get(`http://localhost:1337/establishments`);

        if (res.status === 200) {
          console.log('call successful');
          setEstablishments(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstablishments();
  }, []);

  let featuredEstablishments = establishments.filter(
    (establishment) => establishment.featured
  );

  console.log(featuredEstablishments);

  return (
    <div className='wrapper'>
      <div className='desktop-container'>
        <Heading title='Seek Housing In Bergen' />
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
        </div>
      </div>
    </div>
  );
};

export default Home;
