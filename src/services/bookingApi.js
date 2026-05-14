/**
 * BOOKING API SERVICE
 * Handles all booking-related API calls to json-server
 * 
 * Person C: This service communicates with our backend (json-server)
 * Endpoints:
 * - GET /bookings - Fetch all bookings
 * - POST /bookings - Create a new booking
 * - DELETE /bookings/:id - Cancel a booking
 * - PUT /events/:id - Update event ticket availability
 */

// Base URL for json-server (running on port 5000)
// Make sure json-server is running with: npm run server
const BOOKINGS_URL = 'http://localhost:5000/bookings';
const EVENTS_URL = 'http://localhost:5000/events';

/**
 * FETCH ALL BOOKINGS
 * Retrieves all bookings from the database
 * Used to display user's booking history
 * 
 * @returns {Array} Array of booking objects
 */
export const fetchBookings = async () => {
  try {
    const response = await fetch(BOOKINGS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * FETCH SINGLE BOOKING BY ID
 * Retrieves a specific booking details
 * Useful for viewing booking confirmation
 * 
 * @param {number|string} id - Booking ID
 * @returns {Object} Booking object
 */
export const fetchBookingById = async (id) => {
  try {
    const response = await fetch(`${BOOKINGS_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching booking ${id}:`, error);
    throw error;
  }
};

/**
 * CREATE NEW BOOKING
 * Saves a new booking to the database
 * 
 * @param {Object} bookingData - Contains booking information
 * @param {number} bookingData.eventId - ID of the event being booked
 * @param {string} bookingData.eventTitle - Title of the event
 * @param {string} bookingData.customerName - Name of the person booking
 * @param {string} bookingData.email - Customer email address
 * @param {number} bookingData.quantity - Number of tickets
 * @param {number} bookingData.totalPrice - Total price for all tickets
 * @param {string} bookingData.specialRequests - Any special requests
 * @param {string} bookingData.bookedAt - Timestamp of booking
 * @param {string} bookingData.status - Booking status (confirmed/pending/cancelled)
 * @returns {Object} The created booking with its new ID
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(BOOKINGS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * DELETE/CANCEL BOOKING
 * Removes a booking from the database
 * Used when user cancels their ticket
 * 
 * @param {number|string} id - Booking ID to cancel
 * @returns {boolean} True if deletion was successful
 */
export const cancelBooking = async (id) => {
  try {
    const response = await fetch(`${BOOKINGS_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error cancelling booking ${id}:`, error);
    throw error;
  }
};

/**
 * FETCH SINGLE EVENT BY ID
 * Retrieves event details for booking reference
 * 
 * @param {number|string} id - Event ID
 * @returns {Object} Event object
 */
export const fetchEventById = async (id) => {
  try {
    const response = await fetch(`${EVENTS_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

/**
 * UPDATE EVENT TICKETS
 * Decreases available tickets when a booking is made
 * This ensures we don't overbook events
 * 
 * @param {number|string} eventId - ID of the event
 * @param {number} availableTickets - New available ticket count
 * @returns {Object} Updated event object
 */
export const updateEventTickets = async (eventId, availableTickets) => {
  try {
    // First, get the current event data
    const eventResponse = await fetch(`${EVENTS_URL}/${eventId}`);
    const event = await eventResponse.json();
    
    // Update the available tickets
    const updatedEvent = {
      ...event,
      availableTickets: availableTickets
    };
    
    // Send the update to the server
    const response = await fetch(`${EVENTS_URL}/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating event tickets:', error);
    throw error;
  }
};

/**
 * GET BOOKINGS FOR SPECIFIC EVENT
 * Retrieves all bookings for a particular event
 * Useful for event organizers to see ticket sales
 * 
 * @param {number|string} eventId - Event ID
 * @returns {Array} Array of bookings for the event
 */
export const getBookingsByEvent = async (eventId) => {
  try {
    const allBookings = await fetchBookings();
    const eventBookings = allBookings.filter(booking => booking.eventId === eventId);
    return eventBookings;
  } catch (error) {
    console.error(`Error fetching bookings for event ${eventId}:`, error);
    throw error;
  }
};

/**
 * CALCULATE TOTAL TICKETS BOOKED FOR AN EVENT
 * Sums up all ticket quantities for a specific event
 * 
 * @param {number|string} eventId - Event ID
 * @returns {number} Total number of tickets booked
 */
export const getTotalTicketsBooked = async (eventId) => {
  try {
    const eventBookings = await getBookingsByEvent(eventId);
    const totalTickets = eventBookings.reduce((sum, booking) => sum + booking.quantity, 0);
    return totalTickets;
  } catch (error) {
    console.error('Error calculating total tickets booked:', error);
    return 0;
  }
};