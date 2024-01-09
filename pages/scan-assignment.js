import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import scanStyles from "./scan.module.css";
import players from "./players.json"
import { useRouter } from "next/navigation";
import { useAmongUsContext } from "../context/main-data";

function ScanAssignment() {
  const [data, setData] = useState("No result");
  const { assignmentCounter, setAssignmentCounter, currentUser, setCurrentUser } = useAmongUsContext();
  const router = useRouter();

  useEffect(() => {
    console.warn(currentUser);
    if(data) {
      const strings = data.split(':');
      if (strings[0] === 'assignment') {
        console.warn(currentUser);
        console.warn(currentUser);
        if(currentUser?.assignmentOrder[assignmentCounter] === strings[1]) {
          setAssignmentCounter(assignmentCounter + 1);
          router.push({pathname: '/player-control', query: {id: strings[1]}});
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
      </div>
  );
}

export default ScanAssignment;