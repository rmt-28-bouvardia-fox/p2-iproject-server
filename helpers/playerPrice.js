
function calculatePrice(rating) {
    let price = 0
    if (rating >= 9) {
        price = 4000
    } else if (rating >= 8.5) {
        price = 3000
    } else if (rating >= 8) {
        price = 2500
    } else if (rating >= 7.5) {
        price = 2000
    } else if (rating >= 7) {
        price = 1500
    } else {
        price = 1000
    }
    return price
}
module.exports = calculatePrice