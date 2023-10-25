import React, { ChangeEvent, ChangeEventHandler, FormEventHandler } from "react";
import style from "@/app/styles/music.module.css";

const MusicComponent = () => {

  return (
    <div className={style["music-container"]}>
      <iframe
        width="100%"
        height="75"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1711072947%3Fsecret_token%3Ds-h6fYEhHu4b8&bg_color=754FB8&color=754FB8&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true"
      ></iframe>
      <div style={{fontSize: '10px', color: '#754FB8', lineBreak: 'anywhere',  wordBreak: 'normal',overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: 100, borderRadius: '10px'}}>
        <a
          href="https://soundcloud.com/adrien-104332353"
          title="wawarons"
          target="_blank"
          style={{color: '#754FB8', textDecoration: 'none'}}
        >
          wawarons
        </a>{" "}
        ·{" "}
        <a
          href="https://soundcloud.com/adrien-104332353/sets/lofi/s-h6fYEhHu4b8"
          title="lofi"
          target="_blank"
          style={{color: '#754FB8', textDecoration: 'none'}}
        >
          lofi
        </a>
      </div>
    </div>
  );
};

export default MusicComponent;
