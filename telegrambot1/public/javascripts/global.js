/// Pairlist data array for filling in info box
var pairListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the pair table on initial page load
  populateTable();

  // Pairname link click
  $('#pairList table tbody').on('click', 'td a.linkshowpair', showPairInfo);

  // Add Pair button click
  $('#btnAddPair').on('click', addPair);

  // Send telegram message
  $('#btnSendTelegramMessage').on('click', sendTelegramMessage);

  // Delete Pair link click
  $('#pairList table tbody').on('click', 'td a.linkdeletepair', deletePair);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/pairs/pairlist', function( data ) {

    // Stick our pair data array into a pairlist variable in the global object
    // ATTENTION: For large scale operations this is not good idea!!
    pairListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowpair" rel="' + this.pairname + '">' + this.pairname + '</a></td>';
      tableContent += '<td>' + this.exchange + '</td>';
      tableContent += '<td>' + this.technicalindicators + '</td>';
      tableContent += '<td>' + this.timeframe + '</td>';
      tableContent += '<td><a href="#" class="linkdeletepair" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#pairList table tbody').html(tableContent);
  });
};

// Show Pair Info
function showPairInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();
  
    // Retrieve pairname from link rel attribute
    var thisPairName = $(this).attr('rel');
  
    // Get Index of object based on id value
    var arrayPosition = pairListData.map(function(arrayItem) { return arrayItem.pairname; }).indexOf(thisPairName);

    // Get our Pair Object
    var thisPairObject = pairListData[arrayPosition];

    //Populate Info Box
    $('#pairInfoName').text(thisPairObject.pairname);
    $('#pairInfoExchange').text(thisPairObject.exchange);
    $('#pairInfoTechnicalIndicators').text(thisPairObject.technicalindicators);
    $('#pairInfoTimeframe').text(thisPairObject.timeframe);

};


// Send Telegram Message
function sendTelegramMessage(event) {
    event.preventDefault();
    
    let message = {
      'text': $('#inputTelegramMessage').val(),
    }

    // Use AJAX to post the object to our addpair service
    $.ajax({
      type: 'POST',
      data: message,
      url: '/telegram/sendTelegram',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
}

// Add Pair
function addPair(event) {
    event.preventDefault();
  
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addPair input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });
  
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
  
      // If it is, compile all pair info into one object
      var newPair = {
        'pairname': $('#addPair fieldset input#inputPairName').val(),
        'exchange': $('#addPair fieldset input#inputPairExchange').val(),
        'technicalindicators': $('#addPair fieldset input#inputPairTechnicalIndicators').val(),
        'timeframe': $('#addPair fieldset input#inputPairTimeframe').val()
      }
  
      // Use AJAX to post the object to our addpair service
      $.ajax({
        type: 'POST',
        data: newPair,
        url: '/pairs/addpair',
        dataType: 'JSON'
      }).done(function( response ) {
  
        // Check for successful (blank) response
        if (response.msg === '') {
  
          // Clear the form inputs
          $('#addPair fieldset input').val('');
  
          // Update the table
          populateTable();
  
        }
        else {
  
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
  
        }
      });
    }
    else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
    }
  };

  // Delete Pair
function deletePair(event) {

    event.preventDefault();
  
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this pair?');
  
    // Check and make sure the pair confirmed
    if (confirmation === true) {
  
      // If they did, do our delete
      $.ajax({
        type: 'DELETE',
        url: '/pairs/deletepair/' + $(this).attr('rel')
      }).done(function( response ) {
  
        // Check for a successful (blank) response
        if (response.msg === '') {
        }
        else {
          alert('Error: ' + response.msg);
        }
  
        // Update the table
        populateTable();
  
      });
  
    }
    else {
  
      // If they said no to the confirm, do nothing
      return false;
  
    }
  
  };