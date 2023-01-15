
// setup for editing tools:

// VSCODE: install this ms-vs-code extension to have better syntax highlighting in /*html*/`es6-strings`
// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html

// SUBLIME TEXT: install this in sublime-text to have syntax highlighting in ES6 strings (template literals)
// https://forum.sublimetext.com/t/javascript-es6-template-literals-syntax-for-html/18242/3

// html of item of list from data content
function list_item_html(item){
	// proper check the check-box
	var done = item[1]=="done"?"checked":""
	// handle checkbox input
	var checkbox = /*html*/`<input type="checkbox" ${done} oninput="list_checkbox_input(this)">`
	// handle text input
	var edit = /*html*/`<input type="text" value="${item[0]}" oninput="list_text_input(this)">`
	// button for remove
	var remove = /*html*/`<button onclick="list_item_remove(this)">remove</button>`
	// produce the list item (its html)
	return /*html*/`<div class='list_item_class'>${checkbox}${edit}${remove}</div>`
}

// add item to list
function list_item_add(button) {
	// ask for task
	var task = prompt('task')
	// you can cancel
	if(task==null) return
	// initial item content
	var item = [task,'todo']
	
	// refer to main node
	var main_node = button.parentNode
	// push item to list
	main_node.data_content.push(item)

	// list node reference
	var list_node = main_node.lastChild
	// add the html
	list_node.innerHTML += list_item_html(item)

	// filter is set
	list_visually_filter('all',button.parentNode)
}

// setup the list
function list_setup(list_content, main_node){
	// list content in main node data content
	main_node.data_content = list_content
	// button for adding
	main_node.innerHTML = /*html*/`<button onclick="list_item_add(this)">add</button>`
	// viewing filters
	main_node.innerHTML += /*html*/` view: `
	// filter:all is showing all
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('all',this.parentNode)">all</button>`
	// filter:todo is showing unchecked items
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('todo',this.parentNode)">todo</button>`
	// filter:done is showing checked items
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('done',this.parentNode)">done</button>`
	// list node is initially empty
	main_node.innerHTML += /*html*/`<div></div>`
	// last node inserted is list node (node for listing items)
	var list_node = main_node.lastChild
	// iterate list items as data content
	for(var item of list_content){
		// add items as html. html from data content
		list_node.innerHTML += list_item_html(item)
	}
	// criterion to show all
	var criterion = "all"
	// visually filter the list
	list_visually_filter(criterion, main_node)
}

// visual filter, to show or hide items
function list_visually_filter(criterion, main_node){
	// index of item (they are list-like). first index is zero.
	var item_index = 0
	// all items are iterated
	for(var item of main_node.querySelectorAll(".list_item_class")){
		// show item by default
		var showed = true
		// if filtering consider the criterion
		if(criterion=='todo' || criterion=='done'){
			// show or not by item content and criterion
			showed = main_node.data_content[item_index][1]==criterion
		}
		// style the item accordingly
		item.style.display = showed?"":"none"
		// keep the index proper: next item
		item_index += 1
	}
	// this keeps the criterion stored
	main_node.filter_criterion = criterion
}

// this helper is useful in the functionalities that follow, below
function list_content_item_access(input_node){
	// dom node of list item
	var list_item_node = input_node.parentNode
	// index in list
	var list_content_index = dom_child_index(list_item_node)
	// dom node of list
	var list_node = list_item_node.parentNode
	// dom node of main
	var main_node = list_node.parentNode
	// refer to data list
	var list_content = main_node.data_content
	// returns the access pair of list and list index
	return [ list_content, list_content_index ]
}

// input: checkbox
function list_checkbox_input(checkbox){
	// access the item
	var [ list_content, list_content_index ] = list_content_item_access(checkbox)
	// toggle checkbox
	list_content[list_content_index][1] = list_content[list_content_index][1]=="todo"?"done":"todo"
	// main node is referred
	var main_node = checkbox.parentNode.parentNode.parentNode
	// apply visual filter
	list_visually_filter(main_node.filter_criterion, main_node)
}

// input: text
function list_text_input(text){
	// access the item
	var [ list_content, list_content_index ] = list_content_item_access(text)
	// set text of item
	list_content[list_content_index][0] = text.value
}

// action: remove
function list_item_remove(button){
	// access the item
	var [ list_content, list_content_index ] = list_content_item_access(button)
	// remove item from list content
	list_content.splice(list_content_index,1)
	// remove the item dom node
	button.parentNode.remove()
}

// this dom operation is missing in default
function dom_child_index(element){
	// index of child element in dom
	return Array.from(element.parentNode.children).indexOf(element)
}