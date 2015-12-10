SettingsView = Backbone.View
		.extend({

			el : 'div#events',

			initialize : function(options) {

				$('div#events').empty();
				
				this.render();
				
			},
			
			events : {

				'click button#done' : 'done'
			},
			
			done: function(e) {
				
				var view = new EventListView({
					//collection : events,
					fetch : true
				});
  			
				
			},
		

			render : function() {

				var compiled_template = _.template(this.html());
				var $el = $(this.el);
				$el.html(compiled_template());

				$('#panel-title').text('Settings');
				
			},

			// USING REQUIRE THIS WOULD CONTAINED IN AN HTML TEMPLATE
			html : function() {


						
				 var html = '<div class="form-group">' + 	    
				     '<h4>Access Token: ABCDEFG </h4>  '+
				     '<h4>Load Timeout: 5 minutes </h4> '+
				    '<button id="done" class="btn" type="button">Done</button> '+
				    '</div>';
				
			    	return html;
			}		 	
			

		});
