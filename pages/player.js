import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import players from "./players.json"
import { useState, useEffect } from 'react'


export default function Player(props) {
  const router = useRouter()
  const [timer, setTimer] = useState(20);


  useEffect(() => {
    var updateTime = setInterval(() => {
      setTimer(timer -1);
    }, 1000);
    if(timer === 0) {
      router.push({pathname: 'player-control', query: {id: router.query.id}})
    }
    return () => clearInterval(updateTime)
  }, [timer]);
  
  return (
    <div className={styles.container}>
      <p>Sichtbar: {timer}</p>
      <br/>    
      <p>{players[router.query.id]?.id}</p>    
      <p>{players[router.query.id]?.isImpostor ? 'IMPOSTOR' : 'UNSCHULDIG'}</p>    
    </div>
  )
}