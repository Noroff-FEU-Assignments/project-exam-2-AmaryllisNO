import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BASE_URL, ENQUIRIES_PATH, MESSAGES_PATH } from '../utils/constants';

import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';

import Glass from '../components/Glass';
import Heading from '../components/Heading';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(null);

  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const http = useAxios();

  if (!auth) {
    history.push('/');
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const resMessages = await http.get(`${BASE_URL}${MESSAGES_PATH}`);
        const resEnquiries = await http.get(`${BASE_URL}${ENQUIRIES_PATH}`);

        setMessages(resMessages.data);
        setEnquiries(resEnquiries.data);
        console.log(resEnquiries.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const deleteEnquiry = async (id) => {
    try {
      const res = await http.delete(`${BASE_URL}${ENQUIRIES_PATH}/${id}`);
      console.log(res);
      alert(`enquiry with an id of ${id} has been deleted`);
    } catch (error) {
      console.log(error);
    } finally {
      setRender(render + 1);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await http.delete(`${BASE_URL}${MESSAGES_PATH}/${id}`);
      console.log(res);
      alert(`message with an id of ${id} has been deleted`);
    } catch (error) {
      console.log(error);
    } finally {
      setRender(render + 1);
    }
  };

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title='Admin Panel' />
          <div className='admin'>
            <div className='admin__container'>
              <div className='admin__containerlabel'>Enquiries</div>
              {loading ? (
                <>
                  <div>Loading enquiries...</div>
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
                <div className='admin__panel'>
                  {enquiries.map((enquiry) => {
                    return (
                      <div key={enquiry.id} className='admin__item'>
                        <div className='admin__enquiryfield'>
                          <div className='admin__enquirylabel'>
                            Establishment
                          </div>
                          <div className='admin__enquiryvalue'>
                            {enquiry.establishment}
                          </div>
                        </div>
                        <div className='admin__enquiryfield'>
                          <div className='admin__enquirylabel'>Name</div>
                          <div className='admin__enquiryvalue'>
                            {enquiry.name}
                          </div>
                        </div>
                        <div className='admin__enquiryfield'>
                          <div className='admin__enquirylabel'>E-mail</div>
                          <div className='admin__enquiryvalue'>
                            {enquiry.email}
                          </div>
                        </div>
                        <div className='admin__enquiryfield'>
                          <div className='admin__enquirylabel'>
                            Date of arrival
                          </div>
                          <div className='admin__enquiryvalue'>
                            {enquiry.doa}
                          </div>
                        </div>
                        <div className='admin__enquiryfield'>
                          <div className='admin__enquirylabel'>
                            Days staying
                          </div>
                          <div className='admin__enquiryvalue'>
                            {enquiry.days}
                          </div>
                        </div>
                        <div className='admin__enquiryfield'>
                          <div className='admin__enquirylabel'>Sum</div>
                          <div className='admin__enquiryvalue'>
                            {enquiry.sum}
                          </div>
                        </div>
                        <button
                          className='button button--form'
                          onClick={() => {
                            deleteEnquiry(enquiry.id);
                          }}
                        >
                          Delete Enquiry
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='admin__container'>
              <div className='admin__containerlabel'>Messages</div>
              {loading ? (
                <>
                  <div>Loading messages...</div>
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
                <div className='admin__panel'>
                  {messages.map((message) => {
                    return (
                      <div key={message.id} className='admin__item'>
                        <div className='admin__messagefield'>
                          <div className='admin__messagelabel'>Name</div>
                          <div className='admin__messagevalue'>
                            {message.name}
                          </div>
                        </div>
                        <div className='admin__messagefield'>
                          <div className='admin__messagelabel'>E-mail</div>
                          <div className='admin__messagevalue'>
                            {message.email}
                          </div>
                        </div>
                        <div className='admin__messagefield'>
                          <div className='admin__messagevalue'>
                            {message.message}
                          </div>
                        </div>
                        <button
                          className='button button--form'
                          onClick={() => {
                            deleteMessage(message.id);
                          }}
                        >
                          Delete Message
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
