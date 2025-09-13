"use client"
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import Terminal from "./Component/terminal";
import Notepad from "./Component/notepad";
import Chrome from "./Component/chrome";  

export default function Home() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false);
  const [showChrome, setShowChrome] = useState(false);
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
      setDate(now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
     <div className={styles.root}>
       <div className={styles.top}>
         <span className={styles.top_left}>
          <span><img src="/kali.svg" alt="logo" /></span>
          <span className={styles.port}>Welcome to Kannan's Portfolio</span>
         </span>
         <span className={styles.top_right}>
         <span><img src="/wifi.svg" alt="logo" /></span>
         <span><img src="/ble.svg" alt="logo" /></span>
         <span><img src="/battery.svg" alt="logo" /></span>

          <div className={styles.top_right_time}
          style={{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", width: "auto", gap: "2px"}}
          >
              <span style={{fontSize: "13px", fontWeight: "bold", color: "black", fontFamily: "Ubuntu, Roboto, sans-serif", whiteSpace: "nowrap"}}>{time}</span>
              <span style={{fontSize: "13px", fontWeight: "bold", color: "black", fontFamily: "Ubuntu, Roboto, sans-serif", whiteSpace: "nowrap"}}>{date}</span>
         </div>
      
         </span>
       </div>
       <div className={styles.navbar}>
       <span onClick={() => setShowTerminal(true)} style={{ cursor: 'pointer' }}><img src="/terminal.svg" alt="logo" /></span>
       <span onClick={() => setShowChrome(true)} style={{ cursor: 'pointer' }}><img src="/chrome.svg" alt="logo" /></span>
       <span onClick={() => window.open("https://github.com/sanjaykannan8", "_blank")} style={{ cursor: 'pointer' }}><img src="/github.svg" alt="logo" /></span>
       <span onClick={() => window.open("https://www.linkedin.com/in/kannan-in/", "_blank")} style={{ cursor: 'pointer' }}><img src="/linkedin.svg" alt="logo" /></span>
       <span onClick={() => window.open("https://open.spotify.com/", "_blank")} style={{ cursor: 'pointer' }}><img src="/spotify.svg" alt="logo" /></span>
       <span onClick={() => setShowNotepad(true)} style={{ cursor: 'pointer' }}><img src="/notepad.svg" alt="logo" /></span>
       <span><img src="/vsc.svg" alt="logo" /></span>
       <span><img src="/folder.svg" alt="logo" /></span>
       <span><img src="/trash.svg" alt="logo" /></span>
       </div>
       {showTerminal && <Terminal isVisible={showTerminal} onClose={() => setShowTerminal(false)} />}
       {showNotepad && <Notepad isVisible={showNotepad} onClose={() => setShowNotepad(false)} />}
       {showChrome && <Chrome isVisible={showChrome} onClose={() => setShowChrome(false)} />}
     </div>
  )
}