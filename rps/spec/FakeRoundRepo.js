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

module.exports = FakeRoundRepo