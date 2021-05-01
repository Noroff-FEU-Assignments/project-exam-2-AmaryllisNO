import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL, ENQUIRIES_PATH, MESSAGES_PATH } from '../utils/constants';

import Glass from '../components/Glass';
import Heading from '../components/Heading';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const resMessages = await axios.get(`${BASE_URL}${MESSAGES_PATH}`);
        const resEnquiries = await axios.get(`${BASE_URL}${ENQUIRIES_PATH}`);

        setMessages(resMessages.data);
        setEnquiries(resEnquiries.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log(enquiries);
  }, []);

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title='Admin Panel' />
          <div className='admin'>
            <div className='admin__container'>
              <div className='admin__containerlabel'>Enquiries</div>
              <div className='admin__panel'>
                {enquiries.map((enquiry) => {
                  return (
                    <div key={enquiry.id} className='admin__item'>
                      <div className='admin__enquiryfield'>
                        <div className='admin__enquirylabel'>Establishment</div>
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
                        <div className='admin__enquiryvalue'>{enquiry.doa}</div>
                      </div>
                      <div className='admin__enquiryfield'>
                        <div className='admin__enquirylabel'>Days staying</div>
                        <div className='admin__enquiryvalue'>
                          {enquiry.days}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='admin__container'>
              <div className='admin__containerlabel'>Messages</div>
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
