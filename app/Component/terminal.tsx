"use client"
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "./terminal.module.css";

type CommandOutput = {
  content: string;
  type: 'success' | 'error' | 'info';
};

interface CommandHistory {
  command: string;
  output: CommandOutput[];
}

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function Terminal({ isVisible, onClose }: TerminalProps) {
  const [cmd, setCmd] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const calculateCenter = () => {
    if (typeof window !== 'undefined') {
      return {
        x: Math.max(0, (window.innerWidth - 500) / 2),
        y: Math.max(0, (window.innerHeight - 400) / 2)
      };
    }
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    inputRef.current?.focus();

    // Center terminal on window resize
    const handleResize = () => {
      if (!isVisible) return; // Don't update position when terminal is hidden
      setPosition(calculateCenter());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVisible]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCmd(e.target.value);
  };

  const executeCommand = (command: string): CommandOutput[] => {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === 'help') {
      return [{
        content: `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  about    - About me
  skills   - My technical skills
  projects - View my projects
  contact  - Show contact information
  github   - Open my GitHub profile
  linkedin - Open my LinkedIn profile`,
        type: 'info'
      }];
    }
    
    if (cmd === 'clear') {
      setCommandHistory([]);
      return [];
    }
    
    if (cmd === 'about') {
      return [{
        content: "Hi! I'm Kannan, a passionate full-stack developer with expertise in web technologies.",
        type: 'success'
      }];
    }
    
    if (cmd === 'skills') {
      return [{
        content: `Technical Skills:
• Frontend: React, Next.js, TypeScript, Tailwind CSS
• Backend: Node.js, Python, Java
• Database: MongoDB, PostgreSQL
• Tools: Git, Docker, AWS`,
        type: 'success'
      }];
    }
    
    if (cmd === 'projects') {
      return [{
        content: "Visit my portfolio to see my latest projects!",
        type: 'info'
      }];
    }
    
    if (cmd === 'contact' || cmd === 'linkedin') {
      if (cmd === 'linkedin' && typeof window !== 'undefined') {
        window.open('https://www.linkedin.com/in/kannan-in/', '_blank');
        return [{
          content: "Opening LinkedIn profile...",
          type: 'success'
        }];
      }
      return [{
        content: "LinkedIn: linkedin.com/in/kannan-in/\nGitHub: github.com/sanjaykannan8",
        type: 'info'
      }];
    }
    
    if (cmd === 'github') {
      if (typeof window !== 'undefined') {
        window.open('https://github.com/sanjaykannan8', '_blank');
      }
      return [{
        content: "Opening GitHub profile...",
        type: 'success'
      }];
    }

    return [{
      content: `Command not found: ${command}. Type 'help' for available commands.`,
      type: 'error'
    }];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && cmd.trim()) {
      const output = executeCommand(cmd);
      if (cmd.toLowerCase() !== 'clear') {
        setCommandHistory(prev => [...prev, { command: cmd, output }]);
      }
      setCmd("");
    }
  };

  const [position, setPosition] = useState(calculateCenter);

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handleMinimize = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className={styles.terminal_container_outer}>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStop={(e, data) => {
          setPosition({ x: data.x, y: data.y });
        }}
        handle={`.${styles.terminal_header}`}
      >
        <div ref={nodeRef} className={`${styles.terminal_wrapper} ${isClosing ? styles.closing : ''}`}>
          <div className={styles.terminal_container}>
            <div className={styles.terminal_header}>
              <div className={styles.window_controls}>
                <button className={`${styles.control_button} ${styles.close_button}`} onClick={handleClose} />
                <button className={`${styles.control_button} ${styles.minimize_button}`} onClick={handleMinimize} />
              </div>
              <span className={styles.terminal_title}>Kannan</span>
              <span className={styles.terminal_title1}>@Ubuntu-desktop:~ </span>
            </div>
            <div className={styles.terminal_content} ref={contentRef}>
              {commandHistory.map((entry, index) => (
                <div key={index}>
                  <div className={styles.command_line}>
                    <span className={styles.prompt}>$</span>
                    <span>{entry.command}</span>
                  </div>
                  {entry.output.map((output, i) => (
                    <div key={i} className={`${styles.command_output} ${styles[`output_${output.type}`]}`}>
                      {output.content}
                    </div>
                  ))}
                </div>
              ))}
              <div className={styles.command_line}>
                <span className={styles.prompt}>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.command_input}
                  value={cmd}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="Type 'help' for available commands"
                />
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}