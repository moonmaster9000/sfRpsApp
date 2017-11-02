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

describe("play Round", function () {
    let rps

    beforeEach(function () {
        rps = new Rps()
    })

    describe("p1 win scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p1Wins"])
        })

        it("rock v scissors", function () {
            rps.playRound("rock", "scissors", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            rps.playRound("paper", "rock", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            rps.playRound("scissors", "paper", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })
    })

    describe("p2 win scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p2Wins"])
        })

        it("scissors v rock", function () {
            rps.playRound("scissors", "rock", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            rps.playRound("rock", "paper", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            rps.playRound("paper", "scissors", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rps.playRound("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.playRound("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.playRound("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })


    describe("invalid throws", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. [invalid throw]", function () {
            rps.playRound("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid throw v. rock", function () {
            rps.playRound(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid v. same invalid", function () {
            rps.playRound("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })
})