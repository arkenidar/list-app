
// setup for editing tools:
// installazioni per strumenti di modifica: (a seguire)

// VSCODE: install this ms-vs-code extension to have better syntax highlighting in /*html*/`es6-strings`
// Visual Studio Code: installa la seguente estensione (es6-string-html) per le stringhe html correttamente colorate
// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html

// SUBLIME TEXT: install this in sublime-text to have syntax highlighting in ES6 strings (template literals)
// Sublime Text: seguendo le istruzioni si ha la colorazione corretta delle stringhe html (similmente a sopra, VSCODE)
// https://forum.sublimetext.com/t/javascript-es6-template-literals-syntax-for-html/18242/3

// html of item of list from data content
// prepara codice html per un elemento (iniziale o aggiunto successivamente) della lista, dai dati associati
function list_item_html(item){
	// proper check the check-box
	// casella di spunta elemento grafico spuntato o meno
	var done = item[1]=="done"?"checked":""
	// handle checkbox input
	// casella di spunta che risponde all'uso modificando i dati associati
	var checkbox = /*html*/`<input type="checkbox" ${done} oninput="list_checkbox_input(this)">`
	// handle text input
	// casella di input di testo che modifica i dati associati, quando usata
	var edit = /*html*/`<input type="text" value="${item[0]}" oninput="list_text_input(this)">`
	// button for remove
	// pulsante per rimuovere l'elemento di lista
	var remove = /*html*/`<button onclick="list_item_remove(this)">remove</button>`
	// produce the list item (its html)
	// infine produci il div html completo delle 3 parti precedenti (elemento <div>)
	return /*html*/`<div class='list_item_class'>${checkbox}${edit}${remove}</div>`
}

// add item to list
// aggiungi un nuovo elemento di lista alla lista
function list_item_add(button) {
	// ask for task
	// chiedi il nome del task per memorizzarlo nell'elemento (vedasi todomvc.com)
	var task = prompt('task')
	// you can cancel
	// inserimento annullabile
	if(task==null) return
	// initial item content
	// contenuto iniziale della voce/elemento della lista
	var item = [task,'todo']
	
	// refer to main node
	// nodo principale, in esso associo i dati memorizzati
	var main_node = button.parentNode
	// push item to list
	// aggiungi item/elemento modificando i dati relativi, combinati con la parte visiva/interattiva html
	main_node.data_content.push(item)

	// list node reference
	// riferimento al nodo html che elenca gli elementi della task-list (lista di task/attività nello stile "todomvc")
	var list_node = main_node.lastChild
	// add the html
	// aggiungi il codice html dell'elemento/item ai pre-esistenti
	list_node.innerHTML += list_item_html(item)

	// filter is set
	// il filtro visivo è impostato (per il mostra o nascondi)
	list_visually_filter('all',button.parentNode)
}

// setup the list
// imposta la lista, situazione iniziale
function list_setup(list_content, main_node){
	// list content in main node data content
	// il "contenuto dati" è memorizzato nel nodo principale
	main_node.data_content = list_content
	// button for adding
	// pulsante di aggiunta
	main_node.innerHTML = /*html*/`<button onclick="list_item_add(this)">add</button>`
	// viewing filters
	// filtraggio visivo, visualizzazione condizionale
	main_node.innerHTML += /*html*/` view: `
	// filter:all is showing all
	// filtro per mostrare tutti gli elementi
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('all',this.parentNode)">all</button>`
	// filter:todo is showing unchecked items
	// filtro per mostrare solo i task non spuntati, non completati
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('todo',this.parentNode)">todo</button>`
	// filter:done is showing checked items
	// filtro per mostrare solo i task completati ovvero spuntati
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('done',this.parentNode)">done</button>`
	// list node is initially empty
	// il nodo principale è inizialmente vuoto
	main_node.innerHTML += /*html*/`<div></div>`
	// last node inserted is list node (node for listing items)
	// aggiungi il nodo di elencazione task vero e proprio, la lista (ma in termini DOM, ovvero Vista MVC)
	var list_node = main_node.lastChild
	// iterate list items as data content
	// scorri gli elementi, nei dati associati alla parte visibile (e viceversa)
	for(var item of list_content){
		// add items as html. html from data content
		// aggiunge la parte html visibile preparata in base ai dati non visibili ma manipolabili (parte View e parte Model del MVC)
		list_node.innerHTML += list_item_html(item)
	}
	// criterion to show all
	// criterio per mostrarli tutti, inizialmente
	var criterion = "all"
	// visually filter the list
	// lista filtrata visivamente
	list_visually_filter(criterion, main_node)
}

