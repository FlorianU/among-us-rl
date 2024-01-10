import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAmongUsContext } from "../context/main-data";
import styles from "../styles/Home.module.css";
import assignments from "./assignments.json";

export default function Player() {
  const router = useRouter();
  const [killTimer, setKillTimer] = useState(0);
  const [currentAssignment, setCurrentAssignment] = useState(0);
  const [isKilling, setIsKilling] = useState(false);
  const { assignmentCounter, setAssignmentCounter, currentUser, setCurrentUser } = useAmongUsContext();

  useEffect(() => {
    console.warn(currentUser?.assignmentOrder.length);
    console.warn(assignmentCounter);
    if (currentUser?.isImpostor && killTimer > 0) {
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
    if (currentUser?.isImpostor && killTimer === 0) {
      // enable killing Player
      setIsKilling(true);

      setTimeout(() => setIsKilling(false), 2000);

      setKillTimer(100);
    }
  };

  const onReportBodyButton = () => {
    // report body
  };

  const onResetButton = () => {
    router.push({ pathname: '/' });
  };

  const onScanAssignmentButton = () => {
    router.push({ pathname: 'scan-assignment' });
  };

  return (
    <div className={styles.container}>
      <div
          className={styles.button} style={{padding: 5, marginBottom: 20}} onClick={() => { if (window.confirm('Bist du sicher, dass du alles zurück setzen willst?')) onResetButton() } }>App zurücksetzen</div>

      <p>erledigte Aufgaben: {assignmentCounter}</p>
      {currentUser?.assignmentOrder?.length === assignmentCounter ? 
      <div>
        <h2>Alle Aufgaben abgeschlossen</h2>
        <p>lasse dich jetzt nicht umbringen!</p>
      </div>
      :
      <>
      <h2>nächste Aufgabe</h2>
      <p>
        Ort:       <br />
        {assignments[currentUser?.assignmentOrder[assignmentCounter]]?.location}
      </p>
      <p>
        Beschreibung:       <br />
        {assignments[currentUser?.assignmentOrder[assignmentCounter]]?.description}
      </p>
      </>
      }
      <br />
      <button onClick={onScanAssignmentButton} disabled={currentUser?.assignmentOrder?.length === assignmentCounter} className={styles.button}>
        <h3>Scanne nächste Aufgabe</h3>
        <p>Jede Aufgabe hat einen QR-Code</p>
      </button>
      <div className={styles.controlbar}>
        <button
          onClick={onKillButton}
          className={styles.button}
          disabled={killTimer > 0}
          style={{ width: '30%' }}
        >
          Kill {killTimer}
        </button>
        {/* <button onClick={onReportBodyButton} className={styles.button}
          style={{ width: '30%' }}>
          Report Body
        </button> */}
        <a href="https://wa.link/mpv2sy" target="_blank" className={styles.button}
          style={{ width: '30%' }}>
          Report Body
        </a>
      </div>
      {isKilling ? <div className={styles.killingOverlay}></div> : null}
    </div>
  );
}
