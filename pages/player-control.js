import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import players from "./players.json";
import assignments from "./assignments.json";
import { useState, useEffect } from "react";
import { useAmongUsContext } from "../context/main-data";

export default function Player() {
  const router = useRouter();
  const [killTimer, setKillTimer] = useState(0);
  const [currentAssignment, setCurrentAssignment] = useState(0);
  const [isKilling, setIsKilling] = useState(false);
  const { assignmentCounter, setAssignmentCounter, currentUser, setCurrentUser } = useAmongUsContext();
  const player = players[router.query.id];

  useEffect(() => {
    console.warn(currentUser);
    if (player?.isImpostor && killTimer > 0) {
      var updateTime = setInterval(() => {
        setKillTimer(killTimer - 1);
      }, 1000);
      if (killTimer === 0) {
        setKillTimer(0);
        return;
      }
      return () => clearInterval(updateTime);
    }
  }, [killTimer]);

  const onKillButton = () => {
    if (player?.isImpostor && killTimer === 0) {
      // enable killing Player
      setIsKilling(true);

      setTimeout(() => setIsKilling(false), 2000);

      setKillTimer(100);
    }
  };

  const onReportBodyButton = () => {
    setAssignmentCounter(assignmentCounter + 1);
  };

  const onScanAssignmentButton = () => {
    router.push({pathname: 'scan-assignment'});
  };

  return (
      <div className={styles.container}>
        <p>SPIELE {currentUser?.id}</p>
        <br />
        <p>erledigte Aufgaben: {assignmentCounter}</p>
        <h2>nächste Aufgabe</h2>
        <p>
          {assignments[player?.assignmentOrder[assignmentCounter]]?.location}
        </p>
        <p>
          {assignments[player?.assignmentOrder[assignmentCounter]]?.description}
        </p>
        <button onClick={onScanAssignmentButton} className={styles.card}>
          <h2>Scanne nächste Aufgabe</h2>
          <p>Jede Aufgabe hat einen QR-Code</p>
        </button>
        <div className={styles.controlbar}>
          <button
            onClick={onKillButton}
            className={styles.button}
            disabled={killTimer > 0}
          >
            Kill {killTimer}
          </button>
          <button onClick={onReportBodyButton} className={styles.button}>
            Report Body
          </button>
        </div>
        {isKilling ? <div className={styles.killingOverlay}></div> : null}
      </div>
  );
}
