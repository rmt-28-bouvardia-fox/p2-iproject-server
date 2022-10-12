
function calculateScore(ratingT, ratingO) {
    let scoreO = 0
    let scoreT = 0
    let result = ""
    if (ratingO > ratingT) {
        scoreO = Math.floor(Math.random() * 4)
        scoreT = Math.floor(Math.random() * 2)
    } else if (ratingO < ratingT) {
        scoreO = Math.floor(Math.random() * 2)
        scoreT = Math.floor(Math.random() * 4)
    } else {
        scoreO = Math.floor(Math.random() * 3)
        scoreT = Math.floor(Math.random() * 3)
    }

    if (scoreO > scoreT) {
        result = "lose"
    } else if (scoreO < scoreT) {
        result = 'win'
    } else {
        result = 'tie'
    }
    return {result, score:`${scoreO}-${scoreT}`}
}

module.exports = calculateScore