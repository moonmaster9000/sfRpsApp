function Rps(){
    this.playRound = function(p1Throw, p2Throw, ui){
        new PlayRoundRequest(p1Throw, p2Throw, ui).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, ui){
    this.process = function(){
        if (invalid(p1Throw) || invalid(p2Throw))
            ui.invalid()
        else if (tie())
            ui.tie()
        else if (p1Wins())
            ui.p1Wins()
        else
            ui.p2Wins()
    }

    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    const validThrows = [ROCK, PAPER, SCISSORS]

    function invalid(t) {
        return !validThrows.includes(t)
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return p1Throw === ROCK     && p2Throw === SCISSORS ||
            p1Throw === PAPER    && p2Throw === ROCK     ||
            p1Throw === SCISSORS && p2Throw === PAPER
    }
}

module.exports = Rps