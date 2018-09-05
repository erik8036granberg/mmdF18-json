		//		hent og gem variabel fra URL
		let urlParams = new URLSearchParams(window.location.search);
		let tilbagesortering = urlParams.get("tilbagesortering");
		console.log(tilbagesortering);

		//		globale værdier - katagoriFilter til "alle"
		let menu;
		let dest = document.querySelector(".data-container");
		let kategoriFilter = "alle";

		//		check for tilbagesortering og vælg denne
		if (tilbagesortering != null) {
			kategoriFilter = tilbagesortering;
		} else {
			let kategoriFilter = "alle";
		};


		//		dokument DOM loadet
		document.addEventListener("DOMContentLoaded", hentJson);

		async function hentJson() {
			console.log("hentJson");

			//		Hent liste og læg til variablen personer
			let myJson = await fetch("json/menu.json");
			menu = await myJson.json();

			//		test json-import
			console.log(menu);
			visMenu()
		};

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
			//		Select modtager og template
			let temp = document.querySelector(".data-template");
			document.querySelector("main h1").textContent = kategoriFilter;

			//		Kør loop med json-data
			menu.forEach(menuitem => {
				//viser valgt filter eller alle
				if (menuitem.kategori == kategoriFilter || kategoriFilter == "alle") {

					let klon = temp.cloneNode(true).content;

					klon.querySelector(".data-id").textContent = menuitem.id;
					klon.querySelector(".data-kategori").textContent = menuitem.kategori;
					klon.querySelector("h2").textContent = menuitem.navn;
					klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
					klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
					klon.querySelector("img").src = "imgs/small/" + menuitem.billede + "-sm.jpg";
					klon.querySelector("img").alt = menuitem.kortbeskrivelse;
					klon.querySelector("img").addEventListener("click", () => {
						window.location.href = "single.html?id=" + menuitem.id + "&tilbagesortering=" + kategoriFilter;
					});
					//	    tilføj html DOM
					dest.appendChild(klon);
					console.log("loop er kørt");
				}
			})
		}