// visual filter, to show or hide items
// filtro visivo, per mostrare o nascondere elementi, items
function list_visually_filter(criterion, main_node){
	// index of item (they are list-like). first index is zero.
	// indice dell'item (come indice di lista). il primo è zero.
	var item_index = 0
	// all items are iterated
	// scorri tutti gli item, tutti gli elementi della lista delle attività dell'utente dell'app "To-Do", "cose Da Fare"
	for(var item of main_node.querySelectorAll(".list_item_class")){
		// show item by default
		// item mostrato di default
		var showed = true
		// if filtering consider the criterion
		// se con filtraggio considera il criterio di filtraggio
		if(criterion=='todo' || criterion=='done'){
			// show or not by item content and criterion
			// mostra o no in base all'item, le sue caratteristiche, e al criterio di filtraggio in base alle caratteristiche
			showed = main_node.data_content[item_index][1]==criterion
		}
		// style the item accordingly
		// lo stile dell'item è impostato consequenzialmente
		item.style.display = showed?"":"none"
		// keep the index proper: next item
		// prossimo indice di item
		item_index += 1
	}
	// this keeps the criterion stored
	// questo memorizza il criterio
	main_node.filter_criterion = criterion
}

// this helper is useful in the functionalities that follow, below
// questa funzionalità è utile dopo, seguono suoi usi
function list_content_item_access(input_node){
	// dom node of list item
	// nodo del documento/DOM dell'elemento della lista delle attività (o di altro, "todomvc" è un esempio tra i tanti)
	var list_item_node = input_node.parentNode
	// index in list
	// indice nella lista, posizione numerica e numericamente progressiva
	var list_content_index = dom_child_index(list_item_node)
	// dom node of list
	// nodo DOM della lista dei task to-do
	var list_node = list_item_node.parentNode
	// dom node of main
	// nodo DOM principale
	var main_node = list_node.parentNode
	// refer to data list
	// tale nodo principale ha dei contenuti associati (la parte Model di Model-View-Controller, M.V.C.)
	var list_content = main_node.data_content
	// returns the access pair of list and list index
	// fornisci in uscita il paio "lista" & "indice di lista" per manipolazioni dei dati (uso a seguire)
	return [ list_content, list_content_index ]
}

// input: checkbox
// input di tipo casella di spunta ovvero check-box
function list_checkbox_input(checkbox){
	// access the item
	// accesso all'item
	var [ list_content, list_content_index ] = list_content_item_access(checkbox)
	// toggle checkbox
	// alterna spunta con non-spunta e viceversa (alternare, "to toggle")
	list_content[list_content_index][1] = list_content[list_content_index][1]=="todo"?"done":"todo"
	// main node is referred
	// il nodo principale è riferito (usi successivi)
	var main_node = checkbox.parentNode.parentNode.parentNode
	// apply visual filter
	// applica infine il filtro visivo
	list_visually_filter(main_node.filter_criterion, main_node)
}

// input: text
// input di tipo testo
function list_text_input(text){
	// access the item
	// accedi all'elemento
	var [ list_content, list_content_index ] = list_content_item_access(text)
	// set text of item
	// imposta il testo dell'elemento di lista dei task o compiti/attività
	list_content[list_content_index][0] = text.value
}

// action: remove
// azione di rimozione voce dell'elenco, voce o item di lista
function list_item_remove(button){
	// access the item
	// riferendosi all'item ...
	var [ list_content, list_content_index ] = list_content_item_access(button)
	// remove item from list content
	// ... lo si rimuove, sia dalla lista come variabile JavaScript
	list_content.splice(list_content_index,1)
	// ... sia lo si rimuove dalla gerarchia DOM, l' "albero" DOM come dicevo, degli elementi del documento
	// remove the item dom node
	button.parentNode.remove()
}

// this dom operation is missing in default
// questa operazione sul documento DOM manca nella dotazione standard del web-browser, ma è definibile, quindi aggiungibile
function dom_child_index(element){
	// index of child element in dom
	// indice dell'elemento DOM "figlio" ovvero appena inferiore nella gerarchia (paragone: gerarchia di "albero genealogico")
	return Array.from(element.parentNode.children).indexOf(element)
}