// Add header 
const header = d3.select('nav').append('ul').attr('class', 'well');
header.append('h3').text('ALIENS R-REAL Data Report');

//Add button for table load functions
const ftext = header.append('p')
    .attr('id', 'ftext')
    .html('&nbsp;');

var currentDF = 0 

// div for our search box 
const searchB = d3.select('div')

// button for the report 
const dataButton = header.append('button')
    .attr('class', 'btn btn-primary')
    .text('Load Data Report')
    .on('click', function(){
        this.blur()
        datafunctions[currentDF]();
        currentDF = ++currentDF % datafunctions.length;

    })

// list of functions for button 
 datafunctions = [loadD, srtD,reload]

 function loadD() {

// run to ins the report 
//reportData = details
//filteredDate = reportData.filter(function(d){
//return d.datetime;
//})
//console.log(filteredDate)
    insertData();
    ftext.html('Data load has been succesfull! ');
    dataButton.text('Sort by Date of Report');

}
 // for sorting through data
function srtD() {

//sortData()
ftext.html('Data has been sorted. Click on any of the headers to continue sorting.');

dataButton.text('Remove Data');
searchB.selectAll('.SearchBar').remove()
 }

// reload
function reload() {
         
    d3.select('table').selectAll('tr').remove();
    ftext.text('Data has been removed.');

    dataButton.text('Load Again');
 }


// data of report 
reportData = details 

var sortDetails ={key: "id", order: d3.descending};
// Table layout 
const table = d3.select('main').append('table');
//Table header 
var thead = table.append('thead');
// Table body
var tbody = table.append('tbody');
//rows of Table
var rows;

//table for the data report 
function insertData() {
dat = reportData
     // Search box 
     searchB
         .append('div')
         .attr('class', 'SearchBar')

     searchB.append('p').attr('class', 'SearchBar')
         .text('Search by Date:');

     searchB.append('input')
         .attr('class', 'SearchBar')
         .attr('id', 'search')
         .attr('type', 'text')
         .attr('placeholder', 'search...')
   

// table header 
thead.append('tr')
    .selectAll('th')
    .data(d3.entries(dat[0]))
    .enter()
    .append('th')
    .on('click', function(d,i){
        sortData(d.key);
    })
    .text(function(d)
    {
        return d.key;
       
    });
 console.log(d3.entries(dat[0]))

 
// insert data 
rows = tbody.selectAll('tr')
    .data(dat)
    rows.enter().append('tr')

    .selectAll('td')
        .data(function (d) {
        return d3.entries(d)
    })
    .enter()
    .append('td')

    .text(function (d) {
        return d.value;
    });


  // Search  through data

  d3.select("#search")
      .on("keyup", function () {
          //filter according to key pressed
          var data_searched = dat,
              text = this.value.trim();

          var searchResults = data_searched.map(function (r) {
              //var regex = new RegExp("^(0[1-9]|[12][0-9]|[01])[/](0[1-9]|1[012])[/](19|20)\d\d$");
              var regex = new RegExp("^" + text + ".*", "i");
              if (regex.test(r.datetime)) {
                  //if there's any result
                  return regex.exec(r.datetime)[0]; //return the result

              }
              console.log(regex.exec(r.datetime[0]))
          })
          // filter blank entries from search 
          searchResults = searchResults.filter(function (r) {
              return r != undefined;
          })
          // filter dataset with search 
          data_searched = searchResults.map(function (r) {
              return dat.filter(function (p) {
                  return p.datetime.indexOf(r) != -1;

              })
          })

//concat array of search  
data_searched = [].concat.apply([], data_searched)
console.log(data_searched)

//dat bind with new dat 
  rows =  tbody.selectAll('tr')
    .data(data_searched, function (d) {
        return d3.entries(d);
            })
    rows.enter()
    .append('tr')
    .selectAll('td')
        .data(function (d) {
            return d3.entries(d)
        })
        .enter()
        .append('td')
        .text(function (d) {
            return d.value;
        });
    rows.exit().remove();
      })

      }
// sort through the data in ascending and descending 

function sortData(sortKey){
    if (sortDetails.order.toString() == d3.ascending.toString())
    {
        sortDetails.order = d3.descending; 
    } else {
        sortDetails.order = d3.ascending;
    }
    reportData.sort(function(x,y)
        {
            return sortDetails.order(
                x[sortKey],
                y[sortKey]
            )
        });
    // update sorted values 

    tbody.selectAll('tr')
        .data(reportData)
        .selectAll('td')

    .data(function(d){
        return d3.entries(d)
    })

    .text(function(d){
        return d.value;
    });
}
