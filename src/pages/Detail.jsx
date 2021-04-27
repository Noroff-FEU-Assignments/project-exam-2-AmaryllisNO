import AccommodationDetail from '../components/AccommodationDetail';
import Glass from '../components/Glass';
import EnquiryForm from '../components/EnquiryForm';

const Detail = () => {
  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <AccommodationDetail />
          <EnquiryForm />
        </div>
      </div>
    </>
  );
};

export default Detail;
