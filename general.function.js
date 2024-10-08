/* 	
	Version 3.1
		-- Add Cookie mgmt functions

	Version 3.0
		-- Let update the major version to commit all little change since 2.0.
		-- Since this version, a regulated check-in check-out of GIT is made.

	Version 2.5
		-- Modify obj function so you can bind obj to existing DOMElement.

	Version 2.4
		-- Add time2TimeAgo
		-- Add showToastMessage
		-- Add obj.destroy

	Version 2.3.1
		-- Fix obj.addObject to return this.
		
	Version 2.3
		-- Modify obj.addTo to accespt object and string.
		-- Add function obj.addObject
		-- Add obj.setAttribute, need this function so the object is return, the native setAttribute isnt returning the obejct.
		
	Version 2.2
		-- Modify obj so the function addTo and setValue is part of te new object

	Version 2.1	
		-- Change $ for $id
		-- Change $$ for $tagname
		-- Change o for obj
		-- Change dialogOpen to objShow
		-- Change dialogClose to objHide
		-- Add $name
		-- Add $class	
*/

console.log("Loading general.function.js!");

/*	Function $id()
	Get objects by id
	return: an object
	
	Change log:
		7/18/18	This function has been renamed from $ to $id
*/
function $id(id) {
  if (!document.getElementById(id))
    return false;
  return document.getElementById(id);
}

/*	Function $name()
	Get objects by name
	return: an object
	
	Change log:
		
*/
function $name(name) {
  if (!document.getElementsByName(name))
    return false;
  return document.getElementsByName(name);
}

/*	Function $tag()
	Get objects array by tagname
	return: an array of objects
	
	Change log:
		7/18/18	This function has been renamed from $$ to $tag
*/
function $tag(tagname) {
	if (!document.getElementsByTagName(tagname))		
		return false;
	return document.getElementsByTagName(tagname);
}

/*	Function $class()
	Get objects array by classname
	return: an array of objects
	
	Change log:
		
*/
function $class(classname) {
	if (!document.getElementsByClassName(classname))		
		return false;
	return document.getElementsByClassName(classname);
}

/*	Function obj()
	Create a new object of the defined type with the defined id and className
	return: The created object
	
	Change log:
		7/18/18	This function has been renamed from o to obj
*/
function obj(type, id, className) {
	

	// 2.6 check if the element already exist.
	if (!$id(id))
		var d = document.createElement(type);
	else
		var d = $id(id);

	
	if (id != undefined)
		d.id = id;
	if (className != undefined)
		d.className = className;
	
	// Add the obj into an existing DOMElement
	d.addTo = function(parent) {
		if (is_string(parent)) {
			$id(parent).appendChild(this);
		} else {
			parent.appendChild(this);
		}
		return this;
	}
	
	// Add object into the obj
	d.addObject = function(xObj) {
		this.appendChild(xObj)
		return this;
	}
	
	d.setValue = function(text) {
		this.innerHTML  = text;
		return this;
	}
	
	d.setAttr = function(name, value) {
		this.setAttribute(name, value);
		return this;
	}
	
	d.setStyle = function(name, value) {
		eval('this.style.' + name + " = \"" + value + "\"");
		return this;
	}
	
	d.destroy = function() {
		this.parentNode.removeChild(this);
		return this;
	}
	
	return d;
}


