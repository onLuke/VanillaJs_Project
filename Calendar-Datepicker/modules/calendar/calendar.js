function addCalendar($form) {
	const get = (element) => document.querySelector(element);
	const getChild = (parent, child) => parent.querySelector(child);
	const create = (tagName) => document.createElement(tagName);

	const $dateInput = getChild($form, ".calendar-form > input");
	const $body = get("body");

	window.addEventListener("load", () => {
		$body.classList.remove("preload");
		$body.style.visibility = "visible";
	});

	const checkLoading = async (ms) => {
		let timer;
		await new Promise((resolve) => {
			timer = setTimeout(() => resolve(), ms);
		}).finally(() => clearTimeout(timer));

		if (document.readyState !== "complete") {
			$body.classList.remove("preload");
			$body.style.visibility = "visible";

			const error = new Error(`
        발생 시각 : ${new Date()},
        발생 컴포넌트 : calendar.js
      `);
			error.name = "리소스 요청 실패";
			throw error;
		}
	};

	checkLoading(500);

	class DateInfo {
		constructor() {
			this.month = 0;
			this.year = 0;
			this.isCurrent = true;

			this.today = new Date().getDate();
			this.currentMonth = new Date().getMonth();
			this.currentYear = new Date().getFullYear();

			this.current = null;
			this.prev = null;
			this.last = null;

			this.monthMap = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
		}

		updateDate = () => {
			this.current = new Date(
				this.currentYear + this.year,
				this.currentMonth + this.month
			);
			this.prev = new Date(this.current.getFullYear(), this.current.getMonth(), 0);
			this.last = new Date(
				this.current.getFullYear(),
				this.current.getMonth() + 1,
				0
			);

			this.year === 0 && this.month === 0
				? (this.isCurrent = true)
				: (this.isCurrent = false);
		};

		toNextMonth = () => {
			this.month++;

			if (this.month === 12) {
				this.month = 0;
				this.year++;
			}

			this.updateDate();
		};

		toPrevMonth = () => {
			this.month--;

			if (this.month === -1) {
				this.month = 11;
				this.year--;
			}

			this.updateDate();
		};
	}

	const dateInfo = new DateInfo();

	dateInfo.updateDate();


	const getNav = () => {
		const $nav = create("div");
		$nav.classList.add("calendar-nav");

		$nav.innerHTML += `
      <i class='bx bxs-left-arrow to-prev'></i>

      <div class = "year-month">
          <span class = "month">
          </span>
          <span class="year">
          </span>
      </div>

      <i class='bx bxs-right-arrow to-next'></i>
        
    `;
		return $nav;
	};

	const getCalendarGrid = () => {
		const $calendarGrid = create("div");
		$calendarGrid.classList.add("calendar-grid");

		$calendarGrid.innerHTML += `
      <div class=weekday>SUN</div>
      <div class=weekday>MON</div>
      <div class=weekday>TUE</div>
      <div class=weekday>WED</div>
      <div class=weekday>THU</div>
      <div class=weekday>FRI</div>
      <div class=weekday>SAT</div>
    `;

		for (let i = dateInfo.prev.getDay(); i >= 0; i--) {
			$calendarGrid.innerHTML += `<div class="prev-day day">${dateInfo.prev.getDate() - i}</div>`;
		}

		for (let i = 1; i < dateInfo.today; i++) {
			$calendarGrid.innerHTML += `<div class="current-day day">${i}</div>`;
		}

		dateInfo.isCurrent
			? ($calendarGrid.innerHTML += `<div class="current-day day today"}px>${dateInfo.today}</div>`)
			: ($calendarGrid.innerHTML += `<div class="current-day day">${dateInfo.today}</div>`);

		for (let i = dateInfo.today + 1; i <= dateInfo.last.getDate(); i++) {
			$calendarGrid.innerHTML += `<div class="current-day day">${i}</div>`;
		}

		for (let i = 1; i <= 6 - dateInfo.last.getDay(); i++) {
			$calendarGrid.innerHTML += `<div class="next-day day">${i}</div>`;
		}

		return $calendarGrid;
	};



	const renderCalendar = () => {
		const $calendar = create("div");
		$calendar.classList.add("calendar");
		$calendar.append(getNav(), getCalendarGrid());

		const $prevCalendar = getChild($form, ".calendar");

		if ($prevCalendar) {
			$prevCalendar.replaceWith($calendar);
		} else $form.appendChild($calendar);

		const $month = getChild($form, ".month");
		const $year = getChild($form, ".year");
		$month.textContent = dateInfo.monthMap[dateInfo.current.getMonth()];
		$year.textContent = dateInfo.current.getFullYear();

		const $prevMonthButton = getChild($form, ".to-prev");
		const $nextMonthButton = getChild($form, ".to-next");
		$prevMonthButton.addEventListener("click", () => {
			movePrevMonth();
		});

		$nextMonthButton.addEventListener("click", () => {
			moveNextMonth();
		});
	};


	const moveNextMonth = () => {
		dateInfo.toNextMonth();
		renderCalendar();
	};


	const movePrevMonth = () => {
		dateInfo.toPrevMonth();
		renderCalendar();
	};


	renderCalendar();
  
  
	const $calendar = getChild($form, ".calendar");
	window.addEventListener("DOMContentLoaded", $calendar.classList.add("hidden"));

	$dateInput.addEventListener("click", () => {
		renderCalendar();
		const $calendar = getChild($form, ".calendar");
		$calendar.classList.remove("hidden");
	});

	window.addEventListener("click", (e) => {
		const $calendar = getChild($form, ".calendar");
		if (e.target.contains($form)) $calendar.classList.add("hidden");
	});

	$form.addEventListener("click", (e) => {
		if (e.target.classList.contains("day")) {
			$dateInput.setAttribute(
				"value",
				`${dateInfo.current.getFullYear()} - ${dateInfo.current.getMonth() + 1} - ${e.target.textContent}`
			);
			getChild($form, ".calendar").classList.add("hidden");
		}
	});


}

export default addCalendar;
