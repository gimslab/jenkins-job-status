const siteChecker = document.querySelector("table#projectstatus");
const target = document.querySelector("div.breadcrumbs__wrapper");
if (siteChecker && target) {
	const totalJobCnt = document.querySelectorAll("table#projectstatus>tbody>tr").length - 1;
	const statusCounts = ""
		+ "<div style='text-align:right; margin-right:1em'>"
		+ "<span style='color:orange; font-size:1.2em'>"
		+ "  Total: "+totalJobCnt
		+ "  Blue: "+document.querySelectorAll("tr.job-status-blue").length
		+ ", Blue-Anime: "+document.querySelectorAll("tr.job-status-blue-anime").length
		+ ", Yellow: "+document.querySelectorAll("tr.job-status-yellow").length
		+ ", Red: "+document.querySelectorAll("tr.job-status-red").length
		+ ", aborted: "+document.querySelectorAll("tr.job-status-aborted").length
		+ ", disabled: "+document.querySelectorAll("tr.job-status-disabled").length
		+ ", no-built: "+document.querySelectorAll("tr.job-status-nobuilt").length
		+ ", no-status: "+document.querySelectorAll("tr.job-status-").length
		+ "</span>";
	const goToRedLink 	  = "<span style='margin-left:1em;'>[ <a href='javascript:document.querySelector(\"tr.job-status-red\").scrollTo()'/>Go To Red</a> ]</span>";
	const goToRedLinkDisabled = "<span style='margin-left:1em;'>[ <a href='#' style='pointer-events: none'/>Go To Red</a> ]</span>";
	const criticalsOnlyLink	  = "<span style='margin-left:1em;'>[ <a id='aCriticalsOnly' href='#'/>Criticals Only</a> ]</span>";
	const redCount = document.querySelectorAll("tr.job-status-red").length;
	var 	msg  = "<div>"+statusCounts;
		msg += ( redCount>0 ? goToRedLink : goToRedLinkDisabled);
		msg += criticalsOnlyLink;
		msg += "</div>";
	const newDiv = document.createElement("div");
	newDiv.innerHTML = msg;
	newDiv.querySelector("#aCriticalsOnly").addEventListener('click', function(event) {
		document.querySelectorAll("tr.job-status-nobuilt").forEach(tr => tr.style.display = "none");
		// document.querySelectorAll("tr.job-status-blue").forEach(tr => tr.style.display = "none");
		document.querySelectorAll("tr.job-status-blue").forEach(tr => {
			let tdsThatHasData = []
			tr.querySelectorAll("td").forEach(td => {
				if(td.getAttribute("data"))
					tdsThatHasData.push(td);
			});
			const howOld = tdsThatHasData[2].innerText;
			if(    ( howOld.includes(" sec") || howOld.includes(" min") || howOld.includes(" mo") || howOld.includes(" yr") )
			    || ( howOld.includes(" hr") && !howOld.includes(" day"))
			    || ( /\d\d days/.test(howOld))
			){
				console.log("blue - "+howOld);
				tr.style.display = "none";
			}
		});
		document.querySelectorAll("tr.job-status-disabled").forEach(tr => {
			let tdsThatHasData = []
			tr.querySelectorAll("td").forEach(td => {
				if(td.getAttribute("data"))
					tdsThatHasData.push(td);
			});
			const howOld = tdsThatHasData[2].innerText;
			if(howOld.includes(" mo") || howOld.includes(" yr")){
				console.log("disabled - "+howOld);
				tr.style.display = "none";
			}
		});
		document.querySelectorAll("tr.job-status-").forEach(tr => {
			console.log("nostat - ");
			tr.style.display = "none";
		});
	});

	const target = document.querySelector("div.breadcrumbs__wrapper")
	target.insertAdjacentElement("afterend", newDiv);

}
