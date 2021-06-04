import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challanges from "../../challanges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challange {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
  activeChallange: Challange;
  experienceToNextlevel: number;
  levelUp: () => void;
  startNewChallange: () => void;
  resetChallange: () => void;
  completeChallange: () => void;
  closeLevelUpModal: ()=>void;
}

interface ChallangesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}
export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({
  children,
  ...rest
}: ChallangesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challangesCompleted, setChallangesCompleted] = useState(
    rest.challangesCompleted ?? 0
  );
  const [activeChallange, setActiveChallange] = useState(null);
  const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

  const experienceToNextlevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challangesCompleted", String(challangesCompleted));
  }, [level, currentExperience, challangesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setisLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setisLevelUpModalOpen(false);
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex];

    setActiveChallange(challange);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challange.amount}xp!`,
      });
    }
  }

  function resetChallange() {
    setActiveChallange(null);
  }

  function completeChallange() {
    if (!activeChallange) {
      return;
    }
    const { amount } = activeChallange;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextlevel) {
      finalExperience = finalExperience - experienceToNextlevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallange(null);
    setChallangesCompleted(challangesCompleted + 1);
  }

  return (
    <ChallangesContext.Provider
      value={{
        level,
        currentExperience,
        challangesCompleted,
        activeChallange,
        experienceToNextlevel,
        completeChallange,
        resetChallange,
        levelUp,
        startNewChallange,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallangesContext.Provider>
  );
}
