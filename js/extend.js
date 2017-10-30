$(document).ready(function () {
    $.fn.extend({
        serializeObject: function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        populateObject: function (data) {
            for (var key in data) {
                var value = data[key];
                $.each(this.find("input[name='" + key + "'], select[name='" + key + "'], textarea[name='" + key + "']"), function () {
                    var type = "";
                    var tagName = $(this).prop("tagName");
                    if (tagName == "select") {
                        type = "select";
                    } else if (tagName == "textarea") {
                        type = "";
                    } else {
                        type = $(this).attr("type");
                    }
                    switch (type) {
                        case 'checkbox':
                        case 'radio':
                            if ($(this).attr('value') == String(value)) {
                                $(this).attr('checked', 'checked');
                            }
                            break;
                        case 'select':
                            $(this).val(value);
                            // aggressively add option if not available in list.
                            if ($(this).val() != value) {
                                $(this).append($("<option></option>").text(value).val(value));
                                $(this).val(val);
                            }
                            break;
                        default:
                            $(this).val(value);
                    }
                });
            }
        }
    });
});