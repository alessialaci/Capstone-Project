import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timer$ = new BehaviorSubject<number>(0);
  private timerScadutoSource = new Subject<number>();
  public timerScaduto$ = this.timerScadutoSource.asObservable();

  constructor() { }

  startTimer(duration: number): void {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const timerId = setTimeout(() => {
      this.timer$.next(0);
      clearTimeout(timerId);
    }, duration);

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, endTime - Date.now());
      const timeLeft = remainingTime > 0 ? remainingTime : 0;
      this.timer$.next(timeLeft);
      if (remainingTime <= 0) {
        clearTimeout(timerId);
        clearInterval(intervalId);
      }
    }, 1000);
  }

  getTimer() {
    return this.timer$.asObservable();
  }

  emitTimerScaduto(operaId: number): void {
    this.timerScadutoSource.next(operaId);
  }

}
