import { useContext } from "react";
import { ChallangesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/ExperienceBar.module.css";
export function ExperienceBar() {
  const { currentExperience, experienceToNextlevel } =
    useContext(ChallangesContext);
  
    const percentToNextlevel = Math.round((currentExperience*100) / experienceToNextlevel);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextlevel}%` }} />

        <span className={styles.currentExperience} style={{ left: `${percentToNextlevel}%` }}>
          {currentExperience}xp
        </span>
      </div>
      <span>{experienceToNextlevel} xp</span>
    </header>
  );
}
