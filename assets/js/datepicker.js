/* =========================================================
   BIZORA — DATEPICKER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const salesDate = document.querySelector("#salesDate");

    if (salesDate) {

        flatpickr(salesDate, {

            dateFormat: "M d, Y",

            allowInput: false,

            clickOpens: true,

            disableMobile: true,

            monthSelectorType: "dropdown",

            onChange: function (selectedDates, dateStr) {

                console.log("Selected date:", dateStr);

            }

        });

    }

});