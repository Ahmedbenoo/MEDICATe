(function(jQuery) {
    "use strict";
    var registerDependencies = function() {
            // if (null != PluginJsConfig && null != PluginJsConfig.js_dependencies) {
            //     var js_dependencies = PluginJsConfig.js_dependencies;
            //     for (var dependency in js_dependencies) {
            //         asyncloader.register(js_dependencies[dependency], dependency);
            //     }
            // }
            // console.log(PluginJsConfig.js_dependencies);
        },
        timer = function() {
            jQuery('.timer').countTo();
        },
        owl_carousel = function(e) {
            jQuery('.owl-carousel ').each(function() {
                var app_slider = jQuery(this);
                // console.log(app_slider);
                var rtl = false;
                var prev = 'fas fa-angle-left';
                var next = 'fas fa-angle-right';
                var prev_text = 'Prev';
                var next_text = 'Next';
                if (jQuery('body').hasClass('pt-is-rtl')) {
                    rtl = true;
                    prev = 'fas fa-angle-right';
                    next = 'fas fa-angle-left';
                }
                if (app_slider.data('prev_text') && app_slider.data('prev_text') != '') {
                    prev_text = app_slider.data('prev_text');
                }
                if (app_slider.data('next_text') && app_slider.data('next_text') != '') {
                    next_text = app_slider.data('next_text');
                }
                app_slider.owlCarousel({
                    rtl: rtl,
                    items: app_slider.data("desk_num"),
                    loop: app_slider.data("loop"),
                    margin: app_slider.data("margin"),
                    nav: app_slider.data("nav"),
                    dots: app_slider.data("dots"),
                    loop: app_slider.data("loop"),
                    autoplay: app_slider.data("autoplay"),
                    autoplayHoverPause: true,
                    autoplayTimeout: app_slider.data("autoplay-timeout"),
                    navText: ["<i class='" + prev + "'></i>", "<i class='" + next + "'></i>"],
                    responsiveClass: true,
                    responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: app_slider.data("mob_sm"),
                            // nav: true,
                            // dots: true
                        },
                        // breakpoint from 480 up
                        480: {
                            items: app_slider.data("mob_num"),
                            // nav: true,
                            // dots: true
                        },
                        // breakpoint from 786 up
                        786: {
                            items: app_slider.data("tab_num")
                        },
                        // breakpoint from 1023 up
                        1023: {
                            items: app_slider.data("lap_num")
                        },
                        1199: {
                            items: app_slider.data("desk_num")
                        }
                    }
                });
            });
        },
        cost_calc = function() {
            var treatment = jQuery('#treatment').find(":selected").val();
            var treatmentplanname = jQuery('#treatment-plan').find(":selected").val();
            var treatmentplan = jQuery('#treatment-plan').find(':selected').data('plan');
            var treatment_location = jQuery('#location').find(':selected').data('location');
            var appointment = jQuery('#appointment').is(":checked");
            var appointment_price = jQuery('#appointment').val();

            var appointment_final_price;

            if(appointment == true)
            {
                appointment_final_price = parseInt(appointment_price);
            }
            else
            {
                appointment_final_price = 0;
            }

            if(!isNaN(treatmentplan) && !isNaN(treatment_location) )
            {
                var final_cost = treatmentplan + treatment_location + appointment_final_price;
            }


            if(jQuery.isNumeric(final_cost) == true)
            {

                jQuery(".pt-cost-calculator .pt-calculator-price .pt-total-title").text('Final Price : ');
                jQuery(".pt-cost-calculator .pt-calculator-price .pt-cost-value").text('$'+final_cost);
            }

        },
        owl2 = function() {
            jQuery('.owl-carousel ').each(function() {
                var app_slider = jQuery(this);
                console.log(app_slider);
                jQuery('.owl-filter-bar').on('click', '.item', function() {
                    var $item = jQuery(this);
                    var filter = $item.data('owl-filter')
                    $item.addClass('current').siblings().removeClass('current');
                    app_slider.owlcarousel2_filter(filter);
                });
            });
        },
        pop_video = function() {
            jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps, .button-play').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                preloader: true,
            });
        },

        woo_commerce_quantity = function() {
            jQuery(document).on('click', 'button.plus, button.minus', function() {
                var qty = jQuery(this).parent('.quantity').find('.qty');
                var val = parseFloat(qty.val());
                var max = parseFloat(qty.attr('max'));
                var min = parseFloat(qty.attr('min'));
                var step = parseFloat(qty.attr('step'));
            // Format values
            if (!val || val === '' || val === 'NaN') val = 0;
            if (max === '' || max === 'NaN') max = '';
            if (min === '' || min === 'NaN') min = 0;
            if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = 1;
            if (jQuery(this).is('.plus')) {
                if (!isNaN(max)) {
                    if (max > val) {
                        qty.val(val + step).change();
                    }
                } else {
                    qty.val(val + step).change();
                }
                return false;
            } else {
                if (!isNaN(min)) {
                    if (min < val) {
                        qty.val(val - step).change();
                    }
                } else {
                    qty.val(val - step).change();
                }
                return false;
            }
        });
        },


        circle_progress = function() {
            jQuery('.pt-circle-progress-bar').each(function() {
                var number = jQuery(this).data('skill-level');
                var empty_color = jQuery(this).data('empty-color');
                var fill_color = jQuery(this).data('fill-color');
                var size = jQuery(this).data('size');
                var thickness = jQuery(this).data('thickness');
                jQuery(this).circleProgress({
                    value: '0.' + number,
                    size: size,
                    emptyFill: empty_color,
                    fill: {
                        color: fill_color
                    }
                }).on('circle-animation-progress', function(event, progress) {
                    jQuery(this).find('.pt-progress-count').html(Math.round(number * progress) + '%');
                });
            });
        },
        isotope = function() {
            jQuery('.pt-masonry').isotope({
                itemSelector: '.pt-masonry-item',
                masonry: {
                    columnWidth: '.grid-sizer',
                    gutter: 0
                }
            });
            jQuery('.pt-grid').isotope({
                itemSelector: '.pt-grid-item',
            });
            jQuery('.pt-filter-button-group').on('click', '.pt-filter-btn', function() {
                var filterValue = jQuery(this).attr('data-filter');
                // console.log(filterValue);
                jQuery('.pt-masonry').isotope({
                    filter: filterValue
                });
                jQuery('.pt-grid').isotope({
                    filter: filterValue
                });
                jQuery('.pt-filter-button-group .pt-filter-btn').removeClass('active');
                jQuery(this).addClass('active');
                updateFilterCounts();
            });
            var initial_items = 5;
            var next_items = 3;
            if (jQuery('.pt-masonry').length > 0) {
                var initial_items = jQuery('.pt-masonry').data('initial_items');
                var next_items = jQuery('.pt-masonry').data('next_items');
            }
            if (jQuery('.pt-grid').length > 0) {
                var initial_items = jQuery('.pt-grid').data('initial_items');
                var next_items = jQuery('.pt-grid').data('next_items');
            }

            function showNextItems(pagination) {
                var itemsMax = jQuery('.visible_item').length;
                var itemsCount = 0;
                jQuery('.visible_item').each(function() {
                    if (itemsCount < pagination) {
                        jQuery(this).removeClass('visible_item');
                        itemsCount++;
                    }
                });
                if (itemsCount >= itemsMax) {
                    jQuery('#showMore').hide();
                }
                if (jQuery('.pt-masonry').length > 0) {
                    jQuery('.pt-masonry').isotope('layout');
                }
                if (jQuery('.pt-grid').length > 0) {
                    jQuery('.pt-grid').isotope('layout');
                }
            }
            // function that hides items when page is loaded
            function hideItems(pagination) {
                var itemsMax = jQuery('.pt-filter-items').length;
                // console.log(itemsMax);
                var itemsCount = 0;
                jQuery('.pt-filter-items').each(function() {
                    if (itemsCount >= pagination) {
                        jQuery(this).addClass('visible_item');
                    }
                    itemsCount++;
                });
                if (itemsCount < itemsMax || initial_items >= itemsMax) {
                    jQuery('#showMore').hide();
                }
                if (jQuery('.pt-masonry').length > 0) {
                    jQuery('.pt-masonry').isotope('layout');
                }
                if (jQuery('.pt-grid').length > 0) {
                    jQuery('.pt-grid').isotope('layout');
                }
            }
            jQuery('#showMore').on('click', function(e) {
                e.preventDefault();
                showNextItems(next_items);
            });
            hideItems(initial_items);

            function updateFilterCounts() {
                // get filtered item elements
                if (jQuery('.pt-masonry').length > 0) {
                    var itemElems = jQuery('.pt-masonry').isotope('getFilteredItemElements');
                }
                if (jQuery('.pt-grid').length > 0) {
                    var itemElems = jQuery('.pt-grid').isotope('getFilteredItemElements');
                }
                var count_items = jQuery(itemElems).length;
                // console.log(count_items);
                if (count_items > initial_items) {
                    jQuery('#showMore').show();
                } else {
                    jQuery('#showMore').hide();
                }
                if (jQuery('.pt-filter-items').hasClass('visible_item')) {
                    jQuery('.pt-filter-items').removeClass('visible_item');
                }
                var index = 0;
                jQuery(itemElems).each(function() {
                    if (index >= initial_items) {
                        jQuery(this).addClass('visible_item');
                    }
                    index++;
                });
                if (jQuery('.pt-masonry').length > 0) {
                    jQuery('.pt-masonry').isotope('layout');
                }
                if (jQuery('.pt-grid').length > 0) {
                    jQuery('.pt-grid').isotope('layout');
                }
            }
        },
        progress_bar = function() {
            jQuery('.pt-progress-bar > span').each(function() {
                var app_slider = jQuery('.pt-progressbar-box');
                jQuery(this).progressBar({
                    shadow: false,
                    animation: true,
                    height: app_slider.data('h'),
                    percentage: false,
                    border: false,
                    animateTarget: true,
                });
                
            });
        },
        accordion = function() {
            jQuery('.pt-accordion-block .pt-accordion-box .pt-accordion-details').hide();
            jQuery('.pt-accordion-block .pt-accordion-box:first').addClass('pt-active').children().slideDown('slow');
            jQuery('.pt-accordion-block .pt-accordion-box').on("click", function() {
                if (jQuery(this).children('div.pt-accordion-details').is(':hidden')) {
                    jQuery('.pt-accordion-block .pt-accordion-box').removeClass('pt-active').children('div.pt-accordion-details').slideUp('slow');
                    jQuery(this).toggleClass('pt-active').children('div.pt-accordion-details').slideDown('slow');
                }
            });
        };
        jQuery(document).ready(function() {
            registerDependencies();

            if (jQuery('.quantity .minus,.quantity .plus').length > 0) {
                woo_commerce_quantity();
            }
            if (jQuery('.timer').length > 0) {
            // asyncloader.require(['jquery.countTo'], function() {
                timer();
            // });
        }
        if (jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps, .button-play').length > 0) {
            // asyncloader.require(['jquery.magnific-popup'], function() {
                pop_video();
            // });
        }
        if (jQuery('.pt-circle-progress-bar').length > 0) {
            // asyncloader.require(['circle-progress'], function() {
                circle_progress();
            // });
        }

        
        jQuery('p:empty').remove();
    });
        jQuery(window).on('load', function(e) {
        // console.log('onload');

        if (jQuery('.owl-carousel').length > 0) {
            // asyncloader.require(['owl.carousel'], function() {
                owl_carousel();
            // });
        }
        if (jQuery('.pt-masonry , .pt-grid ').length > 0) {
            // asyncloader.require(['isotope.pkgd'], function() {
                isotope();
            // });
        }
        if (jQuery('.pt-progressbar-box').length > 0) {
            // asyncloader.require(['progressbar.js'], function() {
                progress_bar();
                // console.log('onload');
            // });
        }        

        if (jQuery('.pt-cost-calculator').length > 0) {
            // asyncloader.require(['progressbar.js'], function() {
                cost_calc();
                // console.log('onload');
            // });
        }
        jQuery('img').each(function() {
            jQuery(this).attr('height', jQuery(this).height() + 'px');
            jQuery(this).attr('width', jQuery(this).width() + 'px');
        });
        
        jQuery.fn.BeerSlider = function ( options ) {
            options = options || {};
            return this.each(function() {
                new BeerSlider(this, options);
            });
        };
        jQuery('.beer-slider').BeerSlider({start: 50});           
    });

        jQuery('.pt-cost-calculator').each(function() {
            jQuery(document).on('change', '.treatment-plan , .treatment , .location , .appointment', function() {
                cost_calc();
            }); 
            jQuery("#time").on('click','li',function(){
                jQuery("#time li.active").removeClass("active"); 
                jQuery(this).addClass("active");  // adding active class
            });
        }); 

    })(jQuery);