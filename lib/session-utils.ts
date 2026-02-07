export const getSessionStatus = (slotDate: string, startTime: string, endTime: string) => {
  const now = new Date();
  const sessionDate = new Date(slotDate);
  

  const [sHours, sMinutes] = startTime.split(':').map(Number);
  const start = new Date(sessionDate).setHours(sHours, sMinutes, 0, 0);
  
  const [eHours, eMinutes] = endTime.split(':').map(Number);
  const end = new Date(sessionDate).setHours(eHours, eMinutes, 0, 0);

  const FIVE_MINUTES = 5 * 60 * 1000;
  
  const isReady = now.getTime() >= (start - FIVE_MINUTES);
  const isPast = now.getTime() > end;

  return {
    isReady: isReady && !isPast,
    isUpcoming: !isReady,
    isPast: isPast
  };
};