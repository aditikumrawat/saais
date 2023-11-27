import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SaaisHeader from "./SaaisHeader";
import "../css/ChatComp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMessage, faTrashCan, faPen, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatComp = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const token = localStorage.getItem('accessToken');

  const navigate = useNavigate(); 

  useEffect(() =>{
    (async () =>{
      try{
        const response = await axios.get(`http://localhost:8000/is_valid/${token}`);
        if(response.data === true){
          setIsTokenValid(true);
        }
        else{
          navigate('/signin');
        }
      }catch (error) {
        console.error('Error:', error);
      }
    })();
},[token])

  const quotesArray = [
    "Whenever you see a successful business, someone once made a courageous decision.",
    "Where do you put the fear when you choose to innovate? The fear is there, but you have to find a place to put it.",
    "The Golden Rule for Every Business is this: Put Yourself in your Customer’s Place.",
    "Never Give up. Today is hard and tomorrow will be Worse, but the day after Tomorrow will be Sunshine.",
    "Patience: This is the greatest business asset. Wait for the right time to make your moves.",
    "There’s nothing wrong with staying small. You can do big things with a small team.",
  ];
  
  const [loading,setLoading] = useState(true);
  const [quote, setQuote] = useState('');
  const [text, setText] = useState('');

  useEffect(()=>{
    const randomNumber = Math.floor(Math.random() * quotesArray.length);
    setQuote(quotesArray[randomNumber]);
  },[])

  const generateResult = async() => {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/');

      setText(response.data);
  }

  return ( 
      <div className="chat-comp">
      <SaaisHeader />
      <div className="chat-comp-container">
        <div className="chat-comp-history">
          <div className="history-div">
            <div className="chat-icon">
              <FontAwesomeIcon icon={faMessage} />
            </div>
            <div className="history-div-text">
              Token expiry time token expiry timer
            </div>
            <div className="delete-icon">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
          <div className="history-div">
            <div className="chat-icon">
              <FontAwesomeIcon icon={faMessage} />
            </div>
            <div className="history-div-text">Token expiry time</div>
            <div className="delete-icon">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
          <div className="history-div">
            <div className="chat-icon">
              <FontAwesomeIcon icon={faMessage} />
            </div>
            <div className="history-div-text">
              Token expiry time token expiry tim
            </div>
            <div className="delete-icon">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
        </div>
        <div className="chat-comp-prompt">
          <div className="chat-prompt-chats">
            {text ? 
                <div className="chats-container">
                  <div className="chat-prompt-chats-content">
                    {text}
                  </div> 
                </div>
                :
                loading ? 
                <div className="loader-container">
                  <div className="loader-atom">
                    <div className="loader-line line-1">
                      <div className="electron"></div>
                    </div>
                    <div className="loader-line line-2">
                      <div className="electron"></div>
                    </div>
                    <div className="loader-line line-3">
                      <div className="electron"></div>
                    </div>
                  </div>
                  <div className="quote">{quote}</div>
                </div> :
                <div className="chat-welcome-container">
                    Get any help related to your product
                </div>
            }
              {/* <BundleComp /> */}
              {/* <div className="chat-prompt-chats-content">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.andard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div> */}
          </div>
          <div className="chat-input-div">
            <FontAwesomeIcon className="pen-icon" icon={faPen} />
            <input
              className="chat-input"
              placeholder="Get the info about your product"
            />
            <FontAwesomeIcon  onClick={generateResult} className="send-icon" icon={faPaperPlane} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComp;
