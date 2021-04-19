import { useEffect, useState } from 'react';
import axios from 'axios';

import Glass from '../components/Glass';
import Accommodation from '../components/Accommodation';

const Accommodations = () => {
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

  console.log(establishments);

  return (
    <>
      <Glass></Glass>
      <div className='desktop-container'>
        <div className='accommodation-container'>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            establishments.map((establishment) => {
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
    </>
  );
};

export default Accommodations;
