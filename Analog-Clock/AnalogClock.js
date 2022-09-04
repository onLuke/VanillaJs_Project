"use strict";

const AnalogClock = ($container) => {

	$container.innerHTML = `
  <div class="hand hour"></div>
  <div class="hand minute"></div>
  <div class="hand second"></div>
  <div class="time time1">|</div>
  <div class="time time2">|</div>
  <div class="time time3">|</div>
  <div class="time time4">|</div>
  <div class="time time5">|</div>
  <div class="time time6">|</div>
  <div class="time time7">|</div>
  <div class="time time8">|</div>
  <div class="time time9">|</div>
  <div class="time time10">|</div>
  <div class="time time11">|</div>
  <div class="time time12">|</div>
  `;

	const getChild = (parent, child) => parent.querySelector(child);

	const setprop = (element, prop, value) => {
		element.style.setProperty(prop, value);
	};



	const hourHand = getChild($container, ".hour");
	const minuteHand = getChild($container, ".minute");
	const secondHand = getChild($container, ".second");
	const updateTime = () => {
		let now = new Date(),
			hour =
				now.getHours() > 12 ? (now.getHours() - 12) * 30 : now.getHours() * 30,
			minute = now.getMinutes(),
			second = now.getSeconds();

		setprop(hourHand, "--deg", hour + (minute / 12) * 6);
		setprop(minuteHand, "--deg", 6 * minute);
		setprop(secondHand, "--deg", 6 * second);
	};


	updateTime();


	setInterval(() => {
		updateTime();
	}, 1000);
};

export default AnalogClock;
