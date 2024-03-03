// Ensuring all the content in the dom is loaded before continuing.
document.addEventListener("DOMContentLoaded", function() {
    var albumForm = document.getElementById("album-form");
    var albumTitle = document.getElementById("album-title");
    var albumDescription = document.getElementById("album-description");
    var selectedAlbumArt = document.getElementById("album-art");
    var allAlbumsList = document.getElementById("all-albums-list");

    // Event listener that prevents the default, while validating, and rendering the card.
    albumForm.addEventListener("submit", function(e) {
        e.preventDefault();
        validateAndRenderAlbumCard();
    });

    // This resets all the validation of the form, and renders the card, using the other functions.
    function validateAndRenderAlbumCard() {
        clearValidationState(albumTitle);
        clearValidationState(albumDescription);
        clearValidationState(selectedAlbumArt);

        // Validating all the information
        var isTitleValid = validateAlbumTitle();
        var isDescriptionValid = validateAlbumDescription();
        var isArtSelected = validateAlbumArt();

        if (isTitleValid && isDescriptionValid && isArtSelected) {
            // Provide the specific file path based on the selected album art
            var selectedAlbumArtSrc = getAlbumArtFilePath(selectedAlbumArt.value);
            renderAlbumCard(selectedAlbumArtSrc);
            albumForm.reset();
        } else {
            console.log("Form is not valid. Please correct errors.");
        }
    }

    // Valiates the album title (Between 1 and 20 characters.)
    function validateAlbumTitle() {
        var titleValue = albumTitle.value.trim();
        if (titleValue.length > 0 && titleValue.length <= 15) {
            return true;
        } else {
            setInvalidState(albumTitle, "Album Title must be between 1 and 20 characters");
            return false;
        }
    }

    // Validates the album description (between 1 and 40 characters.)
    function validateAlbumDescription() {
        var descriptionValue = albumDescription.value.trim();
        if (descriptionValue.length > 0 && descriptionValue.length <= 30) {
            return true;
        } else {
            setInvalidState(albumDescription, "Album Description must be at most 40 characters");
            return false;
        }
    }

    function validateAlbumArt() {
        var selectedValue = selectedAlbumArt.value;
        if (selectedValue !== "") {
            return true;
        } else {
            setInvalidState(selectedAlbumArt, "Select album art");
            return false;
        }
    }
    // Function to render out an album card, using the given template.
    function renderAlbumCard(selectedAlbumArtSrc) {

        // Create a new card.
        var newAlbumCard = document.createElement("div");
        newAlbumCard.className = "col";
        
        // Card template, using string interprolation to add in the nessicary values.
        var cardTemplate = `
            <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" src="${selectedAlbumArtSrc}" />
                <div class="card-body">
                    <h5 class="card-title">${albumTitle.value}</h5>
                    <p class="card-text">${albumDescription.value}</p>
                </div>
            </div>
        `;

        // Add the newly created created card to the webpage.
        newAlbumCard.innerHTML = cardTemplate;
        allAlbumsList.appendChild(newAlbumCard);
    }

    // Function to show the error message on the webpage.
    function setInvalidState(element, errorMessage) {
        var invalidFeedback = element.nextElementSibling;
        if (invalidFeedback) {
            invalidFeedback.innerText = errorMessage;
            invalidFeedback.style.display = "block";
        }
    }

    // Function to hide the error messages from the webpage.
    function clearValidationState(element) {
        var invalidFeedback = element.nextElementSibling;
        if (invalidFeedback) {
            invalidFeedback.style.display = "none";
        }
    }

    // Function that takes the selected value of the album art, and returns the interpolated string of the directory to the image.
    function getAlbumArtFilePath(selectedAlbumArtValue) {
        var imgFolderPath = "img";
    
        switch (selectedAlbumArtValue) {
            case "mountains.jpg":
                return `${imgFolderPath}/mountains.jpg`;
            case "gazing_at_stars.jpg":
                return `${imgFolderPath}/gazing_at_stars.jpg`;
            case "cassette.jpg":
                return `${imgFolderPath}/cassette.jpg`;
            case "tv.jpg":
                return `${imgFolderPath}/tv.jpg`;
            default:
                return "";
        }
    }
});
