import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import players from "./players.json"
import assignments from "./assignments.json"
import { useState, useEffect } from 'react'


export default function Player() {
  const router = useRouter()
  const [killTimer, setKillTimer] = useState(0);
  const [currentAssignment, setCurrentAssignment] = useState(0);
  const [assignmentCounter, setAssignmentCounter] = useState(0);
  const player = players[router.query.id];

  useEffect(() => {
    if(player?.isImpostor) {

      var updateTime = setInterval(() => {
        setKillTimer(killTimer -1);
      }, 1000);
      if(killTimer === 0) {
        setKillTimer(0);
        return;
      }
      return () => clearInterval(updateTime)
    }
  }, [killTimer]);
    
  return (
    <div className={styles.container}>
      <p>SPIELE</p>
      <br/>    
      <p>erledigte Aufgaben: {assignmentCounter}</p>    
      <h2>nächste Aufgabe</h2>
      <p>{assignments[player?.assignmentOrder[assignmentCounter]]?.location}</p>    
      <p>{assignments[player?.assignmentOrder[assignmentCounter]]?.description}</p> 
      <a href="/scan" className={styles.card}>
        <h2>Scanne aufgabe</h2>
        <p>Scanne QR-Code am Ort der Aufgabe</p>
      </a>
      <div className={styles.controlbar}>
        <button className={styles.button} disabled={killTimer > 0}>Kill {killTimer}</button>
        <button className={styles.button}>Report Body</button>
      </div>
    </div>
  )
}