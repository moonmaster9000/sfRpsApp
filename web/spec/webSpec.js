const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")
const {Round} = require("rps")

class App extends React.Component {
    render (){
        return <div>
            <PlayForm rps={this.props.rps}/>
            <RoundHistory rps={this.props.rps}/>
        </div>
    }
}

class RoundHistory extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount(){
        this.props.rps.getHistory(this)
    }

    noRounds(){
        this.setState({roundsDisplay: "NO ROUNDS"})
    }

    rounds(rs){
        this.setState({roundsDisplay: rs.map(r => `${r.p1Throw} ${r.p2Throw} ${this.translateResult(r.result)}`)})
    }

    translateResult(resultCode){
        return {
            p2: "P2 Wins!"
        }[resultCode]
    }

    render(){
        return <div>
            <ul>{this.state.roundsDisplay}</ul>
        </div>
    }
}

class PlayForm extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    handleSubmit(){
        this.props.rps.play(this.state.p1, this.state.p2, this)
    }
    
    invalid(){
        this.setState({message: "INVALID"})
    }
    
    tie(){
        this.setState({message: "TIE"})
    }

    p1Wins(){
        this.setState({message: "P1 WINS!"})
    }

    p2Wins(){
        this.setState({message: "P2 WINS!"})
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            {this.state.message}
            <input name="p1" onChange={this.handleInput.bind(this)}/>
            <input name="p2" onChange={this.handleInput.bind(this)}/>
            <button onClick={this.handleSubmit.bind(this)}>PLAY</button>
        </div>
    }
}

describe("play round form", function () {
    describe("when play determines the round is invalid", function () {
        beforeEach(function () {
            renderForm({ play(p1, p2, ui){ ui.invalid() }})
        })

        it("the user should see 'INVALID'", function () {
            expect(page()).not.toContain("INVALID")
            submitForm()
            expect(page()).toContain("INVALID")
        })
    })
    
    describe("when play determines the round is tie", function () {
        beforeEach(function () {
            renderForm({ play(p1, p2, ui){ ui.tie() }})
        })

        it("the user should see 'TIE'", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })
    })

    describe("when play determines the round is p1 wins", function () {
        beforeEach(function () {
            renderForm({ play(p1, p2, ui){ ui.p1Wins() }})
        })

        it("the user should see 'P1 WINS!'", function () {
            expect(page()).not.toContain("P1 WINS!")
            submitForm()
            expect(page()).toContain("P1 WINS!")
        })
    })

    describe("when play determines the round is p2 wins", function () {
        beforeEach(function () {
            renderForm({ play(p1, p2, ui){ ui.p2Wins() }})
        })

        it("the user should see 'P2 WINS!'", function () {
            expect(page()).not.toContain("P2 WINS!")
            submitForm()
            expect(page()).toContain("P2 WINS!")
        })
    })

    it("sends the user's input to the rps play method", function () {
        const playSpy = jasmine.createSpy()
        renderForm({play: playSpy})

        fillIn("p1", "foo")
        fillIn("p2", "bar")

        submitForm()

        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
    })

    describe("when no rounds have been played", function () {
        beforeEach(function () {
            renderForm({getHistory(ui) {ui.noRounds()}})
        })

        it("displays 'NO ROUNDS'", function () {
            expect(page()).toContain('NO ROUNDS')
        })
    })

    describe("when rounds have been played", function () {
        beforeEach(function () {
            renderForm({getHistory(ui) {ui.rounds([
                new Round("foo", "bar", "invalid"),
                new Round("rock", "paper", "p2"),
            ])}})
        })

        it("displays the round results", function () {
            expect(page()).toContain("rock")
            expect(page()).toContain("paper")
            expect(page()).toContain("P2 Wins!")
        })
    })

    function fillIn(inputName, inputValue){
        let input = document.querySelector(`[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }


    let domFixture

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        cleanupDOM()
    })

    function cleanupDOM(){
        domFixture.remove()
    }
    
    function setupDOM() {
        domFixture = document.createElement("div")
        document.body.appendChild(domFixture)
    }

    function renderForm(rps) {
        rps.getHistory = rps.getHistory || function(){}
        ReactDOM.render(
            <App rps={rps}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        domFixture.querySelector("button").click()
    }
})