export function vibrate(ms = 10) {
    if ('vibrate' in navigator) {
      navigator.vibrate(ms);
    }
  }