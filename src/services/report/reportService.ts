import api from '../api';
import { DownloadResponse } from './types';
import { getFilenameFromHeaders, downloadBlob } from './utils';
import { handleApiError } from '../../utils/errorHandling';
import { showNotification } from '../../utils/notification';

class ReportService {
  private readonly BASE_URL = '/teacher/attendance-report';

  async downloadAttendanceReport(): Promise<void> {
    try {
      const response = await this.fetchReport();
      const filename = getFilenameFromHeaders(response.headers);
      
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] 
      });
      
      downloadBlob(blob, filename);
      showNotification('Report downloaded successfully', 'success');
    } catch (error) {
      handleApiError(error, 'Failed to download report');
      throw error;
    }
  }

  private async fetchReport(): Promise<DownloadResponse> {
    return api.get(this.BASE_URL, {
      responseType: 'blob'
    });
  }
}

export const reportService = new ReportService();