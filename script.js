	//		globale værdier - katagoriFilter til "alle"
	let menu;
	let dest = document.querySelector(".data-container");
	let kategoriFilter = "alle";

	//		dokument DOM loadet
	document.addEventListener("DOMContentLoaded", hentJson);

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

	//		eventlistner for knapper, som sætter civilFilter til dey valgte
	document.querySelectorAll(".nav-knap").forEach(knap => {

		knap.addEventListener("click", filtrering)
	});

	//		filtrering function

	function filtrering() {
		dest.textContent = "";
		kategoriFilter = this.getAttribute("data-kategori");
		visMenu();
	}


	function visMenu() {
		console.log("visMenu");
		document.querySelector("main h1").textContent = kategoriFilter;

		//		Select modtager og template
		let temp = document.querySelector(".data-template");

		//		Kør loop med json-data
		menu.forEach(menuitem => {
			//viser valgt filter eller alle
			if (menuitem.kategori == kategoriFilter || kategoriFilter == "alle") {

				//		klon til template
				let klon = temp.cloneNode(true).content;
				klon.querySelector("img").src = "imgs/small/" + menuitem.billede + "-sm.jpg";
				klon.querySelector("img").alt = menuitem.kortbeskrivelse;
				klon.querySelector("h2").textContent = menuitem.navn;
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
				klon.querySelector(".data-kategori").textContent = menuitem.kategori;


				//	    tilføj html
				dest.appendChild(klon);
				console.log("loop er kørt");
			}
		})
	}


	//				let klon = temp.cloneNode(true).content;
	//				klon.querySelector(".data-id").textContent = menuitem.id;
	//				klon.querySelector(".data-katagori").textContent = menuitem.kategori;
	//				klon.querySelector("h2").textContent = menuitem.navn;
	//				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
	//				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
	//				klon.querySelector(".data-langbeskrivelse").textContent = menuitem.langbeskrivelse;
	//				klon.querySelector(".data-oprindelsesregion").textContent = menuitem.oprindelsesregion;
	//				klon.querySelector("img").src = "imgs/small/" + menuitem.billede + "-sm.jpg";
	//				klon.querySelector("img").alt = menuitem.kortbeskrivelse;
