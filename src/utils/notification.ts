type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const showNotification = (message: string, type: NotificationType = 'info') => {
  // For now, we'll use console and alert, but this can be replaced with a proper notification library
  console.log(`[${type.toUpperCase()}] ${message}`);
  alert(message);
};