const getNewRating = (oldRating, ratingCount, rating) =>{
    const number = ((oldRating*ratingCount + rating)/(ratingCount+1));
    const newRating = Number(number.toFixed(2));
    return newRating;
}

module.exports = {getNewRating};