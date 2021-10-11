import "./FieldsMenu.css"

function FieldsMenu(){
    return (
        <div className="fielsMenu">
            <ul>
                <li><button>1. Most common types of violations</button></li>
                <li><button>2. Car brands that get a violation the most</button></li>
                <li><button>3. Frequencies of violations given based on time of day</button></li>
                <li><button>4. Frequencies of violations given based on month of the year</button></li>
                <li><button>5. Repeat offenders</button></li>
                <li><button>6. Frequency of violations per county</button></li>
            </ul>
        </div>
        
    );
}

export default FieldsMenu