
import removeAccents from "remove-accents";

export const createSlug = (str) => {
  return removeAccents(str.trim()) 
    .toLowerCase()
    .replace(/\s+/g, "-"); 
};


export const getLastName = (str) => {
  const words = str.trim().split(' '); 
  return words[words.length - 1]; 
};

export const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString('vi-VN'); 

  const formattedTime = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });

  return `${formattedDate}, ${formattedTime}`;
}

export const formatCurrency = (curr) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(curr);
}