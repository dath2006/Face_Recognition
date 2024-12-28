import { NotificationType, NotificationOptions } from './types';

const DEFAULT_OPTIONS: NotificationOptions = {
  duration: 3000,
  position: 'top-right'
};

class NotificationService {
  show(message: string, type: NotificationType = 'info', options: NotificationOptions = {}): void {
    const finalOptions = { ...DEFAULT_OPTIONS, ...options };
    
    // For now, using console and alert, but this can be replaced with a proper notification library
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Create a styled div for notification
    const notification = document.createElement('div');
    notification.className = this.getNotificationClasses(type);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after duration
    setTimeout(() => {
      notification.remove();
    }, finalOptions.duration);
  }
  
  private getNotificationClasses(type: NotificationType): string {
    const baseClasses = 'fixed p-4 rounded-md shadow-lg transform transition-all duration-300';
    const typeClasses = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
      warning: 'bg-yellow-500 text-white'
    };
    
    return `${baseClasses} ${typeClasses[type]} top-4 right-4`;
  }
}

export const notificationService = new NotificationService();