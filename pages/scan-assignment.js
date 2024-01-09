import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import scanStyles from "./scan.module.css";
import players from "./players.json"
import { useRouter } from "next/navigation";

function ScanAssignment() {
  const [data, setData] = useState("No result");
  const router = useRouter();

  useEffect(() => {
    if(data) {
      const strings = data.split(':');
      if (strings[0] === 'assignment') {
        
        router.push({pathname: '/player-control', query: {id: strings[1]}});
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

export default Scan;