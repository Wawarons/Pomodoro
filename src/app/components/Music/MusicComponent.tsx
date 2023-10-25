import React from "react";
import Image from "next/image";
import style from "@/app/styles/music.module.css";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
const MusicComponent = () => {
  return (
    <div className={style["music-container"]}>
      <div className={style['music-container__informations']}>
            <h5>David Guetta</h5>
            <p>Titanium</p>
        </div>
      <div className={style['music-container__footer']}>
        <div className={style["music-container__progress-bar"]}></div>
      </div>
      <div className={style["music-container__music-controls"]}>
        <TbPlayerTrackPrevFilled />
        { true ? <TbPlayerPlayFilled />:<TbPlayerStopFilled />}
        <TbPlayerTrackNextFilled />
      </div>
    </div>
  );
};

export default MusicComponent;
