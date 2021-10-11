import "./Header.css"

function Header(){
    return (
        <ul>
            <li><a href="#">Most common types of violations</a></li>
            <li><a href="#">Car brands that get a violation the most</a></li>
            <li><a href="#">Frequencies of violations given based on time of day</a></li>
            <li><a href="#">Frequencies of violations given based on month of the year</a></li>
            <li><a href="#">Repeat offenders</a></li>
            <li><a href="#">Frequency of violations per county</a></li>
        </ul>
    );
}

export default Header;