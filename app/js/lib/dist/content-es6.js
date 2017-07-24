'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 JSON parser and event handler
 =====================================================
 */

(function (window, $) {
    var ContentInstance = function () {
        function ContentInstance(strDataLocation) {
            var _this = this;

            _classCallCheck(this, ContentInstance);

            /**
             * This variables should be private but ES6 doesn't support private variables or functions
             * Tried WeakMap - didn't work
             */
            this.objContent = {};
            this.arrOnReady = [];
            this.blReady = false;

            /**
             * Get the JSON file
             */
            $.getJSON(strDataLocation, function (objResponse) {
                _this.objContent = objResponse;
                _this.blReady = true;

                /**
                 * Execute all the ready functions once loaded
                 */
                $.each(_this.arrOnReady, function (intIndex, funDoOnReady) {
                    funDoOnReady.call();
                });
            });
        }
        /**
         * Register a function to execute once loaded
         */


        _createClass(ContentInstance, [{
            key: 'onReady',
            value: function onReady(funDoOnReady) {
                if (this.blReady) {
                    funDoOnReady.call();
                } else {
                    this.arrOnReady.push(funDoOnReady);
                }
            }

            /**
             * Get an item from the content data
             */

        }, {
            key: 'getItem',
            value: function getItem(intItem) {
                return this.objContent[intItem];
            }
        }, {
            key: 'populate',


            /**
             * Populate the content
             */
            value: function populate(templateId, contentTitle, targetId) {
                var source = $(templateId).html();
                if (!source) {
                    console.warn('Template', templateId, 'not found');
                    return;
                }
                var template = Handlebars.compile(source),
                    content = this.getItem(contentTitle);

                $(targetId).html(template(content));
            }
        }]);

        return ContentInstance;
    }();
    // export default ContentInstance;

    /**
     * Add the ContentInstance method to the global scope
     */


    window.Content = ContentInstance;
})(window, jQuery);