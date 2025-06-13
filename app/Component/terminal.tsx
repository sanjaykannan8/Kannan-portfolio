"use client"
import { useState } from "react";
import styles from "./terminal.module.css";

export default function Terminal() {
    const [cmd, setCmd] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCmd(e.target.value);
  }
  return (
    <div>
      <div className={styles.terminal_container}>
        <span className={styles.terminal_title}> Kannan</span>
        <span className={styles.terminal_title1}>@Ubuntu-desktop:~ </span>
        
      </div>
    </div>
  );
}