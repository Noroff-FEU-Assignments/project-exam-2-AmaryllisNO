import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

import Glass from '../components/Glass';
import Accommodation from '../components/Accommodation';
import Filter from '../components/Filter';

const establishmentsUrl = `${BASE_URL}${ESTABLISHMENTS_PATH}`;

const Accommodations = () => {
  const [establishments, setEstablishments] = useState([]);
  const [filteredEstablishments, setFilteredEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let unmounted = false;
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

          setFilteredEstablishments(res.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEstablishments();
    return () => {
      unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, [establishmentsUrl]);

  const filterChange = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredEstablishments = establishments.filter((establishment) => {
      return establishment.name.toLowerCase().includes(search.toLowerCase());
    });

    console.log('inside', filteredEstablishments);

    setFilteredEstablishments(filteredEstablishments);
  };

  if (!loading) {
    console.log('outside', filteredEstablishments);
  }

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Filter search={search} onChange={filterChange}></Filter>
          <div className='accommodation-container'>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              filteredEstablishments.map((establishment) => {
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
    </>
  );
};

export default Accommodations;
