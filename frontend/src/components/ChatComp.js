import React from 'react'
import SaaisHeader from './SaaisHeader'
import '../css/ChatComp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faTrashCan, faPen, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import BundleComp from './BundleComp'

const ChatComp = () => {
  return (
    <div className='chat-comp'>
        <SaaisHeader />
        <div className='chat-comp-container'>
            <div className='chat-comp-history'>
                <div className='history-div' >
                    <div className='chat-icon' >
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                    <div className='history-div-text'>Token expiry time token expiry timer</div>
                    <div className='delete-icon'>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
                <div className='history-div' >
                    <div className='chat-icon' >
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                    <div className='history-div-text'>Token expiry time</div>
                    <div className='delete-icon'>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
                <div className='history-div'> 
                    <div className='chat-icon' >
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                    <div className='history-div-text'> Token expiry time token expiry tim</div>
                    <div className='delete-icon'>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </div>
            <div className='chat-comp-prompt'>
                <div className='chat-prompt-chats'>
                    <div className='chats-container'>
                        <div className='chat-prompt-chats-content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
                        type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
                        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem 
                        Ipsum.</div>
                        <BundleComp />
                        <div className='chat-prompt-chats-content'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
                        type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
                        typesetting, remaining essentially unchanged.andard dummy text ever since the 1500s, when an unknown printer took a galley of 
                        type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
                        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem 
                        Ipsum.
                        </div>
                    </div>
                </div>
                <div className='chat-input-div'>
                    <FontAwesomeIcon className='pen-icon' icon={faPen}/>
                    <input className='chat-input' placeholder='Get the info about your product'/>
                    <FontAwesomeIcon className='send-icon' icon={faPaperPlane}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatComp