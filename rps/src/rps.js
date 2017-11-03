function Rps(repo){
    this.playRound = function(p1Throw, p2Throw, ui){
        new PlayRoundRequest(p1Throw, p2Throw, ui, repo).process()
    }

    this.getHistory = function(ui){
        if (repo.isEmpty()){
            ui.noRounds()
        } else {
            ui.rounds(repo.getAll())
        }
    }
}
function Round(p1Throw, p2Throw, result){
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}


function PlayRoundRequest(p1Throw, p2Throw, ui, repo){
    this.process = function(){
        if (invalid(p1Throw) || invalid(p2Throw)){
            processInvalid()
        } else if (tie()){
            processTie()
        } else if (p1Wins()){
            processP1Wins()
        } else {
            processP2Wins()
        }
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

    function save(result) {
        repo.save(new Round(p1Throw, p2Throw, result))
    }

    function processInvalid() {
        ui.invalid()
        save("invalid")
    }

    function processTie() {
        ui.tie()
        save("tie")
    }

    function processP1Wins() {
        ui.p1Wins()
        save("p1")
    }

    function processP2Wins() {
        ui.p2Wins()
        save("p2")
    }
}

module.exports = { Rps, Round }