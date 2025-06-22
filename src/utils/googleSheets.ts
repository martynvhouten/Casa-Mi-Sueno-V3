export interface BookedDate {
  geboekte_datum: Date;
}

interface SheetResponse {
  values: string[][];
}

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const RANGE = 'A:A'; // Simplified range format

/**
 * Parses a date string from various formats
 * Handles YYYY-MM-DD, DD-MM-YYYY, and Google Sheets date serial numbers
 */
function parseDate(dateStr: string): Date | null {
  // Try parsing as DD-MM-YYYY, which is the primary expected format.
  const parts = dateStr.split(/[-/]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Basic validation to ensure parts are within a reasonable range
    if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 2000) {
      const date = new Date(Date.UTC(year, month - 1, day));
      // Verify that the created date matches the input parts to avoid invalid dates rolling over.
      if (date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day) {
        return date;
      }
    }
  }

  // Fallback for YYYY-MM-DD
  if (parts.length === 3 && parseInt(parts[0], 10) > 2000) {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
          // Adjust for timezone offset to get UTC date
          date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
          return date;
      }
  }

  // Fallback for Google Sheets date serial numbers
  const serialNumber = parseFloat(dateStr);
  if (!isNaN(serialNumber)) {
    // Google Sheets dates are number of days since December 30, 1899, in UTC.
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const date = new Date(excelEpoch.getTime() + serialNumber * 24 * 60 * 60 * 1000);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  console.warn(`Could not parse date: ${dateStr}`);
  return null;
}

/**
 * Fetches booked dates from a public Google Sheet
 * Sheet must be publicly viewable and have 'geboekte_datum' as column header
 * Handles various date formats including YYYY-MM-DD, DD-MM-YYYY, and Google Sheets serial numbers
 */
export async function fetchBookedDates(): Promise<BookedDate[]> {
  if (!SHEET_ID || !API_KEY) {
    console.error('Missing Google Sheets configuration. Please check your .env file for VITE_GOOGLE_SHEET_ID and VITE_GOOGLE_API_KEY');
    return [];
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    const response = await fetch(url);
    const responseText = await response.text();

    if (!response.ok) {
      console.error('Google Sheets API Error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseText
      });
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }

    const data: SheetResponse = JSON.parse(responseText);
    
    if (!data.values || data.values.length === 0) {
      console.warn('No data found in sheet');
      return [];
    }

    // Skip the header row and map the remaining rows
    const [header, ...rows] = data.values;
    
    // Validate header
    if (!header || !header[0] || header[0].toLowerCase() !== 'geboekte_datum') {
      console.error('Invalid sheet format. First cell should contain "geboekte_datum"');
      throw new Error('Invalid sheet format: missing geboekte_datum column');
    }

    // Map rows to BookedDate objects, filtering out invalid dates
    const bookedDates = rows
      .map(row => {
        if (!row[0]) {
          console.warn('Empty row found');
          return null;
        }
        
        const date = parseDate(row[0]);
        if (!date) {
          console.warn(`Invalid date found in sheet: ${row[0]}`);
          return null;
        }

        // Normalize to midnight UTC
        date.setUTCHours(0, 0, 0, 0);
        
        return {
          geboekte_datum: date
        };
      })
      .filter((date): date is BookedDate => date !== null);

    return bookedDates;
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    if (import.meta.env.DEV) {
      // Return mock data in development
      const mockDates = [];
      for (let i = 15; i <= 20; i++) {
        const date = new Date(2024, 6, i); // July 15-20, 2024
        date.setUTCHours(0, 0, 0, 0);
        mockDates.push({ geboekte_datum: date });
      }
      console.log('Using mock data:', mockDates);
      return mockDates;
    }
    return [];
  }
}

/**
 * Example usage in a component:
 * 
 * import { ref, onMounted } from 'vue';
 * import { fetchBookedDates } from '@/utils/googleSheets';
 * 
 * const bookedDates = ref<Date[]>([]);
 * 
 * onMounted(async () => {
 *   try {
 *     const dates = await fetchBookedDates();
 *     bookedDates.value = dates.map(d => d.geboekte_datum);
 *   } catch (error) {
 *     console.error('Failed to fetch booked dates:', error);
 *   }
 * });
 */ 