/*App.Validate.form = function(values){
    if(values.IP_ADDRESS == '') {
        return alert('Not correct ip');
    }
    
    return true;
}*/

App.Validate.Is = {
    ip: function(object) {
        var ip_regexp = new RegExp(/\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/);
        return ip_regexp.test() ? false : App.i18n.getMessage('incorrect_ip');
    }
};

App.Validate.getFieldName = function(elm)
{
    fb.log(elm);
    var txt_label = $(elm).prev('label').text();
    if (txt_label.trim() == '') {
        txt_label = $(elm).parents('.field-box').select('label:first').text();
    }
    
    return ['<strong>', txt_label, '</strong>'].join('');
}

App.Validate.Rule = {
    'username' : function(elm) {   
        if ($(elm).val().trim() != '' && $(elm).val().search(/[^a-zA-Z_]+/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' is required'};
        }
        return {VALID: true};
    },
    'required' : function(elm) {
        if ($(elm).val().trim() == '') {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' is required'};
        }
        return {VALID: true};
    },
    'numeric': function(elm) {
        if ($(elm).val().trim() != '' && isNaN(parseInt($(elm).val(), 10))) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' is incorrect'};
        }
        return {VALID: true};
    },
    'no-spaces': function(elm) {
        if ($(elm).val().trim() != '' && $(elm).val().search(/\s/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' cannot contain spaces'};
        }
        return {VALID: true};
    },
    'abc':      function(elm) {
        if ($(elm).val().trim() != '' && $(elm).val().search(/[^a-zA-Z]+/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' must contain only letters without spaces or other symbols'};
        }
        return {VALID: true};
    },
    'email':      function(elm) {
        if ($(elm).val().search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) == -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' not a valid email'};
        }
        return {VALID: true};
    },
    'ip':         function(elm) {        
        if ($(elm).val().trim() != '' && (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/).test($(elm).val()) == false) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' not a valid IP value'};
        }
        return {VALID: true};
    },
    'domain':         function(elm) {        
        if ($(elm).val().trim() != '' && (/^([a-z0-9\.])*[a-z0-9][a-z0-9\-]+[a-z0-9](\.[a-z]{2,4})+$/).test($(elm).val()) == false) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' not a valid domain name'};
        }
        return {VALID: true};
    },
    'ns':         function(elm) {        
        if ($(elm).val().trim() != '' && (/^([a-z0-9\.])*[a-z0-9][a-z0-9\-]+[a-z0-9](\.[a-z]{2,4})+$/).test($(elm).val()) == false) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' not a valid NS name'};
        }
        return {VALID: true};
    },
    'cronminute':         function(elm) { 
        if ($(elm).val().trim() != '' && $(elm).val().search(/[^0-9\/\*-,]+/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' wrong minute value'};
        }
        return {VALID: true};
    },
    'cronhour':         function(elm) {   
        if ($(elm).val() == '*') {
            return {VALID: true};
        }     
        if ($(elm).val().trim() != '' && $(elm).val().search(/[^0-9\/\*-,]+/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' wrong hour value'};
        }
        return {VALID: true};
    },
    'cronwday':         function(elm) {  
        if ($(elm).val() == '*') {
            return {VALID: true};
        }      
        if ($(elm).val().trim() != '' && $(elm).val().search(/[^123456\/\*-,]+/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' wrong week day value'};
        }
        return {VALID: true};
    },
    'cronmonth':         function(elm) { 
        if ($(elm).val() == '*') {
            return {VALID: true};
        }               
        if ($(elm).val().trim() != '' && $(elm).val().search(/[^0-9\/\*-,]+/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' wrong month value'};
        }
        return {VALID: true};
    },
    'cronday':         function(elm) {  
        if ($(elm).val() == '*') {
            return {VALID: true};
        }
        if ($(elm).val().trim() != '' && $(elm).val().search(/[^0-9\/\*-,]+/) != -1) {
            return {VALID: false, ERROR: App.Validate.getFieldName(elm) + ' wrong day value'};
        }
        return {VALID: true};
    }
}


App.Validate.form = function(world, elm)
{    
    var form_valid = true;
    App.Env.FormError = [];
    $(elm).find('select, input, textarea').each(function(i, field)
    {        
        if ($(field).attr('type') == 'checkbox') {
            var value = $(field).attr('checked') ? 'on' : 'off';
            $(field).val(value);
        }
            
        if ($.inArray($(field).attr('name'), ['target', 'source', 'save']) != -1) {
            //return; // pass            
        }
        else {
            var rules = App.Validate.getRules(field);
            $(rules).each(function(i, rule)
            {
                fb.log('Validate with %o %o', rule, field);              
                if (App.Validate.Rule[rule]) {
                    var result = App.Validate.Rule[rule](field);
                    fb.log(result);
                    if (result.VALID == false) {
                        App.Env.FormError.push(result.ERROR); //$(field).attr('name') + ' is required');
                        form_valid = false;
                    }
                }
            })
            /*if ($(field).val().trim() == '' || $(field).val().trim() == '-') {
                App.Env.FormError.push($(field).attr('name') + ' is required');
                form_valid = false;
            }*/
        }
    });
    return form_valid;
}

App.Validate.displayFormErrors = function(world, elm)
{
    var errors_tpl = '';
    $(App.Env.FormError).each(function(i, error)
    {
        var tpl = App.Templates.get('error_elm', 'general');
        tpl.set(':ERROR', error);
        errors_tpl += tpl.finalize();
    });
    var ref = $('.form-error', elm);
    ref.removeClass('hidden');
    ref.html(errors_tpl);
}

App.Validate.getRules = function(elm)
{
    try {
        var rules_string = $(elm).attr('class');
        var rules = [];
        $(rules_string.split(/\s/)).each(function(i, str)
        {        
            var rule = str.split('rule-');
            if (rule.length > 1) {
                rules[rules.length++] = rule[1];
            }
        });
        
        return rules;
    }
    catch(e) {
        return [];
    }
}




