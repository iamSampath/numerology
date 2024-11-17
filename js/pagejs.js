//Author: Sampath Kumar Medarametla
$(function () {
    $("#dob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:" + new Date().getFullYear()
    });
});

function checkDOB() {
    const dobInput = $("#dob").val();
    const dobParts = dobInput.split("/");
    const genderInput = document.querySelector('input[name="flexRadioDefault"]:checked').value;


    if (dobParts.length !== 3) {
        document.getElementById("result").innerHTML = "<div class='alert alert-danger'>Invalid Date Format!!</div>";
        return;
    }

    const day = parseInt(dobParts[1]);
    const month = parseInt(dobParts[0]);
    const year = parseInt(dobParts[2]);

    // Basic validation (can be more robust)
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
        document.getElementById("result").innerHTML = "<div class='alert alert-danger'>Invalid Date of birth!!</div>";
        return;
    }

    // Calculate Kua Number
    let yearSingleDigit = year;
    while (yearSingleDigit > 9) {
        yearSingleDigit = yearSingleDigit.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }

    let kuaNumber;
    if (genderInput === "male") {
        kuaNumber = 11 - yearSingleDigit;
        while (kuaNumber > 9) {
            kuaNumber = kuaNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
    } else {
        kuaNumber = yearSingleDigit + 4;
        while (kuaNumber > 9) {
            kuaNumber = kuaNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
    }

    // Calculate Life Path Number
    let lifePathNumber = day + month + year;
    while (lifePathNumber > 9) {
        lifePathNumber = lifePathNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }

    // Calculate Driver Number
    let driverNumber = day;
    while (driverNumber > 9) {
        driverNumber = driverNumber.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }

    // Separate digits into arrays
    const allDigits = [...day.toString().split('').filter(digit => digit !== '0'),
    ...month.toString().split('').filter(digit => digit !== '0'),
    ...year.toString().split('').filter(digit => digit !== '0'),
    ...kuaNumber.toString().split('').filter(digit => digit !== '0'),
    ...lifePathNumber.toString().split('').filter(digit => digit !== '0'),
    ...driverNumber.toString().split('').filter(digit => digit !== '0')];


    // Create the Loshu Grid as a 2D string array
    const loshuGrid = [
        ["4", "9", "2"],
        ["3", "5", "7"],
        ["8", "1", "6"]
    ];

    // Compare and create a new grid with matched digits
    const comparedGrid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const gridNumber = loshuGrid[i][j];
            const digitIndices = allDigits.reduce((acc, num, index) => {
                if (num === gridNumber) {
                    acc.push(index);
                }
                return acc;
            }, []);

            if (digitIndices.length > 0) {
                comparedGrid[i][j] = digitIndices.map(index => allDigits[index]).join('');
                digitIndices.forEach(index => allDigits.splice(index, 1));
            }
        }
    }
    //The above logic should be adjusted to accomodate the multiple numbers in all numbers 



    // Display the Numbers
    const numberDiv = document.getElementById("numbers");
    numberDiv.innerHTML = `
      <p>Lifepath Number/Conductor: ${lifePathNumber}</p>
      <p>Driver/Karmic Number: ${driverNumber}</p>
      <p>Kua Number: ${kuaNumber}</p>
    `;

    // Display the Birthchart
    const resultsDiv = document.getElementById("charts");
    resultsDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
            <table>
                <tr>
                    <td>${comparedGrid[0][0]}</td>
                    <td>${comparedGrid[0][1]}</td>
                    <td>${comparedGrid[0][2]}</td>
                </tr>
                <tr>
                    <td>${comparedGrid[1][0]}</td>
                    <td>${comparedGrid[1][1]}</td>
                    <td>${comparedGrid[1][2]}</td>
                </tr>
                <tr>
                    <td>${comparedGrid[2][0]}</td>
                    <td>${comparedGrid[2][1]}</td>
                    <td>${comparedGrid[2][2]}</td>
                </tr>
            </table>
        </div>
    `;
}
