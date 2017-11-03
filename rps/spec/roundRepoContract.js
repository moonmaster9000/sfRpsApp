const {Round} = require("../src/rps")

function roundRepoContract(roundRepo){
    describe("round repo contract", function () {
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

module.exports = roundRepoContract