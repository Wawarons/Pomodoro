import { User } from "firebase/auth";

export type TimerOptions = {
  title_category: string;
  category_id: number;
  actualTime: number;
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  sessionGoal: number;
  sessionDo: number;
  isBreak: boolean;
  sessionStart: boolean;
  stepSession: "work" | "short break" | "long break";
};

export type Task = {
  title: string;
  status?: 0 | 1 | 2 | number; //0 => to do | 1 => Pending | 2 => Done
  priority?: number;
  id?: number;
};

export type Category = {
  id: number, 
  title: string,
}


interface BaseUser {
    user: User | null;
}