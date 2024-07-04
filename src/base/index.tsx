import * as React from "react"
import classNames from "classnames"
import "./index.css"

const NameSearcherContext = React.createContext<{
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
}>({
    name: "",
    setName: () => {}
})

function NameSearcher() {
    const [name, setName] = React.useState("name")
    return (
        <NameSearcherContext.Provider value={{ name, setName }}>
            <InputField />
            <Response
                title="npm"
                details={[
                    {
                        name: "react",
                        visible: true
                    }, {
                        name: "react-dom",
                        visible: false
                    }
                ]}
            />
        </NameSearcherContext.Provider>
    )
}

function InputField() {
    const context = React.useContext(NameSearcherContext)

    return (
        <div>
            <input
                className="input-field"
                type="text"
                value={context.name}
                onChange={(event) => {
                    context.setName(event.target.value)
                    console.log(event.target.value)
                }}
            />
        </div>
    )
}

function Response(
    {
        title,
        details
    }: {
        title: string
        details: {
            icon?: string,
            name: string,
            visible: boolean
        }[]
    }
) {
    const context = React.useContext(NameSearcherContext)

    const listItems: React.ReactElement[] = []
    for (let i=0; i<details.length; i++) {
        const detail = details[i]
        listItems.push(<li
            className={classNames({
                "response": true,
                "list-items": true,
                "enable": detail.visible,
                "disable": !detail.visible
            })}
            key={i}
        >
            {detail.name + " : " + context.name}
        </li>)
    }


    return (
        <div className="response main">
            <details open>
                <summary className="response summary">{title}</summary>
                {listItems}
            </details>
            <button className="response view-more">View more</button>
        </div>
    )
}

export {
    NameSearcher,
    InputField,
    Response
}