function is_array(v) {
	if (Object.prototype.toString.call(v) === "[object Array]")
		return true;
	return false;
}
function is_object(v) {
	if (Object.prototype.toString.call(v) === "[object Object]")
		return true;
	return false;
}
function is_string(v) {
	if (Object.prototype.toString.call(v) === "[object String]")
		return true;
	return false;
}
function is_int(v) {
	if (Object.prototype.toString.call(v) === "[object Number]")
		return true;
	return false;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function defaultVar(v, d) {
	
	if (d == undefined)
		d = "";
	
	if ((v == undefined) || (v == ''))
		return d;
	
	return v;
	
}

function objShow(id) {		
	$id(id).style.display = "block";
}
function objHide(id) {
	$id(id).style.display = "none";
}

function purgeTable(tableId, limitRow, removeTop) {
	var t = $id(tableId).rows.length;
	if (t > limitRow) {
		y = t - limitRow;
		for (it=0; it<y; it++) {
			$id(tableId).deleteRow((removeTop) ? 0 : -1);
		}
	}
}
function clearTableRows(tableId) {
	$id(tableId).innerHTML = "";
}
function addTableRow(tableId, data, insertTop) {	
	
	var newRow = $id(tableId).insertRow((insertTop) ? 0 : -1);

	for (i in data) {			
		var tmpCell = newRow.insertCell(-1);
		if (is_array(data[i])) {
			tmpCell.innerHTML = data[i][0];
			tmpCell.draggable = data[i][1];
			tmpCell.draggabletype = data[i][2];
		} else {
			tmpCell.innerHTML = data[i];
		}
	}
	
	newRow.ondragstart = function(x) { x.dataTransfer.setData(this.draggabletype, '{"WebDomain":"'+document.domain+'"}'); }

	return newRow;
}


/*	Function guid()
	Generate a 5 section GUID string
	return: a 5 section GUID string
	
	Change log:
		
*/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getNumberBetween(bg,end) {
	return Math.floor(Math.random() * (end+1)) + bg;
}

function showToastMessage(message) {
	var t = obj("div", "snackbar", "show").setValue(message).addTo(document.body);
	setTimeout(function(){ t.className = t.className.replace("show", ""); t.destroy(); }, 3000);
}


function userException(message, number) {
	this.message = message;
	if (number != undefined)
		this.number = number;
	else
		this.number = -1;
	this.name = "UserException";
}

function sleep(ms) {
	/*if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
	{
	  alert("Please dont use IE.");
	  return null;
	} else
		return new Promise(resolve => setTimeout(resolve, ms));*/
	return new Promise(resolve => setTimeout(resolve, ms));
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function htmlEntities(str) {

	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	
}

// Date and time function
function time2TimeAgo(ts, level) {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    var d=new Date();  // Gets the current time
    var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
	
    var delta = nowTs-ts;
	

	if (delta > 2592000) {	
		delta = Math.floor(delta/60/60/24/30);
		
		if (delta > 1)
			return delta + " months ago";
		else
			return delta + " month ago";
    }
	
    if (delta > 604800) {
       delta = Math.floor(delta/60/60/24/7);
	   
		if (delta > 1)
			return delta + " weeks ago";
		else
			return delta + " week ago";
    }
	
    if (delta > 86400) {
       delta = Math.floor(delta/60/60/24);
	   
		if (delta > 1)
			return delta + " days ago";
		else
			return delta + " day ago";
    }
	
    if (delta > 3600) {
       delta = Math.floor(delta/60/60);
	   
		if (delta > 1)
			return delta + " hours ago";
		else
			return delta + " hour ago";
    }
   
    if (delta > 60) {
       delta = Math.floor(delta/60);
	   
		if (delta > 1)
			return delta + " mins ago";
		else
			return delta + " min ago";
    }
	
    if (delta <= 60) {
       delta = delta;
	   
		if (delta > 1)
			return delta + " seconds ago";
		else
			return delta + " second ago";
    }
}
function formatDate(unixTimeStamp) {
	
	var date = new Date(unixTimeStamp*1000);
	
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	
	return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

// Cookies Management
function addCookie(prefix, name, value, never_expire) {
	if (never_expire == true)
		document.cookie = prefix + "_" + name + "=" + value +"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
	else
		document.cookie = prefix + "_" + name + "=" + value;
}

function deleteCookie(prefix, name) {
	document.cookie = prefix + "_" + name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

function getCookie(prefix, name) {
	var tmpI = null;		
	var tmpC = document.cookie;
	tmpC = tmpC.split(";");
	for(var i=0; i<tmpC.length; i++) {
		tmpI = tmpC[i].split("=");			
		if (tmpI[0].trim() == prefix + "_" + name)
			return tmpI[1];
	}
	return null;
}

export { $id, obj };

// End
