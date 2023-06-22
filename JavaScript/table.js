
$(document).ready(function () {
  $.validator.addMethod("greaterThan",
          function (value, element, param) {
              var $min = $(param);
              if (this.settings.onfocusout) {
                  $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                      $(element).valid();
                  });
              }
              return parseInt(value) > parseInt($min.val());
          }, "Max must be greater than min");

  mulTab();
  $('#mulTab').validate({
    //rules for validation make each input in range and second input must be greater then first
      rules: {
          rowSt: {
              required: true,
              number: true,
              range: [-50, 50]
          },
          rowEn: {
              required: true,
              number: true,
              greaterThan: '#rowSt',
              range: [-50, 50]
          },
          colSt: {
              required: true,
              number: true,
              range: [-50, 50]
          },
          colEn: {
              required: true,
              number: true,
              greaterThan: '#colSt',
              range: [-50, 50]
          }
      },
      //messages for if numbers are out of range
      messages: {
          rowSt: {
              required: "Required: Please enter a valid number"
          },
          rowEn: {
              required: "Required: Please enter a valid number"
          },
          colSt: {
              required: "Required: Please enter a valid number"
          },
          colEn: {
              required: "Required: Please enter a valid number"
          }
      }
  });
  /* Prevents form from submitting if there is an error */
  $('#myForm').on('submit', function (e) {
      e.preventDefault();
      var status = $('#myForm').validate({
          rules: {
              row1: {
                  required: true,
                  number: true,
                  range: [-50, 50]
              },
              row2: {
                  required: true,
                  number: true,
                  greaterThan: '#row1',
                  range: [-50, 50]
              },
              col1: {
                  required: true,
                  number: true,
                  range: [-50, 50]
              },
              col2: {
                  required: true,
                  number: true,
                  greaterThan: '#col1',
                  range: [-50, 50]
              }
          },
          //messages for each field if one is left empty or if out of num range
          messages: {
              row1: {
                  required: "Required: Please enter a valid number"
              },
              row2: {
                  required: "Required: Please enter a valid number"
              },
              col1: {
                  required: "Required: Please enter a valid number"
              },
              col2: {
                  required: "Required: Please enter a valid number"
              }
          }
      });
      status = status.currentForm;

      /* Check for error and focus on if there is one */
      if (status[0].inVal !== 'error' && status[1].className !== 'error' && status[2].inVal !== 'error' && status[3].inVal !== 'error') {
          TableStart();
      } else {
          if (status[0].inVal === 'error') {
              document.getElementById("row1").focus();
          }
          if (status[1].inVal === 'error') {
              document.getElementById("row2").focus();
          }
          if (status[2].inVal === 'error') {
              document.getElementById("col1").focus();
          }
          if (status[3].inVal === 'error') {
              document.getElementById("col2").focus();
          }
      }
  });
});

  function TableStart() {
    if ($("#myForm").valid()) {
      // Form is valid, generate the table

      // Clear previous table content, if any
      $("#table").empty();

      // Get the input values
      var startRow = parseInt($("#row1").val());
      var endRow = parseInt($("#row2").val());
      var startCol = parseInt($("#col1").val());
      var endCol = parseInt($("#col2").val());

      // Create the table element
      var table = $("<table>").addClass("multiplication-table");

      // Create the table header row
      var headerRow = $("<tr>");
      headerRow.append($("<th>"));

      // Add header cells for multiplicands
      for (var i = startCol; i <= endCol; i++) {
        headerRow.append($("<th>").text(i));
      }

      // Append the header row to the table
      table.append(headerRow);

      // Generate table rows and cells
      for (var j = startRow; j <= endRow; j++) {
        var row = $("<tr>");
        row.append($("<th>").text(j)); // Add multiplier in the first cell

        // Add multiplication results in the remaining cells
        for (var k = startCol; k <= endCol; k++) {
          var result = j * k;
          row.append($("<td>").text(result));
        }

        // Append the row to the table
        table.append(row);
      }

      // Append the table to the #table element
      $("#table").append(table);
    }
  }

