/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); // url should be defined
                expect(feed.url).not.toBe('');  // and should not be empty
            });
        });

        it('name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined(); // name should be defined
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* New test suite "The menu" */
    describe('The Menu', function() { 

        it('the menu should be hidden by default', function(){ 
            expect($('body')).toHaveClass('menu-hidden'); //using Jasmin Jquery to check existence of the class
        });
          
        it('shows when icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body')).not.toHaveClass('menu-hidden'); //this click makes visible
        });

        it('hides when icon is clicked again', function() {
            $('.menu-icon-link').trigger('click'); //the menu is still visible from the previous click, this click hides it
            expect($('body')).toHaveClass('menu-hidden');
        }); 

    });


    /* New test suite "Initial Entries" */
    describe('Initial Entries', function() { // new test suite

        beforeEach(function(done) { //load feed 0 before doing the test
            loadFeed(0, function () {
                done();
            });
        });

        it('loadFeed should have at least 1 entry', function(done) {
            expect($('.feed')).not.toBeEmpty(); // feed is not empty
            done();
        });
    });

    /* New test suite "New Feed Selection" */
    describe('New Feed Selection', function() { // new test suite

        var oldFeedInfo, newFeedInfo; // define variables for later use

        beforeEach(function(done){
            $('.feed').empty(); //start with a clean empty feed
            loadFeed(0, function() {
                oldFeedInfo = $('.feed').html(); // load 1st feed and assign to oldFeed
                done();
            });

            loadFeed(1, function() {
                newFeedInfo = $('.feed').html(); // load 2nd feed and assign to oldFeed
                done();
            });
        });

        it('new feed content should be different', function(done){
            expect(oldFeedInfo).not.toEqual(newFeedInfo); // content should be different
            expect(newFeedInfo).not.toBe(''); // an extra safety test -- newFeed is not empty
            expect(oldFeedInfo).not.toBe(''); // an extra safety test -- oldFeed is not empty
            done();
        });
    }); 
}());
