import "./Header.css"

function Header({onClick, show}){
    return (
        <div className="topNav">
            <ul>
                <li><button className="title">NY Parking Violations - Datas</button></li>
                <li><button className="fields" onClick={onClick}>Search</button></li>
            </ul>
        </div>
    );
}

export default Header;