import { useEffect, useState } from 'react';
import axios from 'axios';

const Accommodations = () => {
  console.log('peepeepoopop');
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:1337/establishments`).then((response) => {
      setEstablishments(response.data);

      if (response.status === 200) {
        setLoading(false);
      }
    });
  }, []);

  console.log(establishments);

  return <div></div>;
};

export default Accommodations;
