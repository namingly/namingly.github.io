import * as React from "react"
import classNames from "classnames"
import "./index.css"


const NameSearcherContext = React.createContext<{
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
}>({
    name: "",
    setName: () => { }
})

function NameSearcher() {
    const [name, setName] = React.useState("name")
    return (
        <NameSearcherContext.Provider value={{ name, setName }}>
            <InputField />
            <ResponseGroup
                title="npm"
                details={[
                    {
                        name: "react",
                        visible: true,
                        abbreviate: false
                    }, {
                        name: "react-dom",
                        visible: false,
                        abbreviate: false
                    },
                    {
                        name: "@types/react",
                        visible: true,
                        abbreviate: true
                    }, {
                        name: "@types/react-dom",
                        visible: false,
                        abbreviate: true
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
                }}
            />
        </div>
    )
}

function Response(
    {
        //icon,
        name,
        visible,
        abbreviate
    }: {
        icon?: string,
        name: string,
        visible: boolean,
        abbreviate: boolean
    }
) {
    return (
        <li
            className={classNames({
                "response": true,
                "enable": visible,
                "disable": !visible,
                "abbreviate": abbreviate
            })}
        >
            {name + " : " + name}
        </li>
    )
}

function ResponseGroup(
    {
        title,
        details
    }: {
        title: string
        details: {
            icon?: string,
            name: string,
            visible: boolean,
            abbreviate: boolean
        }[]
    }
) {
    //const context = React.useContext(NameSearcherContext)

    const listItems: [
        [
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>
        ],
        React.ReactElement
    ][] = [];
    let abbreviateListItems: [
        [
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>
        ],
        React.ReactElement
    ][] = [];
    for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        const listItemState = React.useState(detail.abbreviate);
        listItems[i] = [
            listItemState,
            (<Response
                //icon={detail.icon}
                name={detail.name}
                visible={detail.visible}
                abbreviate={listItemState[0]}
                key={i}
            />)
        ]
        if (detail.abbreviate) {
            abbreviateListItems.push(listItems[i])
        }
    }
    console.log(abbreviateListItems)

    document.documentElement.style.setProperty('--added-columns', listItems.length.toString());

    const [checkVisible, setCheckVisible] = React.useState(false)


    return (
        <div className="response-group main">
            <details open>
                <summary className="response-group summary">{title}</summary>
                {listItems.map((listItem) => listItem[1])}
            </details>
            <button
                className={
                    classNames(
                        "response-group view-more",
                        {
                            "move": checkVisible
                        }
                    )
                }
                onClick={() => {
                    setCheckVisible(true)
                    for (let i = 0; i < abbreviateListItems.length; i++) {
                        const response = abbreviateListItems[i]
                        setTimeout(() => {
                            response[0][1](false)
                        }, 250 + 250 / abbreviateListItems.length * (i + 1))
                    }
                    setTimeout(() => {
                        setCheckVisible(false)
                    }, 500)
                }}
            >
                View more
            </button>
        </div>
    )
}

export {
    NameSearcher,
    InputField,
    ResponseGroup as Response
}