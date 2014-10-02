this["JST"] = this["JST"] || {};

this["JST"]["list-item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n        		<span class=\"published\">Published "
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{
    'timeago': ("True")
  },data:data},helper ? helper.call(depth0, (depth0 && depth0.updated_at), options) : helperMissing.call(depth0, "date", (depth0 && depth0.updated_at), options)))
    + "</span>\r\n        	";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n        		<span class=\"draft\">Draft</span>\r\n        	";
  }

  buffer += "<a class=\"fade\" href=\"#\">\r\n    <h3 class=\"entry-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h3>\r\n    <section class=\"entry-meta\">\r\n        <span class=\"status\">\r\n        	";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.status), "published", options) : helperMissing.call(depth0, "compare", (depth0 && depth0.status), "published", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        	";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.status), "draft", options) : helperMissing.call(depth0, "compare", (depth0 && depth0.status), "draft", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </span>\r\n    </section>\r\n</a>\r\n";
  return buffer;
  });

this["JST"]["login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"login\" class=\"login-form\" method=\"post\" novalidate=\"novalidate\" action=\"/admin/signin/\">\r\n    <div class=\"email-wrap\">\r\n        <input class=\"email\" type=\"email\" placeholder=\"Email Address\" name=\"email\" autocapitalize=\"off\" autocomplete=\"off\" spellcheck=\"false\" autofocus />\r\n    </div>\r\n    <div class=\"password-wrap\">\r\n        <input class=\"password\" type=\"password\" placeholder=\"Password\" name=\"password\">\r\n    </div>\r\n    <button class=\"btn btn-primary\" type=\"submit\">Login</button>\r\n    <section class=\"meta\">\r\n        <a class=\"forgotten-password\" href=\"#\">Forgotten password?</a>\r\n    </section>\r\n</form>\r\n";
  });

this["JST"]["preview"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<header class=\"preview-header\">\r\n    <section class=\"post-control\">\r\n   		<small><i class=\"fa fa-bookmark-o\"></i> &nbsp;&nbsp;PUBLISHED by "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.author)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &nbsp;&nbsp;\r\n    		|&nbsp;&nbsp;"
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{
    'format': ("Do MMMM YYYY")
  },data:data},helper ? helper.call(depth0, (depth0 && depth0.created_at), options) : helperMissing.call(depth0, "date", (depth0 && depth0.created_at), options)))
    + " </small>\r\n        <a href=\"/admin/editor/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/\"  class=\"pull-right fade\"><i class=\"fa fa-trash-o\"></i></a>          \r\n        <a href=\"/admin/editor/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/\" class=\"pull-right fade\"><i class=\"fa fa-pencil\"></i></a>\r\n    </section>\r\n</header>\r\n<div class=\"wrapper\"><h1>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>";
  if (helper = helpers.html) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.html); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n";
  return buffer;
  });