/**
 * Theme: Amezia - Responsive Bootstrap 4 Admin Dashboard
 * Author: Themesbrand
 * Form Wizard
 */


$(function () {
    $("#form-horizontal").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slide",
        onFinished: function (event, currentIndex) {
            // submit all detils to...
            // go to  other page :)
            var currentLocation = window.location;
            console.log(currentLocation)
            // if the current page is sign up go to.createchallenge
            if (window.location.toString().includes("signup")) {
                window.location.replace("createchallengenew.html")

            }
            // if the current page is createchallenge go to.pairup.html
            if (window.location.toString().includes("createchallengenew")) {
                window.location.replace("pairup.html")

            }
            if (window.location.toString().includes("playerform")) {
                window.location.replace("pairup.html")

            }
        }

    });
});