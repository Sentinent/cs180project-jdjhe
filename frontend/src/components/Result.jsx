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
            <td>
                {server["Plate ID"]}
            </td>
            <td>
                {server["Registration State"]}
            </td>
            <td>
                {server["Issue Date"]}
            </td>
            <td>
                {server["Violation Time"]}
            </td>
            <td>
                {server["Violation Code"]}
            </td>
            <td>
                {server["Vehicle Make"]}
            </td>
            <td>
                {server["Vehicle Body Type"]}
            </td>
            <td>
                {server["Vehicle Year"]}
            </td>
            <td>
                {server["Street Name"]}
            </td>
        </tr>
    )
}

export default Result
