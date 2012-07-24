var HEADER_ICON_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAgCAYAAACRpmGNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABM9JREFUeNq8WF1oHFUUPndnZid/7S5JmzVJk7V9sNJqVqOiaBof1NY+JEVIQZA8CBVfIn3yyfhkC4XogxgfJJY+VEFRKM2iJGjRrMQUSsLuNoFGmthSu+xust2Z/Z2fnb3eGZJ1dnd2fhLwwGHv3Dkz95t7znfOuYsAgIZ6QWAuVveNBDu1cf1PwOw+V2VDO3gBWrqzEXiy1xegadpfLBbnifJdXV2RXQDEFjZYD1BVxkTdql5bWh/NCXIa66RcLt8TRfGTubm5zh07m8pYKA12gal6dzMbTmQF/KggYQNJcxx3ltix27pnkGh7YCsGLs+vDu2Mn32889UnfN7xVpb26m1kWf4ikUh809vbG9ktEfRiuWN6zWazo6orsYWUSqXrRHwOdtIIg31g+Xz+HHYgKkAdOMcAbaeS2cWIn2Gbpp3kDoqiRsgHjdW823Yqou0aPtbd8zFDuSAvYfhuWQShIMCZZ1rgULu7zjaZA7j4qwAcn4G3A82TZOqqWbowm7d0p+qStURGi7PPQgr+eVXU3PYgJRq6M1szrYZDjXtZm+61B+52jNcW2kiVbcdcLMHjTE5Qc2HYABxrBc5lozpUzR9uR5DNi/DtzLKmjeS3m3fh5Htfw8yNVUAIBQhzvQ5KGmpUWw2FK0qVsbrgpcu/w9HDByFIxkYSS2a0350PGBwc7HdajGm7u1aUFTWpBtTx/lZWm3t34ge4cuGs4YPvjAxo4Ht8HsP7qT/pkWYWNMBFEeY7Xi6Fate2zdYkX4jugBt+7Th0de6HfQTk0SOdDZ95/uneyrip8H0ge4sJuBk4QbnwiN6OzE1sx+DuUomilKLJnAidbWzdwtWGGcCZWUDSA8D5BW2qLCwBq8Qm65cn5mUU4rNwwWmeq3K1JAoRriBVwBkKPwvKw/fJijHLEJZLOJhMUVP+N6SIGQCmQczVzd28lxJe9Lcbvym3CMrfQ6aISgoKSjLh06Ir+NZ5kbMq/rQT9mQEuUKKurZCWKm6Lorow30vyFPLP7L+Dg/2kB2KOuhSwFEq2SGFrJSNXeA5TYppd938wKh4XwdMk5XrjF9la2GJnrj2OevdTW3Fta5VSZEuysZxxxwCquerSsw1s3hSCjNjJLZCGAOvmTDohAthPyJaAX8MB9UY3FPhVyXLpUPJrK8xKTxvQkq8dYpe7/G0NOFhmoIR1g3jRmFFWDoT30QXtwmBnRLCkBR/rG8Kg0cONHZ9MnnK5/NVEur9X9z9ba1lP8tAwOUCnCug0MKyK1pDCMtO2LDg12ow+s+8WbEnJzI1ZzUZKGuihg2AFSHqvogvSpG8VGpcD2m63+GButE97IitWq4qydF0QTbrfquS3cFPn+uD6VemqamXhpyu5bLzBfqLrXgsxBHGpoV1+DI6DFfuXIJIKvxfkCLkIUfEYa0G/zT4kbevZY2i0ZjCUmNOdk1PCFsn/kqv9lcyfqwn5r26dh5u8xhWOAxu5IPRpwJwIxaG5WScO9NB8Vsy+KPk3kYeA1ZwqHxu4aQTcLRVbjNsd/JFNalWuSmhxGFu6yHEBQRlQN5HMnh3eVbFZhXC8qGiWApxJnGnlTppz/84gVNC4O0OhVSK6tVJwwLN0KaNXz8wAOPHP4Du5j59x8E5Ze6/AgwAHWTjLQ+v54oAAAAASUVORK5CYII=';
var DDG_URL = 'https://duckduckgo.com/?q=';

