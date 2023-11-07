export type TimerOptions = {
    title: string,
    workTime: number,
    shortBreakTime: number,
    longBreakTime: number,
    sessionGoal: number,
    sessionDo: number,
    isBreak: boolean,
    sessionStart: boolean,
    stepSession: 'work' | 'short break' | 'long break',

}
  
export type Task = {
    name: string;
    state: 0 | 1 | 2 | number; //0 => to do | 1 => Pending | 2 => Done
    priority: number;
    id: number;
  };