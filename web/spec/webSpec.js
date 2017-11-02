const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    render(){
        return <button>Hello World</button>
    }
}

describe("play round form", function () {
    describe("when play determines the round is invalid", function () {
        it("the user should see 'INVALID'", function () {
            let domFixture = document.createElement("div")
            domFixture.id = "hello"
            document.body.appendChild(domFixture)

            let rps = {
                play(p1, p2, ui){
                    ui.invalid()
                }
            }

            ReactDOM.render(
                <PlayForm rps={rps}/>,
                domFixture
            )

            domFixture.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })

    })
})