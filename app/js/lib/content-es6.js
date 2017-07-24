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

(( window, $ ) => {
    class ContentInstance {
        constructor ( strDataLocation ){
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
            $.getJSON( strDataLocation,
                ( objResponse ) => {
                    this.objContent = objResponse;
                    this.blReady = true;

                    /**
                     * Execute all the ready functions once loaded
                     */
                    $.each( this.arrOnReady,
                        ( intIndex, funDoOnReady ) => {
                            funDoOnReady.call();
                        }
                    );
                }
            );


        }
        /**
         * Register a function to execute once loaded
         */
        onReady ( funDoOnReady ){
            if( this.blReady ) {
                funDoOnReady.call();
            } else {
                this.arrOnReady.push( funDoOnReady );
            }
        }

        /**
         * Get an item from the content data
         */
        getItem (intItem) {
            return this.objContent[intItem];
        };


        /**
         * Populate the content
         */
        populate ( templateId, contentTitle, targetId ) {
            const source = $( templateId ).html();
            if( !source ){
                console.warn('Template',templateId,'not found');
                return;
            }
            const template = Handlebars.compile( source ),
                content = this.getItem( contentTitle );

            $( targetId ).html( template( content ) );
        }

    }
    // export default ContentInstance;

    /**
     * Add the ContentInstance method to the global scope
     */
    window.Content = ContentInstance;
})(window, jQuery);