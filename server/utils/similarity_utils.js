const axios = require('axios');


async function getSimilarityScores(candidatesData,expertsData) {
    try {
        const response = await axios.post('http://localhost:5000/get-similarity-scores', {
            candidates_data: candidatesData,
            experts_data: expertsData
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching similarity scores: ${error.message}`);
        throw error;
    }
}

module.exports = { getSimilarityScores };
