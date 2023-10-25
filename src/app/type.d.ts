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