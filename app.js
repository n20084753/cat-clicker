(function(){
	var data = {
		current_cat_index : 0,
		cats : [{'name':'Andy','src':'cat.jpg','click_count':0},{'name':'Dave','src':'cat-dual.jpg','click_count':0},{'name':'Andy','src':'cat.jpg','click_count':0},{'name':'Dave','src':'cat-dual.jpg','click_count':0},{'name':'Andy','src':'cat.jpg','click_count':0}]
	};

	var controller = {
		init: function() {
			listView.init();
			catDisplayView.init();
			adminView.init();
		},

		getAllCatsList : function () {
			return data.cats;
		},

		getCurrentCat: function() {
			return data.cats[data.current_cat_index];
		},

		updateCurrentCatIndex: function(index) {
			data.current_cat_index = index;
		},

		updateCatClickCount : function() {
			data.cats[data.current_cat_index].click_count = data.cats[data.current_cat_index].click_count + 1; 
		},

		showAdminView: function() {

		}
	};

	var listView = {
		init: function() {
			var $list_elem = document.getElementById('cats_list');
			var cats_list = controller.getAllCatsList();
			for(var cat in cats_list) {
				var $elem = document.createElement('li');
				
				$elem.innerHTML = cats_list[cat].name;
				$elem.setAttribute('cat_index',cat);
				$list_elem.appendChild($elem);
				$elem.addEventListener('click', function(){
					controller.updateCurrentCatIndex(this.getAttribute('cat_index'));
					catDisplayView.render();
				}, false);
			}
		}
	};

	var catDisplayView = {
		init: function() {
			this.$cat_image_elem 	= document.getElementById('cat_image');
			this.$cat_image_elem.addEventListener('click',function() {
				controller.updateCatClickCount();
				catDisplayView.render();
			},false);
			this.render();
		},
		render: function() {
			var $name_span_elem 	= document.getElementById('name_span'),
				$count_span_elem	= document.getElementById('count_span'),
				cat = controller.getCurrentCat();
			
			this.$cat_image_elem.src 	= cat.src;
			$name_span_elem.innerHTML 	= cat.name;
			$count_span_elem.innerHTML	= cat.click_count;
		}
	};

	var adminView = {
		init: function() {
			this.$admin_pannel = document.getElementById('admin_pannel');

			this.$adminBtn = document.getElementById('admin_button');
			this.$adminBtn.addEventListener('click',function() {
				adminView.showAdminView();
			},false);
			
			this.$saveBtn = document.getElementById('save_button');
			this.$saveBtn.addEventListener('click',function() {
				controller.updateCatInfo();
			},false);

			this.$cancelBtn = document.getElementById('cancel_button');
			this.$cancelBtn.addEventListener('click',function() {
				adminView.hideAdminView();
			},false);

			this.render();
		},
		showAdminView: function() {			
			this.$admin_pannel.style.display = 'block';
		},
		hideAdminView: function() {			
			this.$admin_pannel.style.display = 'none';
		},
		render: function() {
			var $name_input = document.getElementById('cat_name_input'),
				$src_input = document.getElementById('cat_src_input'),
				$count_input = document.getElementById('click_count_input');

			var cat = controller.getCurrentCat();

			$name_input.value = cat.name;
			$src_input.value = cat.src;
			$count_input.value = cat.click_count;
		}
	};

	controller.init();
})();