var DuckDuckBox = function(inputName, forbiddenIDs, contentDiv, hover) {
    this.inputName = inputName;
    this.forbiddenIDs = forbiddenIDs;

    if (contentDiv[0] === '#')
        this.contentDiv = contentDiv;
    else
        this.contentDiv = '#' + contentDiv;

    if (hover) 
        this.hover = hover;
    else
        this.hover = false

    input = $("[name='" + this.inputName + "']"); 
    if (input.length !== 0)
        this.lastQuery = input.value;
    else
        this.lastQuery = '';
};

DuckDuckBox.prototype = {
    init: function() {
        this.search(this.getQueryFromURL());
    },

    search: function() {
        if (options.dev)
            console.log('bad search called');

        return; 
    },

    getQueryFromURL: function() {
        var regex = new RegExp('[\?\&]q=([^\&#]+)');
        if(regex.test(window.location.href)) {
            var q = window.location.href.split(regex);
            q = q[q.length - 2].replace(/\+/g," ");

            if(options.dev)
                console.log(q)

            return decodeURIComponent(q);
        }
    },

    renderZeroClick: function(res, query) {
        // disable on forbidden IDs
        for(var i in this.forbiddenIDs) {
            if ($("#" + this.forbiddenIDs[i]).length !== 0)
                return;           
        }

        if (options.dev) console.log(res, query);

        if (res['AnswerType'] !== "") {
            this.displayAnswer(res['Answer']);
        } else if (res['Type'] == 'A' && res['Abstract'] !== "") {
            this.displaySummary(res, query);
        } else {     
            switch (res['Type']){
                case 'E':
                    this.displayAnswer(res['Answer']);
                    break;

                case 'A':
                    this.displayAnswer(res['Answer']);
                    break;

                case 'C':
                    this.displayCategory(res, query);
                    break;

                case 'D':
                    this.displayDisambiguation(res, query);
                    break;

                default:
                    this.hideZeroClick();
                    break;
                        
            } 
        }
   },

    hideZeroClick: function() {
        var ddg_result = $("#ddg_zeroclick");
        if (ddg_result.length !== 0)
            ddg_result.hide();
    },

    showZeroClick: function() {
        var ddg_result = $("#ddg_zeroclick");
        if (options.dev) console.log( $("#ddg_zeroclick") )

        if (ddg_result.length !== 0)
            ddg_result.show();
    },

    createResultDiv: function() {
        var ddg_result = $("#ddg_zeroclick");
        this.showZeroClick();

        if (ddg_result.length === 0) {
            ddg_result = $("<div>", {id: 'ddg_zeroclick'});
        }

        console.log(ddg_result);

        return ddg_result;
    },

    updateResultDiv: function(result) {
        var contentDiv = $(this.contentDiv);
        console.log(contentDiv, result);
        contentDiv.prepend(result);
    },

    createHeader: function(heading) {
        return $('<div>', {id: 'ddg_zeroclick_header'})
                       .append($('<a>', {
                                   class: 'ddg_head',
                                   href: DDG_URL + encodeURIComponent(query)
                               }).html(heading))
                       .append($('<img>', {
                                   src: HEADER_ICON_URL
                               }))
                       .append($('<a>', {
                                   class: 'ddg_more',
                                   href: DDG_URL + encodeURIComponent(query)
                               }).html('See DuckDuckGo results &raquo;'));

    },

    resultsLoaded: function() {
        if(options.dev)
            console.log($(this.contentDiv));
        
        var contentDiv = $(this.contentDiv);

        if (contentDiv.length !== 0){
            console.log(contentDiv.css('visibility'), contentDiv.css('display'));
            if (contentDiv.css('visibility') === "visible" ||
                contentDiv.css('display') !== 'none') {
                return true;
            }
        }
        
        return false;
    },

    displayAnswer: function(answer) {
        if (answer === '') {
            this.hideZeroClick();
            return;
        }

        if (this.resultsLoaded()) {
            var ddg_result = this.createResultDiv();
            ddg_result.addClass('ddg_answer');
            ddg_result.html(answer);

            if(options.dev)
                console.log('showing answer');
            
            console.log(ddg_result);
            this.updateResultDiv(ddg_result)

        } else {
            if(options.dev)
                console.log('trying again');

            var $this = this;
            setTimeout(function() { 
                $this.displayAnswer(answer); 
            }, 200);
        }
    },

    displaySummary: function(res, query) {
        var result = this.createResultDiv();

        var img_url = res['AbstractURL'];
        var official_site = {};
        var first_category = ''
        var hidden_categories = '';

        var heading = (res['Heading'] === ''? "&nbsp;": res['Heading']);

        var image = '';
        

        if (res['Results'].length !== 0) {
            if(res['Results'][0]['Text'] === "Official site") {
                var url = res['Results'][0]['FirstURL'].match(/https?:\/\/(?:www.)?(.*\.[a-z]+)(?:\/)?/);

                official_site = {
                    text: url[1],
                    url: res['Results'][0]['FirstURL']
                };

                img_url = res['Results'][0]['FirstURL'];
            }
        } 
        
        first_categories = $('<div>');
        hidden_categories = $('<div>');

        for (var i = 0; i < res['RelatedTopics'].length; i++){
            if (res['RelatedTopics'].length === 0)
                break;
            
            var link = res['RelatedTopics'][i]['Result'].
                        match(/<a href=".*">.*<\/a>/);

            var cls = (res['RelatedTopics'][i]['FirstURL'].match(/https?:\/\/[a-z0-9\-]+\.[a-z]+(?:\/\d+)?\/c\/.*/) !== null) ? "ddg_zeroclick_category" : "ddg_zeroclick_article";
            
            var category = $('<div>', {
                                class: cls
                            }).click(function(event){
                                window.location.href = this.firstChild.href;  
                            });

            if (this.hover) {
                category.mouseover(function(event){
                            $(this).addClass('ddg_selected');
                        })
                        .mouseout(function(event){
                            $(this).removeClass('ddg_selected');
                        })
                        .html(link);

                if (i < 2) {
                    if (i === 0)
                        category.addClass('first_category');

                    category.appendTo(first_categories);
                } else {
                    category.appendTo(hidden_categories);
                }

            } else {
                category.html(link);

                if (i < 2) {
                    if (i === 0) 
                        category.addClass('first_category');
                    
                    category.appendTo(first_categories);
                } else {
                    category.appendTo(hidden_categories);
                }
            }
        }

        result.append(this.createHeader(heading));

        if (res['RelatedTopics'].length >= 2){
            var more_topics = $('<div>', {
                                class: 'ddg_zeroclick_more'
                            }).click(function(event){
                                $(this).removeClass('ddg_selected');
                                $(this).mouseover(function(event){});
                                $(this).mouseout(function(event){});
                            }).append($('<a>', {
                                    href: 'javascript:;'
                                }).click(function(event){
                                    $(this).parent().hide();
                                    $(this).parent().next().show();
                                }).text('More related topics')
                            ).append($('<div>', {
                                    style: 'display:none;padding-left:0px;margin-left:-1px;'
                                }).append(hidden_categories)
                            );

            if (this.hover) {
                more_topics.mouseover(function(event){
                    $(this).addClass('ddg_selected');                
                }).mouseout(function(event){
                    $(this).removeClass('ddg_selected');
                });
            }

            result.append(more_topics);
        }


        if (res['Image']) {
            image = $('<div>', {
                id: 'ddg_zeroclick_image'
            }).append($('<a>', {
                    href: img_url
                }).append($('<img>', {
                        class: 'ddg_zeroclick_img',
                        src: res['Image']
                    }
                ))
            );
        }
        
        var source_base_url = res['AbstractURL'].match(/http.?:\/\/(.*?\.)?(.*\..*?)\/.*/)[2];
        var more_image = $('<img>', {
            src: 'https://duckduckgo.com/i/'+ source_base_url +'.ico'
        }); 

        if (source_base_url === "wikipedia.org")
            more_image.attr('src', 'https://duckduckgo.com/assets/icon_wikipedia.v101.png');

        var abst = $('<div>', {
            id: 'ddg_zeroclick_abstract',
            style:  (res['Image'] ? 'max-width: 420px': '')
        }).append($('<div>')
                    .click(function(event){
                                window.location.href = res['AbstractURL'];
                            })
                    .append($('<p>')
                                .text(res['Abstract']))
                    .append($('<div>', {
                                id: 'ddg_zeroclick_official_links'
                            })
                            .append(more_image)
                            .append($('<a>', {
                                        class: 'ddg_more_link',
                                        href: res['AbstractURL']
                                    }).html('More at ' + res['AbstractSource']))
                            .append($('<span>', {text: ' | Official site: '}))
                            .append($('<a>', {
                                        href: official_site['url']
                                    }).html(official_site['text']))
                            )
        )
        .append(first_categories)
        .append(hidden_categories)
        .append($('<div>', {class: 'clear'}));

        if (this.hover) {

            abst.mouseover(function(event){
                $(this).addClass('ddg_selected');
            }).mouseout(function(event){
                $(this).removeClass('ddg_selected');
            });

        } 
        
        result.append(abst);


        if(this.resultsLoaded()) {
            this.updateResultDiv(result);

            if(options.dev)
                console.log('loaded and showing');
        } else {
            var $this = this;
            setTimeout(function(){
                if(options.dev)
                    console.log('trying again');
                $this.updateResultDiv(result);
            }, 200);
        }

    },

    displayDisambiguation: function(res, query) {
        
        var result = '';
        result += '<div id="ddg_zeroclick_header"> <a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                        encodeURIComponent(query)
                    +'"> Meanings of ' +
                        res['Heading'] +
                    '</a> <img alt="" src="'+ HEADER_ICON_URL +'" />' + 
                    '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                        encodeURIComponent(query)
                    +'"> See DuckDuckGo results </a>' +

                  '</div>';

        var disambigs = '' 
        var hidden_disambigs = '';
        var others = '';
        var nhidden = 0;

       for (var i = 0; i < res['RelatedTopics'].length; i++){
            if (res['RelatedTopics'].length === 0)
                break;
            
            if (options.dev)
                console.log(res['RelatedTopics'][i]['Result']);
            
            // other topics
            if(res['RelatedTopics'][i]['Topics']) {
                var topics = res['RelatedTopics'][i]['Topics'];
                var output = '';
                if (this.hover) {
                    for(var j = 0; j < topics.length; j++){
                        output += '<div class="wrapper">' +
                                    '<div class="icon_disambig">' + 
                                        '<img src="' + topics[j]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_disambig" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' +
                                        topics[j]['Result'] +
                                    '</div>' +
                                  '</div>';
                    }
                    others += '<div class="disambig_more" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=\'disambig_more\'" onclick="this.firstChild.onclick();this.className=\'disambig_more\';this.onmouseover=function(){}">' +
                                        '<a href="javascript:;" onclick="' + 
                                            "this.parentElement.nextElementSibling.style.display='block';this.onmouseover=null;" +
                                            "this.parentElement.innerHTML = '" + res['RelatedTopics'][i]['Name']  + "<hr>';" +
                                        '"> ' + res['RelatedTopics'][i]['Name']  + ' ('+ topics.length + ')</a>' +
                                     '</div>' + 
                                        '<div style="display:none;padding-left:0px;margin-left:-1px;">' + 
                                            output +
                                        '</div>';
                } else {
                    for(var j = 0; j < topics.length; j++){
                        output += '<div class="wrapper">' +
                                    '<div class="icon_disambig">' + 
                                        '<img src="' + topics[j]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_disambig" >' +
                                        topics[j]['Result'] +
                                    '</div>' +
                                  '</div>';
                    }
                    others += '<div class="disambig_more" >' +
                                        '<a href="javascript:;" onclick="' + 
                                            "this.parentElement.nextElementSibling.style.display='block';this.onmouseover=null;" +
                                            "this.parentElement.innerHTML = '" + res['RelatedTopics'][i]['Name']  + "<hr>';" +
                                        '"> ' + res['RelatedTopics'][i]['Name']  + ' ('+ topics.length + ')</a>' +
                                     '</div>' + 
                                        '<div style="display:none;padding-left:0px;">' + 
                                            output +
                                        '</div>';
                    
                       
                }
                continue;
            }
                
            
            if (this.hover) {
                if (i <= 2) {
                    disambigs += '<div class="wrapper">' +
                                    '<div class="icon_disambig">' + 
                                        '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_disambig" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' +
                                        res['RelatedTopics'][i]['Result'] +
                                    '</div>' +
                                  '</div>';
                } else {
                    hidden_disambigs += '<div class="wrapper">' +
                                            '<div class="icon_disambig">' + 
                                                '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                            '</div>' +
                                            '<div class="ddg_zeroclick_disambig" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.firstChild.href">' +
                                                res['RelatedTopics'][i]['Result'] +
                                            '</div>' +
                                          '</div>'; 
                    nhidden++;
                }
            } else {
                if (i <= 2) {
                    disambigs += '<div class="wrapper">' +
                                    '<div class="icon_disambig">' + 
                                        '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_disambig" >' +
                                        res['RelatedTopics'][i]['Result'] +
                                    '</div>' +
                                  '</div>';
                } else {
                    hidden_disambigs += '<div class="wrapper">' +
                                            '<div class="icon_disambig">' + 
                                                '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                            '</div>' +
                                            '<div class="ddg_zeroclick_disambig" >' +
                                                res['RelatedTopics'][i]['Result'] +
                                            '</div>' +
                                          '</div>'; 
                    nhidden++;
                }
            }
         }
        
        if (this.hover) {
            if (hidden_disambigs!== '') {
                hidden_disambigs  = '<div class="disambig_more" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="this.firstChild.onclick();this.className=\'disambig_more\';this.onmouseover=function(){}">' +
                                        '<a href="javascript:;" onclick="' + 
                                            "this.parentElement.style.display='none';" +
                                            "this.parentElement.nextElementSibling.style.display='block'" +
                                        '"> More ('+ nhidden + ')</a>' +
                                     '</div>' + 
                                        '<div style="display:none;padding-left:0px;margin-left:-1px;">' + 
                                            hidden_disambigs+
                                        '</div>';
            }
        } else {
            if (hidden_disambigs!== '') {
                hidden_disambigs  = '<div class="disambig_more" >' +
                                        '<a href="javascript:;" onclick="' + 
                                            "this.parentElement.style.display='none';" +
                                            "this.parentElement.nextElementSibling.style.display='block'" +
                                        '"> More ('+ nhidden + ')</a>' +
                                     '</div>' + 
                                        '<div style="display:none;padding-left:0px;">' + 
                                            hidden_disambigs+
                                        '</div>';
            }
        }

        result += '<div id="ddg_zeroclick_abstract">' + 
                      disambigs +
                      hidden_disambigs +
                      others +
                  '</div><div class="clear"></div>';
                  
        
        if (options.dev)
            console.log(result);

        if(this.resultsLoaded()) {
            var ddg_result = this.createResultDiv();
            ddg_result.className = '';
            ddg_result.innerHTML = result;
        } else {
            var $this = this;
            setTimeout(function(){
                $this.displayDisambiguation(res, query);
            }, 200);
        }

    },

    displayCategory: function(res, query) {
        var result = '';
        result += '<div id="ddg_zeroclick_header"> <a class="ddg_head" href="https://duckduckgo.com/?q='+ 
                        encodeURIComponent(query)
                    +'">' +
                        res['Heading'] +
                    '</a> <img alt="" src="'+ HEADER_ICON_URL +'" />' + 
                    '<a class="ddg_more" href="https://duckduckgo.com/?q='+ 
                        encodeURIComponent(query)
                    +'"> See DuckDuckGo results </a>' +
                  '</div>';
        
        var categories = '';
        var hidden_categories = '';
        var nhidden = 0;
        for (var i = 0; i < res['RelatedTopics'].length; i++){
            if (res['RelatedTopics'].length === 0)
                break;
            
            if (options.dev)
                console.log(res['RelatedTopics'][i]['Result']);
     
            if (this.hover) {
                if (i <= 2) {
                    categories += '<div class="wrapper" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.lastChild.firstChild.href;">' +
                                    '<div class="icon_category">' + 
                                        '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_category_item">' +
                                        res['RelatedTopics'][i]['Result'] +
                                    '</div>' +
                                  '</div>';
                } else {
                    hidden_categories += '<div class="wrapper" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="window.location.href=this.lastChild.firstChild.href;">' +
                                        '<div class="icon_category">' + 
                                            '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                        '</div>' +
                                        '<div class="ddg_zeroclick_category_item">' +
                                            res['RelatedTopics'][i]['Result'] +
                                        '</div>' +
                                      '</div>';

                    nhidden++;
                }
            } else {
                if (i <= 2) {
                    categories += '<div class="wrapper" >' +
                                    '<div class="icon_category">' + 
                                        '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                    '</div>' +
                                    '<div class="ddg_zeroclick_category_item">' +
                                        res['RelatedTopics'][i]['Result'] +
                                    '</div>' +
                                  '</div>';
                } else {
                    hidden_categories += '<div class="wrapper" >' +
                                        '<div class="icon_category">' + 
                                            '<img src="' + res['RelatedTopics'][i]['Icon']['URL'] +'" />' +
                                        '</div>' +
                                        '<div class="ddg_zeroclick_category_item">' +
                                            res['RelatedTopics'][i]['Result'] +
                                        '</div>' +
                                      '</div>';

                    nhidden++;
                }
            }
        }
        
        if (this.hover) {
            if (hidden_categories !== '') {
                hidden_categories = '<div class="category_more" onmouseover="this.className+=\' ddg_selected\'" onmouseout="this.className=this.className.replace(\' ddg_selected\',\'\')" onclick="this.firstChild.onclick();this.className=\'category_more\';this.onmouseover=function(){}">' +
                                        '<a href="javascript:;" onclick="' + 
                                            "this.parentElement.style.display='none';" +
                                            "this.parentElement.nextElementSibling.style.display='block'" +
                                        '"> More ('+ nhidden + ')</a>' +
                                     '</div>' + 
                                        '<div style="display:none;padding-left:0px;margin-left:-1px;">' + 
                                            hidden_categories+
                                        '</div>';
     
            }
        } else {
            if (hidden_categories !== '') {
                hidden_categories = '<div class="category_more" >' +
                                        '<a href="javascript:;" onclick="' + 
                                            "this.parentElement.style.display='none';" +
                                            "this.parentElement.nextElementSibling.style.display='block'" +
                                        '"> More ('+ nhidden + ')</a>' +
                                     '</div>' + 
                                        '<div style="display:none;padding-left:0px;">' + 
                                            hidden_categories+
                                        '</div>';
 
            }
        }

        result += '<div id="ddg_zeroclick_abstract">' + 
                        categories +
                        hidden_categories +
                    '</div>';
                    
        
        if (options.dev)
            console.log(result);

        if(this.resultsLoaded()) {
            var ddg_result = this.createResultDiv();
            ddg_result.className = '';
            ddg_result.innerHTML = result;
        } else {
            var $this = this;
            setTimeout(function(){
                $this.displayCategory(res, query);
            }, 200);
        }

    }
};
