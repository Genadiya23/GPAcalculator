function addRow(){
    let table = document.getElementById("myTable");
    let row = table.insertRow(-1);
    
    let c1 = row.insertCell(0);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className ="checkbox";
    c1.appendChild(checkbox);

    let c2 = row.insertCell(1);
    let textInput = document.createElement("input");
    textInput.type = "text"
    textInput.placeholder ="Course Name";
    textInput.className = "course"
    c2.appendChild(textInput);

    let c3 = row.insertCell(2);
    let dropdown = document.createElement("select");
    dropdown.className="grade";

    let option1 = document.createElement("option");
    option1.value="A+";
    option1.text="A+";
    dropdown.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value="A";
    option2.text="A";
    dropdown.appendChild(option2);

    let option3 = document.createElement("option");
    option3.value="A-";
    option3.text="A-";
    dropdown.appendChild(option3);

    let option4 = document.createElement("option");
    option4.value="B+";
    option4.text="B+";
    dropdown.appendChild(option4);

    let option5 = document.createElement("option");
    option5.value="B";
    option5.text="B";
    dropdown.appendChild(option5);

    let option6 = document.createElement("option");
    option6.value="B-";
    option6.text="B-";
    dropdown.appendChild(option6);

    let option7 = document.createElement("option");
    option7.value="C+";
    option7.text="C+";
    dropdown.appendChild(option7);

    let option8 = document.createElement("option");
    option8.value="C";
    option8.text="C";
    dropdown.appendChild(option8);

    let option9 = document.createElement("option");
    option9.value="C-";
    option9.text="C-";
    dropdown.appendChild(option9);

    let option10 = document.createElement("option");
    option10.value="D+";
    option10.text="D+";
    dropdown.appendChild(option10);

    let option11 = document.createElement("option");
    option11.value="D";
    option11.text="D";
    dropdown.appendChild(option11);

    let option12 = document.createElement("option");
    option12.value="D-";
    option12.text="D-";
    dropdown.appendChild(option12);

    let option13 = document.createElement("option");
    option13.value="F";
    option13.text="F";
    dropdown.appendChild(option13);

    c3.appendChild(dropdown);

    let c4 = row.insertCell(3);

    let credits = document.createElement("input");
    credits.placeholder = "Number of Credits";
    credits.type ="text";
    credits.className="credits";
    c4.appendChild(credits);

    let c5 = row.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerText = "X"; // Button text
    deleteButton.onclick = function() { deleteRow(deleteButton); }; 
    c5.appendChild(deleteButton);
}

function calculate() {
    const gradeValues = {
        "A+": 4.0,
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D+": 1.3,
        "D": 1.0,
        "D-": 0.7,
        "F": 0.0
    };

    let totalQualityPoints = 0;
    let totalCredits = 0;

    // Select all rows except the header row
    const rows = document.querySelectorAll("#myTable tr:not(:first-child)");

    rows.forEach(row => {
        const checkbox = row.querySelector("input[type='checkbox']");
        const gradeSelect = row.querySelector("select.grade");
        const creditsInput = row.querySelector("input.credits");

        if (checkbox && checkbox.checked && gradeSelect && creditsInput) {
            // const grade = gradeSelect.value;
            const grade = gradeSelect.options[gradeSelect.selectedIndex].text; 
            const credits = parseFloat(creditsInput.value);

            if (!isNaN(credits) && credits > 0 && grade in gradeValues) {
                const qualityPoints = gradeValues[grade] * credits;
                totalQualityPoints += qualityPoints;
                totalCredits += credits;
            }
        }
    });

    const gpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : 0;
    document.getElementById("output").innerText = `My GPA is ${gpa}`;
}

function reset() {
    let table = document.getElementById("myTable");

    for (let i = 1; i < table.rows.length; i++) { 
        let row = table.rows[i];

        row.cells[0].querySelector('.checkbox').checked = false; 

        row.cells[1].querySelector('.course').value = '';

        // Clear grade dropdown
        row.cells[2].querySelector('.grade').selectedIndex = 0; // Reset to first option

        // Clear credits input
        row.cells[3].querySelector('.credits').value = '';
    }

    // Optionally, you can remove the added rows if you want to reset the entire table
    // while (table.rows.length > 1) { // Keep the header row
    //     table.deleteRow(1); // Remove the first added row repeatedly
    // }

    // Clear the GPA output (if needed)
    document.getElementById("output").innerText = "My GPA is ..."; // Reset output text
}

function deleteRow(button) {
    // Find the row that contains the clicked button
    const row = button.parentElement.parentElement;
    // Remove the row from the table
    row.parentElement.removeChild(row);
}
