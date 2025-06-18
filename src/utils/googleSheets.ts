import { google } from 'googleapis';

interface GoogleSheetsConfig {
  spreadsheetId: string;
  credentials: {
    client_email: string;
    private_key: string;
  };
}

export class GoogleSheetsService {
  private sheets;
  private spreadsheetId: string;

  constructor(config: GoogleSheetsConfig) {
    const auth = new google.auth.JWT({
      email: config.credentials.client_email,
      key: config.credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = config.spreadsheetId;
  }

  async getBookedDates(): Promise<string[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:A', // Assuming booked dates are in column A
      });

      const values = response.data.values;
      if (!values) return [];

      // Skip header row and convert to YYYY-MM-DD format
      return values.slice(1).map(row => {
        const date = new Date(row[0]);
        return date.toISOString().split('T')[0];
      });
    } catch (error) {
      console.error('Error fetching booked dates:', error);
      throw error;
    }
  }
}

// Usage example:
// const sheetsService = new GoogleSheetsService({
//   spreadsheetId: 'your-spreadsheet-id',
//   credentials: {
//     client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY
//   }
// }); 