// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html

function list_item_html(item){
	var done = item[1]=="done"?"checked":""
	var checkbox = /*html*/`<input type="checkbox" ${done} oninput="list_checkbox_input(this)">`
	var edit = /*html*/`<input type="text" value="${item[0]}" oninput="list_text_input(this)">`
	var remove = /*html*/`<button onclick="list_item_remove(this)">remove</button>`
	return /*html*/`<div class='list_item_class'>${checkbox}${edit}${remove}</div>`
}

function list_item_add(button) {
	var task = prompt('task')
	if(task==null) return
	var item = [task,'todo']
	
	var main_node = button.parentNode
	main_node.data_content.push(item)

	var list_node = main_node.lastChild
	list_node.innerHTML += list_item_html(item)

	list_visually_filter('all',button.parentNode)
}

function list_setup(list_content, main_node){
	main_node.data_content = list_content
	main_node.innerHTML = /*html*/`<button onclick="list_item_add(this)">add</button>`
	main_node.innerHTML += /*html*/` view: `
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('all',this.parentNode)">all</button>`
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('todo',this.parentNode)">todo</button>`
	main_node.innerHTML += /*html*/`<button onclick="list_visually_filter('done',this.parentNode)">done</button>`
	main_node.innerHTML += /*html*/`<div></div>`
	var list_node = main_node.lastChild
	for(var item of list_content){
		list_node.innerHTML += list_item_html(item)
	}
	var criterion = "all"
	list_visually_filter(criterion, main_node)
}

function list_visually_filter(criterion, main_node){
	var item_index = 0
	for(var item of main_node.querySelectorAll(".list_item_class")){
		var showed = true
		if(criterion=='todo' || criterion=='done'){
			showed = main_node.data_content[item_index][1]==criterion
		}
		item.style.display = showed?"":"none"
		item_index += 1
	}
	main_node.filter_criterion = criterion
}

function list_content_item_access(input_node){
	var list_item_node = input_node.parentNode
	var list_content_index = dom_child_index(list_item_node)
	var list_node = list_item_node.parentNode
	var main_node = list_node.parentNode
	var list_content = main_node.data_content
	return [ list_content, list_content_index ]
}

function list_checkbox_input(checkbox){
	var [ list_content, list_content_index ] = list_content_item_access(checkbox)
	list_content[list_content_index][1] = list_content[list_content_index][1]=="todo"?"done":"todo"
	var main_node = checkbox.parentNode.parentNode.parentNode
	list_visually_filter(main_node.filter_criterion, main_node)
}

function list_text_input(text){
	var [ list_content, list_content_index ] = list_content_item_access(text)
	list_content[list_content_index][0] = text.value
}

function list_item_remove(button){
	var [ list_content, list_content_index ] = list_content_item_access(button)
	list_content.splice(list_content_index,1)
	button.parentNode.remove()
}

function dom_child_index(element){
	return Array.from(element.parentNode.children).indexOf(element)
}