/*
 =====================================================

   _____                                _    _ _  __
  / ____|                              | |  | | |/ /
 | (___  _ __   ___  _ __   __ _  ___  | |  | | ' /
  \___ \| '_ \ / _ \| '_ \ / _` |/ _ \ | |  | |  <
  ____) | |_) | (_) | | | | (_| |  __/ | |__| | . \
 |_____/| .__/ \___/|_| |_|\__, |\___|  \____/|_|\_\
        | |                 __/ |
        |_|                |___/

=====================================================
 SPONGE UK DEVELOPER TEST
 Page-specific JS
=====================================================
*/

jQuery(
		function( $ ) {

			/**
			 * A new instance of the content parser using the content JSON file
			 */
			var resContent = new Content( 'app/data/content.json' );

            /**
			 *	Array of content to populate
             */
			var contentToPopulate = [
				{
					"templateId": "#header-template",
					"contentTitle": "header",
					"targetId": "#header"
				},
				{
					"templateId":"#task-template",
					"contentTitle": "tasks",
					"targetId": "#tasks"
				},
				{
					"templateId": "#content-template",
					"contentTitle": "content",
					"targetId": "#content"
				},
                {
                    "templateId": "#documentation-template",
                    "contentTitle": "docs",
                    "targetId": "#documentation"
                },
                {
                    "templateId": "#about-template",
                    "contentTitle": "about",
                    "targetId": "#about"
                }
			];

			/**
			 * Register a Handlebars helper for the difficulty stars
			 */
			Handlebars.registerHelper( 'difficulty',
					function( intStars ) {
						var strHTMLStarsOut = '';

                        // strHTMLStarsOut += '<i class="fa fa-star"></i>'.repeat( intStars ); // Not working in IE 9

                        for( var intStar = 0; intStar < intStars; intStar++ ) {
                            strHTMLStarsOut += '<i class="fa fa-star"></i>';
                        }

                        for( var intBlankStar = intStars; intBlankStar < 5; intBlankStar++ ) {
                            strHTMLStarsOut += '<i class="fa fa-star-o"></i>';
                        }
						return strHTMLStarsOut;
					}
			);

			/**
			 * When the content file is ready, actually populate the content
			 */
			resContent.onReady(
					function() {

                        /**
						 *  Populate each content from array
                         */
                        $.each( contentToPopulate,
								function (elIndex, element) {
                                    resContent.populate(element.templateId,  element.contentTitle, element.targetId);
                        		}
                        );
					}
			);

            /**
			 * Attach on click event to accordion buttons
             */
			$(document).on('click','.accordion', function () {
                var panel = $(this).next();
                	displayState = panel.css('display');
                $('.accordion-panel').slideUp(); // Hide all accordion panels
				if(displayState !== 'block'){
                    panel.slideDown();
				}
            });

		}
);