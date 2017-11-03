const {Rps, Round} = require("../src/rps")


describe("history", function () {
    describe("no one has played", function () {
        it("should tell the UI there are no rounds", function () {
            let ui = jasmine.createSpyObj("ui", ["noRounds"])

            new Rps().getHistory(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    describe("given rounds have been played", function () {
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

function FakeRoundRepo(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(round){
        rounds.push(round)
    }

    this.getAll = function(){
        return rounds
    }

}

function roundRepoContract(roundRepo){
    fdescribe("round repo contract", function () {
        let repo

        beforeEach(function () {
            repo = new roundRepo()
        })

        describe("no rounds have been saved", function () {
            it("is empty", function () {
                expect(repo.isEmpty()).toBe(true)
            })
        })

        describe("rounds have been saved", function () {
            let round

            beforeEach(function () {
                round = new Round()
                repo.save(round)
            })

            it("is not empty", function () {
                expect(repo.isEmpty()).toBe(false)
            })

            it("returns all rounds saved", function () {
                expect(repo.getAll()).toContain(round)
            })
        })
    })
}

roundRepoContract(FakeRoundRepo)