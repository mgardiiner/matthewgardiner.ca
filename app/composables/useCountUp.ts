type CountUpStat = { target: number; display: number };

export function useCountUp(stats: CountUpStat[], baseDelay = 300, stagger = 100) {
  function start() {
    const duration = 1400;
    const step = 16;
    stats.forEach((stat, idx) => {
      setTimeout(() => {
        const increment = stat.target / (duration / step);
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            stat.display = stat.target;
            clearInterval(interval);
          } else {
            stat.display = Math.floor(current);
          }
        }, step);
      }, baseDelay + idx * stagger);
    });
  }

  return { start };
}
