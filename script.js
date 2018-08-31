		document.addEventListener("DOMContentLoaded", hentJson);

		let menu;

		async function hentJson() {
			console.log("hentJson");

			//		Hent liste og læg til variablen personer
			let myJson = await fetch("json/menu.json");
			menu = await myJson.json();

			//		test json-import
			console.log(menu);

			//		Gå vis-funktion
			visMenu();
		}

		function visMenu() {
			console.log("visMenu");

			//		Select modtager og template
			let modtager = document.querySelector(".data-container");
			let temp = document.querySelector(".data-template");

			//		Kør loop med json-data
			menu.forEach(menuitem => {

				//		klon til template
				let klon = temp.cloneNode(true).content;
				klon.querySelector(".data-id").textContent = menuitem.id;
				klon.querySelector(".data-katagori").textContent = menuitem.kategori;
				klon.querySelector(".data-navn").textContent = menuitem.navn;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-langbeskrivelse").textContent = menuitem.langbeskrivelse;
				klon.querySelector(".data-oprindelsesregion").textContent = menuitem.oprindelsesregion;
				klon.querySelector("img").src = "imgs/small/" + menuitem.billede + "_sm.jpg";

				//	    tilføj html
				modtager.appendChild(klon);
				console.log("loop er kørt");
			})
		}
