	//		globale værdier - katagoriFilter til "alle"
	let menu;
	let dest = document.querySelector(".data-container");
	let kategoriFilter = "alle";
	let modal = document.querySelector("#modal");

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

		//		Select modtager og template
		let temp = document.querySelector(".data-template");
		console.log("visMenu");
		document.querySelector("main h1").textContent = kategoriFilter;

		//		Kør loop med json-data
		menu.forEach(menuitem => {
			//viser valgt filter eller alle
			if (menuitem.kategori == kategoriFilter || kategoriFilter == "alle") {

				//		klon til template
				let klon = temp.cloneNode(true).content;

				klon.querySelector("img").src = "imgs/small/" + menuitem.billede + "-sm.jpg";
				klon.querySelector("img").alt = menuitem.kortbeskrivelse;

				//indsætter eventlistner på article-class
				klon.querySelector(".selectitem").addEventListener("click", () => {
					visModal(menuitem);
				});

				klon.querySelector("h2").textContent = menuitem.navn;
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
				klon.querySelector(".data-kategori").textContent = menuitem.kategori;

				//	    tilføj html DOM
				dest.appendChild(klon);
				console.log("loop er kørt");
			}
		})
	}

	//viser modal ved at skite display-værdi i css (vis), og starter skjulModal
	function visModal(menuitemet) {
		modal.classList.add("vis");
		modal.querySelector("button").addEventListener("click", skjulModal);
		document.querySelector("#modal").addEventListener("click", skjulModal);

		//hent data fra indlæst "post"
		modal.querySelector(".modal-navn").textContent = menuitemet.navn;
		modal.querySelector("img").src = "imgs/large/" + menuitemet.billede + ".jpg";
		modal.querySelector("img").alt = "Foto af " + menuitemet.billede;
		modal.querySelector(".modal-langbeskrivelse").textContent = menuitemet.langbeskrivelse;
		modal.querySelector(".modal-oprindelsesregion").innerHTML = "<span class='bold'>Oprindelsesregion:</span> " + menuitemet.oprindelsesregion;
		modal.querySelector(".modal-pris").textContent = menuitemet.pris + ",-";

		//udskift lang med kort beskrivelse hvis den mangler
		if (menuitemet.langbeskrivelse == null) {
			modal.querySelector(".modal-langbeskrivelse").textContent = menuitemet.kortbeskrivelse;
		}

		// skjul oprindelsesregion hvis den mangler
		if (menuitemet.oprindelsesregion == null) {
			modal.querySelector(".modal-oprindelsesregion").classList.add("skjul");
		}
	}

	//skjuler modal ved slå css "vis" fra
	function skjulModal() {
		modal.classList.remove("vis");
		modal.querySelector(".modal-oprindelsesregion").removeEventListener("click", skjulModal)
	}

	//skjul lang beskrivelse
