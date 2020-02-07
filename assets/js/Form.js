// This fil is dedicated to all the calucaltion related to the Quote Form from RocketElevators Co. website
// --- Quote calculation variables
var doorPerFloorN;
var cagesN;
var columnN;
var totalElevatorN;
var unitCagePrice = 0;
var totalCagesprice;
var installationFeeRate = 1;
var totalBudget = 0;
var NoError = false;

var LineType;
// --- /Quote calculation variables

function printResult(){
		if ( NoError && (LineType == "standard" || LineType == "premium" || LineType == "excelium")){
			$("#error").html("");
		$("#line").html(" <h4>Note:</h4> <p>You have selected <strong>'" + LineType + " line'</strong> for which <br>the unit price of elevator cage is  " 
		+ unitCagePrice + " CAD  and<br> the installation fee is " + installationFeeRate * 100 + "%.</p>");
		$("#budget").html("<h2>Estimated budget: <span>" + totalBudget.toFixed(2) + "</span> CAD.</h2>  <p style='text-align: right;'>The taxes are not included.</p>");	
		$("#note").html("<p> Based on the provided information the rules recommend to install a total of <br><strong>" + cagesN + " cages </strong> in <strong>" + columnN + " columns</strong>.</p>");
		}
		else{
			$("#error").html("<h2>Please complete the form properly to have a price estimation.</h2> <br>");
			$("#line").html("");
			$("#budget").html("");
			$("#note").html("");
		}
};
var $typeSelector = $("#typeSelector");
$("#results").css("display", "none");
$("#lineType").css("display", "none");
$typeSelector.on("change",function(){
	$("#lineType").css("display", "block");
	$("#results").css("display", "block");
	NoError = false;
	printResult();
	$("input[name='radio-btn']").prop("checked", false);
	for (var i = 0; i < $(".step2Form").length; i++){
		$(".step2Form")[i].value = null;
	}
	if ($typeSelector.val() == "residential"){
		for (var i = 0; i < $("li.nodisplay").length; i++){
			$("li.nodisplay").css("display", "none");
		}
		for (var i = 0; i < $("li.residential").length; i++){
			$("li.residential").css("display", "block");
		}
	}
	else if($typeSelector.val() == "commercial"){
		for (var i = 0; i < $("li.nodisplay").length; i++){
			$("li.nodisplay").css("display", "none");
		}
		for (var i = 0; i < $("li.commercial").length; i++){
			$("li.commercial").css("display", "block");
		} 
	}
	else if($typeSelector.val() == "corporate"){
		for (var i = 0; i < $("li.nodisplay").length; i++){
			$("li.nodisplay").css("display", "none");
		}
		for (var i = 0; i < $("li.corporate").length; i++){
			$("li.corporate").css("display", "block");
		} 
	}
	else if($typeSelector.val() == "hybrid"){
		for (var i = 0; i < $("li.nodisplay").length; i++){
			$("li.nodisplay").css("display", "none");
		}
		for (var i = 0; i < $("li.hybrid").length; i++){
			$("li.hybrid").css("display", "block");
		} 
	}

});


// --- Calculation of the price 

// $("#mainForm").on("change", function(){
function Calculations(){
	var AppartNumber = parseInt($("#nAprt").val());
	var FloorNumber = parseInt($("#nFlr").val());
	var BasementNumber = parseInt($("#nBsm").val());
	var DistinctBuisinessNumber = parseInt($("#nDstBsn").val());
	var ParkingSpaceNumber = parseInt($("#prkng").val());
	var cagesNumber = parseInt($("#cages").val());
	var TenantCoNumber = parseInt($("#tntCo").val());
	var OccupantPerFloor = parseInt($("#occPFlr").val());
	var HoursNumber = parseInt($("#hrs").val());

	if ($typeSelector.val() == "residential"){
		columnN = Math.ceil(FloorNumber / 20);
		doorPerFloorN = Math.ceil(AppartNumber / FloorNumber);
		cagesN = Math.ceil(doorPerFloorN / 6) * columnN;	
	}
	else if ($typeSelector.val() == "commercial"){
		columnN = 1;
		cagesN = cagesNumber * columnN;
	}
	else {
		columnN = Math.ceil((FloorNumber + BasementNumber) / 20);
		cagesN = Math.ceil(OccupantPerFloor * (FloorNumber + BasementNumber) / 1000 / columnN) * columnN;
	}
		
	LineType = $("input[name='radio-btn']:checked").val();
	if (LineType == "standard"){
		unitCagePrice = 7565;
		installationFeeRate = 0.1;
	}
	else if (LineType == "premium"){
		unitCagePrice = 12345;
		installationFeeRate = 0.13;
	}
	else if (LineType == "excelium"){
		unitCagePrice = 15400;
		installationFeeRate = 0.16;
	}	
	totalCagesprice = cagesN * unitCagePrice;
	totalBudget = (1 + installationFeeRate) * totalCagesprice;
	
	// --- Form Validation
	if ($typeSelector.val() == "residential"){
		if(FloorNumber > 0 && BasementNumber >= 0 && AppartNumber > 0){
			console.log("Residential: " + NoError);
			NoError = true;
		}
		else {
			console.log("NoError is " + NoError);
			NoError = false;
		}
	}
	else if ( $typeSelector.val() == "commercial"){
		if(FloorNumber > 0 && BasementNumber >= 0 && DistinctBuisinessNumber > 0 && ParkingSpaceNumber > 0 && cagesNumber > 0){
			// window.alert("working hours must be between 0-24 hours");
			console.log("Commercial: " + NoError);
			NoError = true;
		}
		else {
			console.log("NoError is " + NoError);
			NoError = false;
		}
	}
	else if ( $typeSelector.val() == "corporate"){
		if(FloorNumber > 0 && BasementNumber >= 0 && TenantCoNumber >= 0 && OccupantPerFloor > 0){
			// window.alert("working hours must be between 0-24 hours");
			console.log("Corporate: " + NoError);
			NoError = true;
		}
		else {
			console.log("NoError is " + NoError);
			NoError = false;
		}
	}
	else if ( $typeSelector.val() == "hybrid"){
		if((HoursNumber <= 24 && HoursNumber > 0) && FloorNumber > 0 && BasementNumber >= 0 && DistinctBuisinessNumber > 0 && ParkingSpaceNumber > 0 && OccupantPerFloor > 0){
			// window.alert("working hours must be between 0-24 hours");
			console.log("Hybrid: " + NoError);
			NoError = true;
		}
		else {
			console.log("NoError is " + NoError);
			NoError = false;
		}
	}
	else {
		console.log("NoError is " + NoError);
		NoError = false;
	}
	// --- /Form Validation

	// --- Display results
	printResult();
	// console.log("Door per Floor" + doorPerFloorN);
	// console.log("column number:" + columnN);
	// console.log("cages number: cages x column: " + cagesN);
	// console.log("unit cage price: " + unitCagePrice + "--total cages price: " + totalCagesprice + "--total budget: " + totalBudget);
	// --- /Display results
	
};
// --- /Calculation of the price 




