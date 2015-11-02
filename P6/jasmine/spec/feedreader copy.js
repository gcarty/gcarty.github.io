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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); // url should be defined
                expect(feed.url).not.toBe('');  // and should not be empty
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() { // new test Suite

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('the menu should be hidden by default', function(){ 
            expect($('body')).toHaveClass('menu-hidden'); //using Jasmin Jquery to check existence of the class
          });
          
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('shows when icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body')).not.toHaveClass('menu-hidden'); //this click makes visible
        });

        it('hides when icon is clicked again', function() {
            $('.menu-icon-link').trigger('click'); //the menu is still visible from the previous click, this click hides it
            expect($('body')).toHaveClass('menu-hidden');
        }); 

    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() { // new test suite

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
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

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() { // new test suite

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeedInfo, newFeedInfo; // define variables for later use

        beforeEach(function(done){
            $('.feed').empty(); //start with a clean empty feed
            loadFeed(0, function() {
                oldFeedInfo = $('.feed').find("h2").text(); // load 1st feed and assign to oldFeed
            });

            loadFeed(1, function() {
                newFeedInfo = $('.feed').find("h2").text(); // load 2nd feed and assign to oldFeed
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
