const {Rps, Round} = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let repo, rps

    beforeEach(function () {
        repo = new FakeRoundRepo()
        rps = new Rps(repo)
    })

    describe("no one has played", function () {
        it("should tell the UI there are no rounds", function () {
            let ui = jasmine.createSpyObj("ui", ["noRounds"])

            rps.getHistory(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    describe("given rounds have been played", function () {
        it("should send the round results to the UI", function () {
            let historyUISpy = jasmine.createSpyObj("historyUISpy", ["rounds"])
            let ui = {invalid(){}, tie(){}, p1Wins(){}, p2Wins(){}}

            rps.playRound("rock", "sailboat", ui)
            rps.playRound("rock", "rock", ui)
            rps.playRound("rock", "paper", ui)
            rps.playRound("paper", "rock", ui)

            rps.getHistory(historyUISpy)

            expect(historyUISpy.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid"),
                new Round("rock", "rock", "tie"),
                new Round("rock", "paper", "p2"),
                new Round("paper", "rock", "p1")
            ])
        })
    })
})