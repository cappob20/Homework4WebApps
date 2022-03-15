var people = [];

var countHuman = 0;
var countVamp = 0;
var pie = document.getElementById("piechart").getContext('2d');
var pieChart = new Chart(pie, {
	type: 'pie',
	data: {
		labels: ["Human", "Vampire"],
		datasets: [{
			data: [countHuman, countVamp],
			backgroundColor: ["#00BFFF", "#561D5E"],
			hoverBackgroundColor: ["#87CEFA","#9370DB"]
		}]
	}, 
	options: {
		responsive: true
	}
});

function addPerson(){
	var table = document.getElementById("classmates");
	var nameBox = document.getElementById("nameBox");
	var garlicCheck = document.getElementById("garlicCheck");
	var shadowCheck = document.getElementById("shadowCheck");
	var complexionCheck = document.getElementById("complexionCheck");
	var name = nameBox.value;
	var garlic = "";
	var complexion = "";
	var shadow = "";
	var vampire = "";
	if (garlicCheck.checked == true)
		garlic = "yes";
	else
		garlic = "no";

	if (complexionCheck.checked == true)
		complexion = "pale";
	else
		complexion = "not pale";

	if (shadowCheck.checked == true)
		shadow = "yes";
	else
		shadow = "no";

	vampire = "";
	people.push({name,garlic,complexion,shadow,vampire});
	var row = table.insertRow();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell1.innerHTML = name;
	cell2.innerHTML = shadow;
	cell3.innerHTML = complexion;
	cell4.innerHTML = garlic;

	nameBox.value = "";
	garlicCheck.checked = false;
	shadowCheck.checked = false;
	complexionCheck.checked = false;
}

/*function removePerson(name){
	var table = document.getElementById("classmates");
	let index = people.findIndex(name)
	people.splice(index, 1);
	table.deleteRow(index);
}*/

function model(){
	//you would think that changing countvamp and counthuman then doing piechart.update() 
	//would work, but it doesn't. Therefore time to destroy and recreate the pie chart pain
	pieChart.destroy();
	countVamp = 0;
	countHuman = 0;
	var type = document.getElementById("selectLogic");
	var table = document.getElementById("classmates");
	let length = people.length - 1;
	if (type.value == 1){
		var isVampire = 0;
		for (i = 0; i <= length; i++){
			isVampire = Math.floor(Math.random() * 2);
			if (isVampire == 0){
				people[i].vampire = "yes";
				table.rows[i+1].cells[4].innerHTML = "yes";
				countVamp++;
			}
			else{
				people[i].vampire = "no";
				table.rows[i+1].cells[4].innerHTML = "no";
				countHuman++;
			}
		}
	}
	else{
		var vamp = 0;
		for(i = 0; i <= length; i++){
			if (people[i].garlic == "no")
				vamp += 3;
			if (people[i].shadow == "no")
				vamp += 4;
			if (people[i].complexion == "pale")
				vamp += 3;
			if (vamp > 6){
				people[i].vampire = "yes";
				table.rows[i+1].cells[4].innerHTML = "yes";
				countVamp++;
				}
			else{
				people[i].vampire = "no";
				table.rows[i+1].cells[4].innerHTML = "no";
				countHuman++;
			}
			vamp = 0;
		}
	}
	pieChart = new Chart(pie, {
		type: 'pie',
		data: {
			labels: ["Human", "Vampire"],
			datasets: [{
				data: [countHuman, countVamp],
				backgroundColor: ["#00BFFF", "#561D5E"],
				hoverBackgroundColor: ["#87CEFA","#9370DB"]
			}]
		}, 
		options: {
			responsive: true
		}
	});
}