// do something!

(function () {
	"use strict";

	const get = (target) => {
		return document.querySelector(target);
	};

	const $nav = get("nav");
	const $body = get("body");
	const $toggle = get(".toggle");

	/* 다른 도메인에서도 상태 유지가 필요할 경우 사용할 Cookie Function입니다. */

	/* const setCookie = (name, value, options = {}) => {
      options = {
        path: '/',
        ...options
      };
    
      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }
    
      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    
      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }

    const getCookie = (name) => {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const deleteCookies = (name) => {
      setCookie(name, "", {
        'max-age': -1
      })
    } 
    */

	const init = () => {
		/* 다른 도메인에서도 상태 유지가 필요할 경우 사용할 Cookie Function입니다. */

		/* 
      if(getCookie("navStates")){
        $nav.classList.add('active')
      } 
      */

		if (localStorage.getItem("navStates")) {
			$nav.classList.add("active");
		}

		window.addEventListener("load", () => {
			$body.classList.remove("preload");
			$body.style.visibility = "visible";
		});

		$toggle.addEventListener("click", () => {
			if (!$nav.classList.contains("active")) {
				$nav.classList.add("active");
				localStorage.setItem("navStates", true);
				/* 
          setCookie('navStates',null,{"expires": 3600, "domain":"<URL-상태를 유지 할 도메인>.com"}) 
          */
			} else {
				$nav.classList.remove("active");
				localStorage.removeItem("navStates");
				/* 
          deleteCookies('navStates')
          */
			}
		});
	};

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
        발생 컴포넌트 : TOGGLE-SIDE-NAVIGATION
      `);

      error.name = '리소스 응답이 500ms 이상 지연되거나 거부되었습니다';

      throw error;
		}
	};

  
	init();
	checkLoading(500);
})();
