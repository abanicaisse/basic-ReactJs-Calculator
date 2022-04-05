import react from "react"

const Screen = ({inputScreen, outputScreen, operation}) => {
    return (
        <div className="screen">
            <div className="output">
                <p className="output__field">{outputScreen} {operation}</p>
            </div>
            <div className="input">
                <p className="input__field">{inputScreen}</p>
            </div>
        </div>
    )
}

export default Screen