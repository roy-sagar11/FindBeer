export const calculateRating = (reviews) => {
  if (!reviews?.length) {
    return "Not available";
  }
  const total = reviews.reduce((prev, current) => prev + current.rating, 0);
  return `${(total / reviews.length).toFixed(1)} / 5 (
    ${reviews.length} reviews)`;
};
