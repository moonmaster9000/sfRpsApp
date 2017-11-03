const {Rps, Round} = require("../src/rps")


describe("history", function () {
    describe("no one has played", function () {
        it("should tell the UI there are no rounds", function () {
            let ui = jasmine.createSpyObj("ui", ["noRounds"])

            new Rps().getHistory(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    fdescribe("given rounds have been played", function () {
        it("should send the round results to the UI", function () {
            let rps = new Rps()
            let historyUISpy = jasmine.createSpyObj("historyUISpy", ["rounds"])
            let ui = {invalid(){}}
            let repo = {
                isEmpty(){},
                getAll(){},
                save(){}
            }

            rps.playRound("rock", "sailboat", ui, repo)

            rps.getHistory(historyUISpy, repo)

            expect(historyUISpy.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid")
            ])
        })

    })
})