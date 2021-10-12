// Plate ID
// Registration State
// Issue Date
// Violation Time
// Violation Code
// Vehicle Make
// Vehicle Body Type
// Vehicle Year
// Street Name


const Result = ({ server }) => {
    return (
        <tr>
            <td key={server["Summons Number"]}>
                {server["Plate ID"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Registration State"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Issue Date"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Violation Time"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Violation Code"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Vehicle Make"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Vehicle Body Type"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Vehicle Year"]}
            </td>
            <td key={server["Summons Number"]}>
                {server["Street Name"]}
            </td>
        </tr>
    )
}

export default Result
