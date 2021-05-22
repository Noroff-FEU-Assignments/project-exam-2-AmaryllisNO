import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

import Glass from '../components/Glass';
import Accommodation from '../components/Accommodation';
import Filter from '../components/Filter';
import Heading from '../components/Heading';

const establishmentsUrl = `${BASE_URL}${ESTABLISHMENTS_PATH}`;

const Accommodations = () => {
  const [establishments, setEstablishments] = useState([]);
  const [filteredEstablishments, setFilteredEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchEstablishments = async () => {
      try {
        setLoading(true);

        const res = await axios.get(establishmentsUrl, {
          cancelToken: source.token,
        });

        if (res.status === 200) {
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
      source.cancel('Cancelling in cleanup');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [establishmentsUrl]);

  const filterChange = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredEstablishments = establishments.filter((establishment) => {
      return establishment.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredEstablishments(filteredEstablishments);
  };

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title={window.location.pathname.replace('/', '')} />
          <Filter search={search} onChange={filterChange}></Filter>
          <div className='accommodation-container'>
            {loading ? (
              <>
                <div>Loading accommodations...</div>
                <div className='loader'>
                  <div className='lds-ellipsis'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </>
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
