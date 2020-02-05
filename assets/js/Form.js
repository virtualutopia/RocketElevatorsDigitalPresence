
// Note
// *** How to seleect specific class of li s: ***
// $("ul li.Residetntial")






// --- Quote calculation variables
var doorPerFloorN;
var cagesN;
var columnN;
var totalElevatorN;
var unitCagePrice = 0;
var totalCagesprice;
var installationFeeRate = 1;
var totalBudget;

var LineType;
// --- /Quote calculation variables

var $typeSelector = $("#typeSelector");
$("#results").css("display", "none");
$("#lineType").css("display", "none");
$typeSelector.on("change",function(){
	$("#lineType").css("display", "block");
	$("#results").css("display", "block");
	for (var i = 0; i < $(".step2Form").length; i++){
		$(".step2Form")[i].value = 0;
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


// --- Calculation of the price on selection of any of the Radio Button

// $("#mainForm").on("change", function(){
function Calculations(){
	console.log("test");
	var AppartNumber = parseInt($("#nAprt").val());
	var FloorNumber = parseInt($("#nFlr").val());
	var BasementNumber = parseInt($("#nBsm").val());
	var DistinctBuisinessNumber = parseInt($("#nDstBsn").val());
	var ParkingSpaceNumber = parseInt($("#prkng").val());
	var cagesNumber = parseInt($("#cages").val());
	var TenantCoNumber = parseInt($("#tntCo").val());
	var OccupantPerFloor = parseInt($("#occPFlr").val());
	var HoursNumber = parseInt($("#hrs").val());

	console.log("#aprt:" + AppartNumber);
	console.log("#floors:" + FloorNumber);
	console.log("#basement:" + BasementNumber);
	console.log("#basement:" + BasementNumber + FloorNumber);
	console.log("#distinct buisinesses:" + DistinctBuisinessNumber);
	console.log("#parking:" + ParkingSpaceNumber);
	console.log("#cages:" + cagesNumber);
	console.log("# separate tenant co.:" + TenantCoNumber);
	console.log("#occupant per floor:" + OccupantPerFloor);
	console.log("# working hours:" + HoursNumber);

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
	
	
	// $("#lineType").on('change',function(){
		
	LineType = $("input[name='radio-btn']:checked").val();
	console.log(LineType);
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
	totalCagesprice = Math.ceil(cagesN * unitCagePrice);
	totalBudget = Math.ceil((1 + installationFeeRate) * (totalCagesprice));
	$("#line").html(" <h4>Note:</h4> <p>You have selected <strong>" + LineType + "</strong> line for which <br>the unit price of elevator cage is  " 
	+ unitCagePrice + " CAD  and<br> the installation fee is " + installationFeeRate * 100 + "%.</p>");
	$("#budget").html("<h2>Estimated budget: <span>" + totalBudget + "</span> CAD.</h2> <br> <p>The taxes are not included.</p>");	
	// });
	// --- Display results
	console.log("Door per Floor" + doorPerFloorN);
	console.log("column number:" + columnN);
	console.log("cages number: cages x column: " + cagesN);
	console.log("unit cage price: " + unitCagePrice + "--total cages price: " + totalCagesprice + "--total budget: " + totalBudget);
	$("#note").html("<p> Based on the provided information the rules recommend to install a total of <br><strong>" + cagesN + " cages </strong> in <strong>" + columnN + " columns</strong>.</p>");
	
	// --- /Display results
	
};




// --- /Calculation of the price on selection of any of the Radio Button



