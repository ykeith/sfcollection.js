(function ($, undefined) {

    /**
     * Symfony twig collection manager
     *
     * @class Collection
     */
    var Collection = function () {
        this.init();
    };

    Collection.prototype = Object.create(null);
    Collection.prototype.constructor = Collection;

    /* Define global variables */
    Collection.prototype.count = 0; // number of elements in the list
    Collection.prototype.$add= $('.js-collection-add');

    /**
     * Set all listeners
     *
     * @memberof Collection
     */
    Collection.prototype.init = function () {
        var that = this;

        $(document).ready(function(){
            // Show one blank line
            $('.js-collection').find('.js-collection-add').click();
        });

        that.$add.click(function (e) {
            e.preventDefault();
            that.add($(e.target));

            // Add New line when press "Enter" key in an input of the collection
            // Manage every input of the collection
            // (otherwise press enter may turn to delete the row - first encountered button)
            $('.collection input').unbind().keypress(function(e) {
                // "Enter" key
                if ( e.which == 13 ) {
                    e.preventDefault();
                    $(e.target).parents('.js-collection').find('.js-collection-add').click();
                }
            });
        });

        $(document).on('click', '.js-collection-remove' , function (e) {
            e.preventDefault();
            that.remove($(e.target));
        });
    };

    Collection.prototype.add = function (clicked) {
        var that = this,
            listId = clicked.attr('data-href'),
            list = $(listId),
            prototype = $(listId).attr('data-prototype'),
            // Replace input name with an incremental value
            newLine = prototype.replace(/__name__/g, that.count++),
            line = $(newLine);

        // Add new line
        line.appendTo(list);
        // Focus on first field of the new created line
        line.find('input:enabled:visible:not([readonly])').first().focus();

        // TODO Disable remove of the first row
        // TODO No more than one new blank line
        // TODO handle maximum number of items in the collection
    };

    Collection.prototype.remove = function (clicked) {
        $(clicked.attr('data-href')).remove();
    };
})(jQuery);