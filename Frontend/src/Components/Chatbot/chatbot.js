import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import logo from '../../Images/Logo.png'

// all available config props
const config ={
  floating: true,
  hideBotAvatar: true,
  hideUserAvatar:false,
  cache: false,
  enableMobileAutoFocus:true,
  
  recognitionEnable:true,
  userDelay: 0,
  headerTitle: 'ValueWings Chatbot'
};
const theme = {
    background: 'white',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#636cff',
    headerFontColor: 'white',
    headerFontSize: '15px',
    botBubbleColor: '#636cff',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#636cff',
  };
  function MailUs(){
    window.open('mailto:valuewings04@gmail.com');
    return 'Please write us your query..'
    }
    
class ValueWingsChatbot extends Component {
  render() {
    return (
    <ThemeProvider theme={theme}>
      <ChatBot 
      steps={[
        {
          id: '1',
          
          message: 'Welcome to ValueWings!! we are the team of price makers',
          trigger: '2',
        },
        {
          id: '2',
       
          message: 'What is your name?',
          trigger: '3',
        },
        {
          id: '3',
          user: true,
          trigger: '4',
        },
        {
          id: '4',
          message: 'Hello {previousValue}',
          trigger: '5',
        },
        {
          id: '5',
          message: 'I am ValueWings Chatbot. I am here to Help you.',
          trigger: '6',
        },
        {
          id: '6',
          message: 'How can I help you?',
          trigger: '7',
        },
        {
          id: '7',
          options: [
              { value: 1, label: 'What is ValueWings?', trigger: '8' },
              { value: 2, label: 'Steps to guide', trigger: '9' },
              { value: 3, label: 'Contact Us', trigger: '10' },
            ],
        },
        {
          id: '8',
          message: 'In the automotive sector, pricing calculation play an essential role for both Seller and Buyer to assess the market price of a vehicle before putting it on sale or buying it. The rise of used cars sales is exponentially increasing. Car dealers sometimes take advantage of this scenario by listing unrealistic prices owing to the demand. So our objective of this project is to provide a fair market value of the car to the user either they are seller, buyer or a dealer on the basis of their status and car’s condition.',			// Write something about Valuewings
          trigger: '17',
        },
        {
          id: '9',
          message: 'For what you want guidance?',
          trigger: '11',
        },
        {
          id: '10',
          message: 'Please address your query to mail id- valuewings04@gmail.com. Our team will reach to you.',				// Write something about contact us
          trigger: '20',
        },
        {
          id: '11',
          options: [
              { value: 1, label: 'Used Car Price', trigger: '12' },
              { value: 2, label: 'New Car Price', trigger: '13' },
              { value: 3, label: 'Compare Car', trigger: '14' },
            ],     
        },
        {
          id: '12',
          options: [
              { value: 1, label: 'How Used Car Price service works?', trigger: '15' },
              { value: 2, label: 'Where can I use price certificate?', trigger: '16' },
            ],    
        },
        {
          id: '13',
          message: '1. Select the parameters of the car for which you want to search. \n 2. It will provide you the original price of the car with all its trims. \n You can also view the gallery of the selected car. There you can view interior, exterior images and 360 view of car  ',				
          trigger: '17',
        },
        {
          id: '14',
          message: '1. Select the parameters for 2 car. \n 2. It will provide you the comparison chart.',				
          trigger: '17',
        },
        {
          id: '15',
          message: 'Select all the parameters of a car for which you want to search. \n 2. It will provide the selected car price in 4 condition [Good, VeryGood, Bad, VeryBad] ',				// Write something about Algorithm
          trigger: '17',
        },
        {
          id: '16',
          message: 'The dealers or any seller who has get the value of a car from the ValueWings, can use this ceertificate to show to the buyer while selling the car with the defined price. So there is less chances for unrealistic demand.',				// Write something about certificate
          trigger: '17',
        },
        {
          id: '17',
          message: 'Need any other help',
          trigger: '18',
        },
        {
          id: '18',
          options: [
              { value: 1, label: 'Yes', trigger: '6' },
              { value: 2, label: 'No', trigger: '19' },
            ],    
        },
        {
          id: '19',
          message: 'Thank you for using me !!',				// Write something about contact us
          trigger: '',
        },
        {
            id: '20',
            message: 'Do you have any queries?',				// Write something about contact us
            trigger: '21',
        },
        {
            id: '21',
            options: [
                { value: 1, label: 'Yes', trigger: '22' },
                { value: 2, label: 'No', trigger: '17' },
              ],  
        },
        {
            id: '22',
            component: <MailUs />,
            asMessage: true,
          //   message: 'Welcome to ValueWings!! we are the team of price makers',
            trigger: '17',
        }, 
      ]}
        {...config}
      />
      </ThemeProvider>
        
        );
      }

    }

    export default ValueWingsChatbot;