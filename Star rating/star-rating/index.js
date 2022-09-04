// do something!
'use strict';

function StarRating($container) {
	const get = (element) => document.querySelector(element);
	const getChild = (element, target) => element.querySelector(target);



	const $lastLink = get("link:last-of-type");
	if (!get("[href='star-rating/theme.css']")) {
		$lastLink.insertAdjacentHTML(
			"afterend",
			`<link href="star-rating/theme.css" rel="stylesheet" />`
		);
	}


	$container.insertAdjacentHTML(
		"afterbegin",
		`<div class=star-rating-container></div>`
	);



	const starNumber = $container.dataset.maxRating;
	const $innerContainer = getChild($container, ".star-rating-container");

	for (let i = 1; i <= starNumber; i++) {
		$innerContainer.insertAdjacentHTML(
			"beforeend",
			`<i class="bx bxs-star" data-id = ${i} </i>`
		);
	}



	$innerContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("bxs-star")) {
			const starIdx = e.target.dataset.id;

			e.target.dispatchEvent(
				new CustomEvent("rating-change", {
					detail: starIdx,
					bubbles: true,
					cancelable: true,
				})
			);

			for (let i = 0; i < starIdx; i++) {
				$innerContainer.children[i].classList.add("selected");
			}

			for (let i = starIdx; i < starNumber; i++) {
				$innerContainer.children[i].classList.remove("selected");
			}
		}
	});



	$innerContainer.addEventListener("mouseover", (e) => {
		if (e.target.classList.contains("bxs-star")) {
			const starIdx = e.target.dataset.id;

			for (let i = 0; i < starIdx; i++) {
				$innerContainer.children[i].classList.add("hovered");
			}

			for (let i = starIdx; i < starNumber; i++) {
				$innerContainer.children[i].classList.remove("hovered");
			}
		}
	});

  

	let timerId;
	const throttle = (callback, time) => {
		if (timerId) return;
		timerId = setTimeout(() => {
			callback();
			timerId = undefined;
		}, time);
	};

	$container.addEventListener("mouseleave", () => {
		const leaveHover = () => {
			for (let i = 0; i < starNumber; i++) {
				$innerContainer.children[i].classList.remove("hovered");
			}
		};

		throttle(leaveHover, 100);
	});

}

export default StarRating;
