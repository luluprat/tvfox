require(['storehouse/Storehouse'], function (Storehouse) {
	
	var tpls = {
		row: '<tr><td>{customerid}</td><td><input id="lastname_{customerid}" value="{lastname}"></td><td><input id="firstname_{customerid}" value="{firstname}"></td><td><button onclick="app.deleteItem(\'{customerid}\');">delete</button><button onclick="app.updateItem(\'{customerid}\');">update</button></td></tr>',
		table: '<table><tr><th>ID</th><th>Last Name</th><th>First Name</th><th></th></tr>{content}</table>'
	};

  var customers = new Storehouse({
    storeId: 'customer',
    idProperty: 'customerid'
  });
	
	var nodeCache = {};
	
	function init(){

    // open the store
    customers.open().then(refreshTable);
		
		// create references for some nodes we have to work with
		['submit', 'customerid', 'firstname', 'lastname', 'results-container'].forEach(function(id){
			nodeCache[id] = document.getElementById(id);
		});
		
		// and listen to the form's submit button.
		nodeCache.submit.addEventListener('click', enterData);
	}
	
	function refreshTable(){
		listItems(customers.data);
	}
	
	function listItems(data){
		var content = '';
		data.forEach(function(item){
			content += tpls.row.replace(/\{([^\}]+)\}/g, function(_, key){
				return item[key];
			});
		});
		nodeCache['results-container'].innerHTML = tpls.table.replace('{content}', content);
	}
	
	function enterData(){
		// read data from inputs…
		var data = {};
		['customerid','firstname','lastname'].forEach(function(key){
			var value = nodeCache[key].value.trim();
			if(value.length){
        if(key == 'customerid'){
          value = checkForNumericId(value);
        }
				data[key] = value;
			}
		});
		
		// …and store them away.
		customers.put(data).then(function(){
			clearForm();
			refreshTable();
		});
	}
	
	function clearForm(){
		['customerid','firstname','lastname'].forEach(function(id){
			nodeCache[id].value = '';
		});
	}

  function checkForNumericId (id) {
    var numericId = parseInt(id, 10);
    return isNaN(numericId) ? id : numericId;
  }

  function deleteItem(id){
    id = checkForNumericId(id);
    customers.remove(id).then(refreshTable);
	}
	
	function updateItem(id){
    id = checkForNumericId(id);
		var data = {
			customerid: id,
			firstname: document.getElementById('firstname_' + id).value.trim(),
			lastname: document.getElementById('lastname_' + id).value.trim()
		};
		customers.put(data).then(refreshTable);
	}

  function makeRandomEntry(){
    var lastnames = ['Smith','Miller','Doe','Frankenstein','Furter'],
        firstnames = ['Peter','John','Frank', 'James', 'Jill'];

    var entry = {
      lastname: lastnames[Math.floor(Math.random()*5)],
      firstname: firstnames[Math.floor(Math.random()*4)],
      age: Math.floor(Math.random() * (100 - 20)) + 20
    };

    return entry;
  }

  function addRandomCustomer(){
    var data = makeRandomEntry();

    customers.put(data).then(function(){
      clearForm();
      refreshTable();
    });
  }
	
	// export some functions to the outside to
	// make the onclick="" attributes work.
	window.app = {
		deleteItem: deleteItem,
		updateItem: updateItem,
    addRandomCustomer: addRandomCustomer
	};
	
	// go!
	init();
	
});
