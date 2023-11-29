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
  const [loading,setLoading] = useState(false);
  const [quote, setQuote] = useState('');
  const [text, setText] = useState('');
  const [chatInput, setChatInput] = useState('');

  const navigate = useNavigate(); 

  const quotesArray = [
    "Whenever you see a successful business, someone once made a courageous decision.",
    "Where do you put the fear when you choose to innovate? The fear is there, but you have to find a place to put it.",
    "The Golden Rule for Every Business is this: Put Yourself in your Customer’s Place.",
    "Never Give up. Today is hard and tomorrow will be Worse, but the day after Tomorrow will be Sunshine.",
    "Patience: This is the greatest business asset. Wait for the right time to make your moves.",
    "There’s nothing wrong with staying small. You can do big things with a small team.",
  ];

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

  useEffect(()=>{
    const randomNumber = Math.floor(Math.random() * quotesArray.length);
    setQuote(quotesArray[randomNumber]);
  },[])

  const inputchange = (e) => {
    const { value } = e.target;
    setChatInput(value);
  }

  const generateResult = async (e) => {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post('http://localhost:8000/query-model',
      {"query": chatInput},
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setText(response.data.text);
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
          {loading ? <div className="chat-heading-div">{chatInput}</div> : null}
          <div className="chat-prompt-chats">
            {text ? 
                <div className="chats-container">
                  <pre className="chat-prompt-chats-content">
                    {text}
                  </pre> 
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
                    Tell us about your business idea
                </div>
            }
          </div>
          {loading ? null: <div className="chat-input-div">
            <form style={{width: '100%'}} onSubmit={generateResult}>
            <FontAwesomeIcon className="pen-icon" icon={faPen} />
            <input
              className="chat-input" name="chatInput"
              placeholder="Get the info about your product"
              value={chatInput} onChange={inputchange}
            />
            <button type="submit" style={{border: 'none'}}>
            <FontAwesomeIcon className="send-icon" icon={faPaperPlane} />
            </button>
            </form>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ChatComp;
