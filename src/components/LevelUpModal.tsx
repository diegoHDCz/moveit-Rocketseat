import { useContext } from "react";
import { ChallangesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallangesContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>2</header>
        <strong>Parabéns</strong>
        <p>Você Alcançou um novo level</p>
        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
