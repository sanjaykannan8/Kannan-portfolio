"use client"
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "./chrome.module.css";

interface ChromeProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function Chrome({ isVisible, onClose }: ChromeProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        x: Math.max(0, (window.innerWidth - 900) / 2),
        y: Math.max(0, (window.innerHeight - 600) / 2)
      };
    }
    return { x: 0, y: 0 };
  });

  const nodeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (!isVisible) return;
      setPosition({
        x: Math.max(0, (window.innerWidth - 900) / 2),
        y: Math.max(0, (window.innerHeight - 600) / 2)
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
    <div className={styles.chrome_container_outer}>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStop={(e, data) => {
          setPosition({ x: data.x, y: data.y });
        }}
        handle={`.${styles.chrome_header}`}
      >
        <div ref={nodeRef} className={`${styles.chrome_wrapper} ${isClosing ? styles.closing : ''}`}>
          <div className={styles.chrome_container}>
            <div className={styles.chrome_header}>
              <div className={styles.window_controls}>
                <button className={`${styles.control_button} ${styles.close_button}`} onClick={handleClose} />
                <button className={`${styles.control_button} ${styles.minimize_button}`} onClick={handleMinimize} />
                <button className={`${styles.control_button} ${styles.maximize_button}`} />
              </div>
              <div className={styles.address_bar}>
                <span className={styles.secure_icon}>🔒</span>
                <span>kannan-security.portfolio</span>
              </div>
            </div>
            <div className={styles.chrome_content}>
              <div className={styles.portfolio_container}>
                <div className={styles.hero_section}>
                  <h1 className={styles.glitch_text}>KANNAN</h1>
                  <p className={styles.subtitle}>Tech Enthusiast & Security Researcher</p>
                  <p>Exploring the intersection of technology and security</p>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.section_title}>// ABOUT</h2>
                  <p>Tech enthusiast with a deep interest in cybersecurity and software development. 
                     I love exploring new technologies, understanding system architectures, and learning 
                     about security concepts. Currently focusing on web security and secure coding practices.</p>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.section_title}>// INTERESTS</h2>
                  <div className={styles.skill_grid}>
                    <div className={styles.skill_item}>Web Security</div>
                    <div className={styles.skill_item}>Linux Systems</div>
                    <div className={styles.skill_item}>Network Analysis</div>
                    <div className={styles.skill_item}>CTF Challenges</div>
                    <div className={styles.skill_item}>OSINT</div>
                    <div className={styles.skill_item}>Secure Coding</div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.section_title}>// TECH STACK</h2>
                  <div className={styles.skill_grid}>
                    <div className={styles.skill_item}>Python</div>
                    <div className={styles.skill_item}>JavaScript</div>
                    <div className={styles.skill_item}>React</div>
                    <div className={styles.skill_item}>Node.js</div>
                    <div className={styles.skill_item}>Linux</div>
                    <div className={styles.skill_item}>Git</div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.section_title}>// PROJECTS</h2>
                  <p>Check out my GitHub for various security tools and web projects I've been working on. 
                     I enjoy building tools that help in understanding and improving security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
