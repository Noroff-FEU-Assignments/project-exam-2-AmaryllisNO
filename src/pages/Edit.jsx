import { useHistory, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import React from 'react';
import AuthContext from '../context/AuthContext';
import { ESTABLISHMENTS_PATH } from '../utils/constants';
import useAxios from '../utils/useAxios';
import EditForm from '../components/EditForm';

import Glass from '../components/Glass';
import Heading from '../components/Heading';

const Edit = () => {
  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const [establishment, setEstablishment] = useState([]);
  const http = useAxios();
  let { id } = useParams();

  if (!auth) {
    history.push('/login');
  }

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const res = await http.get(`${ESTABLISHMENTS_PATH}/${id}`);
        setEstablishment(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEstablishment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title={`edit ${establishment.name}`} />
          {establishment.length !== 0 ? (
            <EditForm establishment={establishment} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
