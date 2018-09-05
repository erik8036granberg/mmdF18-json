		//		hent og gem variabel fra URL
		let urlParams = new URLSearchParams(window.location.search);
		let id = urlParams.get("id");
		let tilbagesortering = urlParams.get("tilbagesortering");
		console.log(id);

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
			visMenuItem();
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

		function visMenuItem() {
			console.log("visMenu");

			//		Kør loop
			menu.forEach(menuitem => {
				let dest = document.querySelector(".data-container");

				//hvis id navn matcher, så udskriv
				if (menuitem.id == id) {

					//indsæt data i klonen
					dest.querySelector("img").src = "imgs/large/" + menuitem.billede + ".jpg";
					dest.querySelector("img").alt = menuitem.kortbeskrivelse;
					dest.querySelector("img").addEventListener("click", () => {
						window.location.href = "single.html?id=" + menuitem.id + "&tilbagesortering=" + kategoriFilter;
					});
					dest.querySelector("h2").textContent = menuitem.navn;
					dest.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
					dest.querySelector(".data-pris").textContent = menuitem.pris + ",-";
					dest.querySelector(".data-kategori").textContent = menuitem.kategori;
				}
			})
		}

		document.querySelector(".tilbage").addEventListener("click", gaaTilbage);

		function gaaTilbage() {
			window.location.href = "index.html?tilbagesortering=" + tilbagesortering;
		}
