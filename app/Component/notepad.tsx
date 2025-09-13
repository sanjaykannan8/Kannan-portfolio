"use client"
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "./notepad.module.css";

interface NotepadProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function Notepad({ isVisible, onClose }: NotepadProps) {
  const [content, setContent] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        x: Math.max(0, (window.innerWidth - 500) / 2),
        y: Math.max(0, (window.innerHeight - 400) / 2)
      };
    }
    return { x: 0, y: 0 };
  });

  const nodeRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isVisible) {
      textareaRef.current?.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (!isVisible) return;
      setPosition({
        x: Math.max(0, (window.innerWidth - 500) / 2),
        y: Math.max(0, (window.innerHeight - 400) / 2)
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVisible]);

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

  if (!isVisible) return null;

  return (
    <div className={styles.notepad_container_outer}>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStop={(e, data) => {
          setPosition({ x: data.x, y: data.y });
        }}
        handle={`.${styles.notepad_header}`}
      >
        <div ref={nodeRef} className={`${styles.notepad_wrapper} ${isClosing ? styles.closing : ''}`}>
          <div className={styles.notepad_container}>
            <div className={styles.notepad_header}>
              <div className={styles.window_controls}>
                <button className={`${styles.control_button} ${styles.close_button}`} onClick={handleClose} />
                <button className={`${styles.control_button} ${styles.minimize_button}`} onClick={handleMinimize} />
              </div>
              <span className={styles.notepad_title}>Untitled - Notepad</span>
            </div>
            <div className={styles.notepad_content}>
              <textarea
                ref={textareaRef}
                className={styles.notepad_textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your notes here..."
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
