	var init=0;
	var startDate;
	var clocktimer;

	function clearTimer() {
		init = 0;
		clearTimeout(clocktimer);
		document.querySelector(".timer").innerHTML = '00:00:00';
	}

	function calcTime() { 
		var thisDate = new Date();
		var t = thisDate.getTime() - startDate.getTime();
		t = Math.floor (t/1000);
		var s = t%60; t-=s;
		t = Math.floor (t/60);
		var m = t%60; t-=m;
		t = Math.floor (t/60);
		var h = t%60;
		if (h<10) h='0'+h;
		if (m<10) m='0'+m;
		if (s<10) s='0'+s;
		if (init==1) document.querySelector(".timer").innerHTML = h + ':' + m + ':' + s;
		clocktimer = setTimeout("calcTime()",10);
	}

	function startTimer() {
		if (init==0) {
			startDate = new Date();
			calcTime();
			init=1;
		}
	}