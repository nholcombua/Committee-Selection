import mitt from 'mitt';

// Create a new event bus using Mitt
const eventBus = mitt();

// Export the event bus so it can be imported and used in other files
export default eventBus;
