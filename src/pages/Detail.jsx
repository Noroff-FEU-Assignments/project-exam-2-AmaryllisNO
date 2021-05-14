import AccommodationDetail from '../components/AccommodationDetail';
import Glass from '../components/Glass';
import EnquiryForm from '../components/EnquiryForm';
import axios from 'axios';

import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

const establishmentsAPI = BASE_URL + ESTABLISHMENTS_PATH;

const Detail = () => {
  const [establishment, setEstablishment] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  let history = useHistory();

  const { id } = useParams();

  console.log(id);

  if (!id) {
    history.push('/');
  }

  if (error) {
    console.log(error);
  }

  const url = establishmentsAPI + '/' + id;

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        setLoading(true);
        if (loading) {
          console.log('loading');
        }

        const res = await axios.get(url);

        if (res.status === 200) {
          setEstablishment(res.data);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstablishment();
    console.log(establishment);
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          {loading ? (
            <div>Loading Establishment...</div>
          ) : (
            <AccommodationDetail props={establishment} />
          )}
          <EnquiryForm props={establishment} />
        </div>
      </div>
    </>
  );
};

export default Detail;
