import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1 style={{textAlign: "left"}}>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow" style={{color: "blue"}}>
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing
