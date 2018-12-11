// Add header 
const header = d3.select('body').append('div').attr('class', 'well');
header.append('h3').text('ALIENS R-REAL Data Report');

//Add button for sorting
const sortLabel = header.append('label')
    .attr('id', 'sortLabel')
    .html('&nbsp;');

let sortT = 0;
const sortingButton = header.append('button')
    .attr('class', 'btn btn-primary')
    .style('margin-bottom', '20px')
    .style('width', '30%')
    .style('text-align', 'center')
    .text('Sort Data')
    .on('click', function () {
        this.blur();
        sorting[sort]();
        sortT = ++sortT % sorting.length;
    });

// Add our tb
const table = d3.select("body").append("table");
var thead = table.append("thead");
var tbody = table.append("tbody");

var mydata = details;
var startIdx = 0;
var loadPerPage = 10;

var endIdx = startIdx - loadPerPage;
var mydataSub = mydata.slice(startIdx, endIdx);

// Create the header for our table 
var columns = ["Datetime ", "City ", "State ", "Country ", "Shape ", "Duration in Minutes ",
    "Comments"
]

thead.append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
    .text(function (column) {
        return column;
    })


// add our the data to the rows of the table.
for (var i = 0; i < mydataSub.length; i++) {
    var subdata = mydataSub[i];
    var subfield = Object.keys(subdata);
    //console.log(subdata)
}

for (var j = 0; j < subfield; j++) {
    var sfield = subfield[j];

}
var rows = tbody.selectAll("tr")
    .data(mydata).enter()
    .append("tr");

var cells = rows.selectAll("td")
    .data(function (row) {
        return subfield.map(function (column) {
            console.log(subfield);

            return {
                column: subfield,
                value: row[column]
            }

        })
    })
    .enter()
    .append("td")
    .text(function (d) {
        //console.log(d);
        return d.value;

    })
