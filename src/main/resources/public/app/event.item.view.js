EventItemView = Backbone.View.extend({

	el : 'table',

	initialize : function(options) {
		this.model = options.model;
		this.render();

	},

	render : function() {

		var compiled_template = _.template(this.html());
		var $el = $(this.el);
		var m = this.model.toJSON();
	    m['date'] = this.formatDate(new Date(m.created));
		
		$el.append(compiled_template(m));

	},

	html : function() {

		return '<tr><td id="<%=id%>-date"><%=date%> </td> '
				+ '<td id="<%=id%>-action"><%=action%> </td> '
				+ '<td id="<%=id%>-description"> <%=description%> </td>'
				+ '</tr>';

	},

	formatDate : function(date) {

		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return date.getMonth() + 1 + "/" + date.getDate() + "/"
				+ date.getFullYear() + "  " + strTime;
	}

});
