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
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //loops through allFeeds URL array and has name and is populated
        it('allFeeds array URL defined and populated', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        //loops through allFeeds name array and has name and is populated
         it('allFeeds array names defined and populated', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });

    describe('The menu', function() {

        // Ensures the menu element is hidden by default. 
        it('default menu hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        }); 

         /* Ensures the menu changes
          * visibility when the menu icon is clicked.*/
          it('Click change to visibility', function()  {
            /*Menu displays when clicked the first time using trigger('click')
            as found on stackoverflow: 
            http://stackoverflow.com/questions/27563356/how-to-test-a-function-call-inside-a-click-event-with-jasmine/ */
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
          });

          it('Click second time to hide menu', function()  {
            //Menu hides when clicked again
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

    });

    describe('Initial Entries', function() {
    /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */ 

         /* followed instructions from udacity discussion: 
         https://discussions.udacity.com/t/async-tests-on-the-feed-reader/162846*/
         beforeEach(function(done) {
            loadFeed(0, done);
         }); 


         it('at least a single entry present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });        

	/* followed advice provided in this udacity forum discussion:
    https://discussions.udacity.com/t/p6-new-feed-selection-test-question-problem/15562/15 */
    describe('New Feed Selection', function() {
            var feedContent;

            beforeEach(function(done) {
                loadFeed(0, function() {
                    feedContent = $('.feed').html();
                    done();
                });
            });
        
        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
            it('new feed loads', function(done) {
                loadFeed(1, function() {
                    expect(feedContent).not.toEqual($('.feed').html());
                    done();
                });

            });
         });
}());

