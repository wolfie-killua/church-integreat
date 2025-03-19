import { supabase } from '../services/supabaseClient';

const churchDataService = {
  /**
   * Fetch church data from Supabase
   * @returns {Promise} Promise with data or error
   */
  async getChurchData() {
    try {
      // Using the Supabase client method
      const { data, error } = await supabase
        .from('church_data')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching church data:', error);
      return { success: false, error: error.message };
    }
  },
  
  /**
   * Alternative method using fetch API directly
   * @returns {Promise} Promise with data or error
   */
  async fetchChurchDataDirect() {
    try {
      const response = await fetch('https://sojdvxucakmyrdonsigv.supabase.co/rest/v1/church_data', {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvamR2eHVjYWtteXJkb25zaWd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjM5OTkxMCwiZXhwIjoyMDU3OTc1OTEwfQ.m1mk4hwi1M5duDZ1xc1yiqrQAz4JIUdbA6pFTFL_7DU',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching church data directly:', error);
      return { success: false, error: error.message };
    }
  }
};

export default churchDataService;