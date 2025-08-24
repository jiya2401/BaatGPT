import "./Sidebar.css";
import { useContext, useEffect } from "react";
import {  MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
     const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

     const getAllThreads = async() => { 
        try {
           const response = await fetch("http://localhost:8080/api/thread");
           const res = await response.json();
           const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
           console.log(filteredData);
           setAllThreads(filteredData);
        }catch(err) {
            console.log(err);
        }
     };

     useEffect(() => {
        getAllThreads();
     }, [currThreadId])

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1()); 
        setPrevChats([]); 
    } 


    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
          const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
          const res = await response.json();
          console.log(res);
          setPrevChats(res);
          setNewChat(false);
          setReply(null);
        }catch(err) {
            console.log(err);
        }
    }

    const deleteThread = async(threadId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE",}); 
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
            
            if(threadId === currThreadId) {
                createNewChat();  
            }

        }catch(err) {
            console.log(err);   
        }
    }



    return (
        <section className="sidebar">
            {/* new chat button */}
            <button onClick={createNewChat}> 
                <img src="src/assets/blacklogo.png" alt="GPT logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* History */}

            <ul className="history"> 
              {
                allThreads?.map((thread, idx) => ( 
                    <li key={idx}
                        onClick={(e) => changeThread(thread.threadId)} 
                    >
                        {thread.title}  
                        <i className="fa-solid fa-trash"
                          onClick={(e) => {
                            e.stopPropagation(); //stop event bubbling
                            deleteThread(thread.threadId);
                          }}
                        ></i>
                    </li>
                ))
              }
                 
            </ul>

            {/* Sign */}

            <div className="sign">
                <p>GPTmodel &hearts;</p>
                <p className="footer-note">
                  ⚠️ Disclaimer: This AI assistant’s knowledge is up to 2023.</p>

            </div>

        </section>
    )
}
export default Sidebar;