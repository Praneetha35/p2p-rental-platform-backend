// In-memory database
const items = [];
let itemId = 1; // Auto-increment ID for items

/**
 * Add an item to the database.
 * This API allows users to add a new item available for rent.
 * @param {Request} req
 * @param {Response} res
 */
exports.addItem = (req, res) => {
  const { name, description, pricePerDay, availability } = req.body;

  if (!name || pricePerDay === undefined || availability === undefined) {
    return res.status(400).json({ error: 'Missing required fields: name, pricePerDay, or availability' });
  }

  const newItem = {
    id: itemId++, // Auto-generate a unique ID for each item
    name,
    description: description || '', // Optional description
    pricePerDay: parseFloat(pricePerDay), // Ensure the pricePerDay is stored as a number
    availability: !!availability, // Convert to boolean to ensure consistency
    rentals: [], // Array to store rental history
  };

  items.push(newItem); // Add the item to the database
  res.status(201).json(newItem);
};

/**
 * Search for items based on name or pricePerDay range.
 * This API helps users find items available for rent.
 * @param {Request} req
 * @param {Response} res
 */
exports.searchItems = (req, res) => {
  const { name, minPrice, maxPrice } = req.query;

  let filteredItems = items.filter(item => item.availability); // Only available items are returned

  // Filter items by name
  if (name) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter items by pricePerDay range
  if (minPrice) {
    filteredItems = filteredItems.filter(item => item.pricePerDay >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredItems = filteredItems.filter(item => item.pricePerDay <= parseFloat(maxPrice));
  }

  res.status(200).json(filteredItems);
};

/**
 * Search for items based on name or pricePerDay range.
 * This API helps users find items available for rent.
 * @param {Request} req
 * @param {Response} res
 */
exports.listAllItems = (req, res) => {
  res.status(200).json(items);
};

/**
 * Rent an item for a specific date range.
 * This API allows users to rent an item if it is available and no date conflict exists.
 * @param {Request} req
 * @param {Response} res
 */
exports.rentItem = (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }

  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  if (!item.availability) {
    return res.status(400).json({ error: 'Item is currently unavailable' });
  }

  // Check for overlapping rental dates
  const isOverlapping = item.rentals.some(rental =>
    (startDate <= rental.endDate && endDate >= rental.startDate)
  );

  if (isOverlapping) {
    return res.status(400).json({ error: 'Item is already rented for the selected dates' });
  }

  // Add the rental and mark the item as unavailable
  item.rentals.push({ startDate, endDate });
  item.availability = false;

  res.status(200).json({ message: 'Item rented successfully', item });
};

/**
 * Return an item and mark it as available again.
 * This API allows users to return an item after use.
 * @param {Request} req
 * @param {Response} res
 */
exports.returnItem = (req, res) => {
  const { id } = req.params;

  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  if (item.availability) {
    return res.status(400).json({ error: 'Item is already available' });
  }

  // Mark the item as available
  item.availability = true;

  res.status(200).json({ message: 'Item returned successfully', item });
};

/**
 * View the rental history of an item.
 * This API shows the rental dates for a specific item.
 * @param {Request} req
 * @param {Response} res
 */
exports.viewRentalHistory = (req, res) => {
  const { id } = req.params;

  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.status(200).json({ rentals: item.rentals });
};

/**
 * Delete an item from the database.
 * This API allows users to remove an item from the list permanently.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  const itemIndex = items.findIndex(item => item.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(itemIndex, 1); // Remove the item from the database
  res.status(200).json({ message: 'Item deleted successfully' });
};