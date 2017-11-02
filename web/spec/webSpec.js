const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    handleSubmit(){
        this.setState({message: "INVALID"})
    }

    render(){
        return <div>
            {this.state.message}
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
        ReactDOM.render(
            <PlayForm rps={rps}/>,
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