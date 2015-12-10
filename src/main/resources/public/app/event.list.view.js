EventListView = Backbone.View
		.extend({

			el : 'div#events',

			initialize : function(options) {

				$('#events').empty();

				this.collection = options.collection;
				// NOTE: This would be called if server API involved
				var _this = this;
				if (options.fetch) {
					this.collection = new Event.Collection();
					this.collection.fetch({
						url : 'api/events',
						success : function(col, response, options) {
                           // _this.collection = col;
							_this.render();
				

						},
						error : function(co, response, options) {
							alert(response);
						}

					});

				} else {
					this.render();
				}
				$('#events').unbind();

			},
		
			addRows : function() {

				this.collection.forEach(function(model) {

					// add item view, each row
					var itemView = new EventItemView({
						model : model
					});

				}, this);

			},

			render : function() {

				var compiled_template = _.template(this.html());
				var $el = $(this.el);
				$el.html(compiled_template());

				this.addRows();
				
				$('#panel-title').text('Event Log');

			},
			

			// USING REQUIRE THIS WOULD CONTAINED IN AN HTML TEMPLATE
			html : function() {

				return '<table class="table"><th>Date</th><th>Action</th><th>Description</th></tr>';

			}

		});
