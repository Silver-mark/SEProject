/**
 * Manages high scores for Carrot Quest using localStorage
 * Stores player names and scores, maintaining only top 10
 */

const HIGH_SCORES_KEY = 'carrotQuestHighScores';

/**
 * Retrieves all high scores from storage
 * @returns {Array}
 */
function getHighScores() {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
}

/**
 * Saves high scores to storage
 * @param {Array} scores
 */
function saveHighScores(scores) {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
}

/**
 * Checks if a score qualifies as a high score
 * @param {number} score
 * @returns {boolean}
 */
function isHighScore(score) {
    const scores = getHighScores();
    if (scores.length < 10) return true;
    return score > scores[scores.length - 1].score;
}

/**
 * Adds a new high score if it qualifies
 * @param {string} playerName 
 * @param {number} score 
 * @returns {boolean}
 */
function addHighScore(playerName, score) {
    if (!playerName || !score) return false;
    
    let scores = getHighScores();
    
    // Add new score
    scores.push({
        name: playerName,
        score: score,
        date: new Date().toISOString()
    });
    
    // Sort scores in descending order
    scores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    scores = scores.slice(0, 10);
    
    saveHighScores(scores);
    return true;
}

/**
 * Displays high scores in the specified element
 * @param {string} elementId 
 */
function displayHighScores(elementId = 'highScoresList') {
    const highScoresList = document.getElementById(elementId);
    if (!highScoresList) return;
    
    const scores = getHighScores();
    
    if (scores.length === 0) {
        highScoresList.innerHTML = '<li>No high scores yet!</li>';
        return;
    }
    
    highScoresList.innerHTML = scores
        .map((score, index) => `
            <li>${index + 1}. ${score.name} - ${score.score}</li>
        `)
        .join('');
}

/**
 * Handles the submission of a new high score
 * @param {string} playerName 
 * @param {number} score 
 * @returns {Object} 
 */
function submitHighScore(playerName, score) {
    if (!playerName || !score) {
        return { success: false, message: 'Invalid name or score' };
    }
    
    if (!isHighScore(score)) {
        return { success: false, message: 'Score too low for leaderboard' };
    }
    
    const success = addHighScore(playerName, score);
    return {
        success,
        message: success ? 'Score submitted successfully!' : 'Failed to submit score'
    };
}

// Export functions for use in main game
window.HighScores = {
    isHighScore,
    submitHighScore,
    displayHighScores,
    getHighScores
};