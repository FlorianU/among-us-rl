import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useAmongUsContext } from "../context/main-data";
import styles from "../styles/Home.module.css";
import scanStyles from "./scan.module.css";

function ScanAssignment() {
  const [data, setData] = useState("No result");
  const [isCorrect, setIsCorrect] = useState(false);
  const { assignmentCounter, setAssignmentCounter, currentUser, setCurrentUser } = useAmongUsContext();
  const router = useRouter();

  useEffect(() => {
    console.warn(currentUser);
    if (data) {
      const strings = data.split(':');
      if (strings[0] === 'assignment') {
        if (currentUser?.assignmentOrder[assignmentCounter] === Number(strings[1])) {
          setAssignmentCounter(assignmentCounter + 1);
          setIsCorrect(true)
          setTimeout(() => router.push({ pathname: '/player-control', query: { id: strings[1] } }), 2000);
        }
      }
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <QrReader className={scanStyles.qrCodeScanner}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }

        }
        }
        //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will 
        // open the front camera
        constraints={{ facingMode: "environment" }}
        style={{ width: '100%', height: '100%' }}
      />
      <p>{data}</p>
      {isCorrect ? <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, height: '100%', width: '100%', backgroundColor: 'green', color: 'white' }}>Correct!</div> : null}
    </div>
  );
}

export default ScanAssignment;