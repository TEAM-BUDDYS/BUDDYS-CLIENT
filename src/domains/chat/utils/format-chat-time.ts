export const formatChatTime = (date: Date | string) => {
  const targetDate = new Date(date);

  if (Number.isNaN(targetDate.getTime())) {
    return '';
  }

  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();

  const period = hours < 12 ? '오전' : '오후';
  const hour = hours % 12 || 12;

  return `${period} ${hour}:${minutes.toString().padStart(2, '0')}`;
};
