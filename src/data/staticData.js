import { artikelData } from './artikelData.js';
import { permainanData } from './permainanData.js';

// Export artikel and permainan data
export { artikelData, permainanData };

// Helper function to get artikel by id
export const getArtikelById = (id) => {
  return artikelData.find(artikel => artikel.id === id);
};

// Helper function to get permainan by id
export const getPermainanById = (id) => {
  return permainanData.find(permainan => permainan.id === id);
};

// Helper function to get artikel by category
export const getArtikelByCategory = (category) => {
  if (category === 'All' || !category) {
    return artikelData;
  }
  return artikelData.filter(artikel => artikel.category === category);
};
