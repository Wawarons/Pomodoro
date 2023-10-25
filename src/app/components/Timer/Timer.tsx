import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/timer.module.css";
import { PiBookOpenTextLight, PiCoffeeLight } from "react-icons/pi";
import { SiBuymeacoffee } from "react-icons/si";
import { TimeContext } from "@/app/TimerContext";

const Timer = () => {
  const context = useContext(TimeContext);

  if (!context)
    throw new Error("ShowTimeComponent must be used within Provider");

  const { timer, updateTimer } = context;
  const [timeLeft, setTimeLeft] = useState<number>(timer.workTime * 60);
  const [stepSession, setStepSession] = useState(timer.stepSession);

  const updateDisplayTime = (step: "work" | "short break" | "long break") => {
    if (step === "work") {
      setTimeLeft(timer.workTime * 60);
    } else if (step === "short break") {
      setTimeLeft(timer.shortBreakTime * 60);
    } else {
      setTimeLeft(timer.longBreakTime * 60);
    }
  };

  //Set up the timer if true launch else stop the timer
  useEffect(() => {
    //If the timer is launch
    if (timer.sessionStart) {
      //Will time not finish && not break
      if (timeLeft && !timer.isBreak) {
        const interval = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(interval);
      } else if (timeLeft === 0) {
        //Else if step of the session is work we add 1 to sessionDo
        if (timer.stepSession === "work") {
          //If not allowable for long break (4 sessions minimum) set short break for the timer.
          if ((timer.sessionDo + 1) % 4 !== 0) {
            setTimeLeft(timer.shortBreakTime * 60);
          } else {
            //Else change state to Long break & set timer with timer.longBreak
            setTimeLeft(timer.longBreakTime * 60);
          }
        } else {
          //Else if is user has finish is break (short or long) set timer with timer.workTime
          setTimeLeft(timer.workTime * 60);
        }
        if (timer.stepSession === "work")
          updateTimer({
            stepSession:
              (timer.sessionDo + 1) % 4 === 0 ? "long break" : "short break",
            sessionDo: timer.sessionDo + 1,
            isBreak: true,
          });
        else updateTimer({ stepSession: "work", isBreak: true });
      }
    } else {
      updateDisplayTime(stepSession);
    }
  }, [timeLeft, timer]);

  function millisToMinutesAndSeconds(secondsLeft: number): {
    minutes: number | string;
    seconds: number | string;
  } {
    let minutes: number = Math.floor(secondsLeft / 60);
    let seconds: number = secondsLeft % 60;
    if (seconds === 60) {
      return {
        minutes: (minutes < 10 ? "0" : "") + minutes + 1,
        seconds: "00",
      };
    } else {
      return {
        minutes: (minutes < 10 ? "0" : "") + minutes,
        seconds: (seconds < 10 ? "0" : "") + seconds,
      };
    }
  }

  return (
    <>
      <div className={style["time-container"]}>
        <div className={style["time-container__title--session"]}>
        <h2>{timer.stepSession}</h2>
          {timer.stepSession === "work" ? (
            <PiBookOpenTextLight />
          ) : timer.stepSession === "short break" ? (
            <PiCoffeeLight />
          ) : (
            <SiBuymeacoffee />
          )}
        </div>
        <div className={style["timer"]}>
          <div>
            <h2 className={style["time-value"]}>
              {millisToMinutesAndSeconds(timeLeft).minutes}
            </h2>
            <h2 className={style["time-value"]}>
              {millisToMinutesAndSeconds(timeLeft).seconds}
            </h2>
          </div>
        </div>
      </div>
      <hr className={style.divider} />
    </>
  );
};

export default Timer;
