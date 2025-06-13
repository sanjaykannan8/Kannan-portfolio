"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Terminal from "./Component/terminal";

export default function Home() {
  const [Pressed, setPressed] = useState(false);
  const [cmd, setCmd] = useState("");
  const [render, setRender] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<Array<{command: string, output: string}>>([]);
  const [flag, setFlag] = useState(false);
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCmd(e.target.value);
  }
  const processCommand = (command: string) => {
    let output = "";
    
    switch(command.toLowerCase().trim()) {
      case "help":
        output = `Available commands:
- help: Show this help message
- ls: list files in this directory
- cat: display the contents of a file
- clear: Clear terminal
- exit: Exit the terminal`;
        break;
      case "ls":
        output = "projects.txt \t about.txt \t flag.txt";
        break;
      case "cat":
        output = "Specify the file name to display the contents";
        break;
      case "cat projects.txt":
        output = "check out his github guys";
        break;
      case "cat about.txt":
        output = "he is a student of computer science and engineering";
        break;
      case "cat flag.txt":
        if(flag){
          output = "flag{this_is_a_flag}";
        }
        else{
          output = "you need to find a hidden button to get the flag";
        }
        break;
      case "exit":
        setTerminalHistory([]);
        setPressed(false);
        setCmd("");
        break;
      case "clear":
        setTerminalHistory([]);
        setCmd("");
        return;
      default:
        output = `Command '${command}' not found. Type 'help' for available commands.`;
    }
    
    setTerminalHistory(prev => [...prev, { command, output }]);
    setCmd("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && cmd.trim()) {
      processCommand(cmd);
    }
  };
  return (
    <div className={styles.root}>
      <div className={styles.taskbar}>
        <div className={styles.taskbar_left}>
          <div className={styles.system_logo}>🐧 Ubuntu</div>
          <span className={styles.taskbar_item} onClick={() => setPressed(!Pressed)}>Terminal</span>
        
        </div>

        
        <div className={styles.taskbar_center}>
          <span className={styles.taskbar_item}>Welcome to Kannan's old PC - search it for his details</span>
        </div>

        
        <div className={styles.taskbar_right}>
          <div className={styles.system_indicator}>
            <span className={styles.network_status}>📶</span>
            <span>WiFi</span>
          </div>
          <div className={styles.system_indicator}>
            <span className={styles.battery_status}>🔋</span>
            <span>85%</span>
          </div>
          <div className={styles.system_indicator}>
            <span>🔊</span>
          </div>
          <div className={styles.time_display}>
            <div>{getCurrentTime()}</div>
            <div style={{fontSize: '11px', opacity: 0.8}}>{getCurrentDate()}</div>
          </div>
        </div>
      </div>
      
      <div>
        <button className={styles.button} onClick={() => {setFlag(true); alert("You got me boii check the command again")}}>Click me</button>
      </div>
      {Pressed && (
        <div className={styles.terminal}>
          <div className={styles.terminal_header}>
            <div className={styles.terminal_controls}>
              <div className={`${styles.terminal_button} ${styles.terminal_button_close}`} onClick={() => {setPressed(false);setTerminalHistory([])}}></div>
              <div className={`${styles.terminal_button} ${styles.terminal_button_minimize}`}></div>
              <div className={`${styles.terminal_button} ${styles.terminal_button_maximize}`}></div>
            </div>
            <span className={styles.terminal_title}>Kannan@Ubuntu-desktop:~</span>
          </div>
                                  
            
           
            <div className={styles.terminal_history}>
              {terminalHistory.map((entry, index) => (
                <div key={index} className={styles.terminal_entry}>
                  <Terminal/>
                  <div className={styles.terminal_command}>
                    <span className={styles.terminal_title1}>&#10551;&#10522;&#9763;&#10501;</span>
                    <span style={{color: 'white', fontSize: '14px'}}>{entry.command}</span>
                  </div>
                  <div className={styles.terminal_output}>
                    {entry.output.split('\n').map((line, lineIndex) => (
                      <div key={lineIndex}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input Area */}
           <div>
            <Terminal/>
            <div className={styles.terminal_command} style={{display: 'inline-block'}}>
             <span className={styles.terminal_title1}>&#10551;&#10522;&#9763;&#10501;</span>
             </div>
             <input 
               type="text" 
               onChange={handleInputChange} 
               onKeyDown={handleKeyDown} 
               className={styles.terminal_input} 
               value={cmd}
               placeholder="Type 'help' for commands..."
               autoFocus
             />
           </div>
          
        </div>
      )}
    </div>
  );
}
