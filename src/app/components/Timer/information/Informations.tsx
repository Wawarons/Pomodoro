import React from "react";
import Image from "next/image";
import style from "./informations.module.css";

/**
 * Informations component
 * Describe the Pomodoro method.
 * @returns JSX eLements
 */
const Informations = () => {
    

  return (
    <div className={style["informations-container"]}>
      <h2 className={style["informations-container__title"]}>
        Fonctionnement Pomodoro
      </h2>
      <p>
        La technique Pomodoro est une méthode de gestion du temps efficace qui
        se base sur la division de la charge de travail en intervalles de temps
        définis, appelés "Pomodoro" en référence à l'horloge de cuisine en forme
        de tomate 🍅 que le créateur de la méthode utilisait.
      </p>
      <p>
      Le principe fondamental est de travailler pendant une durée définie ⌛, avec des valeurs par défaut de 25 minutes de travail suivies de 5 minutes de pause, mais ces valeurs peuvent être ajustées en fonction de vos préférence. 
      </p>
      <p>Ce cycle de travail intense suivi de courtes pauses vise à améliorer la concentration en évitant les distractions et la procrastination. Après avoir complété quatre cycles Pomodoro, vous pouvez prendre une pause plus longue d'environ 15 à 30 minutes pour vous détendre ☕.
      </p>
      
      <div className={style['informations-container__support']}>
      <h4>Bonne séance</h4>
      <Image src="/images/fox_informations.webp" alt="fox with a book" width={65} height={65} />
      </div>
      
    </div>
  );
};

export default Informations;
