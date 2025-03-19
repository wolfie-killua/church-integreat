import { supabase } from '../services/supabaseClient';

// API service for updating church data (POST/PUT operations)
const churchPostAPI = {

  // Book a specific event by its package ID
  async bookEvent(packageId, bookedBy = 'EVENT TRIBE') {
    try {
      const { error } = await supabase
        .from('church_data')
        .update({ 
          status: 'Booked',
          book_by: bookedBy 
        })
        .eq('package_id', packageId);
      
      if (error) {
        throw new Error(`Error booking event: ${error.message}`);
      }
      
      return { success: true, error: null };
    } catch (error) {
      console.error('API Error - bookEvent:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Create a new event - contains its own logic for getting next ID
  async createEvent(eventData) {
    try {
      // Get the next package ID - duplicated here to avoid dependency
      const { data: existingData, error: nextIdError } = await supabase
        .from('church_data')
        .select('package_id')
        .order('package_id', { ascending: false })
        .limit(1);
      
      if (nextIdError) {
        throw new Error(`Failed to get next package ID: ${nextIdError.message}`);
      }
      
      // Calculate next package ID
      const nextId = existingData && existingData.length > 0 
        ? existingData[0].package_id + 1 
        : 1;
      
      // Insert new record
      const { error: insertError } = await supabase
        .from('church_data')
        .insert([
          {
            package_id: nextId,
            priest_name: eventData.priestName.trim(),
            church_venue: eventData.churchVenue.trim(),
            available_date: eventData.availableDate,
            status: 'Available',
            book_by: null
          }
        ]);
      
      if (insertError) {
        throw new Error(`Failed to create event: ${insertError.message}`);
      }
      
      return { 
        success: true, 
        packageId: nextId, 
        error: null 
      };
    } catch (error) {
      console.error('API Error - createEvent:', error);
      return { success: false, packageId: null, error: error.message };
    }
  }
};

export default churchPostAPI;