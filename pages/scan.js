import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import scanStyles from "./scan.module.css";

function Scan() {
  const [data, setData] = useState("No result");

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default Scan;