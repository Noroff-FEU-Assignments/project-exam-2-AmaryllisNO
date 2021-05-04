import Host from '../assets/icons/Host.svg';

const AccommodationDetail = ({ props }) => {
  let { name, image_url, host, price, description } = props;

  return (
    <>
      <div className='accommodation-details'>
        <div className='accommodation-details__section'>
          <img
            className='accommodation-details__image'
            src={image_url}
            alt={name}
          />
        </div>
        <div className='accommodation-details__section'>
          <h2 className='accommodation-details__title'>{name}</h2>
          <div className='accommodation-details__host'>
            <small>Hosted by {host}</small>
            <img src={Host} alt='host' />
          </div>
          <div className='accommodation-details__price'>
            <b className='accommodation-details__pricevalue'>{price} kr</b> /
            night
          </div>
          <p className='accommodation-details__description'>{description}</p>
        </div>
      </div>
    </>
  );
};

export default AccommodationDetail;
