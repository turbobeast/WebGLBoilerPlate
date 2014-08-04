var DRAG_ROTATE = function () {
	'use strict';
	var dragr = {},
	lastX,
	lastY,
	width = 0,
	height = 0,
	rotationObjects = [],
	dragging = false;

	function startDrag (e) {
		dragging = true;
	}

	function stopDrag (e) {
		dragging = false;
		lastX = e.clientX;
		lastY = e.clientY; 
	}

	function drag (e) {
		var deltaX = 0,
		deltaY = 0;

		if(dragging) {
			deltaX = (e.clientX - lastX);
			deltaY = (e.clientY - lastY);


			for(var i = 0; i < rotationObjects.length; i += 1) {
				rotationObjects[i].x += deltaX / 100;
				rotationObjects[i].y += deltaY / 100;
			}

		}

		lastX = e.clientX;
		lastY = e.clientY;
	}

	dragr.addRotationObject = function (rObj) {
		if(rObj.x == undefined || rObj.z == undefined) {
			console.error('a rotation object needs both an x and a y property');
			return;
		} 

		rotationObjects.push(rObj);

	};

	dragr.resize = function (wid,hite) {
		width = wid;
		height = hite;
	};	

	dragr.init = function () {
		window.addEventListener('mousedown', startDrag, false);
		window.addEventListener('mouseup', stopDrag, false);
		window.addEventListener('mousemove', drag, false);
	};


	return dragr; 
};

 module.exports = DRAG_ROTATE;