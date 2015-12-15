ActionView = Backbone.View
		.extend({

			el : 'form#actions',

			initialize : function(options) {

				this.services = options.services;
				$('form#actions').empty();
				
			},
			
			events : {

				'click button#kill' : 'kill',
				'click button#load' : 'load',
				'click button#exception' : 'exception',
				'click button#memory' : 'memory',
				'click span#settings'  : 'settings'
				
			},
			
			
			kill : function(e) {
				
			 e.preventDefault();
			 var service = $('#services').val();
			 if (!service) { alert('No service selected, make sure services are registered...')
				 return; };
			 
			 
			 if (confirm('Kill Service: '+service))  {
				
				 $.ajax({
					  url: '/api/kill/'+service,
					}).done(function(data) {
						  actions = new EventListView({fetch:true});
					
					});
			 }
	
			},
			
			load : function(e) {
				 
				e.preventDefault();
				 var service = $('#services').val();
				 if (!service) { alert('No service selected, make sure services are registered...')
					 return; };
				 if (confirm('Apply Load Service: '+service))  {	
				 $.ajax({
					  url: "/api/load/"+service,
					}).done(function(data) {
						  actions = new EventListView({fetch:true});
					
					});
				 }
				
			},	
			
			exception: function(e) {
				 
				e.preventDefault();
				 var service = $('#services').val();
				 if (!service) { alert('No service selected, make sure services are registered...')
					 return; };
				 if (confirm('Invoke Exception on: '+service))  {	 
				 $.ajax({
					  url: "/api/exception/"+service,
					}).done(function(data) {
						  actions = new EventListView({fetch:true});
					
					});
				 }
				
			},
			
			memory: function(e) {
				 
				e.preventDefault();
				 var service = $('#services').val();
				 if (!service) { alert('No service selected, make sure services are registered...')
					 return; };
				 if (confirm('Grow Memory on: '+service))  {	 
				 $.ajax({
					  url: "/api/memory/"+service,
					}).done(function(data) {
						  actions = new EventListView({fetch:true});
					
					});
				 }
				
			},
			
			settings: function(e) {
				
	             //new EventListView({fetch:true});
				 new SettingsView();
				 
				
			},
			
	
			render : function() {

				var compiled_template = _.template(this.html());
				var $el = $(this.el);
				$el.html(compiled_template());

			},

			// USING REQUIRE THIS WOULD CONTAINED IN AN HTML TEMPLATE
			html : function() {

						
				 var html = '<div class="form-group">' + 	    
				     '<label for="srvc">Service: </label> '+
				    '<select id="services" class="form-control">';
				 
				    for (i = 0; i < this.services.length; i++) { 
					    html += '<option value="'+this.services[i]+'">'+this.services[i] + "</option>";
					}
		
					
			    	html += '</select>' +
					'<span>&nbsp;&nbsp;</span>' +
					'</div>' +
					'<div class="form-group">' +
					' <button id="kill" class="btn btn-warning" type="button">Kill</button>' +
					' <button id="load" class="btn btn-warning" type="button">Load</button>' +
					' <button id="exception" class="btn btn-warning" type="button">Exception</button>' +
					' <button id="memory" class="btn btn-warning" type="button">Memory</button>' +
					'</div>' +
					'<span id="settings" class="glyphicon glyphicon-cog pull-right" aria-hidden="false"></span>' 
					'<span id="refresh" class="glyphicon glyphicon-refresh pull-right" aria-hidden="false"></span>';
				
			    	
			    	return html;
			}		 	
			

		});
