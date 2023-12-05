

exports.randomGiveawayFunction = data => {
    try {
        const shuffledParticipants = shuffleArray([...data]);
        const pairings = createPairings(shuffledParticipants);
        return pairings;
    } catch (e) {
        console.error(e);
        return null;
    }
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createPairings(participants) {
    const pairings = [];

    participants.forEach((participant, index) => {
        const receiverIndex = (index + 1) % participants.length;
        const pairing = {
            giver: participant,
            receiver: participants[receiverIndex],
        };
        pairings.push(pairing);
    });

    return pairings;
}
